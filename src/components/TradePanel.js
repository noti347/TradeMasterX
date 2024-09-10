import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const TradePanel = ({ onOrderSubmit, prices }) => {
  const [symbol, setSymbol] = useState('EURUSD');
  const [volume, setVolume] = useState(0.1);
  const [orderType, setOrderType] = useState('Market');
  const [price, setPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');

  const handleSubmit = (action) => {
    onOrderSubmit({
      symbol,
      volume,
      orderType,
      action,
      price: orderType === 'Market' ? prices[symbol][action === 'Buy' ? 'ask' : 'bid'] : Number(price),
      stopLoss: stopLoss ? Number(stopLoss) : null,
      takeProfit: takeProfit ? Number(takeProfit) : null,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">New Order</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Symbol</InputLabel>
          <Select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
            {Object.keys(prices).map((sym) => (
              <MenuItem key={sym} value={sym}>{sym}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Volume"
          type="number"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          inputProps={{ step: 0.01, min: 0.01 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Order Type</InputLabel>
          <Select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
            <MenuItem value="Market">Market</MenuItem>
            <MenuItem value="Limit">Limit</MenuItem>
            <MenuItem value="Stop">Stop</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {orderType !== 'Market' && (
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Grid>
      )}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Stop Loss"
          type="number"
          value={stopLoss}
          onChange={(e) => setStopLoss(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Take Profit"
          type="number"
          value={takeProfit}
          onChange={(e) => setTakeProfit(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <Button fullWidth variant="contained" color="primary" onClick={() => handleSubmit('Buy')}>
          Buy
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button fullWidth variant="contained" color="secondary" onClick={() => handleSubmit('Sell')}>
          Sell
        </Button>
      </Grid>
    </Grid>
  );
};

export default TradePanel;