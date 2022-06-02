import { useState } from 'react'
import { IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

export default function Profile({ sx, handleClick }) {
    const [anchorEl, setAnchorEl] = useState(null)
    return (
        <>
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
    )
}
