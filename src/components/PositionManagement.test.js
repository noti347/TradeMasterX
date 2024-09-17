import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import PositionManagement from './PositionManagement'; 
describe('PositionManagement', () => {
  test('renders open positions correctly', () => {
    const positions = [
      { ticket: 12345, symbol: 'EURUSD', type: 'Buy', volume: 0.1, openPrice: 1.1000, stopLoss: 1.0900, takeProfit: 1.1100, profit: 10.00 } ,
      { ticket: 67890, symbol: 'GBPUSD', type: 'Sell', volume: 0.2, openPrice: 1.2500, stopLoss: 1.2600, takeProfit: 1.2400, profit: -20.00 } ,
    ];
    act(() => {
      render(<PositionManagement positions= {positions} />);
    } );
    expect(screen.getByText('Open Positions')).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('EURUSD')).toBeInTheDocument();
    expect(screen.getByText('Buy')).toBeInTheDocument();
    expect(screen.getByText('0.1')).toBeInTheDocument();
    expect(screen.getByText('1.1000')).toBeInTheDocument();
    expect(screen.getByText('1.0900')).toBeInTheDocument();
    expect(screen.getByText('1.1100')).toBeInTheDocument();
    expect(screen.getByText('10.00')).toBeInTheDocument();
    expect(screen.getByText('67890')).toBeInTheDocument();
    expect(screen.getByText('GBPUSD')).toBeInTheDocument();
    expect(screen.getByText('Sell')).toBeInTheDocument();
    expect(screen.getByText('0.2')).toBeInTheDocument();
    expect(screen.getByText('1.2500')).toBeInTheDocument();
    expect(screen.getByText('1.2600')).toBeInTheDocument();
    expect(screen.getByText('1.2400')).toBeInTheDocument();
    expect(screen.getByText('-20.00')).toBeInTheDocument();
  } );
  test('calls handleClosePosition when Close button is clicked', () => {
    const handleClosePosition = jest.fn();
    const positions = [
      { ticket: 12345, symbol: 'EURUSD', type: 'Buy', volume: 0.1, openPrice: 1.1000, stopLoss: 1.0900, takeProfit: 1.1100, profit: 10.00 } ,
    ];
    act(() => {
      render(<PositionManagement positions= {positions} handleClosePosition= {handleClosePosition} />);
    } );
    fireEvent.click(screen.getByRole('button', { name: 'Close' } ));
    expect(handleClosePosition).toHaveBeenCalledTimes(1);
    expect(handleClosePosition).toHaveBeenCalledWith(12345);
  } );
  test('renders "No open positions" message when positions is empty', () => {
    act(() => {
      render(<PositionManagement positions= {[]} />);
    } );
    expect(screen.getByText('Open Positions')).toBeInTheDocument();
    expect(screen.getByText('No open positions')).toBeInTheDocument();
  } );
} );