import C from '../constants'
import {Axios} from './Axios'
import qs from 'qs'

export const postJob = (token, payload) => 
async (dispatch) => await Axios(token).post('jobs/', qs.stringify(payload))
    .then(res => {
        console.log(res)
    dispatch({
        type: C.SET_JOB_POST,
        payload: res.data
    })
    }).catch((e) => console.log(e))