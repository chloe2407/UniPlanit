import React from 'react';
import { Typography } from '@mui/material';
import './infobox.css';
import { TextField } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

const InfoBox = ({ isEditing, property, value, onChange }) => {
  const property_value = property.toString();
  return (
    <TextField
      id="outlined-read-only-input"
      fullWidth
      label={property}
      defaultValue={value}
      onChange={onChange}
      InputProps={{
        readOnly: !isEditing,
      }}
      disabled={!isEditing}
    />
  );
};

export default InfoBox;
