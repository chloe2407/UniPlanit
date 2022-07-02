import React from 'react';
import Grid from '@mui/material/Grid';
import { ImageList, Typography, Card } from '@mui/material';
import { Box } from '@mui/system';
import ImageListItem from '@mui/material/ImageListItem';

const image1 = require('../example1.png');
const image2 = require('../example2.png');
const image3 = require('../example3.png');
const image4 = require('../example4.png');
const itemData = [image1, image2, image3, image4];

const Features = () => {
  return (
    <div>
      <Grid
        container
        sx={{
          backgroundImage: 'url(./landing-images/background-2.jpg)',
          backgroundSize: 'cover',
        }}
      >
        <Grid item xs={4} justifyContent="center" alignContent="center">
          <Box display="inline-block" width="80%" paddingTop="30px">
            <Card>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: 'arial',
                  fontWeight: 'bold',
                  color: '#424242',
                  paddingTop: '20px',
                }}
              >
                Automatically generate timetables
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'arial',
                  fontWeight: 'bold',
                  color: '#424242',
                  paddingTop: '20px',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  paddingBottom: '20px',
                }}
              >
                Just choose your courses, and choose between a selection of all
                available lecture times.
              </Typography>
            </Card>
          </Box>

          <Box display="inline-block" width="80%" paddingTop="30px">
            <Card>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: 'arial',
                  fontWeight: 'bold',
                  color: '#424242',
                  paddingTop: '20px',
                }}
              >
                See what you're friends are doing.
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'arial',
                  fontWeight: 'bold',
                  color: '#424242',
                  paddingTop: '20px',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  paddingBottom: '20px',
                }}
              >
                Easily compare your schedule with your friend's on UniPlanIt.
              </Typography>
            </Card>
          </Box>

          <Box
            display="inline-block"
            width="80%"
            paddingTop="30px"
            paddingBottom="30px"
          >
            <Card>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: 'arial',
                  fontWeight: 'bold',
                  color: '#424242',
                  paddingTop: '20px',
                }}
              >
                UniPlanIt any time, any where.
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'arial',
                  fontWeight: 'bold',
                  color: '#424242',
                  paddingTop: '20px',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  paddingBottom: '20px',
                }}
              >
                In a different time zone? We will convert your course schedules
                into your timezone for you.
              </Typography>
            </Card>
          </Box>
        </Grid>

        <Grid item xs={8}>
          <Box
            paddingTop="30px"
            height="600px"
            paddingRight="20px"
            alignContent="center"
          >
            <ImageList
              sx={{ width: '100%', height: '100%' }}
              cols={2}
              rowHeight={164}
            >
              {itemData.map((item) => (
                <ImageListItem>
                  <img src={item} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Features;
