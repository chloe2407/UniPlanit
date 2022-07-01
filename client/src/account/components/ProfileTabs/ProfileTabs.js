import React, { useEffect, useState } from 'react';
import useAuth from 'context/auth';
import { useParams } from 'react-router-dom';
import { getParamUserData } from 'account/api/getParamUserData';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccountInfo from '../AccountInfo';
import Favorites from '../Favorites/Favorites';
import { height } from '@mui/system';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }

export default function ProfileTabs({ paramUser, isEditing, handleChange }) {
  const { user } = useAuth();
  const [value, setValue] = React.useState(0);

  // useEffect(() => {
  //     if (params.id) setParamUser(undefined);
  // }, [params.id]);

  // useEffect(() => {
  //     getParamUserData(params.id).then((data) => {
  //         setParamUser(data);
  //     });
  // }, [params.id]);

  const handleSwitch = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '94%', height: '40vh' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleSwitch}
          aria-label="icon label tabs example"
        >
          {user._id === paramUser._id ? (
            <Tab
              label="Account Information"
              icon={<PersonPinIcon />}
              iconPosition="start"
            />
          ) : null}

          <Tab label="Favorites" icon={<FavoriteIcon />} iconPosition="start" />
        </Tabs>
      </Box>
      {user._id === paramUser._id ? (
        <TabPanel value={value} index={0}>
          <AccountInfo
            paramUser={paramUser}
            isEditing={isEditing}
            handleChange={handleChange}
          />
        </TabPanel>
      ) : null}
      <TabPanel value={value} index={1}>
        {paramUser && <Favorites paramUser={paramUser} />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
