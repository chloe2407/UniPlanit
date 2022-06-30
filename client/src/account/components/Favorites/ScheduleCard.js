import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const ScheduleCard = ({ name, filters, courses }) => {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={6}
      lg={6}
      xl={4}
      display="flex"
      justifyContent="center"
    >
      <Card
        sx={{
          width: 320,
        }}
      >
        <CardActionArea>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                mb: '2px',
              }}
            >
              <Typography gutterBottom variant="h6" component="div" m="0px">
                {name}
              </Typography>
              <IconButton onClick={() => null} sx={{ ml: 'auto', p: '-0px' }}>
                <DeleteOutlinedIcon />
              </IconButton>
            </Box>
            <Box>
              <Typography sx={{ textAlign: 'left', pl: '5px', pt: '5px' }}>
                Courses
              </Typography>
              <Grid container direction="row" spacing={1}>
                {courses.map((course) => (
                  <Grid item>
                    <Chip
                      sx={{
                        width: '100%',
                        margin: '0.5px',
                        backgroundColor: '#B7CCD0',
                      }}
                      key={course}
                      label={
                        <Typography variant="body2" color="text.secondary">
                          {course}
                        </Typography>
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box>
              <Typography sx={{ textAlign: 'left', pl: '5px', pt: '15px' }}>
                Filters
              </Typography>
              <Grid container direction="row" spacing={1}>
                {filters.map((filter) => (
                  <Grid item key={filter}>
                    <Chip
                      sx={{ width: '100%', margin: '0.5px' }}
                      key={filter}
                      label={<Typography variant="body2">{filter}</Typography>}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ScheduleCard;
