const defaultState = {
  coordinates: {lat: 0, lng: 0},
  isLoading: false
}

function googlemaps (state=defaultState, action) {
  switch(action.type) {
    case 'GET_COORDINATES':
      return state.coordinates
    case 'SET_COORDINATES':
      'set coordinates'
      return Object.assign({}, state, {isLoading: false, coordinates: action.coordinates})
    case 'REQUEST_ADDRESS_GEOCODE':
      return Object.assign({}, state, {isLoading: true})
    default:
      return state
  }
}

export default googlemaps