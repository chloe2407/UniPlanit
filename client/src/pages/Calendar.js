import React from 'react';
import { Grid } from '@material-ui/core';

import NavBar from '../parts/navbar.js';
import WeekView from '../parts/weekview.js';


const Calendar = () => {

    return (
        <div>
            <NavBar/>
            <Grid container>
                <Grid item xs={1} sm={3} style={{backgroundColor: 'yellow'}}>side menu</Grid>
                <Grid item xs={12} sm={9}>
                    <WeekView/>
                </Grid>
            </Grid>
        </div>
    )
    
}

export default Calendar;