import React from 'react';
import { Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import ScheduleCard from './ScheduleCard';

const Favorites = ({ paramUser }) => {
  // const favSchedules = user.favorites;
  const favSchedules = [
    {
      id: 0,
      name: 'Best Schedule',
      filters: ['After 9AM', 'Before 7PM'],
      courses: ['CSC111', 'MAT136', 'MAT223', 'SLA100'],
    },
    {
      id: 1,
      name: 'Schedule A',
      filters: ['12-2PM break'],
      courses: ['CSC111', 'MAT136', 'MAT223', 'SLA100', 'CSC258'],
    },
    {
      id: 2,
      name: 'Schedule 3-1',
      filters: ['Before 3PM', 'Less Walking', 'Morning classes'],
      courses: ['CSC111', 'MAT136', 'MAT223', 'SLA100', 'EAS100', 'RSM250'],
    },
    {
      id: 3,
      name: 'Schedule -4z',
      filters: [
        'Before 3PM',
        'Less Walking',
        'Morning classes',
        '12-4PM Break',
      ],
      courses: ['CSC111', 'MAT136', 'MAT223', 'SLA100'],
    },
  ];
  return (
    <div>
      <Grid container display="flex" spacing={1} justifyContent="flex-start">
        {favSchedules.map((schedule) => (
          <ScheduleCard
            key={schedule.id}
            name={schedule.name}
            filters={schedule.filters}
            courses={schedule.courses}
          />
        ))}
      </Grid>
    </div>
  );
};

export default Favorites;
