import C from '../constants'
import {Axios} from './Axios'
import Cookies from 'js-cookie'
const qs = require('qs')

const googleKey = process.env.REACT_APP_GOOGLE_API_KEY

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

export const login = (username, password, rememberMe) => {
    return async (dispatch) => await Axios().post('login/', qs.stringify({username, password}))
    .then(res => {
        const eightHours = 1/3
        rememberMe ? Cookies.set('User_LoginToken', res.data.token) : Cookies.set('User_LoginToken', res.data.token, {expires: eightHours})
        dispatch({
            type: C.SET_LOGIN_TOKEN,
            payload: res.data
         })
    }).catch(e => console.log(e))
}
