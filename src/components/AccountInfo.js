import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const AccountInfo = ({ accountInfo }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>Account Information</Typography>
      <List dense>
        <ListItem>
          <ListItemText primary="Balance" secondary={`$${accountInfo.balance.toFixed(2)}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Equity" secondary={`$${accountInfo.equity.toFixed(2)}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Margin" secondary={`$${accountInfo.margin.toFixed(2)}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Free Margin" secondary={`$${accountInfo.freeMargin.toFixed(2)}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Margin Level" secondary={`${accountInfo.marginLevel.toFixed(2)}%`} />
        </ListItem>
      </List>
    </>
  );
};

export default AccountInfo;