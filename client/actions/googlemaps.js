import {fetchTweetsByQuery} from './twitter';

export const getCoordinates = () => {
  return {
    type: 'GET_COORDINATES'
  }
}

export const requestAddressGeocode = () => {
  return {
    type: 'REQUEST_ADDRESS_GEOCODE'
  }
}

export const fetchAddressGeocode = (address) => {
  return (dispatch) => {
    dispatch(requestAddressGeocode())
    console.log('in fetch address geocode', address)
    let esc = encodeURIComponent
    // let url = '/address?address=' + esc(`${address}`)
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${esc(address)}&key=${process.env.GOOGLE_MAPS_API}`
    fetch(url)
      .then(
        response => response.json(),
        error => console.log('An error occurred', error)
      )
      .then((result) => {
        console.log('fetchrequest address geocode', result)
        let location = result.results[0].geometry.location
        let lat = location.lat
        let lng = location.lng
        return ({lat: lat, lng: lng})
      }).then((result) => {
        dispatch(setCoordinates(result))
      })
      .then(() => {
        dispatch(fetchTweetsByQuery())
      })
  }
}

export const setCoordinates = (coordinates) => {
  console.log('setCoordinates', coordinates)
  return {
    type: 'SET_COORDINATES',
    coordinates: coordinates
  }
}