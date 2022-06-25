import React, { useEffect, useState } from 'react';
import ProfileImage from './components/ProfileImage/ProfileImage';
import AccountInfo from './components/AccountInfo';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Favorites from './components/Favorites/Favorites';
import { useImg } from 'hooks/api/hooks';
import { useParams } from 'react-router-dom';
import { getParamUserData } from 'account/api/getParamUserData';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProfileTabs from './components/ProfileTabs/ProfileTabs';
import BasicTabs from './components/ProfileTabs/ProfileTabs';

const Account = () => {
  const [imgUrl, loadImg] = useImg();
  const [paramUser, setParamUser] = useState();
  const params = useParams();

  useEffect(() => {
    loadImg();
  }, []);

  useEffect(() => {
    if (params.id) setParamUser(undefined);
  }, [params.id]);

  useEffect(() => {
    getParamUserData(params.id).then((data) => {
      setParamUser(data);
    });
  }, [params.id]);

  return (
    <>
      <div
        style={{
          backgroundImage: imgUrl && `url(${imgUrl})`,
          display: 'flex',
          height: '17rem',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3">Account Information</Typography>
      </div>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        paddingTop="70px"
      >
        <Grid item xs={12} md={5} xl={6}>
          {paramUser && <ProfileImage paramUser={paramUser} />}
        </Grid>
        <Grid item xs={12} md={7} xl={7}>
          {/* {paramUser && <AccountInfo paramUser={paramUser} />} */}
          {paramUser && <ProfileTabs paramUser={paramUser} />}
          {/* <BasicTabs /> */}
        </Grid>
      </Grid>
      {/* {paramUser && <Favorites paramUser={paramUser} />} */}
    </>
  );
};

export default Account;
