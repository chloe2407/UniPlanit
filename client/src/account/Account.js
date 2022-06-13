import React from 'react'
import ProfileImage from './components/ProfileImage/ProfileImage'
import AccountInfo from './components/AccountInfo'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

const Account = () => {
  // const accountStyles = {

  // }
  return (
    <div>
      <h1>Account Information</h1>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        paddingTop='100px'
      >
        <Grid item xs={12} md={5} xl={6}>
          <ProfileImage />
        </Grid>
        <Grid item padding='30px' xs={12} md={7} xl={6}>
          <AccountInfo />
        </Grid>

      </Grid>
    </div >
  )
}

export default Account