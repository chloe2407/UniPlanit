import { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography';

export default function Profile({ sx, profileInfo, isUser, handleClick }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    // using md as breakpoints for mobile version
    return (
        <>
            {
                isUser ?
                    <>
                        {/* User Icon, show at all times */}
                        <IconButton size='large' aria-controls='menu-account' aria-haspopup='true'
                            onClick={e => setAnchorEl(e.currentTarget)} color='inherit'
                            sx={sx}>
                            <AccountCircle />
                        </IconButton>
                        <Menu id='menu-account' anchorEl={anchorEl}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                        >
                            <MenuItem onClick={handleClick}>My Account</MenuItem>
                            <MenuItem onClick={handleClick}>Settings</MenuItem>
                        </Menu>
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
                        <Popover id='mouse-over-popover' sx={{ pointerEvents: 'none' }}
                            open={open} anchorEl={anchorEl}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                            onClose={() => setAnchorEl(null)}
                            disableRestoreFocus
                        >
                            <Typography> friend </Typography>
                        </Popover>
                    </>
            }
        </>
    )
}
