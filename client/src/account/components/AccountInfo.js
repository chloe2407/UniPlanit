import React from 'react'
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import useAuth from '../../context/Auth';
import Textbox from '../Textbox/Textbox';


const AccountInfo = () => {
    const { user } = useAuth();
    return (
        <div>
            <Grid


                justifyContent="flex-start"
                alignItems="flex-start"
                textAlign='left'
            >
                <Typography variant='h4'>{`${user.first} ${user.last}`}</Typography>
                <Typography variant='h6' display='inline' textAlign='left'>Edit Profile</Typography>
                <hr></hr>
                <Grid
                    container
                    direction="row"

                >
                    <Grid item display='inline' className=' first' md={6} xs={12}>
                        <Typography xs={3}>
                            First name
                        </Typography>
                        <TextField xs={5}
                            disabled
                            id="outlined-read-only-input"
                            label={user.first}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item display='inline' className=' first' md={6} xs={12}>
                        <Textbox property='First name' value={user.first}></Textbox>
                        {/* <Typography>
                            Last name
                        </Typography>
                        <TextField
                            disabled
                            id="outlined-read-only-input"
                            label={user.last}
                            InputProps={{
                                readOnly: true,
                            }}
                        /> */}
                    </Grid>
                </Grid>

            </Grid>
        </div >
    )
}

export default AccountInfo

    // < Box sx = {{ '& > :not(style)': { m: 1 } }}>
    //             <TextField
    //                 id="input-with-icon-textfield"
    //                 label="Username"
    //                 InputProps={{
    //                     startAdornment: (
    //                         <InputAdornment position="start">
    //                             <AccountCircle />
    //                         </InputAdornment>
    //                     ),
    //                 }}
    //                 variant="standard"
    //             />
    //             <TextField
    //                 disabled
    //                 id="input-textfield"
    //                 label="jane.doe@email.com"
    //                 variant="standard"
    //                 sx={{ color: 'black' }}
    //             />
    //             <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
    //                 <Typography variant='h7'
    //                     sx={{ paddingRight: '20px' }} >Username</Typography>
    //                 <TextField id="input-with-sx" variant="standard"
    //                     label='username' />
    //             </Box>
    //         </Box >

    // <Grid
    //                 container
    //                 direction="row"
    //                 justifyContent="flex-start"
    //                 alignItems="flex-start"
    //                 // component="form"
    //                 sx={{
    //                     '& .MuiTextField-root': { m: 1, width: '25ch' },
    //                 }}
    //                 noValidate
    //                 autoComplete="off"
    //             >
    //                 <TextField
    //                     id="outlined-read-only-input"
    //                     label="First name"
    //                     defaultValue={user.first}
    //                     InputProps={{
    //                         readOnly: true,
    //                     }}
    //                 />
    //                 <TextField
    //                     id="outlined-read-only-input"
    //                     label="Last name"
    //                     defaultValue="Doe"
    //                     InputProps={{
    //                         readOnly: true,
    //                     }}
    //                 />
    //                 <TextField
    //                     id="outlined-read-only-input"
    //                     label="Email"
    //                     type="email"
    //                     defaultValue="jane.doe@email.com"
    //                     InputProps={{
    //                         readOnly: true,
    //                     }}
    //                 />
    //                 <TextField
    //                     id="outlined-read-only-input"
    //                     label="Password"
    //                     type="password"
    //                     defaultValue="password"
    //                     InputProps={{
    //                         readOnly: true,
    //                     }}
    //                 />

    //                 <TextField
    //                     id="outlined-number"
    //                     label="Email"
    //                     type="email"
    //                     InputLabelProps={{
    //                         shrink: true,
    //                     }}
    //                 />
    //             </Grid>