import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

// const MyTextInput = ({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <input className="text-input" {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </>
//   );
// };

// const MyTextArea = ({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <br></br>
//       <textarea className="text-area" {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </>
//   );
// };

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

const messageTypes = ['Question', 'Feedback', 'Collaboration', 'Other'];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(type, typeText, theme) {
  return {
    fontWeight:
      typeText.indexOf(type) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const FeedbackForm = () => {
  const theme = useTheme();
  const [typeText, setTextType] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTextType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  return (
    <>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          messageTypes: '',
          message: '',
        }}
        validationSchema={Yup.object({
          fulltName: Yup.string().required('Required'),
          email: Yup.string()
            .email('Invalid email addresss')
            .required('Required'),
          // acceptedTerms: Yup.boolean()
          //     .required("Required")
          //     .oneOf([true], "You must accept the terms and conditions."),
          messageType: Yup.string()
            .oneOf(
              ['Question', 'Feedback', 'Collaboration', 'Other'],
              'Invalid Message Type'
            )
            .required('Required'),
          message: Yup.string()
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
          <Grid
            container
            display="flex"
            direction="column"
            justifyContent="center"
          >
            <Grid item md={12} sm={6}>
              <List>
                <ListItem md={3}>
                  <TextField
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      borderRadius: '3%',
                    }}
                    required
                    id="filled-required"
                    name="fullName"
                    label="Full Name"
                    placeholder="First Last"
                    variant="filled"
                  />
                </ListItem>
                <ListItem md={3}>
                  <TextField
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      borderRadius: '3%',
                    }}
                    required
                    id="filled-required"
                    label="Email Address  "
                    name="email"
                    placeholder="my@email.com"
                    variant="filled"
                  />
                </ListItem>
                <ListItem>
                  {/* <InputLabel id="demo-multiple-name-label" >Feedback</InputLabel> */}
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={typeText}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      borderRadius: '3%',
                      width: 'inherit',
                    }}
                  >
                    {messageTypes.map((type) => (
                      <MenuItem
                        key={type}
                        value={type}
                        style={getStyles(type, typeText, theme)}
                      >
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </ListItem>
              </List>
            </Grid>

            <Grid item md={12} sm={6}>
              <ListItem>
                <TextField
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '3%',
                  }}
                  required
                  id="filled-multiline-static"
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  placeholder="Enter your message"
                  variant="filled"
                />
              </ListItem>
            </Grid>
          </Grid>
          <br></br>
          <Button
            type="submit"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '3%',
              width: '300px',
            }}
          >
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default FeedbackForm;
