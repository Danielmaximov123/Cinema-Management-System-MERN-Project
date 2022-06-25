import jwtDecode from "jwt-decode";

const initialState = {
    token : localStorage.getItem('tokenCinema'),
    authLoading : false,
    fname : null,
    lname : null,
    username : null, 
    SysAdmin : null,
    createDate : null,
    permissions : {
        View_Movies: null,
        Create_Movies: null,
        Update_Movies: null,
        Delete_Movies: null,
        View_Subscriptions: null,
        Create_Subscriptions: null,
        Update_Subscriptions: null,
        Delete_Subscriptions: null
    },
    id : null
}

const LoginReduces = (state = initialState , action) => {
    switch(action.type) {
        case 'SIGN_IN' :
            const userSignIn = jwtDecode(action.payload)
                setTimeout(() => {
                localStorage.removeItem("tokenCinema")
            }, userSignIn.sessionTimeOut)
        return {...initialState,
                   token : action.payload,
                   username : userSignIn.username,
                   fname : userSignIn.fname,
                   lname : userSignIn.lname,
                   SysAdmin : userSignIn.sysAdmin,
                   createDate : userSignIn.createDate,
                   permissions : {
                    View_Movies: userSignIn.permissions.View_Movies,
                    Create_Movies: userSignIn.permissions.Create_Movies,
                    Update_Movies: userSignIn.permissions.Update_Movies,
                    Delete_Movies: userSignIn.permissions.Delete_Movies,
                    View_Subscriptions: userSignIn.permissions.View_Subscriptions,
                    Create_Subscriptions: userSignIn.permissions.Create_Subscriptions,
                    Update_Subscriptions: userSignIn.permissions.Update_Subscriptions,
                    Delete_Subscriptions: userSignIn.permissions.Delete_Subscriptions
                   },
                   id : userSignIn.id
        }
        case 'USER_LOADED' :
            const user = jwtDecode(action.payload)
        return {...initialState,
                   token : action.payload,
                   username : user.username,
                   fname : user.fname,
                   lname : user.lname,
                   SysAdmin : user.sysAdmin,
                   createDate : user.createDate,
                   permissions : {
                    View_Movies: user.permissions.View_Movies,
                    Create_Movies: user.permissions.Create_Movies,
                    Update_Movies: user.permissions.Update_Movies,
                    Delete_Movies: user.permissions.Delete_Movies,
                    View_Subscriptions: user.permissions.View_Subscriptions,
                    Create_Subscriptions: user.permissions.Create_Subscriptions,
                    Update_Subscriptions: user.permissions.Update_Subscriptions,
                    Delete_Subscriptions: user.permissions.Delete_Subscriptions
                },
                   id : user.id
        }
        case "SIGN_OUT":
        localStorage.removeItem("tokenCinema");
        return {
          token: null,
          fname : null,
          lname : null,
          SysAdmin : null,
          createDate : null,
          permissions : [{
            View_Movies: null,
            Create_Movies: null,
            Update_Movies: null,
            Delete_Movies: null,
            View_Subscriptions: null,
            Create_Subscriptions: null,
            Update_Subscriptions: null,
            Delete_Subscriptions: null
        }],
          id: null,
        };
        case  'LOADING' :
            state = { ...state, authLoading : action.payload }
            return state
    default :
        return state;
    }
}

export default LoginReduces