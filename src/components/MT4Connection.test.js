import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import MT4Connection from './MT4Connection'; 
describe('MT4Connection', () => {
  test('renders disconnected status and Connect button by default', () => {
    act(() => {
      render(<MT4Connection onConnect= {jest.fn()} />); // status を渡さない
    } );
    expect(screen.getByText('MT4: disconnected')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Connect' } )).toBeInTheDocument();
  } );
  test('renders disconnected status and Connect button', () => {
    act(() => {
      render(<MT4Connection status="disconnected" onConnect= {jest.fn()} />);
    } );
    expect(screen.getByText('MT4: disconnected')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Connect' } )).toBeInTheDocument();
  } );
  test('renders connected status and Disconnect button', () => {
    act(() => {
      render(<MT4Connection status="connected" onDisconnect= {jest.fn()} />);
    } );
    expect(screen.getByText('MT4: connected')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Disconnect' } )).toBeInTheDocument();
  } );
  test('calls onConnect when Connect button is clicked', () => {
    const onConnect = jest.fn();
    act(() => {
      render(<MT4Connection status="disconnected" onConnect= {onConnect} />);
    } );
    fireEvent.click(screen.getByRole('button', { name: 'Connect' } ));
    expect(onConnect).toHaveBeenCalledTimes(1);
  } );
  test('calls onDisconnect when Disconnect button is clicked', () => {
    const onDisconnect = jest.fn();
    act(() => {
      render(<MT4Connection status="connected" onDisconnect= {onDisconnect} />);
    } );
    fireEvent.click(screen.getByRole('button', { name: 'Disconnect' } ));
    expect(onDisconnect).toHaveBeenCalledTimes(1);
  } );
} );