import React from 'react';

import { Typography, Button, IconButton } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import schedule from './schedule';

const useStyles = makeStyles(theme => ({
    button: {
        float: "left", 
        marginLeft: "1vw",
    }


}))

    var listOfSchedulesKeys = Object.keys(schedule)
    var listOfSchedulesValues = Object.values(schedule)
    var currentScheduleNumber
    if (!currentScheduleNumber) {
        currentScheduleNumber = 0
    }

    
    
    const goPrev = () => {
        console.log('prev')
        if (currentScheduleNumber === 0) {
            currentScheduleNumber = listOfSchedulesValues.length - 1
        }
        else {
            currentScheduleNumber = currentScheduleNumber - 1
        }
        console.log(currentScheduleNumber)
        // setCurrentSchedule(listOfSchedulesValues[currentScheduleNumber])
    }
    const goNext = () => {
        console.log('next')
        if (currentScheduleNumber === listOfSchedulesValues.length - 1) {
            currentScheduleNumber = 0
        } else {
            currentScheduleNumber = currentScheduleNumber + 1
        }
        // setCurrentSchedule(listOfSchedulesValues[currentScheduleNumber])
    }

    
const OptionsTab = ({setCurrentSession, setCurrentSchedule, openDrawer}) => {
    
    const classes = useStyles();
    const [value, setValue] = React.useState("F")
    const handleChange = (event) => {
        setValue(event.target.value)
        setCurrentSession(event.target.value)
    }
    setCurrentSchedule(listOfSchedulesValues[currentScheduleNumber])
    console.log(listOfSchedulesValues[currentScheduleNumber])

    return (
        <div style={{ display: "inlinedBlock" }}>
            <Button onClick={openDrawer}>
                Open Side Bar
            </Button>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                className={classes.button}
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel value="F" control={<Radio />} label="Fall" defaultChecked={true}/>
                <FormControlLabel value="S" control={<Radio />} label="Winter" />
            </RadioGroup>
            <div style={{ float: "right" }}>
                <Button onClick={goPrev}><ChevronLeftRoundedIcon /><Typography>Prev</Typography></Button>
                <Button onClick={goNext}><Typography>Next</Typography><ChevronRightRoundedIcon /></Button>
            </div>
        </div>
    )
}

export default OptionsTab;
