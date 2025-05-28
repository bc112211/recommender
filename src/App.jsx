import { useState } from 'react';
import axios from 'axios';
import { Button, Box, Paper, Typography } from '@mui/material';

function App() {
  const [activity, setActivity] = useState('');
  const [loading, setLoading] = useState(false);

  const getActivity = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/generate');
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
        }}
      >
        <Typography variant='h4'>
          Need something to do?
        </Typography>
          <Button 
            variant="outlined"
            size='large'
            sx={{ mt: 2}}
            onClick={getActivity}>
              {loading ? "Thinking..." : "Surprise Me"}
          </Button>
          {activity && (
            <Typography
              variant='h6'
              sx={{ mt: 2, color: 'text.secondary' }}
            >
              {activity}
            </Typography>
          )}        
      </Paper>
      
    </Box>
  );
}

export default App;
