import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in/lib/FadeIn';

const Mainframe = () => {
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: '95vh',
          backgroundImage: 'url(./landing-images/background-15.jpg)',
          backgroundSize: 'cover',
        }}
      >
        <FadeIn transitionDuration={500}>
          <Typography
            sx={{
              fontFamily: 'arial',
              fontWeight: 'bold',
              color: 'white',
            }}
            variant="h1"
          >
            UniPlanit
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
        </FadeIn>
      </Grid>
    </div>
  );
};

export default Mainframe;
