import C from '../constants.js'
import { combineReducers } from 'redux'

export const Window = (state = {}, action) =>
(action.type === C.SET_WINDOW) ? action.payload : {...state}

export const userLocation = (state = {}, action) =>
(action.type === C.SET_USER_LOCATION) ? action.payload : state

export const User = (state = {}, action) =>
(action.type === C.SET_LOGIN_TOKEN) ? action.payload : (action.type === C.SET_LOGOUT) ? {} : state

export const Jobs = (state = {}, action) =>
(action.type === C.GET_JOBS) ? action.payload : state

export default combineReducers({
  User,
  Window,
  userLocation,
  Jobs
})