import { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/action/UsersAction';
import { pink } from '@mui/material/colors';
import UserFullNameEdit from './editUser/FullNameEdit';
import UserNameEdit from './editUser/UserNameEdit';
import UserPermissionsEdit from './editUser/PermissionsEdit';
import { useSelector } from 'react-redux';
import { LoadUser } from '../../redux/action/loginAction';

const SingleUserComp = ({user}) => {
    const dispatch = useDispatch()
    const [showFullName, setShowFullName] = useState(false)
    const [showUsername, setShowUsername] = useState(false)
    const [showPermissions, setShowPermissions] = useState(false)
    const auth = useSelector((state) => state.auth);


  const deleteTheUser = (e) => {
    e.preventDefault()
    dispatch(deleteUser(user?._id))
  }

  useEffect(() => {
    dispatch(LoadUser())
  },[dispatch])

  let check = <CheckIcon color="success"/>
  let no_check = <CloseIcon sx={{ color: pink[500] }}/>

  let filterAuthUser = user.username === auth.username

  return (
    <div>
        <div style={{display: 'block', float: 'left', marginLeft: '0.5rem',width: '100%' ,textAlign: 'left'}}>
        {!filterAuthUser && <IconButton onClick={deleteTheUser} color="error" variant="outlined">
        <DeleteIcon />
        </IconButton>}
        </div>
        {!showFullName ? 
        <div style={auth?.permissions.Update_Subscriptions && filterAuthUser ? {marginTop: "1rem" , marginBottom : "10px" , display: '-webkit-inline-box'} : {marginTop: "0rem" , marginBottom : "10px" , display: '-webkit-inline-box'}}>
        <h3 style={{marginBottom: '0px', marginTop: '0'}}>{user?.fname} {user?.lname}</h3>
        <IconButton style={{padding: '0', marginLeft: '0.5rem'}} onClick={setShowFullName} variant="outlined" >
        <EditIcon />
        </IconButton>
        </div>
          :
          <UserFullNameEdit user={user} setShowFullName={setShowFullName}/>
        }
        {!showUsername ? 
        <div style={{marginBottom : "10px" , display: 'block'}}>
        <span>Username : {user?.username}</span>
        <IconButton style={{padding: '0', marginLeft: '0.5rem'}} onClick={setShowUsername} variant="outlined" >
        <EditIcon />
        </IconButton>
        </div> :
         <UserNameEdit user={user} setShowUsername={setShowUsername}/>
        }
        <span>Created Date : {user?.createdDate}</span>
        {!showPermissions ?
        <div style={{marginBottom : "10px", marginTop: '10px' , display: 'block' , paddingLeft: '5.4rem' , textAlign : "left"}}>
          <span>Permissions : </span>
          <IconButton style={{padding: '0', marginLeft: '0.5rem'}} onClick={setShowPermissions} variant="outlined" >
        <EditIcon />
        </IconButton>
            <ListItemText style={{marginLeft: '1rem'}}>
            View Movies : {user.permissions?.View_Movies === true ? check : no_check}
            </ListItemText>
            <ListItemText style={{marginLeft: '1rem'}}>
            Create Movie : {user.permissions?.Create_Movies === true ? check : no_check}
            </ListItemText>
            <ListItemText style={{marginLeft: '1rem'}}>
            Update Movies : {user.permissions?.Update_Movies === true ? check : no_check}
            </ListItemText>
            <ListItemText style={{marginLeft: '1rem'}}>
            Delete Movies : {user.permissions?.Delete_Movies === true ? check : no_check}
            </ListItemText>
            <ListItemText style={{marginLeft: '1rem'}}>
            View Subscriptions : {user.permissions?.View_Subscriptions === true ? check : no_check}
            </ListItemText>
            <ListItemText style={{marginLeft: '1rem'}}>
            Create Subscriptions : {user.permissions?.Create_Subscriptions === true ? check : no_check}
            </ListItemText>
            <ListItemText style={{marginLeft: '1rem'}}>
            Update Subscriptions : {user.permissions?.Update_Subscriptions === true ? check : no_check}
            </ListItemText>
            <ListItemText style={{marginLeft: '1rem'}}>
            Delete Subscriptions : {user.permissions?.Delete_Subscriptions === true ? check : no_check}
            </ListItemText>
            
        </div> :
         <UserPermissionsEdit user={user} setShowPermissions={setShowPermissions}/>
        }
    </div>
  )
}

export default SingleUserComp