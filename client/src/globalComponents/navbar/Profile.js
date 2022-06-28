import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { StyledMenuItem, NavbarMenu } from './NavbarMenu';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import useAuth from 'context/auth';
import initialToColor from 'globalComponents/InitialToColor';
import Divider from '@mui/material/Divider';

export default function Profile({ sx, userInfo }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  // using md as breakpoints for mobile version
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        size="large"
        aria-controls="menu-account"
        aria-haspopup="true"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        color="inherit"
        sx={sx}
      >
        <Avatar
          sx={{
            width: 30,
            height: 30,
            backgroundColor: initialToColor(
              `${userInfo.first[0]}${userInfo.last[0]}`
            ),
          }}
          src={userInfo.profileImg}
        >
          <Typography>{`${userInfo.first[0]}${userInfo.last[0]}`}</Typography>
        </Avatar>
      </IconButton>
      <NavbarMenu
        id="menu-account"
        anchorElNav={anchorEl}
        handleMenuClose={handleMenuClose}
      >
        <StyledMenuItem disabled style={{ opacity: 1, paddingBottom: 5 }}>
          {`${userInfo.first} ${userInfo.last}`}
        </StyledMenuItem>
        <Divider
          flexItem
          sx={{ mx: 2 }}
          style={{ marginTop: 0, backgroundColor: 'white' }}
        />
        <StyledMenuItem
          style={{ marginBottom: 0 }}
          onClick={() => navigate(`../account/${userInfo._id}`)}
        >
          My Account
        </StyledMenuItem>
        <StyledMenuItem onClick={logout}>Logout</StyledMenuItem>
      </NavbarMenu>
    </>
  );
}
