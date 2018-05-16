import { CLICK_TITLE, REQUEST_TWEETS, RECEIVE_TWEETS } from '../actions/twitter';

export function tweetsByQuery(state = {isLoading: false, tweetsByQuery: []}, action) {
  switch (action.type) {
    case CLICK_TITLE:
      return Object.assign({}, state, {isLoading: false});
    case REQUEST_TWEETS:
      return Object.assign({}, state, {isLoading: true});
    case RECEIVE_TWEETS:
      return Object.assign({}, state, {isLoading: false, tweetsByQuery: action.payload});
    default:
      console.log('DEFAULT')
      return state;
  }
}

export default tweetsByQuery;