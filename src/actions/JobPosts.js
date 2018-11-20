import C from '../constants'
import {Axios} from './Axios'
import qs from 'qs'

export const postJob = (token, payload) => 
async (dispatch) => await Axios(token).post('jobs/', qs.stringify(payload))
    .then(res => {
    dispatch({
        type: C.SET_JOB_POST,
        payload: res.data
    })
    dispatch({
        type: C.SET_API_RESPONSE,
        payload: res
    })
    }).catch((e) => dispatch({
        type: C.SET_API_RESPONSE,
        payload: e.response
    }))

export const getJobs = () => 
    async (dispatch) => await Axios().get("jobs/")
        .then(res => {
            dispatch({
            type: C.GET_JOBS,
            payload: res.data
            })
    }).catch((e) => console.log(e))
      