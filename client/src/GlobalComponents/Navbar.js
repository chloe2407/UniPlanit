import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import Link from '@mui/material/Link';
import Profile from './Profile'

export default function Navbar() {
  const [auth, setAuth] = useState(false)
  const [friends, setFriends] = useState(false)
  // fake friend data
  const [friendData, _] = useState([...Array(5).keys()])
  // if logged in, request for friend info
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

  const Profiles = () => {
    if (auth && friends) {
      // pass real info into profile
      const profiles = friendData.map((v, i) => (
        i === 0 ? <Profile key={i} sx={{ ml: 'auto' }} handleClick={handleClick} />
          : i === friendData.length ? <Profile key={i} sx={{ mr: 2 }} handleClick={handleClick} />
            : <Profile key={i} handleClick={handleClick} />
      ))
      return (
        <>
          {profiles}
        </>
      )
    }
    else if (auth) {
      return (
        <Profile sx={{ ml: 'auto', mr: 2 }} handleClick={handleClick} />
      )
    } else {
      return (
        <Box sx={{ ml: 'auto', mr: 2 }}>
          <Button href='login' variant='outlined' color='inherit' sx={{ mr: 2 }}>
            Login
          </Button>
          <Button href='signup' variant='outlined' color='inherit'>
            Sign Up
          </Button>
        </Box>
      )
    }
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
          <Link href='/' variant='h5' color='inherit' underline='none' sx={{ mx: 2 }}>
            MyCalendar
          </Link>
          <Button href='/calendar' variant='text' color='inherit'
            sx={{ fontSize: 16, position: 'absolute', left: '50%', right: '50%' }}>
            Calendar!
          </Button>
          <Profiles />
        </Toolbar>
      </AppBar>
    </Box>
  )
}