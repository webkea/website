$(document).ready(function() {
  $(function() {
      $('.locale-pink').click(function(e) {
          $(this).find('iframe').css('pointer-events', 'all');
      }).mouseleave(function(e) {
          $(this).find('iframe').css('pointer-events', 'none');
      });
  })
});
