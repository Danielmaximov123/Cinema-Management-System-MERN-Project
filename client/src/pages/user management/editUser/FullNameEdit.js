import { IconButton, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import  CheckIcon  from '@mui/icons-material/Check';
import  CloseIcon  from '@mui/icons-material/Close';
import { pink } from '@mui/material/colors';
import { updateUser } from '../../../redux/action/UsersAction';

const UserFullNameEdit = ({setShowFullName , user}) => {
  const dispatch = useDispatch()
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")

  useEffect(() => {
    setFname(user.fname)
    setLname(user.lname)
  },[user])

  const changeFullName = (e) => {
      e.preventDefault();
      let data = { fname : fname , lname : lname }
      dispatch(updateUser(user._id , data)).then(() => {
        setShowFullName(false)
      })
    }

  return (
    <div>
        <div>
          <form onSubmit={changeFullName}>
          <TextField
          id="standard-basic"
          label="First Name"
          style={{ marginTop: "0", marginBottom: "8px" , marginRight : "1rem" , width: '30%'}}
          variant="standard"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Last Name"
          style={{ marginTop: "0", marginBottom: "8px" , width: '30%' }}
          variant="standard"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
        <IconButton type='submit' style={{marginTop: '0.7rem'}} onClick={changeFullName} variant="outlined">
        <CheckIcon color="success" />
         </IconButton>
        <IconButton style={{marginTop: '0.7rem'}} onClick={() => setShowFullName(false)} variant="outlined">
        <CloseIcon sx={{ color: pink[500] }} />
         </IconButton>
          </form>
        </div>
    </div>
  )
}

export default UserFullNameEdit