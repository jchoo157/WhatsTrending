import { combineReducers } from 'redux';
import tweetsByQuery from './twitter';

const rootReducer = combineReducers({
  tweetsByQuery
});

export default rootReducer;