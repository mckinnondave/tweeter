/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }

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
          <div class="datePosted">${created_at}</div>
          <div class="lowerIcons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    return $tweet
  }
  
  const $tweet = createTweetElement(tweetData);
  console.log($tweet);
  $(".mainContainer").append($tweet);

})