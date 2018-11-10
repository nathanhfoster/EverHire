import C from '../constants'
import {Axios} from './Axios'

export const postJob = (token, payload) => (dispatch, getState) => 
async (dispatch) => await Axios(token).post('jobs/', payload)
    .then(res => {
    dispatch({
        type: C.SET_JOB_POST,
        payload: res.data
    })
    }).catch((e) => console.log(e))
