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
    loadImg()
      .then(() => {
        setIsLoading(false)
      })
  }, []
  )

  return (
    <>
      <div style={{
        backgroundImage: imgUrl && `url(${imgUrl})`, display: 'flex', height: '17rem',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
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
          <Grid item xs={12} md={4} xl={5}>
            <ProfileImage />

          </Grid>
          <Grid item paddingLeft='40px'
            paddingRight='40px' xs={12} md={7} xl={6}>
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