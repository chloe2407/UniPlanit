import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';

const GenerateScreen = ({ handleViewChange }) => {
  const [demo, setDemo] = useState([
    {
      more: false,
      index: 1,
      courses: [
        { index: 1, code: 'csc', lec: '101', tut: '111' },
        { index: 2, code: 'csc', lec: '101', tut: '111' },
      ],
    },
    {
      more: false,
      index: 2,
      courses: [{ index: 1, code: 'csc', lec: '101', tut: '111' }],
    },
    {
      more: false,
      index: 3,
      courses: [{ index: 1, code: 'csc', lec: '101', tut: '111' }],
    },
  ]);
  const handleClick = (index) => {
    setDemo(
      demo.map((plan) => {
        if (index === plan.index) {
          return { ...plan, more: !plan.more };
        } else {
          return plan;
        }
      })
    );
  };
  const handleFavourite = () => {};
  return (
    <Box mt={2} sx={{ overflow: 'auto' }}>
      <Typography
        variant="h5"
        sx={{ display: 'flex', justifyContent: 'start', marginLeft: 3 }}
      >
        Possible plans
      </Typography>
      <List sx={{ maxHeight: '90vh', overflow: 'auto' }}>
        {demo.map((plan) => (
          <ListItem key={plan.index}>
            <Button sx={{ border: 1, width: '20vw' }}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography>Plan number {plan.index}</Typography>
                  <IconButton
                    onClick={() => {
                      handleClick(plan.index);
                    }}
                  >
                    {plan.more ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                  <Button
                    onClick={() => {
                      handleFavourite();
                    }}
                    sx={{ border: 1 }}
                  >
                    {' '}
                    Add to favourites
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Collapse in={plan.more} timeout="auto" unmountonexit>
                    <List sx={{ maxHeight: '30vh', overflow: 'auto' }}>
                      {plan.courses.map((course) => (
                        <>
                          <ListItem key={course.index}>
                            <Typography>{course.code}</Typography>
                          </ListItem>
                          <ListItem>
                            <List>
                              <ListItem>
                                <Typography>{course.lec}</Typography>
                              </ListItem>
                              <ListItem>
                                <Typography>{course.tut}</Typography>
                              </ListItem>
                            </List>
                          </ListItem>
                        </>
                      ))}
                    </List>
                  </Collapse>
                </Grid>
              </Grid>
              {/* <Button onClick={() => {}}>confirm</Button> */}
            </Button>
          </ListItem>
        ))}
      </List>
      <Button
        variant={'contained'}
        onClick={() => handleViewChange(null, 'select')}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default GenerateScreen;
