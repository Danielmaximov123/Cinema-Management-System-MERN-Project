import { Button, Checkbox, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from './../../redux/action/UsersAction';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import AddIcon from '@mui/icons-material/Add';


const AddUserComp = ({ showAllUsers }) => {
  const users = useSelector( state => state.users.users )
  const loading = useSelector( state => state.users.usersLoading )
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("")
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [sessionTimeOut, setSessionTimeOut] = useState(0)
  const [selectAll, setSelectAll] = useState(false)
  const [viewMovies, setViewMovies] = useState(false)
  const [createMovies, setCreateMovies] = useState(false)
  const [updateMovies, setUpdateMovies] = useState(false)
  const [deleteMovies, setDeleteMovies] = useState(false)
  const [viewSubscriptions, setViewSubscriptions] = useState(false)
  const [createSubscriptions, setCreateSubscriptions] = useState(false)
  const [updateSubscriptions, setUpdateSubscriptions] = useState(false)
  const [deleteSubscriptions, setDeleteSubscriptions] = useState(false)

  let perm = 
  viewMovies === true && 
  createMovies === true &&
  updateMovies === true &&
  deleteMovies === true &&
  viewSubscriptions === true &&
  createSubscriptions === true &&
  updateSubscriptions === true &&
  deleteSubscriptions === true

  useEffect(() => {
    if(selectAll) {
      setViewMovies(true)
      setCreateMovies(true)
      setUpdateMovies(true)
      setDeleteMovies(true)
      setViewSubscriptions(true)
      setCreateSubscriptions(true)
      setUpdateSubscriptions(true)
      setDeleteSubscriptions(true)
    }
    if(!selectAll) {
      setViewMovies(false)
      setCreateMovies(false)
      setUpdateMovies(false)
      setDeleteMovies(false)
      setViewSubscriptions(false)
      setCreateSubscriptions(false)
      setUpdateSubscriptions(false)
      setDeleteSubscriptions(false)
    }
  },[selectAll])

  const addNewUser = (e) => {
    e.preventDefault();
    let data = {
      userName: userName,
      fname : fname,
      lname: lname,
      sessionTimeOut : sessionTimeOut,
      sysAdmin : perm ? true : false,
      permissions : { View_Movies : viewMovies ,
        Create_Movies : createMovies ,
        Update_Movies : updateMovies ,
        Delete_Movies : deleteMovies ,
        View_Subscriptions : viewSubscriptions ,
        Create_Subscriptions : createSubscriptions ,
        Update_Subscriptions : updateSubscriptions ,
        Delete_Subscriptions : deleteSubscriptions }
    };
    let filterUsername = users.find(user => user.username === userName)
    if(filterUsername !== undefined) {
      toast.error('Username already exists ...' , {position : "bottom-right"})
    }
    else if(filterUsername === undefined) {
      dispatch(addUser(data)).then(() => {
        showAllUsers(true)
      })
    } 
  };

  return (
    <div>
      <form
        onSubmit={(e) => addNewUser(e)}
        style={{ width: "40%", margin: "auto" }}
      >
        <TextField
          fullWidth
          id="standard-basic"
          label="Username"
          style={{ marginTop: "0", marginBottom: "8px" }}
          variant="standard"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          fullWidth
          id="standard-basic"
          label="First Name"
          style={{ marginTop: "0", marginBottom: "8px" }}
          variant="standard"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <TextField
          fullWidth
          id="standard-basic"
          label="Last Name"
          style={{ marginTop: "0", marginBottom: "8px" }}
          variant="standard"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />  
        <TextField
          fullWidth
          id="standard-basic"
          label="Session Time Out"
          type="number"
          style={{ marginTop: "0", marginBottom: "8px" }}
          variant="standard"
          value={sessionTimeOut}
          onChange={(e) => setSessionTimeOut(e.target.value)}
        />  
          <h3>Permissions:</h3>
            {selectAll ? "Unselect All" : "Select All"} <Checkbox  checked={selectAll} onChange={e => setSelectAll(e.target.checked)}/>
            <div>
            View Movies : 
            <Checkbox  checked={viewMovies} onChange={e => setViewMovies(e.target.checked)}/>
            Create Movie : 
            <Checkbox  checked={createMovies} onChange={e => setCreateMovies(e.target.checked)}/>

            Update Movie : 
            <Checkbox  checked={updateMovies} onChange={e => setUpdateMovies(e.target.checked)}/>

            Delete Movie : 
            <Checkbox  checked={deleteMovies} onChange={e => setDeleteMovies(e.target.checked)}/>

            View Subscriptions : 
            <Checkbox  checked={viewSubscriptions} onChange={e => setViewSubscriptions(e.target.checked)}/>

            Create Subscriptions : 
            <Checkbox  checked={createSubscriptions} onChange={e => setCreateSubscriptions(e.target.checked)}/>

            Update Subscriptions : 
            <Checkbox  checked={updateSubscriptions} onChange={e => setUpdateSubscriptions(e.target.checked)}/>

            Delete Subscriptions : 
            <Checkbox  checked={deleteSubscriptions} onChange={e => setDeleteSubscriptions(e.target.checked)}/>

            </div>
        <div style={{ margin: "auto", width: "55%", padding: "1rem" }}>
          <Button
            style={{ marginRight: "5px" }}
            variant="contained"
            color="error"
            onClick={() => showAllUsers(true)}
          >
            Cancel
          </Button>
          <LoadingButton
            size="medium"
            type="submit"
            endIcon={<AddIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            Add new User
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default AddUserComp;
