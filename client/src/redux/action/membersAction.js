import axios from "axios";
import { url } from './../api';
import { toast } from 'react-toastify';

const setLoading = (message) => ({
    type : 'SET_MEMBERS_LOADING',
    payload : message
}) 

const setMembers = (data) => ({
    type : 'GET_MEMBERS',
    payload : data
})

const setAddMember = (data) => ({
    type : "ADD_MEMBER",
    payload : data
})

const setDeleteMember = (id) => ({
    type : "DELETE_MEMBER",
    payload : id
})

const setUpdateMember = (data) => ({
    type : 'UPDATE_MEMBER',
    payload : data
})

const setDeleteSubs = (data) => ({
    type : 'DELETE_SUBSCRIPTION',
    payload : data
})


export const getMembers = () => async dispatch => {
    dispatch(setLoading(true))
    let resp = await axios.get(`${url}/api/subscriptions`);
    dispatch(setMembers(resp.data))
    dispatch(setLoading(false))
}

export const updateMember = (id , data) => async dispatch => {
    await axios.put(`${url}/api/subscriptions/${id}` , data).then(() => {
        dispatch(setUpdateMember({id , data}))
    })
}

export const addMember = (data) => async dispatch => {
    await axios.post(`${url}/api/subscriptions` , data).then((addData) => {
        dispatch(setAddMember(data))
        toast.success("Member Added Successfully!" , {position : "bottom-right"})
    })
}
export const deleteMemberAction = (id) => async dispatch => {
    await axios.delete(`${url}/api/subscriptions/${id}`).then(() => {
        dispatch(setDeleteMember(id))
        toast.success("Member has Deleted!" , {position : "bottom-right"})
    }).catch((err) => {
        return err
    })
}

export const addMovieSubs = (id , arr) => async dispatch => {
    await axios.put(`${url}/api/subscriptions/new-movie-subs/${id}`, arr).then(((data) => {
        dispatch(setUpdateMember({id , data}))
    }))
}

export const deleteMovieSubs = (id , arr , movies) => async dispatch => {
    let objectId = arr.ObjectId
    const filteredMovies = movies.filter((movie) => movie._id !== objectId);
    await axios.put(`${url}/api/subscriptions/del-movie-subs/${id}` , { MovieId : arr.MovieId }).then(() => {
        dispatch(setDeleteSubs({memberId : id , filteredMovies}))
    })
}