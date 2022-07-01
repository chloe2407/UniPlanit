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
import FadeIn from 'react-fade-in';

const Account = () => {
  const [imgUrl, loadImg] = useImg();
  const [paramUser, setParamUser] = useState();
  const params = useParams();

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = () => {
    setIsEditing(!isEditing);
  };

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

      <Grid container direction="row" justifyContent="center" paddingTop="70px">
        <Grid item xs={12} md={5}>
          {paramUser && (
            <ProfileImage
              paramUser={paramUser}
              isEditing={isEditing}
              handleChange={handleChange}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6} p="0px">
          {paramUser && (
            <ProfileTabs
              paramUser={paramUser}
              isEditing={isEditing}
              handleChange={handleChange}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Account;
