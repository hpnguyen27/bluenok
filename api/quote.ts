import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios, { AxiosError } from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await axios.get(process.env.REACT_APP_QUOTE_API_URL || '', {
      headers: {
        'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
      },
      params: { language_code: 'en' }
    });

    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching quote:', error);
    
    if (axios.isAxiosError(error)) {
      // This is an Axios error
      const axiosError = error as AxiosError;
      res.status(axiosError.response?.status || 500).json({ 
        error: 'Failed to fetch quote',
        message: axiosError.message,
        details: axiosError.response?.data
      });
    } else if (error instanceof Error) {
      // This is a standard Error object
      res.status(500).json({ 
        error: 'An unexpected error occurred',
        message: error.message
      });
    } else {
      // This is an unknown error
      res.status(500).json({ 
        error: 'An unknown error occurred'
      });
    }
  }
}