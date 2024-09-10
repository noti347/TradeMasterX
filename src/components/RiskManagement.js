import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const RiskManagement = ({ positions, accountInfo }) => {
  const calculateTotalRisk = () => {
    const totalExposure = positions.reduce((sum, position) => sum + position.volume * 100000, 0);
    return ((totalExposure / accountInfo.balance) * 100).toFixed(2);
  };

  const calculateDrawdown = () => {
    const maxDrawdown = ((accountInfo.balance - accountInfo.equity) / accountInfo.balance * 100).toFixed(2);
    return Math.max(0, maxDrawdown);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>Risk Management</Typography>
      <List dense>
        <ListItem>
          <ListItemText primary="Total Risk" secondary={`${calculateTotalRisk()}%`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Current Drawdown" secondary={`${calculateDrawdown()}%`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Open Positions" secondary={positions.length} />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Total Exposure" 
            secondary={`$${positions.reduce((sum, position) => sum + position.volume * 100000, 0).toFixed(2)}`} 
          />
        </ListItem>
      </List>
    </>
  );
};

export default RiskManagement;