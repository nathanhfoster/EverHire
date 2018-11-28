import C from "../constants";
import { Axios, AxiosForm } from "./Axios";
import qs from "query-string";

export const postJob = (token, payload) => {
  return async (dispatch, getState) =>
    await AxiosForm(token, payload)
      .post("jobs/", payload)
      .then(results => {
        Axios()
        .get("jobs/")
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
          res.data[i].lat = Number(res.data[i].lat);
          res.data[i].lng = Number(res.data[i].lng);
        }
      dispatch({
        type: C.GET_JOBS,
        payload: res.data
      });
    })
      })
      .catch(e =>
        dispatch({
          type: C.SET_API_RESPONSE,
          payload: e.response
        })
      );
};

export const getJobs = () => async (dispatch) =>
  await Axios()
    .get("jobs/")
    .then(res => {
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].lat = Number(res.data[i].lat);
        res.data[i].lng = Number(res.data[i].lng);
      }
      dispatch({
        type: C.GET_JOBS,
        payload: res.data
      });
    })
    .catch(e => console.log(e));

export const getJob = id => async dispatch =>
  await Axios()
    .get(`jobs/${id}/`)
    .then(res => {
      dispatch({
        type: C.GET_JOB,
        payload: res.data
      });
    })
    .catch(e => console.log(e));

export const updateJob = (id, token, payload) => {
  return async (dispatch, getState) => await  AxiosForm(token, payload).patch(`jobs/${id}/`, payload)
  .then(res => {
    let {Jobs} = getState()
    const updatedIndex = Jobs.findIndex(i => i.id === res.data.id)
    Jobs[updatedIndex] = res.data
    dispatch ({
      type: C.GET_JOB,
      payload: res.data
      })
      dispatch({
        type: C.GET_JOBS,
        payload: Jobs
      })
      dispatch({
        type: C.SET_API_RESPONSE,
        payload: res
      })
  }).catch((e) => dispatch({
      type: C.SET_API_RESPONSE,
      payload: e.response
    }))
}
