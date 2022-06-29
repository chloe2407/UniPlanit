import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useAuth from '../../../context/Auth';
import './ProfileImage.css';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import initialToColor from '../../../globalComponents/InitialToColor';
import FileUpload from './FileUpload';
import ImageUpload from './ImageUpload';

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
        {user.profileImg ? (
          <div>{user.profileImg}</div>
        ) : (
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
        )}

        {/* {user._id === paramUser._id ? (
          <ImageUpload />
        ) : null} */}
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
      </Grid>
      <Button variant="contained" component="label">
        Upload File
        <input type="file" hidden />
      </Button>
    </div>
  );
};

export default ProfileImage;
