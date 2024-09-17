import { render, screen } from '@testing-library/react';
import { act } from 'react';
import RiskManagement from './RiskManagement';
describe('RiskManagement', () => {
  test('renders risk management metrics correctly', () => {
    const positions = [
      { volume: 0.1 } ,
      { volume: 0.2 } ,
    ];
    const accountInfo = {
      balance: 10000,
      equity: 9800,
    } ;
    act(() => {
      render(<RiskManagement positions= {positions} accountInfo= {accountInfo} />);
    } );
    expect(screen.getByText('Risk Management')).toBeInTheDocument();
    expect(screen.getByText('Total Risk: 3.00%')).toBeInTheDocument();
    expect(screen.getByText('Current Drawdown: 2.00%')).toBeInTheDocument();
    expect(screen.getByText('Open Positions: 2')).toBeInTheDocument();
    expect(screen.getByText('Total Exposure: $3000.00')).toBeInTheDocument();
  } );
  test('renders correct values when positions is empty', () => {
    const accountInfo = {
      balance: 10000,
      equity: 9800,
    } ;
    act(() => {
      render(<RiskManagement positions= {[]} accountInfo= {accountInfo} />);
    } );
    expect(screen.getByText('Risk Management')).toBeInTheDocument();
    expect(screen.getByText('Total Risk: 0.00%')).toBeInTheDocument();
    expect(screen.getByText('Open Positions: 0')).toBeInTheDocument();
    expect(screen.getByText('Total Exposure: $0.00')).toBeInTheDocument();
  } );
  test('handles zero balance gracefully', () => {
    const positions = [
      { volume: 0.1 } ,
    ];
    const accountInfo = {
      balance: 0,
      equity: 0,
    } ;
    act(() => {
      render(<RiskManagement positions= {positions} accountInfo= {accountInfo} />);
    } );
    expect(screen.getByText('Risk Management')).toBeInTheDocument();
    expect(screen.getByText('Total Risk: -%')).toBeInTheDocument();
    expect(screen.getByText('Current Drawdown: -%')).toBeInTheDocument(); 
  } );
  test('renders without errors when positions or accountInfo is undefined', () => {
    act(() => {
      render(<RiskManagement />);
    } );
    expect(screen.getByText('Risk Management')).toBeInTheDocument();
  } );
} );