import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const PriceOverview = ({ prices }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>Price Overview</Typography>
      <TableContainer component={Paper}>
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
            {Object.entries(prices).map(([symbol, { bid, ask }]) => (
              <TableRow key={symbol}>
                <TableCell component="th" scope="row">{symbol}</TableCell>
                <TableCell align="right">{bid.toFixed(5)}</TableCell>
                <TableCell align="right">{ask.toFixed(5)}</TableCell>
                <TableCell align="right">{((ask - bid) * 10000).toFixed(1)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PriceOverview;