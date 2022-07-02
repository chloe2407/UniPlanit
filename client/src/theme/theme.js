import { createTheme } from '@mui/material/styles';
// import '@fontsource/josefin-sans/100.css';
// import '@fontsource/josefin-sans/200.css';
// import '@fontsource/josefin-sans/300.css';
// import '@fontsource/josefin-sans/400.css';
// import '@fontsource/josefin-sans/500.css';
// import '@fontsource/josefin-sans/600.css';
// import '@fontsource/josefin-sans/700.css';
import '@fontsource/spectral';

const theme = createTheme({
  // test
  palette: {
    primary: {
      main: '#052439',
    },
    secondary: {
      main: '#FFECD1',
      contrastText: 'rgba(255, 255, 255, 1)',
    },
  },
  typography: {
    fontFamily: ['Spectral'],
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
