import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
const TradeJournal = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  useEffect(() => {
    const savedEntries = localStorage.getItem('tradeJournalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  } , []);
  const handleAddEntry = () => {
    if (newEntry.trim()) {
      const updatedEntries = [
        { id: Date.now(), text: newEntry, timestamp: new Date().toISOString() } ,
        ...entries
      ];
      setEntries(updatedEntries);
      localStorage.setItem('tradeJournalEntries', JSON.stringify(updatedEntries));
      setNewEntry('');
    }
  } ;
  return (
    <>
      <Typography variant="h6" gutterBottom>Trade Journal</Typography>
      <TextField
        variant="outlined"
        value= {newEntry}
        onChange= {(e) => setNewEntry(e.target.value)}
        placeholder="Add new journal entry"
        size="small"
        sx= { { mb: 1 } }
      />
      <Button variant="contained" onClick= {handleAddEntry} sx= { { mb: 2 } } >
        Add Entry
      </Button>
      <List dense sx= { { maxHeight: 200, overflow: 'auto' } } >
        {entries.map((entry) => (
          <ListItem key= {entry.id} >
            <ListItemText
              primary= {entry.text}
              secondary= {new Date(entry.timestamp).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
} ;
export default TradeJournal;