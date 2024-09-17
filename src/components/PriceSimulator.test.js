import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import PriceSimulator from './PriceSimulator';
import PriceDisplay from './PriceDisplay'; 
jest.mock('./PriceDisplay', () => {
  return ( { currentPrice, symbol } ) => (
    <div data-testid="price-display">
      {symbol} : {currentPrice}
    </div>
  );
} );
describe('PriceSimulator', () => {
  test('renders initial UI correctly', () => {
    const setPrices = jest.fn();
    act(() => {
      render(<PriceSimulator setPrices= {setPrices} />);
    } );
    expect(screen.getByText('Price Simulator')).toBeInTheDocument();
    expect(screen.getByLabelText('New Price')).toHaveValue('');
  } );
  test('changes price when Change Price button is clicked', () => {
    const setPrices = jest.fn();
    act(() => {
      render(<PriceSimulator setPrices= {setPrices} />);
    } );
    fireEvent.change(screen.getByLabelText('New Price'), { target: { value: '1.1234' } } );
    fireEvent.click(screen.getByText('Change Price'));
    expect(setPrices).toHaveBeenCalledWith( { EURUSD: { bid: 1.1234, ask: 1.1235 } } );
    expect(screen.getByLabelText('New Price')).toHaveValue('');
  } );
  test('updates price display with new price', () => {
    const setPrices = jest.fn();
    act(() => {
      render(<PriceSimulator setPrices= {setPrices} />);
    } );
    fireEvent.change(screen.getByLabelText('New Price'), { target: { value: '1.2345' } } );
    fireEvent.click(screen.getByText('Change Price'));
    expect(screen.getByTestId('price-display')).toHaveTextContent('EURUSD: 1.2345');
  } );
  test('updates prices periodically', () => {
    const setPrices = jest.fn();
    jest.useFakeTimers(); // タイマーをモック
    act(() => {
      render(<PriceSimulator setPrices= {setPrices} />);
    } );
    act(() => {
      jest.advanceTimersByTime(3000); // 3秒進める
    } );
    expect(setPrices).toHaveBeenCalledTimes(1); // 1回呼び出されたことを確認
    act(() => {
      jest.advanceTimersByTime(6000); // さらに6秒進める
    } );
    expect(setPrices).toHaveBeenCalledTimes(3); // 合計3回呼び出されたことを確認
    jest.useRealTimers(); // モックタイマーを解除
  } );
} );