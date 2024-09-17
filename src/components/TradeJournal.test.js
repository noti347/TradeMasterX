import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import TradeJournal from './TradeJournal';
describe('TradeJournal', () => {
  beforeEach(() => {
    localStorage.clear(); // テスト前に localStorage をクリア
  } );
  test('loads entries from localStorage on mount', () => {
    const savedEntries = [
      { id: 1, text: 'Entry 1', timestamp: '2024-01-01T12:00:00.000Z' } ,
      { id: 2, text: 'Entry 2', timestamp: '2024-01-02T12:00:00.000Z' } ,
    ];
    localStorage.setItem('tradeJournalEntries', JSON.stringify(savedEntries));
    act(() => {
      render(<TradeJournal />);
    } );
    expect(screen.getByText('Trade Journal')).toBeInTheDocument();
    expect(screen.getByText('Entry 1')).toBeInTheDocument();
    expect(screen.getByText('Entry 2')).toBeInTheDocument();
  } );
  test('adds new entry to entries and localStorage', () => {
    act(() => {
      render(<TradeJournal />);
    } );
    fireEvent.change(screen.getByPlaceholderText('Add new journal entry'), { target: { value: 'New entry' } } );
    fireEvent.click(screen.getByText('Add Entry'));
    expect(screen.getByText('New entry')).toBeInTheDocument();
    expect(localStorage.getItem('tradeJournalEntries')).toContain('New entry');
  } );
  test('does not add empty entry', () => {
    act(() => {
      render(<TradeJournal />);
    } );
    fireEvent.change(screen.getByPlaceholderText('Add new journal entry'), { target: { value: '   ' } } );
    fireEvent.click(screen.getByText('Add Entry'));
    expect(localStorage.getItem('tradeJournalEntries')).toBeNull();
  } );
  test('displays journal entries with text and timestamp', () => {
    const entries = [
      { id: 1, text: 'Test entry', timestamp: '2024-01-01T12:00:00.000Z' } ,
    ];
    act(() => {
      render(<TradeJournal entries= {entries} />);
    } );
    expect(screen.getByText('Test entry')).toBeInTheDocument();
    expect(screen.getByText('1/1/2024, 9:00:00 PM')).toBeInTheDocument(); // タイムスタンプはロケールによって異なる
  } );
} );