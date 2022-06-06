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

}))

const theme = createTheme();

const ForgotPassword = () => {
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
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            <Typography component="subtitle" variant="h5">
              Enter your email address and we’ll send you a link to reset your password.
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // HAVE TO AUTHENTICATE
                onClick={goToCal}
              >
                Reset Password
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>

    </div>

  );
}

export default ForgotPassword;