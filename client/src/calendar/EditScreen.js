import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const EditScreen = ({ generatedTImeTables, timetableIndex, setOpenEdit }) => {
  const [demo, setDemo] = useState([
    { more: false, index: 1 },
    { more: false, index: 2 },
    { more: false, index: 3 },
  ]);
  const handleClick = (index) => {
    setDemo(
      demo.map((plan) => {
        if (index === plan.index) {
          return { ...plan, more: !plan.more };
        } else {
          return plan;
        }
      })
    );
  };
  return (
    <Box mt={2} sx={{ overflow: 'auto' }}>
      <Typography
        variant="h5"
        sx={{ display: 'flex', justifyContent: 'start', marginLeft: 3 }}
      >
        Possible plans
      </Typography>
      <List sx={{ maxHeight: '50vh', overflow: 'auto' }}>
        {demo.map((plan) => (
          <ListItem key={plan.index}>
            <Button sx={{ border: 1, width: '35vw', height: '10vh' }}>
              <Typography>Plan number {plan.index}</Typography>
              <IconButton
                onClick={() => {
                  handleClick(plan.index);
                }}
              >
                {plan.more ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              <Button onClick={() => setOpenEdit(false)}>confirm</Button>
              <Collapse in={plan.more} timeout="auto">
                aaaaaaaaaaaaaaaaaaaaaaaaaa
              </Collapse>
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EditScreen;
