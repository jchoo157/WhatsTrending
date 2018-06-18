import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTweetsByQuery } from '../actions/twitter';
import { setCoordinates } from '../actions/googlemaps';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div className="marker">{ text }</div>;

class GoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: { lat: 0, lng: 0 }
    }
  }

  componentDidMount() {
    const {fetchTweetsByQuery, setCoordinates} = this.props;

    this.getPosition()
      .then((position) => {
        let lat = position.coords.latitude
        let lng = position.coords.longitude
        return {lat: lat, lng: lng}
      })
      .then((result) => {
        console.log('first run this')
        setCoordinates(result)
      })
      .then(() => {
        console.log('just ran this')
        fetchTweetsByQuery()
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  getPosition(options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  createAllTweetMarkers() {
    const {tweetsByQuery} = this.props;

    console.log('tweetsByQuery', tweetsByQuery)

    return tweetsByQuery.statuses.map((status) => {
      if (!status.coordinates) {
        return null
      }
      let lat = status.coordinates.coordinates[1]
      let lng = status.coordinates.coordinates[0]
      console.log(lat, lng)
      console.log(status)
      return (
        <AnyReactComponent
          lat={lat}
          lng={lng}
          text={'DOT'}
        />
      )
    })
  }

  static defaultProps = {
    center: { lat: 40.7446790, lng: -73.9485420 },
    zoom: 14
  }

  render() {
    const { tweetsByQuery, googlemaps: {coordinates} } = this.props;
    console.log('render', tweetsByQuery)
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDntSdliajvqjiH9IsOtpnlEjjEVs6PT0U' }}
          defaultCenter={this.props.center}
          center={coordinates}
          defaultZoom={this.props.zoom}
        >
          {tweetsByQuery.statuses ? this.createAllTweetMarkers() : null}
        </GoogleMapReact>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { tweetsByQuery, googlemaps } = state;
  return ({
    tweetsByQuery, googlemaps
  })
}

function mapDispatchToProps(dispatch) {
  return ({
    fetchTweetsByQuery: () => {
      dispatch(fetchTweetsByQuery())
    },
    setCoordinates: () => {
      dispatch(setCoordinates())
    }
  })
}

function mapDispatchToProps(dispatch) {
  const objects = Object.assign({}, {
    fetchTweetsByQuery,
    setCoordinates,
  });
  return bindActionCreators(objects, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMaps)
