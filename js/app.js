$(document).ready(function() {
  $('.menu-button, ul a').click(function(){
    $('ul').toggleClass('show-menu');
    $('.menu-button').toggleClass('menu-open');
    $('.menu-button').toggleClass('menu-close');
  });
  $(function() {
      $('.locale-pink').click(function() {
          $(this).find('iframe').css('pointer-events', 'all');
      }).mouseleave(function() {
          $(this).find('iframe').css('pointer-events', 'none');
      });
  });
});
