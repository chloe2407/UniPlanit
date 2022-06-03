import "@fontsource/adamina"
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    // test
    palette: {
        primary: {
            main: '#22333b',
        },
        secondary: {
            main: '#eae0d5',
            contrastText: '#eae0d5',
          },
    },
    typography: {
        fontFamily: ['adamina',
                     'roboto']
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