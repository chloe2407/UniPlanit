import { React, useState } from 'react';
import { Grid } from '@material-ui/core';


import WeekView from './weekview.js';
import OptionsTab from './optionstab.js'
import SideMenu from './sidemenu';

const Calendar = () => {
    const [currentSession, setCurrentSession] = useState(0);
    return (
        <div>
            <Grid container>
                <Grid item xs={1} sm={3} style={{ backgroundColor: 'yellow' }}></Grid>
                <Grid item xs={11} sm={9}>
                    <OptionsTab setCurrentSession={setCurrentSession} />
                    <WeekView currentSession={currentSession} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Calendar;