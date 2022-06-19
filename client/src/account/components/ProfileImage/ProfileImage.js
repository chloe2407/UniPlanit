import React, { useState } from 'react';
import { Avatar, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import { height } from '@mui/system';
import useAuth from '../../../context/Auth';
import './ProfileImage.css'
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen';
import FileUpload from './FileUpload'

const ProfileImage = ({ user }) => {
    const [updateImage, setUpdateImage] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const handleFileUpload = (img) => {
        console.log(img)
        // fetch('/users/uploadImage', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         image: img
        //     })
        // })
        // .then(res => res.json())
        // .catch(err => console.log(err))
    }
    return (
        <div>
            <Grid
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
                textAlign='center'>
                <Avatar
                    src={user.profileImg}
                    sx={{
                        bgcolor: orange[500],
                        height: '10rem',
                        width: '10rem',
                        fontSize: '2rem'
                    }}>
                </Avatar>
                <FileUpload handleFileUpload={handleFileUpload} />
            </Grid>
        </div >
    )
}

export default ProfileImage