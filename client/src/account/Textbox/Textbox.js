import React from 'react'
import { Typography } from '@mui/material'
import './textbox.css'
import { TextField } from '@mui/material'

const Textbox = ({ property, value }) => {

    return (
        <div>
            <Typography>
                {property}
            </Typography>
            <TextField
                disabled
                id="outlined-read-only-input"
                label={value}
                InputProps={{
                    readOnly: true,
                }}
            />
        </div>
    )
}

export default Textbox