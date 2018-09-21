import C from '../constants'
import axios from 'axios'

const googleKey = process.env.REACT_APP_GOOGLE_API_KEY


// export function getVoTYouTubeChannelData() {
//     return (dispatch) => ytube.getChannelsLatestVideos(votYouTubeChanneID, 50)
//         .then(res => {
//             dispatch ({
//                 type: C.GET_VOT_YOUTUBE_CHANNEL_DATA,
//                 payload: res.latest
//             })
//         }).catch((e)=>console.log(e))
// }


export const setWindow = (Window) => ({
    type: C.SET_WINDOW,
    payload: Window
 })


 export const setUserLocation = (accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp) => ({
    type: C.SET_USER_LOCATION,
    payload: {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp} 
 })

export const getUserLocation = () => (dispatch, getState) => 
    dispatch({ 
        type: C.GET_USER_LOCATION, 
        payload: getState().userLocation,
})
