import { useState } from 'react';
import axios from 'axios';
import { Button, Box, Paper, Typography, TextField } from '@mui/material';

function App() {
  const [activity, setActivity] = useState('');
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('')
  const [mood, setMood] = useState('')
  const [numPeople, setNumPeople] = useState('')

  const getActivity = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/generate', {
        location,
        mood,
        numPeople
      });
      setActivity(response.data.activity);
    } catch (error) {
      setActivity("Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          p: 4,
          width: '500px',
          gap: 2,
          textAlign: 'center'
        }}
      >
        <Typography variant='h4'>
          Need something to do?
        </Typography>
        <TextField
          variant='outlined'
          label='Location (Optional)'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          variant='outlined'
          label='Mood (Optional)'
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
        <TextField
          variant='outlined'
          label='Num People (Optional)'
          value={numPeople}
          onChange={(e) => setNumPeople(e.target.value)}
        />
          <Button 
            variant="outlined"
            size='large'
            onClick={getActivity}>
              {loading ? "Thinking..." : "Surprise Me"}
          </Button>
          {activity && (
            <Typography
              variant='h6'
              sx={{ color: 'text.secondary' }}
            >
              {activity}
            </Typography>
          )}        
      </Paper>
      
    </Box>
  );
}

export default App;
