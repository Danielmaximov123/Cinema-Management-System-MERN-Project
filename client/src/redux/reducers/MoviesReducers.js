const initialState = {
    movies : [],
    moviesLoading : false
}

const moviesReduces = (state = initialState , action) => {
    switch(action.type) {
        case 'GET_MOVIES' :
            state = { ...state , movies : action.payload }
        return state
        case 'GET_MOVIES_FOR_SUBS' :
            state = { ...state , moviesSubs : action.payload }
        return state
        case 'ADD_MOVIES' :
            state = { ...state, movies : [...action.payload]   }
        return state
        case 'DELETE_MOVIE' :
            state = {...state, movies : state.movies.filter(movie => movie._id !== action.payload)}
        return state
        case "UPDATE_MOVIE":
            let movieUpdate = state.movies.find(item => item._id === action.payload.id)
            movieUpdate.Name = action.payload.data.name === undefined ? movieUpdate.Name : action.payload.data.name
            movieUpdate.Premiered = action.payload.data.premiered === undefined ? movieUpdate.Premiered : action.payload.data.premiered
            movieUpdate.Image = action.payload.data.image === undefined ? movieUpdate.Image : action.payload.data.image
            movieUpdate.Genres = action.payload.data.genres === undefined ? movieUpdate.Genres : action.payload.data.genres
            state = { ...state, movies : state.movies.map(movie => 
                movie._id === action.payload.id ? movieUpdate : movie
            )}
            return state;
        case  'SET_MOVIES_LOADING' :
            state = { ...state, moviesLoading : action.payload }
            return state
    default :
        return state;
    }
}

export default moviesReduces