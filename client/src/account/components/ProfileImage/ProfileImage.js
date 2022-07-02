import React, { useState } from 'react';
import { Avatar, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import { height } from '@mui/system';
import useAuth from 'context/auth';
import Button from '@mui/material/Button';
import './ProfileImage.css';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import initialToColor from 'globalComponents/InitialToColor';
import FileUpload from './FileUpload';
// import ImageUpload from './ImageUpload';

const ProfileImage = ({ paramUser, isEditing, handleChange }) => {
  const [updateImage, setUpdateImage] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { user } = useAuth();

  const handleFileUpload = (img) => {
    console.log(img);
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
        <Button
          type="submit"
          variant="contained"
          sx={{
            color: '#0583D2',
            mt: '10px',
            width: '110px',
            background: 'white',
            ':hover': {
              backgroundColor: 'white',
            },
          }}
        >
          Upload File
          <input type="file" hidden />
        </Button>
        {/* {user._id === paramUser._id ? (
          <ImageUpload />
        ) : null} */}
        <Typography variant="h4" pt="10px" fontWeight="bold">
          {user.first} {user.last}
        </Typography>
        <Typography variant="subtitle1">
          {user.email + ' | ' + user.university}
        </Typography>
        {user._id === paramUser._id ? (
          <TextField
            id="outlined-multiline-static"
            label="Bio"
            multiline
            rows={4}
            InputProps={{
              readOnly: !isEditing,
            }}
            disabled={!isEditing}
            defaultValue="Say something!"
          />
        ) : (
          <TextField
            id="outlined-multiline-static"
            label="Bio"
            multiline
            rows={4}
            InputProps={{
              readOnly: !isEditing,
            }}
            disabled={true}
            defaultValue="Say something!"
          />
        )}
      </Grid>
    </div>
  );
};

export default ProfileImage;
