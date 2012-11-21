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

  // Do our DOM lookups beforehand
  // var nav_container = $(".nav-container");
  // var nav = $("#main-nav");
  
  // var top_spacing = 15;
  // var waypoint_offset = 50;
  
  var sections = $("section");
  var navigation_links = $("#main-nav ul li a");
  
  sections.waypoint({
    handler: function(event, direction) {
    
      var active_section;
      active_section = $(this);
      if (direction === "up") active_section = active_section.prev();

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
  });

  $(window).scroll( function(){
    if($(window).scrollTop()>300){
    $(".quote2").fadeIn();
    }
  });

  $(window).scroll( function(){
    if($(window).scrollTop()>400){
    $(".quote3").fadeIn();
    }
  });

  $(window).scroll( function(){
    if($(window).scrollTop()>480){
    $(".quote4").fadeIn();
    }
  });

  $(window).scroll( function(){
    if($(window).scrollTop()>1150){
    $(".speaker-holder").fadeIn();
    }
  });

  $(".last-year-speaker").fitVids();

});
