import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class GoogleMaps extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { googleMaps } = this.props;
    return (
      <div>
        <h3>{googleMaps.state}</h3>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { googleMaps } = state;
  return (
    googleMaps
  )
}

export default connect(mapStateToProps, null)(GoogleMaps);  