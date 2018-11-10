import C from '../constants'
import {Axios} from './Axios'

export const postJob = payload => (dispatch, getState) => 
async (dispatch) => await Axios().post('jobs/')
    .then(res => {
    dispatch({
        type: C.SET_JOB_POST,
        payload: res.data
    })
    }).catch((e) => console.log(e))
