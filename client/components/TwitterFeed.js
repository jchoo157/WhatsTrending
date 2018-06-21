import React, { Component } from 'react';

export default class TwitterFeed extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: true
    }
  }

  toggleFeed(e) {
    const {isOpen} = this.state;
    this.setState({isOpen: !isOpen})
  }

  render() {
    const {isOpen} = this.state
    const {tweetsByQuery} = this.props

    return(
      <div className="twitter-feed-container">
        <div className="feed-header">
          <h1> Twitter Feed </h1>
          <div className="toggle-feed" onClick={() => this.toggleFeed()}>
            {isOpen ? '−' : '+'}
          </div>
        </div> 
        <div className={"twitter-feed " + (isOpen ? 'active' : '')}>
          {
            tweetsByQuery.statuses.map(status => {
              return (
                <div className="tweet-content">
                  <div>
                    <div className="user-image-container">
                      <img className="user-image" src={status.user.profile_image_url}/>
                      <div className="username">{status.user.screen_name}</div>
                    </div>
                    <div className="tweet">{status.text}</div>
                    <div className="date">{status.created_at}</div>
                  </div>
                </div>
              )
            })
          }
          <p>...</p>
        </div>
      </div>
    )
  }
}