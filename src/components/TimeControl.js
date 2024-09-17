import React from 'react';
import { Typography, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
const TimeControl = ( { onTimeFrameChange, currentTimeFrame = 'M1' } ) => { 
  const handleTimeFrameChange = (event) => {
    onTimeFrameChange(event.target.value);
  } ;
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Time Control</Typography>
      <FormControl fullWidth>
        <InputLabel>Time Frame</InputLabel>
        <Select value= {currentTimeFrame} onChange= {handleTimeFrameChange} >
          <MenuItem value="M1">1 Minute</MenuItem>
          <MenuItem value="M5">5 Minutes</MenuItem>
          <MenuItem value="M15">15 Minutes</MenuItem>
          <MenuItem value="M30">30 Minutes</MenuItem>
          <MenuItem value="H1">1 Hour</MenuItem>
          <MenuItem value="H4">4 Hours</MenuItem>
          <MenuItem value="D1">1 Day</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
} ;
export default TimeControl;