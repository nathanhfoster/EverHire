import C from '../constants.js'
import { combineReducers } from 'redux'

export const Window = (state = {}, action) =>
(action.type === C.SET_WINDOW) ? action.payload : {...state}

export const userLocation = (state = {}, action) =>
(action.type === C.SET_USER_LOCATION) ? action.payload : state

export const postJob = (state = {}, action) =>
(action.type === C.SET_JOB_POST) ? action.payload : state

export default combineReducers({
  Window,
  userLocation,
  postJob
})