import { createTheme } from '@mui/material/styles';
import '@fontsource/lato/400.css';

const theme = createTheme({
  // test
  palette: {
    primary: {
      main: 'rgba(0, 0, 0, 1)',
    },
    secondary: {
      main: 'rgba(255, 255, 255, 1)',
      contrastText: 'rgba(255, 255, 255, 1)',
    },
  },
  typography: {
    fontFamily: ['Lato'],
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  // other options include
  // typography, spacing, breakpoints, zIndex, transitions, components
  // see https://mui.com/material-ui/customization/theming/#theme-provider
});

export default theme;
