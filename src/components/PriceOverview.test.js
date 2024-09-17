import { render, screen } from '@testing-library/react';
import { act } from 'react';
import PriceOverview from './PriceOverview';
describe('PriceOverview', () => {
  test('renders price data correctly', () => {
    const prices = {
      EURUSD: { bid: 1.1000, ask: 1.1001 } ,
      GBPUSD: { bid: 1.2500, ask: 1.2502 } ,
      USDJPY: { bid: 110.00, ask: 110.01 } ,
    } ;
    act(() => {
      render(<PriceOverview prices= {prices} />);
    } );
    expect(screen.getByText('Price Overview')).toBeInTheDocument();
    expect(screen.getByText('EURUSD')).toBeInTheDocument();
    expect(screen.getByText('1.10000')).toBeInTheDocument();
    expect(screen.getByText('1.10010')).toBeInTheDocument();
    expect(screen.getByText('1.0')).toBeInTheDocument();
    expect(screen.getByText('GBPUSD')).toBeInTheDocument();
    expect(screen.getByText('1.25000')).toBeInTheDocument();
    expect(screen.getByText('1.25020')).toBeInTheDocument();
    expect(screen.getByText('2.0')).toBeInTheDocument();
    expect(screen.getByText('USDJPY')).toBeInTheDocument();
    expect(screen.getByText('110.00000')).toBeInTheDocument();
    expect(screen.getByText('110.01000')).toBeInTheDocument();
    expect(screen.getByText('1.0')).toBeInTheDocument();
  } );
  test('renders "No price data available" message when prices is empty', () => {
    act(() => {
      render(<PriceOverview prices= { {} } />);
    } );
    expect(screen.getByText('Price Overview')).toBeInTheDocument();
    expect(screen.getByText('No price data available')).toBeInTheDocument();
  } );
  test('renders without errors when prices is undefined', () => {
    act(() => {
      render(<PriceOverview />);
    } );
    expect(screen.getByText('Price Overview')).toBeInTheDocument();
  } );
} );