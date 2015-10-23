$(function() {
  $('#submit-button').mouseenter(function() {
    $('#carrot-img').addClass('animated bounce');
  });

  $('#submit-button').mouseleave(function() {
    window.setTimeout(function() {
      $('#carrot-img').removeClass('animated bounce');
    }, 2000);
  });
});
