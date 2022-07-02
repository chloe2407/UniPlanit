import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import Profile from 'globalComponents/navbar/Profile';
import NavbarButton from 'globalComponents/navbar/NavbarButton';
import useAuth from 'context/auth';
import FriendProfile from 'globalComponents/navbar/FriendProfile';
import AddFriend from 'globalComponents/navbar/AddFriend';
import OverflowIcon from 'globalComponents/navbar/OverflowIcon';
import { StyledMenuItem, NavbarMenu } from 'globalComponents/navbar/NavbarMenu';
import { Typography } from '@mui/material';
import useSocket from 'context/socket';
import useFeedback from 'context/feedback';
import {
  getFriend,
  getFriendRequest,
} from 'globalComponents/navbar/api/navbarApi';
import { fontSize } from '@mui/system';

// figure out user not updated when login

export default function Navbar({ handleShowChat }) {
  const { user, logout } = useAuth();
  const [userFriend, setUserFriend] = useState([]);
  const [friendRequest, setFriendRequest] = useState();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const matchMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const { socket } = useSocket();
  const { setMsg } = useFeedback();

  // fake friend data
  // if logged in, request for friend info
  const navigate = useNavigate();

  useEffect(() => {
    getFriendRequest(socket);
    getFriend(socket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('get friend request', (friendRequest) => {
      setFriendRequest(friendRequest);
    });
    return () => {
      socket.off('get friend request');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('remove friend', (msg) => {
      setMsg({
        sx: { height: '15vh' },
        msg: msg,
        snackVariant: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        autoHideDuration: 3000,
      });
      getFriend(socket);
    });
    return () => {
      socket.off('remove friend');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('accepted friend', (msg) => {
      setMsg({
        sx: { height: '15vh' },
        msg: msg,
        snackVariant: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        autoHideDuration: 3000,
      });
      getFriend(socket);
    });
    return () => {
      socket.off('accepted friend');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('get user friend', (friends) => {
      setUserFriend(friends);
    });
    return () => {
      socket.off('get user friend');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    logout();
    console.log('Handle Logout');
  };

  const handleMenuClick = (link) => {
    setAnchorElNav(null);
    link && navigate(link);
  };

  const handleMenuClose = () => {
    setAnchorElNav(null);
  };

  const NavProfiles = () => {
    if (matchMd) {
      if (user) {
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              ml: 'auto',
            }}
          >
            <AddFriend sx={{ p: 1 }} friendRequest={friendRequest} />
            <Divider
              style={{ backgroundColor: 'white' }}
              sx={{ m: 1 }}
              orientation="vertical"
              flexItem
            />
            {userFriend.slice(0, 3).map((v, i) => (
              <FriendProfile
                key={v._id}
                friendInfo={v}
                handleShowChat={handleShowChat}
                sx={{ p: 1 }}
              />
            ))}
            {userFriend.length - 3 > 0 && (
              <OverflowIcon
                remainCount={userFriend.length - 3}
                remainFriends={userFriend.slice(3)}
                sx={{ p: 1 }}
              />
            )}
            {userFriend.length !== 0 && (
              <Divider
                style={{ backgroundColor: 'white' }}
                sx={{ m: 1 }}
                orientation="vertical"
                flexItem
              />
            )}
            <Profile
              userInfo={user}
              sx={{ p: 1, ml: userFriend ? 0 : 'auto' }}
            />
          </Box>
        );
      } else {
        return (
          <div>
            <NavbarButton onClick={() => navigate('/login')}>
              <Typography>Login</Typography>
            </NavbarButton>
            <NavbarButton onClick={() => navigate('/signup')}>
              <Typography>Sign Up</Typography>
            </NavbarButton>
          </div>
        );
      }
    } else {
      if (user) {
        return (
          <>
            <Profile userInfo={user} sx={{ ml: 'auto' }} />
          </>
        );
      }
    }
  };

  const NavMenu = () => {
    // NavMenu changes based on auth
    const NavItems = user
      ? [
          <StyledMenuItem key="home" onClick={() => handleMenuClick('/')}>
            Home
          </StyledMenuItem>,
          <StyledMenuItem
            key="calendar"
            onClick={() => handleMenuClick('calendar')}
          >
            Go to Calendar
          </StyledMenuItem>,
          <StyledMenuItem key="about" onClick={() => handleMenuClick('about')}>
            About us
          </StyledMenuItem>,
          <StyledMenuItem key="logout" onClick={handleLogout}>
            Logout
          </StyledMenuItem>,
        ]
      : [
          <StyledMenuItem key="about" onClick={() => handleMenuClick('about')}>
            About us
          </StyledMenuItem>,
          <StyledMenuItem key="login" onClick={() => handleMenuClick('login')}>
            Login{' '}
          </StyledMenuItem>,
          <StyledMenuItem
            key="signup"
            onClick={() => handleMenuClick('signup')}
          >
            Sign Up
          </StyledMenuItem>,
        ];
    return (
      <NavbarMenu
        id="menu-appbar"
        anchorElNav={anchorElNav}
        handleMenuClose={handleMenuClose}
      >
        {NavItems}
      </NavbarMenu>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {
            // change order of items in appbar based on screen size
            matchMd ? (
              <>
                <Link
                  href="/"
                  variant="h5"
                  color="inherit"
                  underline="none"
                  sx={{ mx: 2 }}
                >
                  Uni<b>Planit</b>
                </Link>
                <NavbarButton onClick={() => navigate('/calendar')}>
                  <Typography>Calendar</Typography>
                </NavbarButton>
                <NavbarButton
                  key="about"
                  onClick={() => handleMenuClick('about')}
                >
                  <Typography>About Us</Typography>
                </NavbarButton>
                <NavProfiles />
              </>
            ) : (
              <>
                <IconButton
                  size="large"
                  aria-label="nav-menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={(e) => setAnchorElNav(e.currentTarget)}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <NavMenu />
                <Link
                  href="/"
                  variant="h5"
                  color="inherit"
                  underline="none"
                  sx={{ ml: 'auto' }}
                >
                  UniPlanit
                </Link>
                <NavProfiles />
              </>
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
