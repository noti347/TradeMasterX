import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
const PositionManagement = ( { positions = [] } ) => { // positions にデフォルト値を設定
  const handleClosePosition = (positionId) => {
    console.log('Closing position:', positionId);
  } ;
  return (
    <>
      <Typography variant="h6" gutterBottom>Open Positions</Typography>
      <TableContainer component= {Paper} >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Ticket</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Volume</TableCell>
              <TableCell>Open Price</TableCell>
              <TableCell>S/L</TableCell>
              <TableCell>T/P</TableCell>
              <TableCell>Profit</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {positions.map((position) => (
              <TableRow key= {position.ticket} >
                <TableCell> {position.ticket} </TableCell>
                <TableCell> {position.symbol} </TableCell>
                <TableCell> {position.type} </TableCell>
                <TableCell> {position.volume} </TableCell>
                <TableCell> {position.openPrice} </TableCell>
                <TableCell> {position.stopLoss} </TableCell>
                <TableCell> {position.takeProfit} </TableCell>
                <TableCell> {position.profit} </TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick= {() => handleClosePosition(position.ticket)} >
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {}
            {positions.length === 0 && (
              <TableRow>
                <TableCell colSpan= {9} align="center">
                  <Typography variant="body2">No open positions</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
} ;
export default PositionManagement;