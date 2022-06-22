import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const ScheduleCard = ({ name, filters, snapshot }) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      xl={3}
      display="flex"
      justifyContent="center"
    >
      <Card
        sx={{
          width: 270,
          marginBottom: '2rem',
        }}
      >
        <CardActionArea>
          <CardMedia component="img" height="140" image={snapshot} alt={name} />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <Stack direction="row" spacing={1}>
              {filters.length < 3 ? (
                filters.map((filter) => (
                  <Chip
                    key={filter}
                    label={
                      <Typography variant="body2" color="text.secondary">
                        {filter}
                      </Typography>
                    }
                  />
                ))
              ) : (
                <>
                  <Chip
                    label={
                      <Typography variant="body2" color="text.secondary">
                        {filters[0]}
                      </Typography>
                    }
                  />
                  <Chip
                    label={
                      <Typography variant="body2" color="text.secondary">
                        {filters[1]}
                      </Typography>
                    }
                  />
                  <Chip
                    label={
                      <Typography variant="body2" color="text.secondary">
                        {'+' + (filters.length - 2)}
                      </Typography>
                    }
                  />
                </>
              )}
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ScheduleCard;
