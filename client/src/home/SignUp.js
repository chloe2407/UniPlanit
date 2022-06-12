import React, { useState, useEffect } from 'react';
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
import { useImg } from '../hooks/hooks'

const signupSchema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
  university: yup.string().required()
})

const SignUp = () => {
  const { signup } = useAuth()
  const [imgUrl, loadImg] = useImg()

  // useImg()
  // .then(res => setImgUrl(res))

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    // uncomment this for getting background photo
    loadImg()
  }, []
  )

  return (
    <div style={{
      backgroundImage: imgUrl && `url(${imgUrl})`, display: 'flex', height: '100vh',
      backgroundSize: 'cover'
    }}>
      <Container maxWidth='xs'>
        <Box sx={{
          backgroundColor: 'white',
          borderRadius: 5,
          p: 5,
          mt: 5
        }}>
          <Formik
            initialValues={{
              email: undefined, firstName: undefined, lastName: undefined,
              password: undefined, confirmPassword: undefined, university: 'utsg'
            }}
            validateSchema={signupSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true)
              signup(values)
              setTimeout(() => {
                setSubmitting(false)
              }, 1000)
            }}
          >
            {
              ({ values, errors, touched, handleChange,
                handleSubmit, isSubmitting }) => (
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
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoComplete='first-name'
                        error={errors.firstName ? true : false}
                        helperText={errors.firstName && 'First name is required'}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        onChange={handleChange}
                        value={values.lastName}
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        error={errors.lastName ? true : false}
                        helperText={errors.lastName &&
                          'Last name is required'}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        onChange={handleChange}
                        value={values.email}
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        error={errors.email ? true : false}
                        helperText={errors.email && touched.email &&
                          'Email is required'}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete
                        onChange={handleChange}
                        value={values.university}
                        fullWidth
                        options={['utsg']}
                        label="University"
                        renderInput={(params) => <TextField
                          name="university"
                          id="university"
                          value={values.university}
                          {...params} label="University" />}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        onChange={handleChange}
                        value={values.password}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        error={errors.password ? true : false}
                        helperText={errors.password &&
                          'Password is required'}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmpassword"
                        autoComplete="new-password"
                        error={values.password !== values.confirmPassword ? true : false}
                        helperText={values.password !== values.confirmPassword
                          && 'You password is not correct'}
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
