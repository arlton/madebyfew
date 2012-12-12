$(document).ready(function(){

  function animUp() {
    $("#marker").animate({ top: "1px" }, "slow", "swing", animDown);
  }

  function animDown() {
    $("#marker").animate({ top: "10px" }, "slow", "swing", animUp);
  }

  animUp();

  $('#clinton-center h2').click(function(){
    $("#clinton-center").animate({height: '900px'});
  });

  $('.carousel').carousel();


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
  Eventbrite({'app_key':'SUYQ3DAUFRTPPKQCDK', 'user_key':'135256082546136021081'}, function(eb_client){
    eb_client.event_get( {'id': 4813227493 }, function( response ){
        var earlybirdTicketsAvailable = response.event.tickets[0].ticket.quantity_available - response.event.tickets[0].ticket.quantity_sold,
            regularTicketsAvailable = response.event.tickets[1].ticket.quantity_available - response.event.tickets[1].ticket.quantity_sold;

        $('#earlybird_tickets_available').text(earlybirdTicketsAvailable);
        $('#regular_tickets_available').text(regularTicketsAvailable);
    });
  });
});
