import { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import { StyledMenuItem, NavbarMenu } from './NavbarMenu'
import Avatar from '@mui/material/Avatar'
import initialToColor from './InitialToColor';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider'

export default function FriendProfile({ sx, friendInfo }) {
    const [anchorEl, setAnchorEl] = useState(null)
    // using md as breakpoints for mobile version
    const handleMenuClose = () => {
        setAnchorEl(null)
    }
    return (
        <>
            <IconButton size='large'
                aria-controls='friend-menu'
                aria-haspopup='true'
                color='inherit'
                onClick={e => setAnchorEl(e.currentTarget)}
                sx={sx}>
                <Avatar
                    sx={{
                        width: 30,
                        height: 30,
                        backgroundColor: initialToColor(`${friendInfo.first[0]}${friendInfo.last[0]}`)
                    }}
                    src={friendInfo.profileImg}>
                    <Typography>
                        {`${friendInfo.first[0]}${friendInfo.last[0]}`}
                    </Typography>
                </Avatar>
            </IconButton>
            <NavbarMenu id='friend-menu'
                anchorElNav={anchorEl}
                handleMenuClose={handleMenuClose}>
                <StyledMenuItem disabled
                    style={{ opacity: 1, paddingBottom: 2 }}>
                    {`${friendInfo.first} ${friendInfo.last}`}
                </StyledMenuItem>
                <Divider flexItem sx={{ mx: 2 }} 
                         style={{ marginTop: 0, backgroundColor: 'white' }} />
                <StyledMenuItem>
                    Chat
                </StyledMenuItem>
                <StyledMenuItem>
                    Compare Schedule
                </StyledMenuItem>
            </NavbarMenu>
        </>
    )
}