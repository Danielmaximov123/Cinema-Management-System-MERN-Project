import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { LoadUser } from '../redux/action/loginAction';
import HomePageComp from './Home';
import MoviesPageComp from './movies/movies_main';
import { ToastContainer } from "react-toastify";  
import 'react-toastify/dist/ReactToastify.css'
import NavBarComp from './NavBar';
import MembersPageComp from './subscription/members_main';
import UsersManagementComp from './user management/Users_main';
import LoginComp from './auth/login';
import CreatePasswordComp from './auth/create password';

const MainPageComp = () => {
    const dispatch = useDispatch()
    const { auth } = useSelector( state => state )

  useEffect(() => {
        dispatch(LoadUser());
  }, [dispatch]);

  return (
    <div>
        { auth?.token ? <NavBarComp/>  : null}
        <ToastContainer autoClose={2000}/>
        <Routes>
            <Route path="/"  element={auth?.token ? <HomePageComp /> : <Navigate to="/login" />}/>
            <Route path="/Movies" element={auth?.token ? <MoviesPageComp/> : <Navigate to="/login"/>}/>
            <Route path="/login" element={!auth?.token ? <LoginComp /> : <Navigate to="/" />}/>
            <Route path="/login/create-password" element={!auth?.token ? <CreatePasswordComp /> : <Navigate to="/" />}/>
            <Route path='/Subscriptions' element={!auth?.token ? <Navigate to="/"/> : <MembersPageComp/>}/>
            <Route path="/UsersManagement" element={auth?.token ? <UsersManagementComp/> : <Navigate to="/"/>} />
        </Routes>
    </div>
  )
}

export default MainPageComp
