$(document).ready(function() {

  $("#tweet-text").on("input", function() {
    const textLength = $(this).val().length;
    const $counter = $(this).siblings("div").children(".counter")
    $counter.val(140 - textLength);

    if ($counter.val() < 0) {
      $counter.addClass("counterRed")
    }

    if ($counter.val() >= 0) {
      $counter.removeClass("counterRed")
    }
  });

});