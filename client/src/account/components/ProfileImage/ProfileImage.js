import React, { useState } from 'react';
import { Avatar, Typography, Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import { height } from '@mui/system';
import useAuth from '../../../context/Auth';
import './ProfileImage.css';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import initialToColor from '../../../globalComponents/InitialToColor';
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
            height: '15rem',
            width: '15rem',
          }}
        >
          <Typography variant="h3">{`${paramUser.first[0]}${paramUser.last[0]}`}</Typography>
        </Avatar>
        <Typography variant="h4" pt="10px" fontWeight="bold">
          {user.first} {user.last}
        </Typography>
        <Typography variant="h7" pb="10px">
          {user.email}
        </Typography>
        <Typography variant="h7" pb="10px">
          {user.university}
        </Typography>
        <TextField
          id="outlined-multiline-static"
          label="Bio"
          multiline
          rows={4}
          // color="gray"
          disabled={user._id === paramUser._id ? null : 'true'}
          defaultValue="Say something!"
        />

        {user._id === paramUser._id ? (
          <Button
            variant="contained"
            sx={{
              color: '#0583D2',
              backgroundColor: 'white',
              mt: '10px',
              ':hover': {
                backgroundColor: 'white',
              },
            }}
          >
            Edit Profile Photo
            {/* <FileUpload handleFileUpload={handleFileUpload} /> */}
          </Button>
        ) : null}
      </Grid>
    </div>
  );
};

export default ProfileImage;
