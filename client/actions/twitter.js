export const CLICK_TITLE = 'CLICK_TITLE';
export const REQUEST_TWEETS = 'REQUEST_TWEETS';
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'; 

import fetch from 'cross-fetch'

require('dotenv/config');

export function requestTweets() {
  return {
    type: REQUEST_TWEETS
  }
}

export function receiveTweetsByQuery(payload) {
  return {
    type: RECEIVE_TWEETS,
    payload: payload
  }
}

export function clickTitle(payload) {
  console.log('clickTitle()')
  return {
    type: CLICK_TITLE,
    payload: payload
  }
}

export function clickedTitle() {
  console.log('clickedTitle()')
  return dispatch => {
    dispatch(clickTitle());
  }
}

function fetchTweetsByQuery() {
  return dispatch => {
    dispatch(requestTweets())

    return fetch('/data')
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then( json =>
        dispatch(receiveTweetsByQuery(json))
      )
  }
}

export function twitAuthentication(queries, count) {
  var Twit = require('twit')
  var T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET,
    access_token:         process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  })

  return new Promise((resolve, reject) => {
    T.get('search/tweets', { geocode: queries, count: count }, function(err, data, response) {
      if (!err) {
        resolve(data)
      } else {
        console.log(err)
      }
    })
  })
}

export function fetchTweetsByQueryIfNeeded() {
  return fetchTweetsByQuery();
}