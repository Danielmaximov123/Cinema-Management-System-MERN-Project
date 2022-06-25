import { IconButton, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import  CheckIcon  from '@mui/icons-material/Check';
import  CloseIcon  from '@mui/icons-material/Close';
import { pink } from '@mui/material/colors';
import { updateMember } from '../../../redux/action/membersAction';

const MemberCityEdit = ({setShowMemberCity , member}) => {
    const dispatch = useDispatch()
    const [memberCity, setMemberCity] = useState("");

    useEffect(() => {
      setMemberCity(member.City)
    },[member])

    const changeCityName = (e) => {
        e.preventDefault();
        let data = { name : member.Name , email : member.Email , city : memberCity }
        dispatch(updateMember(member._id , data)).then(() => {
          setShowMemberCity(false)
        })
      }

  return (
    <div>
        <div>
          <form onSubmit={changeCityName}>
          <TextField
          id="standard-basic"
          label="Name"
          style={{ marginTop: "0", marginBottom: "8px" }}
          variant="standard"
          value={memberCity}
          onChange={(e) => setMemberCity(e.target.value)}
        />
        <IconButton style={{marginTop: '0.7rem'}} onClick={changeCityName} variant="outlined">
        <CheckIcon color="success" />
         </IconButton>
        <IconButton style={{marginTop: '0.7rem'}} onClick={() => setShowMemberCity(false)} variant="outlined">
        <CloseIcon sx={{ color: pink[500] }} />
         </IconButton>
          </form>
        </div>
    </div>
  )
}

export default MemberCityEdit