import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginIcon from "@mui/icons-material/Login";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { getSignIn } from "../../redux/action/loginAction";
import { Link } from "react-router-dom";
import { addPasswordToUser, getUsers } from "./../../redux/action/UsersAction";

const CreatePasswordComp = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.usersLoading);
  const [passwordExist, setPasswordExist] = useState(false)

  let user = users.find(user => user.username === username)

  useEffect(() => {
    if(username === "") {
      setPasswordExist(false)
      }
    else if(user?.password !== "") {
        setPasswordExist(true)
      }
    else if(user?.password === "") {
        setPasswordExist(false)
      }
  },[user])

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleNewPassword = (e) => {
    e.preventDefault();
    const userData = { id : user._id,  username, password };
    dispatch(addPasswordToUser(userData)).then(() => {
      const user = { username: username, password: password };
      dispatch(getSignIn(user))
    })
  };

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%",
          marginTop: "5rem",
        }}
      >
        <form
          onSubmit={(e) => handleNewPassword(e)}
          style={{ width: "35%", marginLeft: "auto", marginRight: "auto" }}
        >
          <h1>New Password</h1>
          <TextField
            style={{ marginTop: "0", marginBottom: "8px" }}
            fullWidth
            required
            type="text"
            variant="standard"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {passwordExist ? 
          <>
          <TextField
          style={{ marginTop: "0", marginBottom: "8px" }}
          fullWidth
          required
          disabled
          type="text"
          variant="standard"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p style={{margin: '0', marginBottom: '1rem', color: 'red'}}>This user already has a password or the user does not exist, please contact your system administrator.</p>
        </>
        :
        <TextField
            style={{ marginTop: "0", marginBottom: "8px" }}
            fullWidth
            required  
            type="text"
            variant="standard"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          }
          <LoadingButton
            size="small"
            type="submit"
            fullWidth
            endIcon={<LoginIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            Create New Password
          </LoadingButton>
        </form>
        <div style={{ marginTop: "1rem" }}>
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </div>
  );
};

export default CreatePasswordComp;
