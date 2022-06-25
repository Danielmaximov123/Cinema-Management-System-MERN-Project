import { Checkbox, IconButton, ListItemText } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import  CheckIcon  from '@mui/icons-material/Check';
import  CloseIcon  from '@mui/icons-material/Close';
import { pink } from '@mui/material/colors';
import { updateUser } from '../../../redux/action/UsersAction';

const UserPermissionsEdit = ({setShowPermissions , user}) => {
    const dispatch = useDispatch()
    const [viewMovies, setViewMovies] = useState(false)
    const [createMovies, setCreateMovies] = useState(false)
    const [updateMovies, setUpdateMovies] = useState(false)
    const [deleteMovies, setDeleteMovies] = useState(false)
    const [viewSubscriptions, setViewSubscriptions] = useState(false)
    const [createSubscriptions, setCreateSubscriptions] = useState(false)
    const [updateSubscriptions, setUpdateSubscriptions] = useState(false)
    const [deleteSubscriptions, setDeleteSubscriptions] = useState(false)

    useEffect(() => {
      setViewMovies(user.permissions.View_Movies)
      setCreateMovies(user.permissions.Create_Movies)
      setUpdateMovies(user.permissions.Update_Movies)
      setDeleteMovies(user.permissions.Delete_Movies)
      setViewSubscriptions(user.permissions.View_Subscriptions)
      setCreateSubscriptions(user.permissions.Create_Subscriptions)
      setUpdateSubscriptions(user.permissions.Update_Subscriptions)
      setDeleteSubscriptions(user.permissions.Delete_Subscriptions)
    },[user])

    let perm = 
    viewMovies === true && 
    createMovies === true &&
    updateMovies === true &&
    deleteMovies === true &&
    viewSubscriptions === true &&
    createSubscriptions === true &&
    updateSubscriptions === true &&
    deleteSubscriptions === true

    const changePermissionsName = (e) => {
        e.preventDefault();
        let data = { sysAdmin : perm ? true : false ,
          permissions : 
          { View_Movies : viewMovies ,
            Create_Movies : createMovies ,
            Update_Movies : updateMovies ,
            Delete_Movies : deleteMovies ,
            View_Subscriptions : viewSubscriptions ,
            Create_Subscriptions : createSubscriptions ,
            Update_Subscriptions : updateSubscriptions ,
            Delete_Subscriptions : deleteSubscriptions }}
        dispatch(updateUser(user._id , data)).then(() => {
          setShowPermissions(false)
        })
      }


  return (
    <div>
        <div>
          <form onSubmit={changePermissionsName}>
          <div style={{marginBottom : "10px", marginTop: '10px' , display: 'block' , paddingLeft: '5.4rem' , textAlign : "left"}}>
          <ListItemText style={{marginLeft: '1rem'}}>
            View Movies : 
            <Checkbox  checked={viewMovies} onChange={e => setViewMovies(e.target.checked)}/>
            </ListItemText>
            <ListItemText style={{marginLeft: '1rem'}}>
            Create Movie : 
            <Checkbox  checked={createMovies} onChange={e => setCreateMovies(e.target.checked)}/>
            </ListItemText>
            <ListItemText style={{marginLeft: '1rem'}}>
            Update Movie : 
            <Checkbox  checked={updateMovies} onChange={e => setUpdateMovies(e.target.checked)}/>
            </ListItemText>
            <ListItemText style={{marginLeft: '1rem'}}>
            Delete Movie : 
            <Checkbox  checked={deleteMovies} onChange={e => setDeleteMovies(e.target.checked)}/>
            </ListItemText>
            <ListItemText style={{marginLeft: '1rem'}}>
            View Subscriptions : 
            <Checkbox  checked={viewSubscriptions} onChange={e => setViewSubscriptions(e.target.checked)}/>
            </ListItemText>
            <ListItemText style={{marginLeft: '1rem'}}>
            Create Subscriptions : 
            <Checkbox  checked={createSubscriptions} onChange={e => setCreateSubscriptions(e.target.checked)}/>
            </ListItemText>
            <ListItemText style={{marginLeft: '1rem'}}>
            Update Subscriptions : 
            <Checkbox  checked={updateSubscriptions} onChange={e => setUpdateSubscriptions(e.target.checked)}/>
            </ListItemText>
            <ListItemText style={{marginLeft: '1rem'}}>
            Delete Subscriptions : 
            <Checkbox  checked={deleteSubscriptions} onChange={e => setDeleteSubscriptions(e.target.checked)}/>
            </ListItemText>

        </div>
        <IconButton style={{marginTop: '0.7rem'}} onClick={changePermissionsName} variant="outlined">
        <CheckIcon color="success" />
         </IconButton>
        <IconButton style={{marginTop: '0.7rem'}} onClick={() => setShowPermissions(false)} variant="outlined">
        <CloseIcon sx={{ color: pink[500] }} />
         </IconButton>
          </form>
        </div>
    </div>
  )
}

export default UserPermissionsEdit