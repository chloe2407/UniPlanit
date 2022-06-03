import React from 'react';
import { Grid } from '@material-ui/core';

import WeekView from './weekview';


const Calendar = () => {
    return (
        <div>
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