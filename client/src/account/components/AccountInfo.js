import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import useAuth from '../../context/Auth';
import InfoBox from './InfoBox/InfoBox'
import Profile from './Profile/Profile';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';

import OutlinedInput from '@mui/material/OutlinedInput';

const AccountInfo = () => {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [first, setFirst] = useState(user.first);
    const [last, setLast] = useState(user.last);
    const [email, setEmail] = useState(user.email);
    const [isEditing, setIsEditing] = useState(false);
    const [university, setUniversity] = useState(user.university);

    const handleChange = () => {
        setIsEditing(!isEditing);

    }

    return (
        <div>
            <Grid
                justifyContent="flex-start"
                alignItems="flex-start"
                textAlign='left'
            >
                <Typography variant='h4'>{`${first} ${last}`}</Typography>
                <Button sx={{ color: "#0583D2", fontWeight: "bold" }} onClick={handleChange} >
                    Edit Profile
                </Button>

                <hr></hr>
                <Grid
                    container
                    direction="row"
                    sx={{ paddingTop: '15px' }}
                    spacing={1}
                >
                    <Grid item display='inline' id='first' md={6} xs={12}>
                        <InfoBox isEditing={isEditing} property='First name' value={first}></InfoBox>
                    </Grid>
                    <Grid item display='inline' id='last' md={6} xs={12}>
                        <InfoBox property='Last name' value={last}></InfoBox>

                    </Grid>
                    <Grid item display='inline' id='email' xs={12}>
                        <InfoBox property='Email' value={email}></InfoBox>
                    </Grid>
                    <Grid item display='inline' id='university' xs={12}>
                        <InfoBox property='Institution' value={university}></InfoBox>
                    </Grid>
                    <Button variant="outlined">Done Editing</Button>

                </Grid>


            </Grid>
        </div >
    )
}

export default AccountInfo