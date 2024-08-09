import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await axios.get(process.env.REACT_APP_QUOTE_API_URL ?? '', {
      headers: {
        'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
      },
      params: { language_code: 'en' }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An unexpected error occurred in the API function' });
  }
}