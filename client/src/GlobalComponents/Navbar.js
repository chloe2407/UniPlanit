import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Link from '@mui/material/Link';

export default function Navbar() {
  const [auth, setAuth] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  // if logged in, request for friend info

  const handleClick = (e) => {
    // redirect to some page
    console.log(e)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={<Switch
            checked={auth}
            onChange={e => setAuth(!auth)}
            aria-label='login switch'
          />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position='static'>
        <Toolbar>
          <Link href='/'
            variant='h5'
            color='inherit'
            underline='none'
            sx={{ mx: 2 }}
          >
            MyCalendar
          </Link>
          <Button href='/calendar'
            variant='text'
            color='inherit'
            sx={{
              fontSize: 16,
              position: 'absolute',
              left: '50%',
              right: '50%'
            }}
          >
            Calendar!
          </Button>
          {auth ? (
            <>
              <IconButton
                size='large'
                aria-controls='menu-account'
                aria-haspopup='true'
                onClick={e => setAnchorEl(e.currentTarget)}
                color='inherit'
                sx={{
                  ml: 'auto',
                  mr: 2
                }}>
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-account'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={handleClick}>My Account</MenuItem>
                <MenuItem onClick={handleClick}>Settings</MenuItem>
              </Menu>
            </>
          ) :
            <Box sx={{
              ml: 'auto',

            }}>
              <Button href='login'
                variant='outlined'
                color='inherit'
                sx={{ mr: 2 }}
              >
                Login
              </Button>
              <Button href='signup'
                variant='outlined'
                color='inherit'
              >
                Sign Up
              </Button>
            </Box>

          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}