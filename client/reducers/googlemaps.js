const defaultState = {
  coordinates: {lat: 0, lng: 0}
}

function googlemaps (state=defaultState, action) {
  switch(action.type) {
    case 'GET_COORDINATES':
      return state.coordinates
    case 'SET_COORDINATES':
      'set coordinates'
      let copyState = Object.assign({}, state, {coordinates: action.coordinates})
      console.log('copy', copyState)
      return copyState
    default:
      return state
  }
}

export default googlemaps