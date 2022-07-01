import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { useImg } from 'hooks/api/hooks';

const Banner = () => {
  const [imgUrl, loadImg] = useImg();

  useEffect(() => {
    loadImg();
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundImage: imgUrl && `url(${imgUrl})`,
          display: 'flex',
          flexDirection: 'column',
          height: '30rem',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3">About UniPlanit</Typography>

        <Typography variant="h6">Thank you for using our site.</Typography>
      </div>
    </div>
  );
};

export default Banner;
