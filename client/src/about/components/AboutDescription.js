import React from 'react';
import '../about.css';
import { Grid, Item, Typography } from '@mui/material';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import GroupsIcon from '@mui/icons-material/Groups';

const AboutDescription = () => {
  const styles = {
    width: '100%',
    padding: '80px',
    paddingBottom: '80px',
  };
  return (
    <div>
      <div className="md-lg">
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={styles}
        >
          <Grid item xs={6}>
            <AssistantPhotoIcon />
          </Grid>
          <Grid item xs={6}>
            <GroupsIcon />
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{
                paddingX: '30px',
              }}
            >
              <b>
                UniPlanit's intelligent algorithm generates your best schedules
                for you.{' '}
              </b>{' '}
              We help university students produce a customised timetable{' '}
              <i>satisfying their needs</i> for desired lectures, reserved break
              times, having classes with friends, and many more.
              <br></br>
              <br></br>No classes before 9AM? Want a lunch break at 12PM?{' '}
              <br></br>We've got it for you, one click away.
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{
                paddingX: '30px',
              }}
            >
              A team of Computer Science students at the University of Toronto
              sought to meet the high demand for this product given what lacked
              in similar applications: customisation.
              <br></br>
              <br></br>
              Reach us below for questions, comments, concerns, and
              collaboration!
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div className="xs-sm">
        <Grid container sx={styles}>
          <Grid item xs={12}>
            <AssistantPhotoIcon />
          </Grid>

          <Grid item xs={12}>
            <Typography
              sx={{
                paddingX: '30px',
              }}
            >
              <b>
                UniPlanit's intelligent algorithm generates your best schedules
                for you.{' '}
              </b>{' '}
              We help university students produce a customised timetable{' '}
              <i>satisfying their needs</i> for desired lectures, reserved break
              times, having classes with friends, and many more.
              <br></br>
              <br></br>No classes before 9AM? Want a lunch break at 12PM?{' '}
              <br></br>We've got it for you, one click away.
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              paddingTop: '80px',
            }}
          >
            <GroupsIcon />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{
                paddingX: '30px',
              }}
            >
              A team of Computer Science students at the University of Toronto
              sought to meet the high demand for this product given what lacked
              in similar applications: customisation.
              <br></br>
              <br></br>
              Reach us below for questions, comments, concerns, and
              collaboration!
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AboutDescription;
