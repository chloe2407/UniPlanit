import React, { useEffect, useState } from 'react';
import ProfileImage from './components/ProfileImage/ProfileImage';
import AccountInfo from './components/AccountInfo';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Favorites from './components/Favorites/Favorites';
import { useImg } from '../hooks/hooks';
import Loading from '../globalComponents/Loading';
import Profile from './components/Profile/Profile';
import { useParams } from 'react-router-dom';

const Account = () => {
  const [imgUrl, loadImg] = useImg();
  const [isLoading, setIsLoading] = useState(true);
  const [paramUser, setParamUser] = useState();

  const params = useParams();
  useEffect(() => {
    loadImg().then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (params.id) setParamUser(undefined);
  }, [params.id]);

  useEffect(() => {
    fetch(`../users/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setParamUser(data);
      });
  }, [params.id]);

  // useEffect(() => {
  //   window.location.reload()
  // }, [params.id])

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
      <div>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          paddingTop="70px"
        >
          <Grid item xs={12} md={4} xl={5}>
            {paramUser && <ProfileImage paramUser={paramUser} />}
          </Grid>
          <Grid item paddingLeft="40px" paddingRight="40px" xs={12} md={7} xl={6}>
            {paramUser && <AccountInfo paramUser={paramUser} />}
          </Grid>
        </Grid>
        {paramUser && <Favorites paramUser={paramUser} />}
        {/* <Profile /> */}
      </div>
    </>
  );
};

export default Account;
