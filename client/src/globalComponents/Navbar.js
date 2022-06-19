import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import useMediaQuery from '@mui/material/useMediaQuery'
import Profile from './Profile'
import NavbarButton from './NavbarButton'
import useAuth from '../context/Auth'
import FriendProfile from './FriendProfile'
import AddFriend from './AddFriend'
import OverflowIcon from './OverflowIcon'
import { StyledMenuItem, NavbarMenu } from './NavbarMenu'
import { Typography } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close'


export default function Navbar({ handleShowChat }) {
  const { user, logout } = useAuth()
  const [userFriend, setUserFriend] = useState([])
  const [anchorElNav, setAnchorElNav] = useState(null)
  const matchMd = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const [changeFriendCount, setChangeFriendCount] = useState(0)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()
  const openSuccess = Boolean(success)
  const openWarning = Boolean(error)
  // fake friend data
  // if logged in, request for friend info
  const navigate = useNavigate()

  useEffect(() => {
    console.log('fetching')
    fetch('users/friends')
      .then(res => res.json())
      .then(data => {
        if (!data.err) {
          setUserFriend(data)
        }
      })
  }, [user ? null : user, changeFriendCount])

  const handleFriendChange = () => {
    setChangeFriendCount(changeFriendCount + 1)
  }

  const handleClick = (e) => {
    // redirect to some page
    console.log(e)
  }

  const handleLogout = () => {
    logout()
    console.log('Handle Logout')
  }

  const handleMenuClick = (link) => {
    setAnchorElNav(null)
    link && navigate(link)
  }

  const handleMenuClose = () => {
    setAnchorElNav(null)
  }

  const handleSnackbarClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setError(null)
    setSuccess(null)
  }

  const handleSuccessMsg = (msg) => {
    setSuccess(msg)
  }
  
  const handleErrorMsg = (msg) => {
    setError(msg)
  }

  const closeButton =
    <IconButton
      size='small'
      color='inherit'
      onClick={handleSnackbarClose}>
      <CloseIcon fontSize='small' />
    </IconButton>


  const NavProfiles = () => {
    if (matchMd) {
      if (user) {
        return (
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            ml: 'auto'
          }}>
            <AddFriend sx={{ p: 1 }}
              handleFriendChange={val => handleFriendChange(val)}
              handleSuccessMsg={msg => handleSuccessMsg(msg)}
              handleErrorMsg={msg => handleErrorMsg(msg)}
            />
            <Divider
              style={{ backgroundColor: 'white' }}
              sx={{ m: 1 }}
              orientation='vertical' flexItem />
            {
              userFriend.slice(0, 3).map((v, i) => (
                <FriendProfile key={v._id}
                  friendInfo={v}
                  handleFriendChange={(val) => handleFriendChange(val)}
                  handleSuccessMsg={msg => handleSuccessMsg(msg)}
                  handleErrorMsg={msg => handleErrorMsg(msg)}
                  handleShowChat={handleShowChat}
                  sx={{ p: 1 }}
                />
              ))
            }
            {
              userFriend.length - 3 > 0 &&
              <OverflowIcon remainCount={userFriend.length - 3}
                remainFriends={userFriend.slice(3)}
                handleSuccess={handleSuccessMsg}
                handleErrorMsg={handleErrorMsg}
                sx={{ p: 1 }} />
            }
            {
              userFriend.length !== 0 &&
              <Divider
                style={{ backgroundColor: 'white' }}
                sx={{ m: 1 }}
                orientation='vertical' flexItem />
            }
            <Profile
              userInfo={user}
              sx={{ p: 1, ml: userFriend ? 0 : 'auto' }}
              handleClick={handleClick} />
          </Box>
        )
      } else {
        return (
          <>
            <NavbarButton onClick={() => navigate('/login')}>
              <Typography>
                Login
              </Typography>
            </NavbarButton>
            <NavbarButton onClick={() => navigate('/signup')}>
              <Typography>
                Sign Up
              </Typography>
            </NavbarButton>
          </>
        )
      }
    } else {
      if (user) {
        return (
          <>
            <Profile
              userInfo={user}
              sx={{ ml: 'auto' }}
              handleClick={handleClick} />

          </>
        )
      }
    }
  }

  const NavMenu = () => {
    // NavMenu changes based on auth

    const NavItems = user ?
      [
        <StyledMenuItem key='home'
          onClick={() => handleMenuClick('/')}>
          Home
        </StyledMenuItem>,
        <StyledMenuItem key='calendar'
          onClick={() => handleMenuClick('calendar')}>
          Go to Calendar
        </StyledMenuItem>,
        <StyledMenuItem
          key='about'
          onClick={() => handleMenuClick('about')}>
          About us
        </StyledMenuItem>,
        <StyledMenuItem key='logout'
          onClick={handleLogout}>
          Logout
        </StyledMenuItem>
      ]
      :
      [
        <StyledMenuItem
          key='about'
          onClick={() => handleMenuClick('about')}>
          About us
        </StyledMenuItem>,
        <StyledMenuItem
          key='login'
          onClick={() => handleMenuClick('login')}>
          Login </StyledMenuItem>,
        <StyledMenuItem
          key='signup'
          onClick={() => handleMenuClick('signup')}>
          Sign Up
        </StyledMenuItem>
      ]
    return (
      <NavbarMenu id='menu-appbar'
        anchorElNav={anchorElNav}
        handleMenuClose={handleMenuClose}>
        {NavItems}
      </NavbarMenu>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          {
            // change order of items in appbar based on screen size
            matchMd
              ?
              <>
                <Link href='/'
                  variant='h5'
                  color='inherit'
                  underline='none'
                  sx={{ mx: 2 }}>
                  MyCalendar
                </Link>
                <NavbarButton onClick={() => navigate('/calendar')}>
                  <Typography>
                    Calendar
                  </Typography>
                </NavbarButton>
                <NavbarButton
                  key='about'
                  onClick={() => handleMenuClick('about')}>
                  <Typography>
                    About Us
                  </Typography>
                </NavbarButton>
                <NavProfiles />
              </>
              :
              <>
                <IconButton size='large'
                  aria-label='nav-menu'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={e => setAnchorElNav(e.currentTarget)}
                  color='inherit'>
                  <MenuIcon />
                </IconButton>
                <NavMenu />
                <Link href='/'
                  variant='h5'
                  color='inherit'
                  underline='none'
                  sx={{ ml: 'auto' }}>
                  MyCalendar
                </Link>
                <NavProfiles />
              </>
          }
        </Toolbar>
      </AppBar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openWarning}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
      >
        <Alert action={closeButton}
          severity='error'
          sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
      sx={{ height: '15vh' }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openSuccess}
        onClose={handleSnackbarClose}
        action={
          <>
            <IconButton
              size='small'
              color='inherit'
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </>
        }
        autoHideDuration={3000}
      >
        <Alert action={closeButton}
          severity='success'
          sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  )
}