import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <br></br>
      <textarea className="text-area" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// Styled components ....
const StyledSelect = styled.select`
  color: var(--blue-700);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: '❌ ';
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

const FeedbackForm = () => {
  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          acceptedTerms: false,
          jobType: '',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(25, 'Must be 25 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email addresss')
            .required('Required'),
          // acceptedTerms: Yup.boolean()
          //     .required("Required")
          //     .oneOf([true], "You must accept the terms and conditions."),
          messageType: Yup.string()
            // specify the set of valid values for job type
            // @see http://bit.ly/yup-mixed-oneOf
            .oneOf(
              ['designer', 'development', 'product', 'other'],
              'Invalid Job Type'
            )
            .required('Required'),
          name: Yup.string()
            .min(1, 'Please send us a message!')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <Grid container sx={{ MaxWidth: '100%' }}>
            <Grid item xs={6}>
              <Box
                sx={{
                  borderRight: 1,
                  height: '20vh',
                  justifyContent: 'center',
                  borderColor: 'grey.600',
                }}
              >
                <List>
                  <ListItem>
                    <Typography>
                      <MyTextInput
                        label="Name  "
                        name="firstName"
                        type="text"
                        placeholder="Jane Doe"
                      />
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      <MyTextInput
                        label="Email Address  "
                        name="email"
                        type="email"
                        placeholder="jane@mycalendar.com"
                      />
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      <MySelect label="Message Type  " name="messaveType">
                        <option value="">Select a message type</option>
                        <option value="question">Question</option>
                        <option value="feedback">Feedback</option>
                        <option value="Collaboration">Collaboration</option>
                        <option value="other">Other</option>
                      </MySelect>
                    </Typography>
                  </ListItem>
                </List>
              </Box>
              {/* <MyCheckbox name="acceptedTerms">
                      I accept the terms and conditions
                  </MyCheckbox> */}
            </Grid>
            {/* <Divider orientation='vertical' variant='middle'/> */}
            <Grid item xs={6}>
              <Box sx={{ paddingLeft: '5px' }}>
                <MyTextArea
                  label="Message"
                  name="message"
                  rows="9"
                  cols="38"
                  placeholder="Enter your message here."
                />
              </Box>
            </Grid>
          </Grid>
          <br></br>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default FeedbackForm;
