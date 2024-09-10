import React, { useState } from 'react';
import { Input, Button, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Container } from "@mui/material";

const Index = () => {
  const [symbol, setSymbol] = useState('USDJPY');
  const [volume, setVolume] = useState(0.1);
  const [stopLoss, setStopLoss] = useState(0);
  const [takeProfit, setTakeProfit] = useState(0);
  const [orders, setOrders] = useState([]);

  const handleOrder = (type) => {
    const currentPrice = type === 'buy' ? 108.204 : 108.174; // Simulated current price
    const newOrder = {
      id: orders.length + 1,
      type: type,
      volume: volume,
      openPrice: currentPrice,
      stopLoss: stopLoss,
      takeProfit: takeProfit,
      profit: 0,
    };
    setOrders([...orders, newOrder]);
  };

  const closeOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const closeAllOrders = () => {
    setOrders([]);
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100' }}>
      <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>New Order</Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
          <Box>
            <InputLabel htmlFor="symbol" sx={{ fontSize: 'small', fontWeight: 'bold' }}>Symbol</InputLabel>
            <Input
              id="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              fullWidth
            />
          </Box>
          <Box>
            <InputLabel htmlFor="volume" sx={{ fontSize: 'small', fontWeight: 'bold' }}>Volume</InputLabel>
            <Input
              id="volume"
              type="number"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              fullWidth
              inputProps={{ step: "0.01" }}
            />
          </Box>
        </Box>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
          <Box>
            <InputLabel htmlFor="stopLoss" sx={{ fontSize: 'small', fontWeight: 'bold' }}>Stop Loss</InputLabel>
            <Input
              id="stopLoss"
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(parseFloat(e.target.value))}
              fullWidth
            />
          </Box>
          <Box>
            <InputLabel htmlFor="takeProfit" sx={{ fontSize: 'small', fontWeight: 'bold' }}>Take Profit</InputLabel>
            <Input
              id="takeProfit"
              type="number"
              value={takeProfit}
              onChange={(e) => setTakeProfit(parseFloat(e.target.value))}
              fullWidth
            />
          </Box>
        </Box>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
          <Button variant="contained" color="primary" onClick={() => handleOrder('buy')}>
            Buy
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleOrder('sell')}>
            Sell
          </Button>
        </Box>
        
        <Typography variant="h5" fontWeight="bold" mb={1}>Open Positions</Typography>
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Ticket</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Volume</TableCell>
                <TableCell>Open Price</TableCell>
                <TableCell>S/L</TableCell>
                <TableCell>T/P</TableCell>
                <TableCell>Profit</TableCell>
                <TableCell>Close</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.type === 'buy' ? 'Buy' : 'Sell'}</TableCell>
                  <TableCell>{order.volume.toFixed(2)}</TableCell>
                  <TableCell>{order.openPrice.toFixed(3)}</TableCell>
                  <TableCell>{order.stopLoss}</TableCell>
                  <TableCell>{order.takeProfit}</TableCell>
                  <TableCell>{order.profit.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button color="error" onClick={() => closeOrder(order.id)}>×</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Button variant="contained" color="warning" onClick={closeAllOrders}>
            Close All
          </Button>
          <Button variant="contained" color="success">
            Close Profit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Index;