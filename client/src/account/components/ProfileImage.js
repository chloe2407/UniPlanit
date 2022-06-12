import React from 'react'
import { Avatar } from '@mui/material'
import { orange } from '@mui/material/colors'
import { height } from '@mui/system'
const ProfileImage = () => {
    return (
        <div>
            <Avatar sx={{
                bgcolor: orange[500],
                height: '10rem',
                width: '10rem',
                fontSize: '2rem'
            }}>
                N
            </Avatar>
        </div>
    )
}

export default ProfileImage