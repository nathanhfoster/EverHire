import C from '../constants.js'
import { combineReducers } from 'redux'

export const currentlocation = (state = {}, action) =>
(action.type === C.SET_CURRENTLOCATION) ? action.payload : state

export default combineReducers({
  currentlocation
})
