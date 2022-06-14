import React from 'react'
import '../about.css'
import { Grid, Item, Typography } from '@mui/material'
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import GroupsIcon from '@mui/icons-material/Groups';


const AboutDescription = () => {
    const styles = {
        width: '100%',
        padding: '80px',
        paddingBottom: '80px',
    }
    return (
        <div>
            <div className='md-lg'>
                <Grid container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    sx={styles}
                >
                    <Grid item xs={6} >
                        <AssistantPhotoIcon />
                    </Grid>
                    <Grid item xs={6} >
                        <GroupsIcon />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            sx={{
                                paddingX: '30px'
                            }}
                        >
                            University students face the difficulty of Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            sx={{
                                paddingX: '30px'
                            }}
                        >
                            Created in 2022 summer, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <div className='xs-sm'>
                <Grid container
                    sx={styles}
                >
                    <Grid item xs={12} >
                        <AssistantPhotoIcon />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                paddingX: '30px'
                            }}
                        >
                            University students face the difficulty of Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{
                        paddingTop: '80px'
                    }} >
                        < GroupsIcon />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                paddingX: '30px'
                            }}
                        >
                            Created in 2022 summer, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                        </Typography>
                    </Grid>

                </Grid>

            </div>
        </div >
    )
}

export default AboutDescription