$(document).ready(function(){
  /* PRELOAD IMAGES */
  var preloadImageArray = [];
  // Hires carousel images if carousel if being used (currently when viewport>480px)
  if ($('#clinton-center').is(':visible')) {
    preloadImageArray.push('img/1_hires.jpg');
    preloadImageArray.push('img/2_hires.jpg');
    preloadImageArray.push('img/3_hires.jpg');
    preloadImageArray.push('img/4_hires.jpg');
    preloadImageArray.push('img/5_hires.jpg');
  }

  $(preloadImageArray).each(function() {
    $('<img />').attr('src', this).hide().appendTo('body');
    console.log(this);
  });

  function animUp() {
    $("#marker").animate({ top: "1px" }, "slow", "swing", animDown);
  }

  function animDown() {
    $("#marker").animate({ top: "10px" }, "slow", "swing", animUp);
  }

  animUp();

  /* VENUE */
  $('#clinton-center h2').click(function(){
    $("#clinton-center").animate({height: '900px'});
  });

  $('.carousel').carousel();

  function closeOverlay() {
    $('#clinton-center').insertAfter($('#schedule'));
    $('#clinton-center .item img').each(function(index, thisImage) {
        $(thisImage).attr('src', $(thisImage).attr('data-lowres-src'));
    });

    $('.carousel-inner').css({ 'height': 'auto' });

    $('#venue-overlay').fullScreen(false);
    $('#venue-overlay').remove();
  }

  function toggleOverlay(thisImage) {
    // If already open, then close
    if ($(document).fullScreen()) {
        closeOverlay();
    } else {
        // Hide venue fullscreen icon
        $('#venue-fullscreen-icon').hide();

        // Create overlay and image nodes
        var overlay = $('<div />')
             .attr('id','venue-overlay')
             .prependTo('body');

        $('#clinton-center').appendTo(overlay);
        $('#clinton-center .item img').each(function(index, thisImage) {
            $(thisImage).attr('src', $(thisImage).attr('data-hires-src'));
        });

        // Fullscreen using bad ass jQuery fullscreen plugin
        $(overlay).fullScreen(true);
    }
  }

  // Set keypress events for overlay
  $(document).keyup(function(e) { if (e.keyCode == 27) { closeOverlay(); } });

  // Set fullscreen change events for overlay
  $(document).bind("fullscreenchange", function() {
    if (!$(document).fullScreen()) { closeOverlay(); }
  });

  $('#venue-fullscreen-icon').click(function() {
    toggleOverlay($('#clinton-center .carousel-inner .active img'));
  });

  $('#myCarousel').hover(function() {
    if (!$(document).fullScreen()) {
        $('#venue-fullscreen-icon').hide().fadeIn('fast');
    }
  }, function() {
    if (!$(document).fullScreen()) {
        $('#venue-fullscreen-icon').show().fadeOut('fast');
    }
  });

  $('#clinton-center .carousel-inner img').each(function(index, thisImage) {
    $(thisImage).click(function() {
        toggleOverlay(thisImage);
    });
  });

  $(window).scroll(function() {
    $('#arrow').fadeOut("fast");
  });

  $('#main-nav ul li a[href^="#"]').on('click', function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    $(this).closest('ul').find('.current').removeClass('current');
    $(this).addClass('current');
    $.scrollTo($(this).attr('href'), 800);
    return false;
  });

  var sections = $("section");
  var navigation_links = $("#main-nav ul li a");

  sections.waypoint({
    handler: function(event, direction) {

      var active_section;
      active_section = $(this);
      if (direction === "up") {
        active_section = active_section.prev();
      }

      var active_link = $('nav a[href="#' + active_section.attr("id") + '"]');
      navigation_links.removeClass("current");
      active_link.addClass("current");

    },
    offset: '25%'
  });

  $(window).scroll( function(){
    if($(window).scrollTop()>100){
        $(".quote1").fadeIn();
    }

    if($(window).scrollTop()>300){
        $(".quote2").fadeIn();
    }

    if($(window).scrollTop()>400){
        $(".quote3").fadeIn();
    }

    if($(window).scrollTop()>480){
        $(".quote4").fadeIn();
    }

    if($(window).scrollTop()>1150){
        $(".speaker-holder").fadeIn();
    }
  });

  $(".last-year-speaker").fitVids();

  // If we're at the right window size, instantiate stellar
  if ($(window).width() >= 960) {
    $(window).stellar({
        hideDistantElements: true,
        showElement: function($elem) {
            $elem.fadeIn('slow');
        },
        hideElement: function($elem) {
            $elem.fadeOut('fast');
        }
    });
  }

  $(window).resize(function() {
    // If we're in overlay mode, make sure that image is vertically centered
    if ($('#venue-overlay').length) {
        $('.carousel-inner').height($(window).height());
    }

    // If we've resized to above 960 and stellar hasn't been instantiated, do so now
    if ($(window).width() >= 960 &&
        typeof $(window).data('plugin_stellar') === 'undefined') {
        console.log('Instantiating stellar after resize');
        $(window).stellar();
    }

    // Assuming we're rolling with stellar based on screen width
    if ($(window).width() >= 960) {
        winHeight = $(window).height();
        $("#scrollWrapper > div").height(winHeight);

        // Find out all my elements that are being manipulated with stellar
        var particles = $(window).data('plugin_stellar').particles;

        // Temporarily stop stellar so we can move our elements around
        // data('plugin_stellar') let's me access the instance of stellar
        // So I can use any of its methods. See stellar's source code
        $(window).data('plugin_stellar').destroy();

        $.each(particles, function(i, el){
            // destroy() sets the positions to their original PIXEL values.
            // Mine were percentages, so I need to restore that.
            this.$element.css('top', '');

            // Once the loop is finished, re-initialize stellar
            if(particles.length - 1 === i){
                $(window).data('plugin_stellar').init();
            }
        });
    }
  });

  /* EVENTBRITE SHTUFF */
  $.get('./inc/ticketCounts.php', function(response) {
        var earlybirdTicketsAvailable = response.event.tickets[0].ticket.quantity_available - response.event.tickets[0].ticket.quantity_sold,
            regularTicketsAvailable = response.event.tickets[1].ticket.quantity_available - response.event.tickets[1].ticket.quantity_sold;

        if (earlybirdTicketsAvailable) {
            $('#tickets_msg').text('Only ' + earlybirdTicketsAvailable + ' Early Bird tickets left! Seating is limited.');
        } else {
            $('#tickets_msg').html('Seating is limited. The event will sell out.');
        }

        //$('#regular_tickets_available').text(regularTicketsAvailable);
    }, 'json').error(function() { // If this xhr call dies for some reason, show at least something
        $('#tickets_msg').html('Seating is limited. The event will sell out.');
    });
});
