import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import ScheduleCard from './ScheduleCard';

const Favorites = () => {
    return (
        <div style={{}}>

            <FavoriteIcon sx={{ paddingRight: "5px", paddingTop: '2px', height: '18px' }} />
            <Typography variant='p'>Favorited schedules</Typography>
            <Grid
                display='flex'
                spacing={5}
                justifyContent='center'
            >
                <ScheduleCard name='Schedule A' />
                <ScheduleCard name='hello' />
                <ScheduleCard />
            </Grid>
        </div>
    )
}

export default Favorites