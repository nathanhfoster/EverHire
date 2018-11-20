import C from "../constants";
import { Axios, AxiosForm } from "./Axios";

export const postJob = (token, payload) => {
  return async (dispatch, getState) => await AxiosForm(token, payload)
    .post("jobs/", payload)
    .then(res => {
      let {Jobs} = getState()
      res.data.lat = Number(res.data.lat)
      res.data.lng = Number(res.data.lng)
      Jobs.unshift(res.data)
      dispatch({
        type: C.GET_JOBS,
        payload: Jobs
      });
    })
    .catch(e => console.log(e.response));
  }

export const getJobs = () => 
    async (dispatch, getState) => await Axios().get("jobs/")
        .then(res => {
          for(let i = 0; i < res.data.length; i++) {
            res.data[i].lat = Number(res.data[i].lat)
            res.data[i].lng = Number(res.data[i].lng)
          }
          dispatch({
            type: C.GET_JOBS,
            payload: res.data
          })
    }).catch((e) => console.log(e))

export const getJob = id => 
    async (dispatch) => await Axios().get(`jobs/${id}/`)
        .then(res => {
            dispatch({
                type: C.GET_JOB,
                payload: res.data
            })
    }).catch((e) => console.log(e))
      