import C from './constants'

export const userLocation = (accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp) => ({
    type: C.SET_USER_LOCATION,
    payload: {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp} 
 })