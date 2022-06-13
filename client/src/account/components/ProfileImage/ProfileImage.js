import React from 'react';
import { Avatar, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import { height } from '@mui/system';
import useAuth from '../../../context/Auth';
import './ProfileImage.css'
import { Box } from '@mui/system';
import { Grid } from '@mui/material';

const ProfileImage = () => {
    const { user } = useAuth();
    return (
        <div>
            <Grid
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
                textAlign='center'>
                {user.profileImg ?
                    <div className='profilePic' >
                        {user.profileImg}
                    </div>
                    :
                    <Avatar sx={{
                        bgcolor: orange[500],
                        height: '10rem',
                        width: '10rem',
                        fontSize: '2rem'
                    }}>
                    </Avatar>

                }
                <Typography variant='h6' textAlign='center'>Edit Picture</Typography>
            </Grid>
        </div >
    )
}

export default ProfileImage