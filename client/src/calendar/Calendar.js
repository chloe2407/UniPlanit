import { React, useState } from 'react';
// import { Grid } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'


import WeekView from './weekview.js';
import OptionsTab from './optionstab.js'
import SideMenu from './sidemenu';

const Calendar = () => {
    const [currentSession, setCurrentSession] = useState(0);
    return (
        <Grid container sx={{ height: '100vh'}}>
            <Grid item xs={3} sm={3}>
                <SideMenu />
            </Grid>
            <Grid item xs={9} sm={9}>
                <OptionsTab setCurrentSession={setCurrentSession} />
                <WeekView currentSession={currentSession} />
            </Grid>
        </Grid>
    )
}

export default Calendar;