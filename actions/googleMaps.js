const API_GOOGLE_MAPS = 'google_maps.json';

export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';

export function requestLocations() {
  console.log('requestLocations')
  return {
    type: "REQUEST_LOCATIONS"
  }
}