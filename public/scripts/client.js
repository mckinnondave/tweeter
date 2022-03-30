$(document).ready(function() {

  // Takes in an object and formats its data into an article
  const createTweetElement = (tweetData) => {
    const { user, content, created_at } = tweetData;
    const $tweet = $(`
    <article>
        <header>
          <div class="userName">
          <img src="${user.avatars}"> &nbsp;
          ${user.name}
          </div>
          <div class="userHandle">${user.handle}</div>
        </header>
        <div class="midSection">
          <div class="innerText">${content.text}</div>
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

  // Takes in array of tweet objects, sends each through createTweetElement, and posts each resulting article to the main tweet container
  const renderTweets = (tweetObjects) => {
    for (const object of tweetObjects) {
      const $tweet = createTweetElement(object);
      $(".new-tweet-container").prepend($tweet);
    }
  };

  // Takes what is typed in the tweet form, serializes it and posts it to /tweets once submit
  $("#tweetForm").submit(function(event) {
    event.preventDefault();

    const text = $("#tweet-text").val()
    if(text.length > 140) {
      return alert("Message is too long!")
    }
    if(text.length === 0) {
      return alert("Cannot post an empty tweet!")
    }

    $.ajax("/tweets", {method: "POST", data:  $(this).serialize()})
      .then(function() {
        $(".new-tweet-container").empty(); // prevent duplication
        loadTweets();
      });
  });

  // retrieves tweet data and sends to renderTweets
  const loadTweets = () => {
    $.ajax("/tweets", { method: "GET" })
      .then(function(data) {
        renderTweets(data);
      });
  };
  loadTweets();

});