  import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AllMembersPageComp from './all Members';
import AddMemberComp from './addMember';
import { getMembers } from './../../redux/action/membersAction';
import { Box } from '@mui/system';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';

const MembersPageComp = () => {
    const dispatch = useDispatch()
    const [addMember, setAddMember] = useState(false)
    const [allMembers, setAllMembers] = useState(true)
    const [value, setValue] = useState(0);
    const auth = useSelector( state => state.auth)

    useEffect(() => {
      document.title = "Members"
   }, []);

    useEffect(() => {
      dispatch(getMembers())
    },[dispatch])

    const showAllMembers = (e) => {
      e.preventDefault()
      setAllMembers(true)
      setAddMember(false)
    }

    const showAddMember = (e) => {
      e.preventDefault()
      setAddMember(true)
      setAllMembers(false)
    }

    useEffect(() => {
      if(allMembers === true) {
        setAddMember(false)
      }
    },[allMembers])

    useEffect(() => {
      if(addMember === true) {
        setAllMembers(false)
      }
    },[addMember])

  return (
    <div>
      <div style={{textAlign : "center"}}>
      <h1>Members</h1>
      <Box sx={{ width: 500 ,marginLeft: 'auto', marginRight: 'auto'}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {auth?.permissions?.View_Subscriptions ? <BottomNavigationAction onClick={showAllMembers} label="All Members" icon={<PeopleIcon />} /> : null}
        { auth?.permissions?.Create_Subscriptions ? <BottomNavigationAction onClick={showAddMember}  label="Add Member" icon={<AddIcon />} /> : null}
      </BottomNavigation>
    </Box>
    </div>
        {allMembers && <AllMembersPageComp/>}
        {addMember && <AddMemberComp setAllMembers={setAllMembers} setAddMember={setAddMember}/>}
    </div>
  )
}

export default MembersPageComp