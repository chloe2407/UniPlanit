import React from 'react'
import { Typography } from '@mui/material'
import './textbox.css'
const Textbox = (input) => {
    return (
        <div>
            <Typography className='textbox' invaiant='h6'>{input}</Typography>
        </div>
    )
}

export default Textbox