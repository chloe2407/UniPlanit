import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { StyledMenuItem, NavbarMenu } from './NavbarMenu';
import Avatar from '@mui/material/Avatar';
import initialToColor from './InitialToColor';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import NavbarTooltip from './NavbarTooltip';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';
import Box from '@mui/material/Box';
import { useDeleteFriend } from './hooks';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

export default function FriendProfile({
  sx,
  friendInfo,
  handleFriendChange,
  handleSuccessMsg,
  handleErrorMsg,
  handleShowChat,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteFriend] = useDeleteFriend(friendInfo);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const navigate = useNavigate();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDialogClose = () => {
    setShowDeletePrompt(false);
  };

  return (
    <>
      <NavbarTooltip title={<Typography>{`${friendInfo.first} ${friendInfo.last}`}</Typography>}>
        <IconButton
          size="large"
          aria-controls="friend-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={sx}
        >
          <Avatar
            sx={{
              width: 30,
              height: 30,
              backgroundColor: initialToColor(`${friendInfo.first[0]}${friendInfo.last[0]}`),
            }}
            src={friendInfo.profileImg}
          >
            <Typography>{`${friendInfo.first[0]}${friendInfo.last[0]}`}</Typography>
          </Avatar>
        </IconButton>
      </NavbarTooltip>
      <NavbarMenu id="friend-menu" anchorElNav={anchorEl} handleMenuClose={handleMenuClose}>
        <StyledMenuItem
          onClick={() => navigate(`../account/${friendInfo._id}`)}
          style={{ opacity: 1, paddingBottom: 5 }}
        >
          {`${friendInfo.first} ${friendInfo.last}`}
        </StyledMenuItem>
        <Divider flexItem sx={{ mx: 2 }} style={{ marginTop: 0, backgroundColor: 'white' }} />
        <StyledMenuItem onClick={() => handleShowChat(friendInfo)}>
          <ChatIcon sx={{ mr: 2 }} />
          Chat
        </StyledMenuItem>
        <StyledMenuItem>
          <CalendarMonthIcon sx={{ mr: 2 }} />
          Compare Schedule
        </StyledMenuItem>
        <StyledMenuItem onClick={() => setShowDeletePrompt(true)}>
          <PersonRemoveIcon sx={{ mr: 2 }} />
          Remove Friend
        </StyledMenuItem>
        <Dialog open={showDeletePrompt} onClose={handleDialogClose}>
          <Box sx={{ p: 2 }} color="white" backgroundColor="black">
            <Container>
              <Stack divider={<Divider sx={{ mt: 1 }} color="white" />}>
                <item>
                  <Typography>
                    Are you sure you want to remove {`${friendInfo.first} ${friendInfo.last}`} as a
                    friend?
                  </Typography>
                </item>
                <item style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    onClick={() => {
                      deleteFriend(
                        friendInfo,
                        handleFriendChange,
                        handleSuccessMsg,
                        handleErrorMsg
                      );
                    }}
                    sx={{
                      textTransform: 'capitalize',
                      transition: (theme) =>
                        theme.transitions.create('transform', {
                          duration: 200,
                          easing: theme.transitions.easing.easeInOut,
                        }),
                      ':hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    <Typography color="white">Remove</Typography>
                  </Button>
                  <Button
                    onClick={handleDialogClose}
                    sx={{
                      textTransform: 'capitalize',
                      transition: (theme) =>
                        theme.transitions.create('transform', {
                          duration: 200,
                          easing: theme.transitions.easing.easeInOut,
                        }),
                      ':hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    <Typography color="white">Cancel</Typography>
                  </Button>
                </item>
              </Stack>
            </Container>
          </Box>
        </Dialog>
      </NavbarMenu>
    </>
  );
}
