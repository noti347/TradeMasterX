import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import PriceDisplay from './PriceDisplay';
const PriceSimulator = ( { setPrices } ) => {
  const [symbol, setSymbol] = useState('EURUSD');
  const [newPrice, setNewPrice] = useState('');
  const handlePriceChange = () => {
    if (newPrice !== '') {
      setPrices((prevPrices) => ( {
        ...prevPrices,
        [symbol]: { bid: Number(newPrice), ask: Number(newPrice) + 0.0001 } ,
      } ));
      setNewPrice('');
    }
  } ;
  useEffect(() => {
    const interval = setInterval(() => {
      const randomChange = (Math.random() - 0.5) * 0.0005;
      setPrices((prevPrices) => ( {
        ...prevPrices,
        [symbol]: { 
          bid: (prevPrices[symbol]?.bid || 1.1000) + randomChange, 
          ask: (prevPrices[symbol]?.ask || 1.1001) + randomChange, 
        } ,
      } ));
    } , 3000);
    return () => clearInterval(interval);
  } , [symbol, setPrices]); 
  return (
    <Grid container spacing= {2} >
      <Grid item xs= {12} >
        <Typography variant="h6" gutterBottom>Price Simulator</Typography>
      </Grid>
      <Grid item xs= {12} sm= {6} >
        <PriceDisplay currentPrice= {prices[symbol]?.bid || '-'} symbol= {symbol} />
      </Grid>
      <Grid item xs= {12} sm= {6} >
        <TextField
          label="New Price"
          type="number"
          value= {newPrice}
          onChange= {(e) => setNewPrice(e.target.value)}
        />
      </Grid>
      <Grid item xs= {12} >
        <Button variant="contained" onClick= {handlePriceChange} >
          Change Price
        </Button>
      </Grid>
    </Grid>
  );
} ;
export default PriceSimulator;