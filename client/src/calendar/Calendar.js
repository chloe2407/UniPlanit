import React, { useState } from 'react';
import WeekView from 'calendar/Weekview.js';
import OptionTab from 'calendar/OptionTab';
import Drawer from '@mui/material/Drawer';
import SideMenu from 'calendar/sideMenu/SideMenu';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

const Calendar = () => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const matchMd = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const drawerWidth = matchMd ? 90 : 25;

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Box>
      <Drawer
        variant="persistent"
        open={openDrawer}
        sx={{
          '.MuiDrawer-paperAnchorLeft': {
            position: 'absolute',
            top: '6.4em',
            height: '59rem',
          },
        }}
      >
        <SideMenu drawerWidth={drawerWidth} />
      </Drawer>
      <OptionTab handleOpenDrawer={handleOpenDrawer} openDrawer={openDrawer} />
      {((matchMd && !openDrawer) || !matchMd) && (
        <WeekView
          sx={{
            marginLeft: openDrawer ? `${drawerWidth}vw` : 0,
            transition: (theme) =>
              theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeInOut,
                duration: 225,
              }),
          }}
        />
      )}
    </Box>
  );
};

export default Calendar;
