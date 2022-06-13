import React from 'react';
import { Grid, Box, AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';



const OptionsTab = ({setCurrentSession}) => {
    var currentSession = "F"
    const handleClick = (session) => {
        currentSession = session
        setCurrentSession(currentSession)        
    }
    return (
        <div style={{display: "inlinedBlock"}}>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                style={{float: "left"}}
                
            >
                <FormControlLabel value="Fall Session" control={<Radio />} onClick={() => handleClick("F")} label="Fall Session" defaultChecked/>
                <FormControlLabel value="Winter Session" control={<Radio />} onClick={() => handleClick("S")} label="Winter Session" />
            </RadioGroup>
            <div style={{float: "right"}}>
                <Button><ChevronLeftRoundedIcon/><Typography>Prev</Typography></Button>
                <Button><Typography>Next</Typography><ChevronRightRoundedIcon/></Button>
            </div>
        </div>
    )   
}

export default OptionsTab;