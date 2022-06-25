import { IconButton, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import  CheckIcon  from '@mui/icons-material/Check';
import  CloseIcon  from '@mui/icons-material/Close';
import { pink } from '@mui/material/colors';
import { updateMember } from '../../../redux/action/membersAction';

const MemberEmailEdit = ({setShowMemberEmail , member}) => {
    const dispatch = useDispatch()
    const [memberEmail, setMemberEmail] = useState("");

    useEffect(() => {
      setMemberEmail(member.Email)
    },[member])

    const changeMemberEmail = (e) => {
        e.preventDefault();
        let data = { name : member.Name , email : memberEmail , city : member.City }
        dispatch(updateMember(member._id , data)).then(() => {
          setShowMemberEmail(false)
        })
      }

  return (
    <div>
        <div>
          <form onSubmit={changeMemberEmail}>
          <TextField
          id="standard-basic"
          label="Name"
          style={{ marginTop: "0", marginBottom: "8px" }}
          variant="standard"
          value={memberEmail}
          onChange={(e) => setMemberEmail(e.target.value)}
        />
        <IconButton style={{marginTop: '0.7rem'}} onClick={changeMemberEmail} variant="outlined">
        <CheckIcon color="success" />
         </IconButton>
        <IconButton style={{marginTop: '0.7rem'}} onClick={() => setShowMemberEmail(false)} variant="outlined">
        <CloseIcon sx={{ color: pink[500] }} />
         </IconButton>
          </form>
        </div>
    </div>
  )
}

export default MemberEmailEdit