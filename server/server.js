import express from 'express'
import axios from 'axios'
import cors from 'cors'
import { TOGETHER_API_KEY } from './key.js'

const app = express()
app.use(cors())
app.use(express.json())


app.post('/generate', async (req, res) => {
  const { location, mood, numPeople } = req.body;

  let prompt = 'Suggest a fun, spontaneous, physical activity someone could do. Keep it short and creative. This could be very random and try not to be basic.'

  if (location) {
    prompt += `Location is in ${location}`
  }

  if (mood) {
    prompt += `They're feeling ${mood}`
  }

  if (numPeople) {
    prompt += `There are ${numPeople} people`
  }

  prompt += ' Simply give brief description of activity. ~ 20 words'

  try {
    const response = await axios.post(
      'https://api.together.xyz/v1/chat/completions', 
      {
        model: 'meta-llama/Llama-Vision-Free',
        messages: [{ role: 'user', content: prompt}],
        temperature: 0.9,
        max_tokens: 50,
      },
      {
        headers: {
          'Authorization': `Bearer ${TOGETHER_API_KEY}`,
          'Content-Type': 'application/json'
        },
      }
    )
      const message = response.data.choices[0].message.content.trim();
      res.json({ activity: message });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate activity' });
  }
})

app.listen(5000, () => { console.log("Server started on port 5000") })