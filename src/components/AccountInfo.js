import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
const AccountInfo = ( { accountInfo } ) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>Account Information</Typography>
      <List dense>
        <ListItem>
          <ListItemText primary="Balance" secondary= {`$$ {(accountInfo?.balance || 0).toFixed(2)} `} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Equity" secondary= {`$$ {(accountInfo?.equity || 0).toFixed(2)} `} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Margin" secondary= {`$$ {(accountInfo?.margin || 0).toFixed(2)} `} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Free Margin" secondary= {`$$ {(accountInfo?.freeMargin || 0).toFixed(2)} `} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Margin Level" secondary= {`$ {(accountInfo?.marginLevel || 0).toFixed(2)} %`} />
        </ListItem>
      </List>
    </>
  );
} ;
export default AccountInfo;