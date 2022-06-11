import React, { useState } from 'react';
import { Formik } from 'formik'
import * as yup from 'yup'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Autocomplete from '@mui/material/Autocomplete';
import useAuth from '../context/Auth'
import './Login.css'

const signupSchema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
  university: yup.string().required()
})

const SignUp = () => {
  const { signup } = useAuth()

  return (
    <div className='background'>
      <Container maxWidth='xs'>
        <Box sx={{
          backgroundColor: 'white',
          borderRadius: 5,
          p: 5,
          mt: 15
        }}>
          <Formik
            initialValues={{ email: '', firstName: '', lastName: '', 
                             password: '', university:'' }}
            validateSchema={signupSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true)
              signup(values)
            }}
          >
            {({
              values, errors, touched, handleChange, handleSubmit, isSubmitting
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h3">
                      Sign up
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      onChange={handleChange}
                      value={values.firstName}
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      onChange={handleChange}
                      value={values.lastName}
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={handleChange}
                      value={values.email}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={handleChange}
                      value={values.password}
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
                    <Autocomplete
                      onChange={handleChange}
                      value={values.university}
                      required
                      fullWidth
                      options={['utsg']}
                      name="university"
                      label="university"
                      type="university"
                      id="university"
                      renderInput={(params) => <TextField value={values.university}
                      {...params} label="university"/>}
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
                  <Grid item xs={12}>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      sx={{ width: '50%' }}
                    >Sign Up</Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </div>
  );
}

export default SignUp;
