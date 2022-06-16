import React from 'react'
import { Typography } from '@mui/material'
import './infobox.css'
import { TextField } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';


const InfoBox = ({ isEditing, property, value }) => {

    return (
        <div>

            <FormControl fullWidth variant="outlined">
                <OutlinedInput
                    disabled={isEditing}
                    id="outlined-adornment-weight"
                    value={value}
                    // onChange={handleChange('weight')}
                    InputProps={{
                        readOnly: isEditing
                    }}
                />
                <FormHelperText id="outlined-weight-helper-text">{property}</FormHelperText>
            </FormControl>
        </div>
    )
}

export default InfoBox
