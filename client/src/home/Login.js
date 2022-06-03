import React from 'react';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core';
import {
  Typography, Box, TextField, FormControlLabel,
  Checkbox, Button, Grid, Container, CssBaseline, Avatar
} from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import GoogleSignIn from './GoogleButton';
// import LockOutlinedIcon from '@mui/icons-material';

const useStyles = makeStyles(theme => ({
  text: {
    backgroundColor: 'yellow'
  }
}))

const theme = createTheme();

const Login = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const goToCal = () => navigate('/calendar');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
            <Typography component="h1" variant="h5" className={classes.text}>
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // HAVE TO AUTHENTICATE
                onClick={goToCal}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs className={classes.text}>
                  <Link to={"/forgotpassword"} >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* Causing error, removed for now <GoogleSignIn/> */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Login;
