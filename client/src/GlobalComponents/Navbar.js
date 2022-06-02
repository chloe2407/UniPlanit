import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Divider from '@mui/material/Divider'
import useMediaQuery from '@mui/material/useMediaQuery'
import Profile from './Profile'

export default function Navbar() {
  const [auth, setAuth] = useState(false)
  const [friends, setFriends] = useState(false)
  const [anchorElNav, setAnchorElNav] = useState(null)
  const matchMd = useMediaQuery((theme) => theme.breakpoints.up('md'))
  // fake friend data
  const [friendData, _] = useState([...Array(3).keys()])
  // if logged in, request for friend info
  const navigate = useNavigate()
  useEffect(() => {
    //fetch
    console.log('fetching')
  }, [])

  const handleClick = (e) => {
    // redirect to some page
    console.log(e)
  }

  const handleFriends = () => {
    // if friends is true we'll set it to false
    // if not we will set both auth and friends to true
    if (friends) {
      setFriends(false)
    } else {
      setFriends(true)
      setAuth(true)
    }
  }

  const handleLogin = () => {
    if (auth) {
      setAuth(false)
      setFriends(false)
    } else {
      setAuth(true)
    }
  }

  const handleLogout = () => {
    setAuth(false)
    setAnchorElNav(null)
    console.log('Handle Logout')
  }

  const handleMenuClick = (link) => {
    setAnchorElNav(null)
    link && navigate(link)
  }

  const Profiles = () => {
    if (auth && friends) {
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
    else if (auth) {
      // if user is authenticated
      return (
        <Profile isUser sx={{ ml: 'auto' }} handleClick={handleClick} />
      )
    } else {
      // if user is not authenticated and screen size is larger than medium
      if (matchMd) {
        return (
          <Box sx={{ ml: 'auto' }}>
            <Button href='login' variant='outlined' color='inherit' sx={{ mr: 2 }}>
              Login
            </Button>
            <Button href='signup' variant='outlined' color='inherit'>
              Sign Up
            </Button>
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
    return (
      auth ?
        <Menu id='menu-appbar' anchorEl={anchorElNav}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={Boolean(anchorElNav)} onClose={() => setAnchorElNav(null)}>
          <MenuItem onClick={() => handleMenuClick('/')}>Home</MenuItem>
          <MenuItem onClick={() => handleMenuClick('calendar')}>Go to My Calendar</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        :
        <Menu id='menu-appbar' anchorEl={anchorElNav}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={Boolean(anchorElNav)} onClose={() => setAnchorElNav(null)}>
          <MenuItem onClick={() => handleMenuClick('login')}>Login</MenuItem>
          <MenuItem onClick={() => handleMenuClick('signup')}>Sign Up</MenuItem>
        </Menu>
    )
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      Tool Bar
      <Switch checked={auth} onChange={handleLogin} aria-label='login switch' />
      {auth ? 'Logout' : 'Login'}
      <Switch checked={friends} onChange={handleFriends} aria-label='friends switch' />
      {friends ? 'Hide friends' : 'Show friends'}
      <AppBar position='static'>
        <Toolbar>
          {
            // change order of items in appbar based on screen size
            matchMd ?
              <>
                <Link href='/' variant='h5' color='inherit' underline='none' sx={{ mx: 2 }}>
                  MyCalendar
                </Link>
                <Button href='/calendar' variant='text' color='inherit'
                  sx={{ fontSize: 16, position: 'absolute', left: '50vh', right: '50vh' }}>
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
                <Link href='/' variant='h5' color='inherit'
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