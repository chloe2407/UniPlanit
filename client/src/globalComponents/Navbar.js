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
import OverflowIcon from './OverflowIcon'
import { StyledMenuItem, NavbarMenu } from './NavbarMenu'
import { Typography } from '@mui/material'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [userFriend, setUserFriend] = useState([])
  const [anchorElNav, setAnchorElNav] = useState(null)
  const matchMd = useMediaQuery((theme) => theme.breakpoints.up('md'))
  // fake friend data
  // if logged in, request for friend info
  const navigate = useNavigate()

  useEffect(() => {
    fetch('users/friends')
      .then(res => res.json())
      .then(data => {
        if (!data.err) {
          setUserFriend(data)
        }
      })
  }, [user])

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

  const NavProfiles = () => {
    if (matchMd) {
      if (user) {
        return (
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            ml: 'auto'
          }}>
            {
              userFriend.slice(0, 3).map((v, i) => (
                <FriendProfile key={v._id}
                  friendInfo={v}
                  sx={{ p: 1 }}
                />
              ))
            }
            {
              userFriend.length - 3 > 0 &&
              <OverflowIcon remainCount={userFriend.length - 3}
                remainFriends={userFriend.slice(3)}
                sx={{ p: 1 }} />
            }
            <Divider
              style={{ backgroundColor: 'white' }}
              sx={{ m: 1 }}
              orientation='vertical' flexItem />
            <Profile
              userInfo={user}
              sx={{ p: 1, ml: userFriend ? 0 : 'auto' }}
              handleClick={handleClick} />
          </Box>
        )
      } else {
        return (
          <>
            <NavbarButton onClick={() => navigate('/about')} sx={{ mr: 2 }}>
              <Typography>
                About us
              </Typography>
            </NavbarButton>
            <NavbarButton onClick={() => navigate('/login')} sx={{ mr: 2 }}>
              <Typography>
                Login
              </Typography>
            </NavbarButton>
            <NavbarButton onClick={() => navigate('/signup')} sx={{ mr: 1 }}>
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
          About
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
                <NavbarButton onClick={() => navigate('/calendar')}
                sx={{ mr: 2 }}>
                  <Typography>
                    Calendar
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
    </Box>
  )
}