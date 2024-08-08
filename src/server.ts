import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ?? 3001;

app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/api/quote', async (req, res) => {
  try {
    const response = await axios.get(process.env.REACT_APP_QUOTE_API_URL ?? '', {
      headers: {
        'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
      },
      params: { language_code: 'en' }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching quote:', error);
    if (axios.isAxiosError(error) && error.response) {
      res.status(error.response.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;