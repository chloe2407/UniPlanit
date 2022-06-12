import "@fontsource/adamina"
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    // test
    palette: {
        primary: {
            main: 'rgba(0, 0, 0, 1)',
        },
        secondary: {
            main: 'rgba(255, 255, 255, 1)',
            contrastText: 'rgba(255, 255, 255, 1)'
          },
    },
    typography: {
        fontFamily: ['adamina',
                     'roboto'],
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true
            }
        }
    }
    // other options include
    // typography, spacing, breakpoints, zIndex, transitions, components
    // see https://mui.com/material-ui/customization/theming/#theme-provider
})

export default theme