import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { clickedTitle, fetchTweetsByQueryIfNeeded } from '../actions/twitter.js';

class Twitter extends Component {
  constructor(props) {
    super(props);

    this.activeClickTitle = this.activeClickTitle.bind(this);
    this.listOutTweets = this.listOutTweets.bind(this);
  }

  // componentWillMount() {
  //   const {clickedTitle, fetchTweetsByQueryIfNeeded} = this.props;
  //   fetchTweetsByQueryIfNeeded()
  // }

  activeClickTitle() {
    const {clickedTitle, fetchTweetsByQueryIfNeeded} = this.props;
    return fetchTweetsByQueryIfNeeded()
  }

  listOutTweets() {
    const { tweetsByQuery } = this.props;

    if (!tweetsByQuery) {
      return
    }

    return tweetsByQuery.statuses.map(tweet => <p>{tweet.text}</p>);
  }

  render() {
    const { tweetsByQuery } = this.props;

    if (tweetsByQuery && !tweetsByQuery.statuses) {
      return (
        <button onClick={() => this.activeClickTitle()}>GET TWEETS</button>
      )
    }

    return (
      <div>
        <p>{this.listOutTweets()}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { tweetsByQuery } = state;
  return (
    tweetsByQuery
  )
}

function mapDispatchToProps(dispatch) {
  const objects = Object.assign({}, {
    clickedTitle, fetchTweetsByQueryIfNeeded
  });
  return bindActionCreators(objects, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Twitter);  