import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const PriceDisplay = ({ currentPrice, symbol }) => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Current Price</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
        <Typography variant="h4">{symbol}: {currentPrice}</Typography>
      </Box>
    </Paper>
  );
};

export default PriceDisplay;