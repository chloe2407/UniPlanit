import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import { styled } from '@mui/material/styles'


// const StyledMenu = styled(Menu)(({ theme }) => ({
//     color: theme.palette.primary.main
// }))

const StyledMenu = styled(Menu)(({ theme }) => ({
    // background: theme.palette.primary.main,
    '& .MuiList-root': {
        backgroundColor: theme.palette.primary.main
    },
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    color: theme.palette.secondary.contrastText,
    border: `solid ${theme.palette.primary.main}`,
    transition: theme.transitions.create(['transform'], {
        duration: 300,
        easing: theme.transitions.easing.easeInOut
    }),
    ":hover": {
        transform: 'scale(1.05)',
    }
}))

const NavbarMenu = ({ anchorElNav, handleMenuClose, children}) => {
    return (
        <StyledMenu anchorEl={anchorElNav}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={Boolean(anchorElNav)} onClose={handleMenuClose}>
                {children}
        </StyledMenu>
    )
}

const StyledPopover = styled(Popover)(({ theme }) => ({
    '& .MuiPopover-paper': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.contrastText
    },
}))

export { StyledMenuItem, NavbarMenu, StyledPopover }