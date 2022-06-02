import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'


const NavbarButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    border: `small solid ${theme.palette.primary.contrastText}`,
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['transform', 'color', 
    'backgroundColor'], {
        duration: 300,
        easing: theme.transitions.easing.easeInOut
    }),
    ":hover": {
        transform: 'scale(1.1)',
        color: 'black',
        backgroundColor: theme.palette.primary.contrastText,
        "boxShadow": `0 0.25rem 0 0.1rem ${theme.palette.primary.contrastText}`
    }
}));

export default NavbarButton
