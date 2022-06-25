import axios from "axios";
import { url } from './../api';
import { toast } from 'react-toastify';

const setLoading = (message) => ({
    type : 'SET_USERS_LOADING',
    payload : message
}) 

const setUsers = (data) => ({
    type : 'GET_USERS',
    payload : data
})

const setAddUser = (data) => ({
    type : "ADD_USER",
    payload : data
})

const setDeleteUser = (id) => ({
    type : "DELETE_USER",
    payload : id
})

const setUpdateUser = (data) => ({
    type : 'UPDATE_USER',
    payload : data
})

export const getUsers = () => async dispatch => {
    dispatch(setLoading(true))
    let resp = await axios.get(`${url}/api/users`);
    dispatch(setUsers(resp.data))
    dispatch(setLoading(false))
}

export const addPasswordToUser = (data) => async dispatch => {
    let userData = { username : data.username , password : data.password }
    await axios.put(`${url}/api/users/add-Password-to-user` , userData).then((newPass) => {
        dispatch(setLoading(true))
        toast.success(newPass.data.message , {position : "bottom-right"})
        dispatch(setUpdateUser(data))
        dispatch(setLoading(false))
    })
}

export const updateUser = (id , data) => async dispatch => {
    await axios.put(`${url}/api/users/${id}` , data).then(() => {
        dispatch(setUpdateUser({id , data}))
    })
}

export const addUser = (data) => async dispatch => {
    await axios.post(`${url}/api/users` , data).then((addData) => {
        dispatch(setAddUser(data))
        toast.success(addData.data , {position : "bottom-right"})
    })
}
export const deleteUser = (id) => async dispatch => {

    await axios.delete(`${url}/api/users/${id}`).then(() => {
        dispatch(setDeleteUser(id))
    }).catch((err) => {
        return err
    })
}