import { CLICK_TITLE, REQUEST_TWEETS, RECEIVE_TWEETS } from '../actions/twitter';

let defaultState = {
  
}

function tweetsByQuery(state = {isLoading: false, tweetsByQuery: {'statuses': []}}, action) {
  switch (action.type) {
    case CLICK_TITLE:
      return Object.assign({}, state, {isLoading: false});
    case REQUEST_TWEETS:
      return Object.assign({}, state, {isLoading: true});
    case RECEIVE_TWEETS:
      return Object.assign({}, state, {isLoading: false, tweetsByQuery: action.payload});
    default:
      return state;
  }
}

export default tweetsByQuery;