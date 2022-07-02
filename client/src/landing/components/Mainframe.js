import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Mainframe = () => {
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: '100%',
          height: '800px',
          alignItems: 'center',
          backgroundImage: 'url(./landing-images/background-15.jpg)',
          backgroundSize: 'cover',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'arial',
            fontWeight: 'bold',
            color: 'white',
          }}
          variant="h1"
        >
          UniPlanIt
        </Typography>
        <Typography
          sx={{
            fontFamily: 'arial',
            fontWeight: 'bold',
            color: 'white',
          }}
          variant="h5"
        >
          One stop shop for all your university planning needs.
        </Typography>
        <br></br>
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          sx={{
            width: '100px',
            fontFamily: 'arial',
            color: 'white',
            backgroundColor: '#89CFF0',
            fontWeight: 'bold',
          }}
        >
          Sign up.
        </Button>
      </Grid>
    </div>
  );
};

export default Mainframe;
