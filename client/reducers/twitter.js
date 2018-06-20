import { CLICK_TITLE, REQUEST_TWEETS, RECEIVE_TWEETS } from '../actions/twitter';

let defaultState = {
  isLoading: false, 
  statuses: []
}

function tweetsByQuery(state=defaultState, action) {
  switch (action.type) {
    case CLICK_TITLE:
      return Object.assign({}, state, {isLoading: false});
    case REQUEST_TWEETS:
      return Object.assign({}, state, {isLoading: true});
    case RECEIVE_TWEETS:
      return Object.assign({}, state, {statuses: action.statuses, isLoading: false});
    default:
      return state;
  }
}

export default tweetsByQuery;