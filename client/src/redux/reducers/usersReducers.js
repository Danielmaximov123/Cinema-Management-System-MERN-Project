const initialState = {
    users : [],
    usersLoading : false
}

const usersReduces = (state = initialState , action) => {
    switch(action.type) {
        case 'GET_USERS' :
            state = { ...state , users : action.payload }
        return state
        case 'ADD_USER' :
            state = { ...state, users:[...state.users, action.payload] }
            return state
        case "UPDATE_USER":
            const userUpdate = state.users.find(item => item._id === action.payload.id)
            userUpdate.fname = action.payload.data?.fname === undefined ? userUpdate.fname : action.payload.data.fname
            userUpdate.lname = action.payload.data?.lname === undefined ? userUpdate.lname : action.payload.data.lname
            userUpdate.username = action.payload.data?.userName === undefined ? userUpdate.username : action.payload.data.userName
            userUpdate.password = action.payload.data?.password === undefined ? userUpdate.password : action.payload.data.password
            userUpdate.permissions = action.payload.data?.permissions === undefined ? userUpdate.permissions : action.payload.data.permissions
            state = { ...state, users : state.users.map(user => 
                user._id === action.payload.id ? userUpdate : user
            )}
            return state
        case 'DELETE_USER' :
            state = {...state, users : state.users.filter(user => user._id !== action.payload)}
        return state
        case  'SET_USERS_LOADING' :
            state = { ...state, usersLoading : action.payload }
            return state
    default :
        return state;
    }
}

export default usersReduces