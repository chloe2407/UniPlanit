import React, {useState} from 'react';
import { Typography, Container, Grid, Button, Checkbox, FormControlLabel, Box, TextField, CssBaseline } from '@material-ui/core';
import { createTheme, ThemeProvider, } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';

import GoogleSignIn from './GoogleButton';

const theme = createTheme();


const SignUp = () => {
  const navigate = useNavigate();
  const goToLogin = () => console.log('test1212')
  //const goToLogin = () => navigate('/login');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    alert('A form was submitted');
 
    fetch('http://localhost:8000/users/register', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(response)
        return response.json();
      });
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  return (
    <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
    <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField onChange={(e) => setFormData({...formData, firstName: e.target.value})} value={formData.firstName}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField onChange={(e) => setFormData({...formData, lastName: e.target.value})} value={formData.lastName}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField onChange={(e) => setFormData({...formData, email: e.target.value})} value={formData.email}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField onChange={(e) => setFormData({...formData, password: e.target.value})} value={formData.password}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{margin: '2vh 0vw'}}
              onClick={goToLogin}
            >Sign Up</Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* casuing error, removed for now <GoogleSignIn style={{margin: "2vh 0vw"}}/> */}
      </Container>
    </ThemeProvider>
    </div>
  );
}

export default SignUp;
