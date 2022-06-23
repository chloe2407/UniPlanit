import React, { useState } from 'react';
import { Typography, Button, IconButton } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

const OptionsTab = ({
  timetableIndex,
  setTimetableIndex,
  handleOpenDrawer,
}) => {
  //   const listOfSchedulesKeys = Object.keys(schedule);

  // preload next 10 timetable if we are running out

  const handlePrev = () => {
    setTimetableIndex({
      ...timetableIndex,
      index: timetableIndex.index - 1 < 0 ? 0 : timetableIndex.index - 1,
    });
  };
  const handleNext = () => {
    setTimetableIndex({
      ...timetableIndex,
      index: timetableIndex.index == 9 ? 0 : timetableIndex.index + 1,
    });
    if (timetableIndex.index == 9) {
      // fetch next 10
    }
  };

  const handleTermChange = (e) => {
    setTimetableIndex({
      ...timetableIndex,
      term: e.target.value,
    });
  };

  return (
    <Box sx={{ backgroundColor: 'lightgray' }}>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
            <Button onClick={handleOpenDrawer} sx={{ mr: 2 }}>
              <MenuOpenIcon />
              <Typography>Side Menu</Typography>
            </Button>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={timetableIndex.term}
              onChange={handleTermChange}
            >
              <FormControlLabel
                value="F"
                control={<Radio size="small" />}
                label="Fall"
                defaultChecked={true}
              />
              <FormControlLabel
                value="S"
                control={<Radio size="small" />}
                label="Winter"
              />
            </RadioGroup>
          </Box>
          <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
            <Typography>Timetable {`1/30`}</Typography>
            <Button onClick={handlePrev}>
              <ChevronLeftRoundedIcon />
              <Typography>Prev</Typography>
            </Button>
            <Button onClick={handleNext}>
              <Typography>Next</Typography>
              <ChevronRightRoundedIcon />
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default OptionsTab;
