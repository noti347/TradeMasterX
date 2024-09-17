import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import TimeControl from './TimeControl';
describe('TimeControl', () => {
  test('renders with default time frame selected', () => {
    const onTimeFrameChange = jest.fn();
    act(() => {
      render(<TimeControl onTimeFrameChange= {onTimeFrameChange} />);
    } );
    expect(screen.getByText('Time Control')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1 Minute' } )).toHaveAttribute('aria-selected', 'true');
  } );
  test('renders with specified time frame selected', () => {
    const onTimeFrameChange = jest.fn();
    const currentTimeFrame = 'M5';
    act(() => {
      render(<TimeControl onTimeFrameChange= {onTimeFrameChange} currentTimeFrame= {currentTimeFrame} />);
    } );
    expect(screen.getByText('Time Control')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '5 Minutes' } )).toHaveAttribute('aria-selected', 'true'); 
  } );
  test('renders all time frame options', () => {
    act(() => {
      render(<TimeControl onTimeFrameChange= {jest.fn()} currentTimeFrame="M1" />);
    } );
    expect(screen.getByText('Time Control')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '1 Minute' } )).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '5 Minutes' } )).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '15 Minutes' } )).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '30 Minutes' } )).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '1 Hour' } )).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '4 Hours' } )).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '1 Day' } )).toBeInTheDocument();
  } );
  test('calls onTimeFrameChange when time frame is changed', () => {
    const onTimeFrameChange = jest.fn();
    act(() => {
      render(<TimeControl onTimeFrameChange= {onTimeFrameChange} currentTimeFrame="M1" />);
    } );
    fireEvent.mouseDown(screen.getByRole('button', { name: /1 Minute/i } )); // ドロップダウンを開く
    fireEvent.click(screen.getByRole('option', { name: '1 Hour' } )); // '1 Hour' を選択
    expect(onTimeFrameChange).toHaveBeenCalledTimes(1);
    expect(onTimeFrameChange).toHaveBeenCalledWith('H1'); // 正しい値が渡されたかを確認
  } );
} );