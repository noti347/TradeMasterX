import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import OrderManagement from './OrderManagement';
describe('OrderManagement', () => {
  test('renders pending orders correctly', () => {
    const pendingOrders = [
      { id: 1, symbol: 'EURUSD', type: 'Buy', volume: 0.1, price: 1.1000 } ,
      { id: 2, symbol: 'GBPUSD', type: 'Sell', volume: 0.2, price: 1.2500 } ,
    ];
    act(() => {
      render(<OrderManagement pendingOrders= {pendingOrders} />);
    } );
    expect(screen.getByText('Pending Orders')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('EURUSD')).toBeInTheDocument();
    expect(screen.getByText('Buy')).toBeInTheDocument();
    expect(screen.getByText('0.1')).toBeInTheDocument();
    expect(screen.getByText('1.1000')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('GBPUSD')).toBeInTheDocument();
    expect(screen.getByText('Sell')).toBeInTheDocument();
    expect(screen.getByText('0.2')).toBeInTheDocument();
    expect(screen.getByText('1.2500')).toBeInTheDocument();
  } );
  test('calls handleCancelOrder when Cancel button is clicked', () => {
    const handleCancelOrder = jest.fn();
    const pendingOrders = [
      { id: 1, symbol: 'EURUSD', type: 'Buy', volume: 0.1, price: 1.1000 } ,
    ];
    act(() => {
      render(<OrderManagement pendingOrders= {pendingOrders} handleCancelOrder= {handleCancelOrder} />);
    } );
    fireEvent.click(screen.getAllByRole('button', { name: 'Cancel' } )[0]); 
    expect(handleCancelOrder).toHaveBeenCalledTimes(1);
    expect(handleCancelOrder).toHaveBeenCalledWith(1);
  } );
  test('removes order from pendingOrders when handleCancelOrder is called', () => {
    const pendingOrders = [
      { id: 1, symbol: 'EURUSD', type: 'Buy', volume: 0.1, price: 1.1000 } ,
    ];
    act(() => {
      render(<OrderManagement pendingOrders= {pendingOrders} />);
    } );
    fireEvent.click(screen.getAllByRole('button', { name: 'Cancel' } )[0]); 
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText('EURUSD')).not.toBeInTheDocument();
    expect(screen.queryByText('Buy')).not.toBeInTheDocument();
    expect(screen.queryByText('0.1')).not.toBeInTheDocument();
    expect(screen.queryByText('1.1000')).not.toBeInTheDocument(); 
  } );
  test('renders "No pending orders" message when pendingOrders is empty', () => {
    act(() => {
      render(<OrderManagement pendingOrders= {[]} />);
    } );
    expect(screen.getByText('Pending Orders')).toBeInTheDocument();
    expect(screen.getByText('No pending orders')).toBeInTheDocument();
  } );
} );