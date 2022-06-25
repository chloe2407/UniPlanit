import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getParamUserData } from 'account/api/getParamUserData';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccountInfo from '../AccountInfo';
import Favorites from '../Favorites/Favorites';
import { height } from '@mui/system';

function ProfileTabs(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

ProfileTabs.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [paramUser, setParamUser] = useState();
  const params = useParams();

  useEffect(() => {
    if (params.id) setParamUser(undefined);
  }, [params.id]);

  useEffect(() => {
    getParamUserData(params.id).then((data) => {
      setParamUser(data);
    });
  }, [params.id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '50vw', height: '40vh' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Account Information" />
          <Tab label="Favorites" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <ProfileTabs value={value} index={0}>
        {paramUser && <AccountInfo paramUser={paramUser} />}
      </ProfileTabs>
      <ProfileTabs value={value} index={1}>
        {paramUser && <Favorites paramUser={paramUser} />}
      </ProfileTabs>
      <ProfileTabs value={value} index={2}>
        Item Three
      </ProfileTabs>
    </Box>
  );
}
