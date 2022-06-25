import axios from 'axios'
import { toast } from 'react-toastify';
import { url } from '../api';

const setLoading = (message) => ({
    type : 'LOADING',
    payload : message
})

const setSignIn = (data) => ({
    type : 'SIGN_IN',
    payload : data
})

const setSignOut = () => ({
    type : 'SIGN_OUT',
  })
  
  const setUserLoaded = (data) => ({
    type : 'USER_LOADED',
    payload : data
  })

export const getSignIn = (user) => async dispatch => {
    dispatch(setLoading(true))
    const userData = {username : user.username , password : user.password}
    await axios.post(`${url}/api/users/login` ,userData)
    .then((user) => {
        localStorage.setItem('tokenCinema' , user.data.token)
        dispatch(setSignIn(user.data.token))
        toast.success(user.data.message , {position : "bottom-right"})
    }).catch((err) => {
        dispatch(setLoading(false))
        toast.error(err.response.data.message , {position : "bottom-right"})
    })
    dispatch(setLoading(false))
}

export const LoadUser = () => {
    return (dispatch , getState) => {
        dispatch(setLoading(true))
        const token = getState()?.auth?.token
        dispatch(setLoading(false))
        if(token) {
            dispatch(setUserLoaded(token))
        } else return null
    }
}

export const getLogOut = () => {
    return (dispatch) => {
        dispatch(setSignOut())
    }
}