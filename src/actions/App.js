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

export const getUser = id => {
    return async (dispatch) => await Axios().get(`users/${id}/`)
       .then(res => {
         dispatch({
           type: C.GET_USER,
           payload: res.data
         })
       }).catch((e) => console.log(e))
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
    return (dispatch, getState) => {
        let {Jobs} = getState()
        let newJobs
        if(Jobs.length > 0 && Jobs[0].id !== 'Me') Jobs.unshift({id: 'Me', lat: latitude, lng: longitude})

        dispatch({
            type: C.SET_USER_LOCATION,
            payload: {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp} 
        }),
        dispatch({
            type: C.GET_JOBS,
            payload: Jobs
        })
    }
}

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