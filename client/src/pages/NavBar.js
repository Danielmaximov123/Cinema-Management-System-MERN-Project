import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLogOut } from '../redux/action/loginAction';
import { getMovies } from '../redux/action/MoviesAction';
import { getMembers } from './../redux/action/membersAction';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';

const NavBarComp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector( state => state.auth )
    const [anchorElNav, setAnchorElNav] = useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    
    const logOut = (e) => {
        e.preventDefault()
        dispatch(getLogOut())
        navigate('/')
    }

    useEffect(() => {
      dispatch(getMovies())
      dispatch(getMembers())
  },[dispatch])

    const movies = (e) => {
      e.preventDefault()
      dispatch(getMovies()).then(() => {
        navigate('/movies')
      })
    }

    const subscriptions = (e) => {
      e.preventDefault()
      dispatch(getMembers()).then(() => {
        navigate('/Subscriptions')
      })
    }
    

  return (
    <div>
        <AppBar position="static" style={{backgroundColor: '#e7e3e3' , position: 'relative', width: '100%', height: '100%'}}>
          <Container maxWidth="xl">
          <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{cursor : "pointer", color : "black"}}
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            onClick={()=> navigate("/")}
          >
            Cinema Movies
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large"  aria-label="account of current user" aria-controls="menu-appbar"  aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon/>
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left'}}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            </Menu>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            
                <MenuItem onClick={handleCloseNavMenu}>
                {auth?.permissions?.View_Movies ? <Typography onClick={movies} textAlign="center">Movies</Typography> : null}
                {auth?.permissions?.View_Subscriptions ? <Typography onClick={subscriptions} textAlign="center">Subscriptions</Typography> : null}
                {auth?.SysAdmin ? <Typography onClick={()=> navigate("/UsersManagement")} textAlign="center">Users Management</Typography> : null }
                </MenuItem>
                
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

              { auth?.permissions?.View_Movies ? <MenuItem onClick={movies} sx={{ my: 2, color: 'black', display: 'block' }}>Movies</MenuItem> : null}
              { auth?.permissions?.View_Subscriptions ? <MenuItem onClick={subscriptions} sx={{ my: 2, color: 'black', display: 'block' }}>Subscriptions</MenuItem> : null}
              { auth?.SysAdmin ? <MenuItem onClick={()=> navigate("/UsersManagement")} sx={{ my: 2, color: 'black', display: 'block' }}>Users Management</MenuItem> : null}

          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Cinema Movies
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Log Out">
              <IconButton onClick={logOut} sx={{ p: 0 }}>
                <LogoutIcon/>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  )
}

export default NavBarComp