import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import useAuth from '../../context/Auth';
import InfoBox from './InfoBox/InfoBox'
import Button from '@mui/material/Button';

const AccountInfo = () => {
    const { user } = useAuth();
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
                        <InfoBox
                            isEditing={isEditing}
                            property='First name'
                            value={first}
                            onChange={(e) => setFirst(e.target.value)}
                        ></InfoBox>
                    </Grid>
                    <Grid item display='inline' id='last' md={6} xs={12}>
                        <InfoBox isEditing={isEditing} property='Last name' value={last}
                            onChange={(e) => setLast(e.target.value)}
                        ></InfoBox>

                    </Grid>
                    <Grid item display='inline' id='email' xs={12}>
                        <InfoBox isEditing={isEditing} property='Email' value={email} onChange={(e) => setEmail(e.target.value)}></InfoBox>
                    </Grid>
                    <Grid item display='inline' id='university' xs={12}>
                        <InfoBox isEditing={isEditing} property='Institution' value={university} onChange={(e) => setUniversity(e.target.value)}></InfoBox>
                    </Grid>
                    {
                        isEditing ?
                            <Button
                                type='submit'
                                variant="outlined"
                                onClick={handleChange}
                                sx={{ color: '#0583D2', justifyContent: "flex-end" }}
                            >
                                Done
                            </Button>
                            : null
                    }

                </Grid>


            </Grid>
        </div >
    )
}

export default AccountInfo