import React, { useState } from 'react';
import { Avatar, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import { height } from '@mui/system';
import useAuth from 'context/auth';
import './ProfileImage.css';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import initialToColor from 'globalComponents/InitialToColor';
import FileUpload from './FileUpload';

const ProfileImage = ({ paramUser }) => {
  const [updateImage, setUpdateImage] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { user } = useAuth();

  const handleFileUpload = (img) => {
    console.log(img);
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
  };
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Avatar
          src={paramUser.profileImg}
          sx={{
            bgcolor: initialToColor(
              `${paramUser.first[0]}${paramUser.last[0]}`
            ),
            height: '10rem',
            width: '10rem',
            fontSize: '2rem',
          }}
        >
          <Typography variant="h3">{`${paramUser.first[0]}${paramUser.last[0]}`}</Typography>
        </Avatar>
        {user._id === paramUser._id ? (
          <FileUpload handleFileUpload={handleFileUpload} />
        ) : null}
      </Grid>
    </div>
  );
};

export default ProfileImage;
