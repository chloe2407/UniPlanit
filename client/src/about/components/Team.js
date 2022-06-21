import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import theme from '../../theme/theme';
import { padding } from '@mui/system';

const TeamMember = () => {
  const styles = [
    {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      padding: '50px',
      // marginBottom: '40px',
    },
  ];

  const teamMembers = [
    {
      id: 0,
      name: 'Leo Liu',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      headshot: <img id="headshot" src="./about-images/placeholder.jpeg" />,
    },
    {
      id: 1,
      name: 'Mingi Kwon',
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      headshot: <img id="headshot" src="./about-images/placeholder.jpeg" />,
    },
    {
      id: 2,
      name: 'Sarah Xu',
      description:
        '  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      headshot: <img id="headshot" src="./about-images/placeholder.jpeg" />,
    },
    {
      id: 3,
      name: 'Chloe Lam',
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      headshot: <img id="headshot" src="./about-images/placeholder.jpeg" />,
    },
    {
      id: 4,
      name: 'Leo ',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      headshot: <img id="headshot" src="./about-images/placeholder.jpeg" />,
    },
  ];
  return (
    <Box sx={styles}>
      <Typography variant="h4" paddingBottom="40px">
        Meet the Team
      </Typography>
      {teamMembers.map((member) => (
        <Grid key={member.id} container className="teamMembers" marginY="20px">
          <Grid item md={5}>
            {member.headshot}
          </Grid>
          <Grid item md={6}>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={12}>
                <Typography variant="h6">{member.name}</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  textAlign: 'left',
                  paddingTop: '10px',
                }}
              >
                <Typography>{member.description}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default TeamMember;
