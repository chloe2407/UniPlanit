import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    // test
    palette: {
        primary: {
            main: '#2A2C24',
            secondary: '#6D8B74',
        }
    },
    // other options include
    // typography, spacing, breakpoints, zIndex, transitions, components
    // see https://mui.com/material-ui/customization/theming/#theme-provider
})

export default theme