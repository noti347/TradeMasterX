import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
const OrderManagement = ( { onOrderSubmit, pendingOrders = [] } ) => { // pendingOrders にデフォルト値を設定
  const [orders, setOrders] = useState(pendingOrders);
  const handleCancelOrder = (orderId) => {
    setOrders(orders.filter((order) => order.id !== orderId));
  } ;
  return (
    <>
      <Typography variant="h6" gutterBottom>Pending Orders</Typography>
      <TableContainer component= {Paper} >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Volume</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key= {order.id} >
                <TableCell> {order.id} </TableCell>
                <TableCell> {order.symbol} </TableCell>
                <TableCell> {order.type} </TableCell>
                <TableCell> {order.volume} </TableCell>
                <TableCell> {order.price} </TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick= {() => handleCancelOrder(order.id)} >
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {}
            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan= {6} align="center">
                  <Typography variant="body2">No pending orders</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
} ;
export default OrderManagement;