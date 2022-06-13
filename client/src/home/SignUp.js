import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik'
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
import Loading from '../globalComponents/Loading'

const signupSchema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup.string()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value
    }),
  university: yup.string().required()
})

const SignUp = () => {
  const { signup, err } = useAuth()
  const [imgUrl, loadImg] = useImg()
  const [isLoading, setIsLoading] = useState(true)

  // useImg()
  // .then(res => setImgUrl(res))

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    loadImg()
      .then(() => {
        setIsLoading(false)
      })
    // eslint-disable-next-line
  }, []
  )

  return (
    isLoading ? <Loading /> :
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
              email: '', firstName: '', lastName: '',
              password: '', confirmPassword: '', university: 'utsg'
            }}
            validationSchema={signupSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true)
              console.log(values)
              signup(values)
              setTimeout(() => {
                setSubmitting(false)
              }, 1000)
            }}
          >
            {
              ({ values, errors, touched, handleChange, setFieldValue,
                handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
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
                        helperText={errors.firstName &&
                          'First name is required'}
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
                        fullWidth
                        options={['utsg']}
                        name="university"
                        id="university"
                        label="University"
                        onChange={(e, value) => setFieldValue('univeristy', value !== null ?
                          value : values.university)}
                        value={values.university}
                        renderInput={params =>
                          <TextField name='univeristy'
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
                        onChange={handleChange}
                        error={errors.confirmPassword ? true : false}
                        helperText={errors.confirmPassword &&
                          'Password must match'}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {
                        err ? <Typography>{err}</Typography> : ''
                      }
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
                </Form>
              )}
          </Formik>
        </Box>
      </Container>
    </div>
  );
}

export default SignUp;
