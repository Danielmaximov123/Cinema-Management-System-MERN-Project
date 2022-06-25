import axios from "axios";
import { toast } from 'react-toastify';
import { url } from './../api';


const setLoading = (message) => ({
    type : 'SET_MOVIES_LOADING',
    payload : message
}) 

const setMovies = (data) => ({
    type : 'GET_MOVIES',
    payload : data
})

const setAddMovie = (data) => ({
    type : "ADD_MOVIE",
    payload : data
})

const setDeleteMovie = (id) => ({
    type : "DELETE_MOVIE",
    payload : id
})

const setMoviesSubs = (data) => ({
    type : "GET_MOVIES_FOR_SUBS",
    payload : data
})

const setUpdateMovie = (data) => ({
    type : 'UPDATE_MOVIE',
    payload : data
})

export const getMovies = () => async dispatch => {
    dispatch(setLoading(true))
    await axios.get(`${url}/api/movies`).then((resp) => {
        dispatch(setMovies(resp.data))
    })
    dispatch(setLoading(false))
} 
export const getMoviesForSubs = () => async dispatch => {
    await axios.get(`${url}/api/movies/movies-for-subscribe`).then((resp) => {
        dispatch(setMoviesSubs(resp.data))
    })
} 

export const addMovie = (data) => async dispatch => {
    dispatch(setLoading(true))
    await axios.post(`${url}/api/movies` , data).then((addData) => {
        dispatch(setAddMovie(data))
        toast.success(addData.data , {position : "bottom-right"})
    })
    dispatch(setLoading(true))
}
export const deleteMovies = (id) => async dispatch => {
    await axios.delete(`${url}/api/movies/${id}`).then((deleteData) => {
        toast.success(deleteData.data , {position : "bottom-right"})
        dispatch(setDeleteMovie(id))
    }).catch((err) => {
        return err
    })
}

export const updateMovie = (id ,data) => async dispatch => {
    await axios.put(`${url}/api/movies/${id}` , data).then(() => {
        dispatch(setUpdateMovie({id , data}))
        toast.success('The Movie is Updated' , {position : "bottom-right"})
    })
}

export const addSubsMovie = (id , arr) => async dispatch => {
    await axios.put(`${url}/api/movies/new-sub-movie/${id}`, arr).then(((data) => {
        dispatch(setUpdateMovie({id , data}))
    }))
}

export const deleteSubsMovie = (id , arr) => async dispatch => {
    await axios.put(`${url}/api/movies/sub-del-movie/${id}` , {SubscriptionsId : arr}).then((data) => {
    })
}