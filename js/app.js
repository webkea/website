$(document).ready(function() {

  // nav link scroll animate
  $('nav a, .scroll-down').on('click', function() {
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
  $(function() {
    var thanks = window.location.hash;
    if (thanks === "#thanks") {
      $('body').append("<div class='notification'><p>Thanks. We'll be in touch shortly.</p></div>");
      setTimeout(function() {
        $('.notification').fadeOut('slow');
      }, 2500);
    }
  });

  //lightbox trigger
  $('.lightbox_trigger').click(function(e) {

    e.preventDefault();
    var image_href = $(this).attr("href");
    var description = $(this).attr("data-description");
    if ($('#lightbox').length > 0) {
        $('#content').html('<div class="close-box"><span>&#10005;</span></div><img src="' + image_href + '" />' + description );
        $('.container').addClass('blur');
        $('#lightbox').fadeIn();
    }
    else {
      var lightbox =
      '<div id="lightbox">' +
        '<div id="content">' +
        '<div class="close-box"><span>&#10005;</span></div>' +
        '<img src="' + image_href +'" />' +
        description +
        '</div>' +
      '</div>';
      $('.container').addClass('blur');
      $('body').append(lightbox).hide().fadeIn();
      $('#lightbox').click(function(){
          $('#lightbox').fadeOut();
          $('.container').removeClass('blur');
      });
    }
  });
});
