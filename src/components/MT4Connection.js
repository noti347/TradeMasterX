import React from 'react';
import { Button, Typography } from '@mui/material';

const MT4Connection = ({ status, onConnect, onDisconnect }) => {
  return (
    <>
      <Typography variant="body2" sx={{ mr: 2 }}>
        MT4: {status}
      </Typography>
      {status === 'disconnected' ? (
        <Button
          variant="contained"
          color="primary"
          onClick={onConnect}
          size="small"
        >
          Connect
        </Button>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          onClick={onDisconnect}
          size="small"
        >
          Disconnect
        </Button>
      )}
    </>
  );
};

export default MT4Connection;