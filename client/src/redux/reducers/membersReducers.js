const initialState = {
    members : [],
    membersLoading : false
}

const subscriptionsReduces = (state = initialState , action) => {
    switch(action.type) {
        case 'GET_MEMBERS' :
            state = { ...state , members : action.payload }
        return state
        case 'ADD_MEMBERS' :
            state = { ...state, members : [...action.payload]}
            return state
        case "UPDATE_MEMBER":
            let memberUpdate = state.members.find(item => item._id === action.payload.id)
            memberUpdate.Name = action.payload.data.name === undefined ? memberUpdate.Name : action.payload.data.name
            memberUpdate.Email = action.payload.data.email === undefined ? memberUpdate.Email : action.payload.data.email
            memberUpdate.City = action.payload.data.city === undefined ? memberUpdate.City : action.payload.data.city
            memberUpdate.Movies = action.payload.data.data === undefined ? memberUpdate.Movies : action.payload.data.data
            state = { ...state, members : state.members.map(member => 
                member._id === action.payload.id ? memberUpdate : member
            )}
            return state
        case 'DELETE_SUBSCRIPTION' :
            const getMember = state.members.find((member) => member._id === action.payload.memberId);
            getMember.Movies = action.payload.filteredMovies;
              state = { ...state, members : state.members.map((member) =>
                  member._id === action.payload.memberId ? getMember : member
            )};
              return state;
        case 'DELETE_MEMBER' :
            state = {...state, members : state.members.filter(member => member._id !== action.payload)}
        return state
        case  'SET_MEMBERS_LOADING' :
            state = { ...state, membersLoading : action.payload }
            return state
    default :
        return state;
    }
}

export default subscriptionsReduces