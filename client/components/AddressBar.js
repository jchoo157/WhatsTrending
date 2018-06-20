import React, { Component } from 'react';

export default class AddressBar extends Component {
  submitAddress(e, address) {
    e.preventDefault();
    const {fetchAddressGeocode, fetchTweetsByQuery} = this.props;
    fetchAddressGeocode(address)
  }

  render() {
    return (
      <div className="address-bar">
        <form onSubmit={(e) => {this.submitAddress(e, this.input.value)}}>
          <input ref={node => this.input = node} placeholder='Enter an address...' required={true}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}