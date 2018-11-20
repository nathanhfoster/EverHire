import C from '../constants'
import {Axios} from './Axios'
import Cookies from 'js-cookie'
const qs = require('qs')

const googleKey = process.env.REACT_APP_GOOGLE_API_KEY

export const setApiResponse = response => {
    return async (dispatch) => {
        await dispatch({
            type: C.SET_API_RESPONSE,
            payload: response
        })
    }
}

export const clearApiResponse = () => {
    return async (dispatch) => await dispatch({
        type: C.SET_API_RESPONSE,
        payload: null
    })
}

export const setWindow = (Window) => ({
    type: C.SET_WINDOW,
    payload: Window
 })

 export const setUserLocation = (accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp) => {
    return async (dispatch, getState) => {
        const {Jobs} = getState()
        const me = [{id: 'Me', lat: latitude, lng: longitude}]
        const Markers = Jobs.length > 1 && Jobs[0].id != 'Me' ? me.concat(Jobs) : Jobs
        await dispatch({
        type: C.SET_USER_LOCATION,
        payload: {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp} 
        }),
        await dispatch({
            type: C.GET_JOBS,
            payload: Markers
        })
    }
}

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
         dispatch({
            type: C.SET_API_RESPONSE,
            payload: res
         })
    }).catch(e => dispatch({
        type: C.SET_API_RESPONSE,
        payload: e.response
     }))
}

export const Logout = () => {
    Cookies.remove('User_LoginToken')
    return async (dispatch) => {
        await dispatch({
        type: C.SET_LOGOUT,
        payload: null
    })
    }
}