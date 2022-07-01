import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import useAuth from 'context/auth';
import { useImg } from 'hooks/api/hooks';
import Loading from 'components/Loading';

const loginSchema = yup.object().shape({
  username: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  // const [error, setError] = useState(false)
  const { authenticate, err } = useAuth();
  // const [imgUrl, setImgUrl] = useState()
  const [imgUrl, loadImg] = useImg();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadImg().then(() => {
      setIsLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div
      style={{
        backgroundImage: imgUrl && `url(${imgUrl})`,
        height: '100vh',
        backgroundSize: 'cover',
      }}
    >
      <Grid container>
        <Grid item xs={12} md={6}>
          <Container maxWidth="xs">
            <Box
              mt={10}
              sx={{ backgroundColor: 'white', borderRadius: 5, p: 5 }}
            >
              <Typography sx={{ mb: 1, display: 'flex' }} variant="h3">
                Login
              </Typography>
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  authenticate('login', values);
                  setTimeout(() => {
                    setSubmitting(false);
                  }, 1000);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  onBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="username"
                      name="username"
                      label="Email"
                      onChange={handleChange}
                      onBlur={onBlur}
                      value={values.username}
                      autoComplete="username"
                      autoFocus
                      error={errors.username ? true : false}
                      helperText={
                        errors.username &&
                        touched.username &&
                        'Incorrect Email Format'
                      }
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      name="password"
                      type="password"
                      label="Password"
                      id="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      onBlur={onBlur}
                      value={values.password}
                      error={errors.password ? true : false}
                    />
                    {err ? (
                      <Typography sx={{ display: 'flex' }}>
                        Incorrect password or email
                      </Typography>
                    ) : (
                      ''
                    )}
                    <Button
                      sx={{ m: 2, ml: 0, display: 'flex' }}
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                    >
                      Login
                    </Button>
                    <Typography>
                      <Link
                        style={{
                          display: 'flex',
                          textDecoration: 'none',
                          color: 'black',
                        }}
                        to={'/forgotpassword'}
                      >
                        Forgot password?
                      </Link>
                    </Typography>
                    <Typography sx={{ display: 'flex' }}>
                      Don't have an account?{' '}
                      <Link
                        style={{ textDecoration: 'none', color: 'black' }}
                        to="/signup"
                      >
                        {'Sign Up'}
                      </Link>
                    </Typography>
                  </form>
                )}
              </Formik>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
