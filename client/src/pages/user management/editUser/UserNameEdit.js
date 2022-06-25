import { IconButton, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import  CheckIcon  from '@mui/icons-material/Check';
import  CloseIcon  from '@mui/icons-material/Close';
import { pink } from '@mui/material/colors';
import { updateUser } from '../../../redux/action/UsersAction';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const UserNameEdit = ({setShowUsername , user}) => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState("")
    const users = useSelector( state => state.users.users )

    useEffect(() => {
      setUsername(user.username)
    },[user])
    let filterUsername = users.find(user => user.username === username)

    const changeUsername = (e) => {
        e.preventDefault();
        let data = { userName : username }
        if(username === user.username) {
          toast.error('The username is already set for this user ...' , {position : "bottom-right"})
        }
        else if(filterUsername !== undefined) {
          toast.error('Username already exists ...' , {position : "bottom-right"})
        }
        else if(filterUsername === undefined) {
          dispatch(updateUser(user._id , data)).then(() => {
            setShowUsername(false)
          })
        }
      }

  return (
    <div>
        <div>
          <form onSubmit={changeUsername}>
          <TextField
          id="standard-basic"
          label="Username"
          style={{ marginTop: "0", marginBottom: "8px" }}
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <IconButton style={{marginTop: '0.7rem'}} onClick={changeUsername} variant="outlined">
        <CheckIcon color="success" />
         </IconButton>
        <IconButton style={{marginTop: '0.7rem'}} onClick={() => setShowUsername(false)} variant="outlined">
        <CloseIcon sx={{ color: pink[500] }} />
         </IconButton>
          </form>
        </div>
    </div>
  )
}

export default UserNameEdit