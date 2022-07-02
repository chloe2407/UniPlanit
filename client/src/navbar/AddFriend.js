import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { NavbarMenu } from 'navbar/NavbarMenu';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { Formik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import NavbarTooltip from 'navbar/NavbarTooltip';
import useSocket from 'context/socket';
import theme from 'theme/theme';
import {
  addFriend,
  getFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
} from 'navbar/api/navbarApi';
import useFeedback from 'context/feedback';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

export default function AddFriend({ sx }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { socket } = useSocket();
  const [friendRequest, setFriendRequest] = useState();
  const { setMsg } = useFeedback();

  useEffect(() => {
    getFriendRequest(socket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('received friend request', () => {
      setMsg({
        sx: { height: '15vh' },
        msg: 'New friend request',
        snackVariant: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        autoHideDuration: 3000,
      });
      // handleSuccessMsg('New friend request');
      getFriendRequest(socket);
    });
    return () => {
      socket.off('received friend request');
    };
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
    socket.on('reject friend', (msg) => {
      setMsg({
        sx: { height: '15vh' },
        msg: msg,
        snackVariant: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        autoHideDuration: 3000,
      });
      // handleSuccessMsg(msg);
    });
    return () => {
      socket.off('reject friend');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('add friend', (status, msg) => {
      setMsg({
        sx: { height: '15vh' },
        msg: msg,
        snackVariant: status.toLowerCase(),
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        autoHideDuration: 3000,
      });
    });
    return () => {
      socket.off('add friend');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const emailSchema = yup.object().shape({
    email: yup.string().email().required(),
  });

  const handleAddFriend = (socket, to) => {
    addFriend(socket, to);
  };

  const handleAcceptFriend = (socket, to) => {
    acceptFriendRequest(socket, to);
  };

  const handleRejectFriend = (socket, to) => {
    rejectFriendRequest(socket, to);
  };

  return (
    <>
      <NavbarTooltip title={<Typography> Add Friend </Typography>}>
        <IconButton
          size="large"
          aria-controls="friend-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={sx}
        >
          <Badge
            badgeContent={friendRequest && friendRequest.length}
            color="success"
          >
            <Avatar
              sx={{
                backgroundColor: theme.palette.primary.main,
                width: 30,
                height: 30,
              }}
            >
              <PersonAddIcon />
            </Avatar>
          </Badge>
        </IconButton>
      </NavbarTooltip>
      <NavbarMenu
        id="friend-menu"
        anchorElNav={anchorEl}
        handleMenuClose={handleMenuClose}
      >
        {/* <StyledPopover
        open={open}
        onClose={handleMenuClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      > */}
        <Container sx={{ p: 2 }}>
          <Typography color="white" sx={{ mt: 1 }}>
            Add a friend
          </Typography>
          <Divider
            orientation="horizontal"
            flexItem
            sx={{ backgroundColor: 'white' }}
          />
          <Formik
            initialValues={{ email: '' }}
            validationSchema={emailSchema}
            onSubmit={(values) => handleAddFriend(socket, values.email)}
          >
            {({ values, onBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Input
                  placeholder="friend@email.com"
                  sx={{ color: 'white' }}
                  type="text"
                  id="email"
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={onBlur}
                  autoComplete="off"
                  autoFocus
                />
                <Button
                  color="secondary"
                  type="submit"
                  sx={{ textTransform: 'capitalize', marginLeft: 'auto' }}
                >
                  <Typography>Add</Typography>
                </Button>
              </form>
            )}
          </Formik>
          <Typography color="white" sx={{ mt: 1 }}>
            Incoming Friend Requests
          </Typography>
          <Divider
            orientation="horizontal"
            flexItem
            sx={{ backgroundColor: 'white' }}
          />
          {friendRequest ? (
            friendRequest.map((friend) => (
              <Box
                key={friend._id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{ color: 'white' }}
                >{`${friend.first} ${friend.last}`}</Typography>
                <Box sx={{ marginLeft: 'auto' }}>
                  <Button
                    sx={{ color: 'white', textTransform: 'capitalize' }}
                    onClick={() => handleAcceptFriend(socket, friend._id)}
                  >
                    <Typography>Accept</Typography>
                  </Button>
                  <Button
                    sx={{ color: 'white', textTransform: 'capitalize' }}
                    onClick={() => handleRejectFriend(socket, friend._id)}
                  >
                    <Typography>Reject</Typography>
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Typography color="gray">Nothing yet!</Typography>
          )}
        </Container>
      </NavbarMenu>
    </>
  );
}
