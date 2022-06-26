import React, { useState } from 'react';
import { Typography, Button, IconButton } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

const OptionsTab = ({ handleOpenDrawer, openDrawer }) => {
  return (
    <Box sx={{ backgroundColor: 'lightgray' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box sx={{ display: 'inline-flex', alignItems: 'center', ml: 4 }}>
          <Button onClick={handleOpenDrawer} sx={{ mr: 2 }}>
            <ArrowBackIosIcon
              sx={{
                mr: 1,
                fontSize: 'medium',
                transform: !openDrawer ? 'rotateY(180deg)' : null,
                transition: (theme) =>
                  theme.transitions.create('transform', {
                    easing: theme.transitions.easing.sharp,
                    duration: 225,
                  }),
              }}
            />
            <Typography>Side Menu</Typography>
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default OptionsTab;
