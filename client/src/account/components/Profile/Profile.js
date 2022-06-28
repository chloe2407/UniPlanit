import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useAuth from 'context/auth';

const Profile = () => {
  const { user } = useAuth();
  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    first: yup
      .string('Enter your first name')
      .min(1, 'Your name must be longer than 1 letter')
      .required('First name required'),
    last: yup
      .string('Enter your last name')
      .min(1, 'Your name must be longer than 1 letter')
      .required('Last name required'),
    university: yup
      .string('Enter your institution')
      .min(1, 'Please enter a valid institution')
      .required('Institution required'),
  });

  const formik = useFormik({
    initialValues: {
      email: user.email,
      first: user.first,
      last: user.last,
      university: user.university,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          InputProps={{ readOnly: true }}
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Profile;
