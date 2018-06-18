export const getCoordinates = () => {
  return {
    type: 'GET_COORDINATES'
  }
}

export const setCoordinates = (coordinates) => {
  console.log('setCoordinates', coordinates)
  return {
    type: 'SET_COORDINATES',
    coordinates: coordinates
  }
}