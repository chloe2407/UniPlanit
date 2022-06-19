import React from 'react'
import { Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import ScheduleCard from './ScheduleCard';

const Favorites = ({ user }) => {
    // const favSchedules = user.favorites;
    const favSchedules = [
        {
            id: 0,
            name: 'Schedule A',
            filters: ['After 9AM', 'Before 7PM'],
            snapshot: ''
        },
        {
            id: 1,
            name: 'Schedule A',
            filters: ['12-2PM break'],
            snapshot: ''
        },
        {
            id: 2,
            name: 'Schedule 3-1',
            filters: ['Before 3PM', 'Less Walking', 'Morning classes'],
            snapshot: ''
        },
        {
            id: 3,
            name: 'Schedule -4z',
            filters: ['Before 3PM', 'Less Walking', 'Morning classes', '12-4PM Break'],
            snapshot: ''
        },
        {
            id: 4,
            name: 'Best Schedule',
            filters: ['Before 3PM', 'Less Walking', 'Morning classes'],
            snapshot: ''
        },
        {
            id: 5,
            name: 'Schedule 33',
            filters: ['12-2PM break'],
            snapshot: ''
        }, ,
        {
            id: 6,
            name: 'Schedule A',
            filters: ['12-2PM break'],
            snapshot: ''
        },
    ]
    return (
        <div style={{ padding: '4rem' }}>

            {/* <FavoriteIcon sx={{ paddingRight: "5px", paddingTop: '2px', height: '18px' }} /> */}
            <Typography variant='h4'>My favorite schedules</Typography>
            <Grid container
                display='flex'
                spacing={1}
                justifyContent='flex-start'
                padding='3em'
            >
                {
                    favSchedules.map((schedule) => (
                        <ScheduleCard key={schedule.id} name={schedule.name} filters={schedule.filters} snapshot={schedule.snapshot} />
                    ))
                }

            </Grid>

        </div >
    )
}

export default Favorites