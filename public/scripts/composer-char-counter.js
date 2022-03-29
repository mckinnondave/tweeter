$(document).ready(function() {

  // Changes counter number based on how many characters are input in <textarea> (id of tweet-text).
  $("#tweet-text").on("input", function() {
    const textLength = $(this).val().length;
    const $counter = $(this).siblings("div").children(".counter")
    $counter.val(140 - textLength);

    if ($counter.val() < 0) {
      $counter.addClass("redCounter")
    }

    if ($counter.val() >= 0) {
      $counter.removeClass("redCounter")
    }
  });

});