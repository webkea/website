$(document).ready(function() {

  // nav link scroll animate
  $('nav a').on('click', function() {
      var scrollAnchor = $(this).attr('data-scroll'),
          scrollPoint = $('.page[data-anchor="' + scrollAnchor + '"]').offset().top - 28;
      $('body,html').animate({
          scrollTop: scrollPoint
      }, 500);
      return false;
  });

  // sets active menu link
  $(window).scroll(function() {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 100) {
        $('.page').each(function(i) {
            if ($(this).position().top <= windscroll + 170) {
                $('.link.active').removeClass('active');
                $('.link').eq(i).addClass('active');
            }
        });
    } else {
        $('nav li.active').removeClass('active');
    }
  }).scroll();

  // mobile menu
  $('.menu-button, ul a').click(function(){
    $('ul').toggleClass('show-menu');
    $('.menu-button').toggleClass('menu-open');
    $('.menu-button').toggleClass('menu-close');
  });

  // avoids scroll-capture for map
  $(function() {
      $('.locale-pink').click(function() {
          $(this).find('iframe').css('pointer-events', 'all');
      }).mouseleave(function() {
          $(this).find('iframe').css('pointer-events', 'none');
      });
  });
});
