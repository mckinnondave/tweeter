$(document).ready(function() {

  // Hide error message, tweet form, and up arrow
  $(".errorPopup").hide();
  $("#tweetForm").hide();
  $(".arrowUp").hide();

  // Prevent XSS attacks by escaping
  const escape = (str) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  // Takes in an object and formats its data into an article
  const createTweetElement = (tweetData) => {
    const { user, content, created_at } = tweetData;
    const $tweet = $(`
    <article>
        <header class="userHeader">
          <div class="userName">
          <img src="${user.avatars}"> &nbsp;
          ${user.name}
          </div>
          <div class="userHandle">${user.handle}</div>
        </header>
        <div class="midSection">
          <div class="innerText">${escape(content.text)}</div>
        </div>
        <footer>
          <div class="datePosted">${timeago.format(created_at)}</div>
          <div class="lowerIcons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };

  // Takes what is typed in the tweet form, serializes it and posts it to /tweets once submitted
  $("#tweetForm").submit(function(event) {
    event.preventDefault();

    // Error handling if statements
    const text = $("#tweet-text").val();
    if (text.length > 140) {
      $(".errorMessage").text("You have exceeded the maximum character count!");
      $(".errorPopup").slideDown(500).delay(4000).slideUp(500);
      return;
    }
    if (!text.length) {
      $(".errorMessage").text("Cannot post blank message!");
      $(".errorPopup").slideDown(500).delay(4000).slideUp(500);
      return;
    }
    
    $.ajax("/tweets", {method: "POST", data:  $(this).serialize()})
      .then(function() {
        $(".new-tweet-container").empty(); // prevent duplication
        loadTweets();
      });
    
    // If post is successful, erase tweet form
    $("#tweetForm").trigger("reset");
  });

  // Takes in array of tweet objects, sends each through createTweetElement, and posts each resulting article to the tweet container
  const renderTweets = (tweetObjects) => {
    for (const object of tweetObjects) {
      const $tweet = createTweetElement(object);
      $(".new-tweet-container").prepend($tweet);
    }
  };

  // Retrieves tweet data and sends to renderTweets for posting
  const loadTweets = () => {
    $.ajax("/tweets", { method: "GET" })
      .then(function(data) {
        renderTweets(data);
      });
  };
  loadTweets();

  // Click event on navbar down arrows to show or hide tweet form
  $(".fa-angles-down").click(function() {
    $("#tweetForm").slideDown(500);
    $(".textArea").focus();
    $(".newTweet").fadeOut(500);
  });

  // Click event on lower arrow button to scroll user to top of page
  $(".arrowUp").click(function() {
    $(".newTweet").fadeOut(500);
    $("html, body").animate({
      scrollTop: 0
    }, 350);
    $("#tweetForm").slideDown(500);
    $(".textArea").focus();
  });

  // hide/show arrow buttons whether at top of screen or not
  $(window).scroll(function() {
    $(".arrowUp").fadeIn(500);
    $(".newTweet").fadeOut(500);
    if ($(window).scrollTop() === 0) {
      $(".arrowUp").fadeOut(500);
      if ($("#tweetForm").is(":visible")) {
        return;
      }
      $(".newTweet").fadeIn(500);
    }
  });

});

