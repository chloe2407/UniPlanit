import React from 'react'
import ProfileImage from './components/ProfileImage'
import AccountInfo from './components/AccountInfo'
import { Grid } from 'matter-js'

const Account = () => {
  return (
    <div>
      <h1>Account Information</h1>

      <ProfileImage />
      <AccountInfo />
    </div>
  )
}

export default Account