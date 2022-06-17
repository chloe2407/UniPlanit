import React, { useEffect, useState } from 'react';
import ProfileImage from './components/ProfileImage/ProfileImage'
import AccountInfo from './components/AccountInfo'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import Favorites from './components/Favorites/Favorites'
import { useImg } from '../hooks/hooks'
import Loading from '../globalComponents/Loading'
import Profile from './components/Profile/Profile';

const Account = () => {

  const [imgUrl, loadImg] = useImg()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    loadImg()
      .then(() => {
        setIsLoading(false)
      })
    // eslint-disable-next-line
  }, []
  )


  return (
    <>
      <div style={{
        backgroundImage: imgUrl && `url(${imgUrl})`, display: 'flex', height: '25vh',
        backgroundSize: 'cover',
        justifyContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Typography variant='h3'>Account Information</Typography>
      </div>
      <div>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          paddingTop='70px'
        >
          <Grid item xs={12} md={5} xl={6}>
            <ProfileImage />

          </Grid>
          <Grid item padding='30px' xs={12} md={7} xl={6}>
            <AccountInfo />
          </Grid>
        </Grid>
        <Favorites />
        {/* <Profile /> */}
      </div >
    </>
  )
}

export default Account