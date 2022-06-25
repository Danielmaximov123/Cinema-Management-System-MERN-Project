  import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import AddUserComp from './add User';
import AllUsersPageComp from './all Users';
import { Box } from '@mui/system';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';


const UsersManagementComp = () => {
    const [addUser, setAddUser] = useState(false)
    const [allUsers, setAllUsers] = useState(true)
    const [value, setValue] = useState(0);
    const auth = useSelector( state => state.auth)

    useEffect(() => {
      document.title = "Users"
   }, []);

    const showAllUsers = (e) => {
      setAllUsers(true)
      setAddUser(false)
    }

    const showAddUser = (e) => {
      setAddUser(true)
      setAllUsers(false)
    }

    useEffect(() => {
      if(allUsers === true) {
        setAddUser(false)
      }
    },[allUsers])

    useEffect(() => {
      if(addUser === true) {
        setAllUsers(false)
      }
    },[addUser])


  return (
    <div>
      {
        auth?.SysAdmin ? <div>
        <div style={{textAlign : "center"}}>
        <h1>Users Management</h1>
        <Box sx={{ width: 500 ,marginLeft: 'auto', marginRight: 'auto'}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        { auth?.SysAdmin ? <BottomNavigationAction onClick={showAllUsers} label="All Users" icon={<GroupIcon />} /> : null }
        { auth?.SysAdmin ? <BottomNavigationAction onClick={showAddUser}  label="Add User" icon={<AddIcon />} /> : null }
      </BottomNavigation>
    </Box>
      </div>
          {allUsers && <AllUsersPageComp/>}
          {addUser && <AddUserComp showAllUsers={showAllUsers} showAddUser={showAddUser}/>}
      </div> : "You do not have permission to use this page"
      }
    </div>
  )
}

export default UsersManagementComp