import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { fetchTweetsByQuery } from '../actions/twitter';
import { setCoordinates, fetchAddressGeocode } from '../actions/googlemaps';
import GoogleMapReact from 'google-map-react';
import AddressBar from './AddressBar';

const Marker = ({ status }) => 
  <div className="marker-container">
    <div className="sprite sprite-twitter-marker" onMouseOver={(e) => e.target.parentNode.classList.add('show-first')} onMouseLeave={(e) => e.target.parentNode.classList.remove('show-first')}>
    </div>
    <div className="tweet">
      { status.user.screen_name }
      <div className="tweet-content">
        { status.text }
      </div>
    </div>
  </div>

class GoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: { lat: 0, lng: 0 }
    }
  }

  componentDidMount() {
    const {fetchTweetsByQuery, setCoordinates} = this.props;
    console.log('componentDidMount')
    this.getPosition()
      .then((position) => {
        let lat = position.coords.latitude
        let lng = position.coords.longitude
        return {lat: lat, lng: lng}
      })
      .then((result) => {
        setCoordinates(result)
      })
      .then(() => {
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

    return tweetsByQuery.statuses.map((status) => {
      if (!status.coordinates) {
        return null
      }
      let lat = status.coordinates.coordinates[1]
      let lng = status.coordinates.coordinates[0]
      return (
        <Marker
          lat={lat}
          lng={lng}
          status={status}
        />
      )
    })
  }

  static defaultProps = {
    center: { lat: 40.7446790, lng: -73.9485420 },
    zoom: 14
  }

  render() {
    const { tweetsByQuery, googlemaps: {coordinates}, fetchAddressGeocode, fetchTweetsByQuery } = this.props;
    console.log('rendering', tweetsByQuery)
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API }}
          defaultCenter={this.props.center}
          center={coordinates}
          defaultZoom={14}
        >
          <AddressBar tweetsByQuery={tweetsByQuery} fetchAddressGeocode={fetchAddressGeocode} fetchTweetsByQuery={fetchTweetsByQuery}/>
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
    setCoordinates: (coordinates) => {
      dispatch(setCoordinates(coordinates))
    },
    fetchAddressGeocode: (address) => {
      dispatch(fetchAddressGeocode(address))
    }
  })
}

// function mapDispatchToProps(dispatch) {
//   const objects = Object.assign({}, {
//     fetchTweetsByQuery,
//     setCoordinates,
//   });
//   return bindActionCreators(objects, dispatch);
// }

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMaps)
