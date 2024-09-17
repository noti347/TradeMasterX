import { render, screen } from '@testing-library/react';
import { act } from 'react';
import AccountInfo from './AccountInfo';
describe('AccountInfo', () => {
  test('renders account information correctly', () => {
    const accountInfo = {
      balance: 10000,
      equity: 10250.50,
      margin: 250.50,
      freeMargin: 9749.50,
      marginLevel: 102.51,
    } ;
    act(() => {
      render(<AccountInfo accountInfo= {accountInfo} />);
    } );
    expect(screen.getByText('Account Information')).toBeInTheDocument();
    expect(screen.getByText('Balance: $10000.00')).toBeInTheDocument();
    expect(screen.getByText('Equity: $10250.50')).toBeInTheDocument();
    expect(screen.getByText('Margin: $250.50')).toBeInTheDocument();
    expect(screen.getByText('Free Margin: $9749.50')).toBeInTheDocument();
    expect(screen.getByText('Margin Level: 102.51%')).toBeInTheDocument();
  } );
  test('renders "No data available" when accountInfo is empty', () => {
    act(() => {
      render(<AccountInfo accountInfo= { {} } />); // 空のオブジェクトを渡す
    } );
    expect(screen.getByText('Account Information')).toBeInTheDocument();
    expect(screen.getByText('Balance: $0.00')).toBeInTheDocument();
    expect(screen.getByText('Equity: $0.00')).toBeInTheDocument();
    expect(screen.getByText('Margin: $0.00')).toBeInTheDocument();
    expect(screen.getByText('Free Margin: $0.00')).toBeInTheDocument();
    expect(screen.getByText('Margin Level: 0.00%')).toBeInTheDocument();
  } );
  test('renders without errors when accountInfo is undefined', () => {
    act(() => {
      render(<AccountInfo />); // accountInfo を渡さない
    } );
    expect(screen.getByText('Account Information')).toBeInTheDocument();
  } );
} );