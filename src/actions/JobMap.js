// import axios from 'axios'
// import { setSearchResults, setDetailResults } from '../actions.js'
import { userLocation } from '../actions.js'
import C from '../constants.js'
const ROOT_URL = "http://127.0.0.1:5000"

export function getUserLocation() {
  console.log("getUserLocation: ");
  window.store.dispatch(userLocation())
  //window.store.dispatch(window.store.getState())
}

// export function showHotelRooms(id) {
//     console.log("id: ", id)
//     const request = axios.get(`${ROOT_URL}/api/hotel/`+ id)
//     .then(function (response) {
//         console.log("response.data: ", response.data)
//         window.store.dispatch(setDetailResults(response.data))
//     })
//     .catch(function (error) {
//     console.log(error);
//   });
//     return { }
// }