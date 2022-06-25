import { TextField } from "@mui/material";
import  {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginIcon from "@mui/icons-material/Login";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { getSignIn } from './../../redux/action/loginAction';
import { Link } from 'react-router-dom';
import { getUsers } from "../../redux/action/UsersAction";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginComp = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector((state) => state.auth.authLoading);
  const users = useSelector((state) => state.users.users);
  const [passwordExist, setPasswordExist] = useState(false)
  let user = users.find(user => user.username === username)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if(username === "") {
      setPasswordExist(true)
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

  
  const handleLogin = (e) => {
    e.preventDefault();
    const user = { username: username, password: password };
    dispatch(getSignIn(user));
  };

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%",
          marginTop: '5rem'
        }}
      >
        <form
          onSubmit={(e) => handleLogin(e)}
          style={{ width: "35%", marginLeft: "auto", marginRight: "auto" }}
        >
          <h1>Login Page</h1>
          <TextField
            style={{ marginTop: "0", marginBottom: "8px" }}
            fullWidth
            required
            type="text"
            variant="standard"
            label="Username"
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
          />
          {!passwordExist ? 
          <>
          <TextField
          style={{ marginTop: "0", marginBottom: "8px" }}
          fullWidth
          required
          disabled
          type={'password'}
          variant="standard"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
        />
        <p style={{margin: '0', marginBottom: '1rem', color: 'red'}}>This user does not have a password! <br/>
        <Link to="create-password">Press to Create Password</Link>
        </p>
        </>
        :
          <div>
            <TextField
              fullWidth
              required  
              sx={{ marginTop: "0", marginBottom: "8px"}}
              type={showPassword ? 'text' : 'password'}
              variant="standard"
              label="Password"
              value={password}
              InputProps={{endAdornment: 
              <IconButton onClick={showPassword ? () =>  setShowPassword(false) : () =>   setShowPassword(true)}>
                { showPassword ? <VisibilityOff/> : <Visibility/> }
              </IconButton>}}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
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
            Send
          </LoadingButton>
        </form>
        <div style={{marginTop : "1rem"}}>
        {passwordExist && <Link to="create-password">New User ? Create Password</Link>}
      </div>
      <div style={{border: '1px solid black', margin: '1rem', width: '50%', marginLeft: 'auto', marginRight: 'auto'}}>
        <h3>Login details for system testing</h3>
        <h4>Username : admin-project</h4>
        <h4>Password : 123456789</h4>
        <p style={{color : "blue"}}>You can do whatever you want in the system, enjoy!</p>
      </div>
      </div>
    </div>
  );
};

export default LoginComp;
