import { IconButton, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import  CheckIcon  from '@mui/icons-material/Check';
import  CloseIcon  from '@mui/icons-material/Close';
import { pink } from '@mui/material/colors';
import { updateMember } from '../../../redux/action/membersAction';

const MemberNameEdit = ({setShowMemberName , member}) => {
    const dispatch = useDispatch()
    const [memberName, setMemberName] = useState("");

    useEffect(() => {
      setMemberName(member.Name)
    },[member])

    const changeMemberName = (e) => {
        e.preventDefault();
        let data = { name : memberName , email : member.Email , city : member.City }
        dispatch(updateMember(member._id , data)).then(() => {
          setShowMemberName(false)
        })
      }

  return (
    <div>
        <div>
          <form onSubmit={changeMemberName}>
          <TextField
          id="standard-basic"
          label="Name"
          style={{ marginTop: "0", marginBottom: "8px" }}
          variant="standard"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
        />
        <IconButton style={{marginTop: '0.7rem'}} onClick={changeMemberName} variant="outlined">
        <CheckIcon color="success" />
         </IconButton>
        <IconButton style={{marginTop: '0.7rem'}} onClick={() => setShowMemberName(false)} variant="outlined">
        <CloseIcon sx={{ color: pink[500] }} />
         </IconButton>
          </form>
        </div>
    </div>
  )
}

export default MemberNameEdit