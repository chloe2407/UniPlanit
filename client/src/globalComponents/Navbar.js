import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import useMediaQuery from '@mui/material/useMediaQuery'
import Profile from './Profile'
import NavbarButton from './NavbarButton'
import useAuth from '../context/Auth'
import { StyledMenuItem, NavbarMenu } from './NavbarMenu'

export default function Navbar() {
  const { user, logout, checkLoggedIn } = useAuth() 
  const [friends, setFriends] = useState(false)
  const [anchorElNav, setAnchorElNav] = useState(null)
  const matchMd = useMediaQuery((theme) => theme.breakpoints.up('md'))
  // fake friend data
  const [friendData, _] = useState([...Array(3).keys()])
  // if logged in, request for friend info
  const navigate = useNavigate()

  const handleClick = (e) => {
    // redirect to some page
    // console.log(e)
  }

  // const handleFriends = () => {
  //   // if friends is true we'll set it to false
  //   // if not we will set both auth and friends to true
  //   if (friends) {
  //     setFriends(false)
  //   } else {
  //     setFriends(true)
  //     setAuth(true)
  //   }
  // }

  // const handleLogin = () => {
  //   if (auth) {
  //     setAuth(false)
  //     setFriends(false)
  //   } else {
  //     setAuth(true)
  //   }
  // }
  useEffect(() => {
    checkLoggedIn()
  }, [])

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

  const Profiles = () => {
    if (user && friends) {
      // if user is authenticated and has friends 
      const friendProfiles = friendData.map((v, i) => (
        i === 0 ? <Profile key={i} sx={{ m: 1, ml: 'auto' }} handleClick={handleClick} />
          : <Profile key={i} sx={{ m: 1 }} profileInfo handleClick={handleClick} />

      ))
      // if size is larger than medium, show friends
      return (
        <>
          {matchMd && friendProfiles}
          {matchMd &&
            <Divider sx={{ m: 1, display: { xs: 'none', md: 'flex' } }}
              orientation='vertical' flexItem />}
          <Profile isUser sx={{ ml: matchMd ? 0 : 'auto' }} profileInfo handleClick={handleClick} />
        </>
      )
    }
    else if (user) {
      // if user is authenticated
      return (
        <Profile isUser sx={{ ml: 'auto' }} handleClick={handleClick} />
      )
    } else {
      // if user is not authenticated and screen size is larger than medium
      if (matchMd) {
        return (
          <Box sx={{ ml: 'auto' }}>
            <NavbarButton size='small' href='about' variant='outlined' color='inherit' sx={{ mr: 2 }}>
              About us
            </NavbarButton>
            <NavbarButton size='small' href='login' variant='outlined' color='inherit' sx={{ mr: 2 }}>
              Login
            </NavbarButton>
            <NavbarButton size='small' href='signup' variant='outlined' color='inherit' sx={{ mr: 1 }}>
              Sign Up
            </NavbarButton>
          </Box>
        )
      } else {
        // placeholder
        return <Box sx={{ ml: 'auto', mr: 6 }} />
      }
    }
  }

  const NavMenu = () => {
    // NavMenu changes based on auth

    const NavItems = user ? 
      [
        <StyledMenuItem key='home' onClick={() => handleMenuClick('/')}>Home</StyledMenuItem>,
        <StyledMenuItem key='calendar' onClick={() => handleMenuClick('calendar')}>Go to My Calendar</StyledMenuItem>,
        <StyledMenuItem key='logout' onClick={handleLogout}>Logout</StyledMenuItem>
      ]
      : 
      [
        <StyledMenuItem key='about' onClick={() => handleMenuClick('about')}>About</StyledMenuItem>,
        <StyledMenuItem key='login' onClick={() => handleMenuClick('login')}>Login </StyledMenuItem>,
        <StyledMenuItem key='signup' onClick={() => handleMenuClick('signup')}>Sign Up </StyledMenuItem>
      ]
    return (
      <NavbarMenu id='menu-appbar' anchorElNav={anchorElNav} handleMenuClose={handleMenuClose}>
        {NavItems}
      </NavbarMenu>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <Typography>
        Tool Bar
        <Switch checked={auth} onChange={handleLogin} aria-label='login switch' />
        {auth ? 'Logout' : 'Login'}
        <Switch checked={friends} onChange={handleFriends} aria-label='friends switch' />
        {friends ? 'Hide friends' : 'Show friends'}
      </Typography> */}
      <AppBar position='static'>
        <Toolbar>
          {
            // change order of items in appbar based on screen size
            matchMd ?
              <>
                <Link href='/' variant='h5' color='inherit' underline='none' sx={{ mx: 2 }}>
                  MyCalendar
                </Link>
                <Button variant='text' color='inherit' disableRipple
                  sx={{ fontSize: 16, position: 'absolute', left: '50vh', right: '50vh' }}
                  onClick={() => navigate('/calendar')}
                  >
                  Calendar!
                </Button>
                <Profiles />
              </> :
              <>
                <IconButton size='large' aria-label='nav-menu' aria-controls='menu-appbar' aria-haspopup='true'
                  onClick={e => setAnchorElNav(e.currentTarget)} color='inherit'>
                  <MenuIcon />
                </IconButton>
                <NavMenu />
                <Link onClick={() => navigate('/')} variant='h5' color='inherit'
                  underline='none' sx={{ ml: 'auto' }}>
                  MyCalendar
                </Link>
                <Profiles />
              </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}