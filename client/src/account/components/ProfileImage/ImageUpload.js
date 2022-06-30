import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ImageUploading from 'react-images-uploading';
import Button from '@mui/material/Button';

import useAuth from 'context/auth';

function ImageUpload() {
  const [images, setImages] = React.useState(
    URL(
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    )
  );
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    // setImages(imageList);
    // user.profileImg = imageList;
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState == 2) {
        setImages(reader.result);
      }
    };
    // reader.readAsDataURL(imageList)
  };

  const user = useAuth();

  return (
    <div>
      <img src={images} alt="" id="img" className="img" />
      <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <Button
              onClick={onImageUpload}
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
            </Button>
            &nbsp;
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default ImageUpload;
