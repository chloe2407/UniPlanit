import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const Banner = () => {
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: '100%',
          height: '500px',
          alignItems: 'space-between',
          backgroundImage: 'url(./about-images/banner.png)',
        }}
      >
        <Typography variant="h3">About MyCalendar</Typography>
        <Typography variant="h6">Thank you for using our site.</Typography>
      </Grid>
    </div>
  );
};

export default Banner;
