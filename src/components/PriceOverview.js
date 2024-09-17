import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
const PriceOverview = ( { prices } ) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>Price Overview</Typography>
      <TableContainer component= {Paper} >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell align="right">Bid</TableCell>
              <TableCell align="right">Ask</TableCell>
              <TableCell align="right">Spread</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(prices || {} ).map(([symbol, { bid, ask } ]) => ( // prices が undefined の場合を考慮
              <TableRow key= {symbol} >
                <TableCell component="th" scope="row">
                  {symbol}
                </TableCell>
                <TableCell align="right"> {(bid || 0).toFixed(5)} </TableCell> // bid が undefined の場合を考慮
                <TableCell align="right"> {(ask || 0).toFixed(5)} </TableCell> // ask が undefined の場合を考慮
                <TableCell align="right"> {(((ask || 0) - (bid || 0)) * 10000).toFixed(1)} </TableCell>
              </TableRow>
            ))}
            {}
            {Object.keys(prices || {} ).length === 0 && ( 
              <TableRow>
                <TableCell colSpan= {4} align="center">
                  <Typography variant="body2">No price data available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
} ;
export default PriceOverview;