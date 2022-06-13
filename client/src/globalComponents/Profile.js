import { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle'
import { StyledMenuItem, NavbarMenu, StyledPopover } from './NavbarMenu'
import Typography from '@mui/material/Typography';
import useAuth from '../context/Auth'
import { useNavigate } from 'react-router-dom'

export default function Profile({ sx, profileInfo, isUser, handleClick }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    // using md as breakpoints for mobile version
    const handleMenuClose = () => {
        setAnchorEl(null)
    }
    return (
        <>
            {
                isUser ?
                    <>
                        <IconButton size='large' aria-controls='menu-account' aria-haspopup='true'
                            onClick={e => setAnchorEl(e.currentTarget)} color='inherit'
                            sx={sx}>
                            <AccountCircle />
                        </IconButton>
                        <NavbarMenu id='menu-account' anchorElNav={anchorEl}
                            handleMenuClose={handleMenuClose}>
                            <StyledMenuItem onClick={() => navigate('/account')}>My Account</StyledMenuItem>
                            <StyledMenuItem onClick={logout}>Logout</StyledMenuItem>
                        </NavbarMenu>
                    </>
                    :
                    <>
                        {/*Friend Icon. Show on screen larger than small*/}
                        <AccountCircle
                            aria-controls={'mouse-over-popover'}
                            aria-haspopup='true'
                            onMouseEnter={e => setAnchorEl(e.currentTarget)}
                            onMouseLeave={() => setAnchorEl(null)}
                            color='inherit'
                            sx={sx} />
                        <StyledPopover id='mouse-over-popover' sx={{ pointerEvents: 'none' }}
                            open={open} anchorEl={anchorEl}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                            onClose={() => setAnchorEl(null)}
                            disableRestoreFocus
                        >
                            <Typography p={1} > friend </Typography>
                        </StyledPopover>
                    </>
            }
        </>
    )
}
