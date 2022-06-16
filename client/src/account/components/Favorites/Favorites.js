import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const Favorites = () => {
    return (
        <div>

            <FavoriteIcon sx={{ paddingRight: "5px", paddingTop: '2px', height: '18px' }} />
            <Typography variant='p'>Favorited schedules</Typography>
        </div>
    )
}

export default Favorites