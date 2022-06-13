import React from 'react'
import ProfileImage from './components/ProfileImage/ProfileImage'
import AccountInfo from './components/AccountInfo'
import { Grid } from 'matter-js'
import { Box } from '@mui/system'

const Account = () => {
  // const accountStyles = {

  // }
  return (
    <div>
      <h1>Account Information</h1>
      <Box
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid xs={5}>
          <ProfileImage />
        </Grid>
        <Grid xs={7}>
          <AccountInfo />
        </Grid>

      </Box>
    </div>
  )
}

export default Account