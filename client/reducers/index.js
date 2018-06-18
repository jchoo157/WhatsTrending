import { combineReducers } from 'redux';
import tweetsByQuery from './twitter';
import googlemaps from './googlemaps';

const rootReducer = combineReducers({
  tweetsByQuery, googlemaps
});

export default rootReducer;