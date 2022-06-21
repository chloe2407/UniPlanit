import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';

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
            .email('Invalid email addresss`')
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
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Form>
            <Grid item xs={12}>
              <MyTextInput
                label="Name"
                name="firstName"
                type="text"
                placeholder="Jane Doe"
              />
            </Grid>
            <Grid item xs={12}>
              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="jane@mycalendar.com"
              />
            </Grid>
            <Grid item xs={12}>
              <MySelect label="Message Type" name="messaveType">
                <option value="">Select a message type</option>
                <option value="question">Question</option>
                <option value="feedback">Feedback</option>
                <option value="Collaboration">Collaboration</option>
                <option value="other">Other</option>
              </MySelect>
            </Grid>
            {/* <MyCheckbox name="acceptedTerms">
                        I accept the terms and conditions
                    </MyCheckbox> */}
            <Grid item xs={12}>
              <MyTextArea
                label="Message"
                name="message"
                rows="6"
                placeholder="Enter your message here."
              />
            </Grid>
            <button type="submit">Submit</button>
          </Form>
        </Grid>
      </Formik>
    </>
  );
};

export default FeedbackForm;
