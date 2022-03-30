/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  // const tweetData = {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png",
  //       "handle": "@SirIsaac"
  //     },
  //   "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //   "created_at": 1461116232227
  // }

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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

  const renderTweets = (tweetObjects) => {
    for (const object of tweetObjects) {
      const $tweet = createTweetElement(object);
      $(".new-tweet").append($tweet);
    }
  }
  renderTweets(data);

})