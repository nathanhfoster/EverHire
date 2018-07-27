import C from './constants'

export const setcurrentlocation = (accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp) => ({
    type: C.SET_CURRENTLOCATION,
        payload: {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp}
 })