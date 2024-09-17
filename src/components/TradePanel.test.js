import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import TradePanel from './TradePanel';
describe('TradePanel', () => {
  const prices = {
    EURUSD: { bid: 1.1000, ask: 1.1001 } ,
    GBPUSD: { bid: 1.2500, ask: 1.2501 } ,
  } ;
  test('renders initial UI correctly', () => {
    act(() => {
      render(<TradePanel onOrderSubmit= {jest.fn()} prices= {prices} />);
    } );
    expect(screen.getByText('New Order')).toBeInTheDocument();
    expect(screen.getByLabelText('Symbol')).toHaveValue('EURUSD');
    expect(screen.getByLabelText('Volume')).toHaveValue(0.1);
    expect(screen.getByLabelText('Order Type')).toHaveValue('Market');
    expect(screen.queryByLabelText('Price')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Stop Loss')).toHaveValue('');
    expect(screen.getByLabelText('Take Profit')).toHaveValue('');
  } );
  test('updates state on input change', () => {
    act(() => {
      render(<TradePanel onOrderSubmit= {jest.fn()} prices= {prices} />);
    } );
    fireEvent.change(screen.getByLabelText('Symbol'), { target: { value: 'GBPUSD' } } );
    fireEvent.change(screen.getByLabelText('Volume'), { target: { value: '0.5' } } );
    fireEvent.change(screen.getByLabelText('Order Type'), { target: { value: 'Limit' } } );
    fireEvent.change(screen.getByLabelText('Price'), { target: { value: '1.2400' } } );
    fireEvent.change(screen.getByLabelText('Stop Loss'), { target: { value: '1.2300' } } );
    fireEvent.change(screen.getByLabelText('Take Profit'), { target: { value: '1.2600' } } );
    expect(screen.getByLabelText('Symbol')).toHaveValue('GBPUSD');
    expect(screen.getByLabelText('Volume')).toHaveValue(0.5);
    expect(screen.getByLabelText('Order Type')).toHaveValue('Limit');
    expect(screen.getByLabelText('Price')).toHaveValue(1.2400); 
    expect(screen.getByLabelText('Stop Loss')).toHaveValue(1.2300);
    expect(screen.getByLabelText('Take Profit')).toHaveValue(1.2600);
  } );
  test('submits buy order with market price', () => {
    const onOrderSubmit = jest.fn();
    act(() => {
      render(<TradePanel onOrderSubmit= {onOrderSubmit} prices= {prices} />);
    } );
    fireEvent.click(screen.getByText('Buy'));
    expect(onOrderSubmit).toHaveBeenCalledTimes(1);
    expect(onOrderSubmit).toHaveBeenCalledWith( {
      symbol: 'EURUSD',
      volume: 0.1,
      orderType: 'Market',
      action: 'Buy',
      price: 1.1001,
      stopLoss: null,
      takeProfit: null,
    } );
  } );
  test('submits sell order with market price', () => {
    const onOrderSubmit = jest.fn();
    act(() => {
      render(<TradePanel onOrderSubmit= {onOrderSubmit} prices= {prices} />);
    } );
    fireEvent.click(screen.getByText('Sell'));
    expect(onOrderSubmit).toHaveBeenCalledTimes(1);
    expect(onOrderSubmit).toHaveBeenCalledWith( {
      symbol: 'EURUSD',
      volume: 0.1,
      orderType: 'Market',
      action: 'Sell',
      price: 1.1000,
      stopLoss: null,
      takeProfit: null,
    } );
  } );
  test('submits limit buy order', () => {
    const onOrderSubmit = jest.fn();
    act(() => {
      render(<TradePanel onOrderSubmit= {onOrderSubmit} prices= {prices} />);
    } );
    fireEvent.change(screen.getByLabelText('Order Type'), { target: { value: 'Limit' } } );
    fireEvent.change(screen.getByLabelText('Price'), { target: { value: '1.0950' } } );
    fireEvent.click(screen.getByText('Buy'));
    expect(onOrderSubmit).toHaveBeenCalledTimes(1);
    expect(onOrderSubmit).toHaveBeenCalledWith( {
      symbol: 'EURUSD',
      volume: 0.1,
      orderType: 'Limit',
      action: 'Buy',
      price: 1.0950,
      stopLoss: null,
      takeProfit: null,
    } );
  } );
  test('submits stop sell order with stop loss and take profit', () => {
    const onOrderSubmit = jest.fn();
    act(() => {
      render(<TradePanel onOrderSubmit= {onOrderSubmit} prices= {prices} />);
    } );
    fireEvent.change(screen.getByLabelText('Symbol'), { target: { value: 'GBPUSD' } } );
    fireEvent.change(screen.getByLabelText('Order Type'), { target: { value: 'Stop' } } );
    fireEvent.change(screen.getByLabelText('Price'), { target: { value: '1.2550' } } );
    fireEvent.change(screen.getByLabelText('Stop Loss'), { target: { value: '1.2600' } } );
    fireEvent.change(screen.getByLabelText('Take Profit'), { target: { value: '1.2400' } } );
    fireEvent.click(screen.getByText('Sell'));
    expect(onOrderSubmit).toHaveBeenCalledTimes(1);
    expect(onOrderSubmit).toHaveBeenCalledWith( {
      symbol: 'GBPUSD',
      volume: 0.1,
      orderType: 'Stop',
      action: 'Sell',
      price: 1.2550,
      stopLoss: 1.2600,
      takeProfit: 1.2400,
    } );
  } );
  test('renders without errors when prices is undefined', () => {
    act(() => {
      render(<TradePanel onOrderSubmit= {jest.fn()} />);
    } );
    expect(screen.getByText('New Order')).toBeInTheDocument();
  } );
} );