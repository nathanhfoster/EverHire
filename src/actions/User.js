import C from '../constants'
import {Axios, AxiosForm} from './Axios'
import Cookies from 'js-cookie'

export const updateProfile = (id, token, payload) => {
    return async (dispatch) => await AxiosForm(token, payload).patch(`users/${id}/`, payload)
    .then(res => {
        let {data} = res
        data.token = Cookies.get('User_LoginToken')
        dispatch({
            type: C.SET_LOGIN_TOKEN,
            payload: data
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