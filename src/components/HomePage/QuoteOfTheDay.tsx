import React, { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import styles from './QuoteOfTheDay.module.css';

interface Quote {
  content: string;
  author: string;
  dateFetched: string;
}

interface ApiResponse {
  content: string;
  originator: {
    name: string;
  };
}

const QuoteOfTheDay: React.FC = () => {
  const [quoteData, setQuoteData] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = useCallback(async (): Promise<void> => {
    try {
      const response = await axios.get<ApiResponse>(process.env.REACT_APP_QUOTE_API_URL!, {
        headers: {
          'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
        },
        params: { language_code: 'en' }
      });

      const { content, originator } = response.data;
      const author = originator.name;
      const dateFetched = new Date().toISOString().slice(0, 10);
      const quoteInfo: Quote = { content, author, dateFetched };
      
      localStorage.setItem('quoteData', JSON.stringify(quoteInfo));
      setQuoteData(quoteInfo);
      setIsLoading(false);
    } catch (error) {
      const errorMessage = error instanceof AxiosError
        ? `Network error: ${error.message}`
        : 'An unexpected error occurred';
      setError(errorMessage);
      setIsLoading(false);
      console.error('Error fetching quote:', error);
    }
  }, []);

  useEffect(() => {
    const savedQuote = localStorage.getItem('quoteData');
    const today = new Date().toISOString().slice(0, 10);

    if (savedQuote) {
      const quoteInfo = JSON.parse(savedQuote) as Quote;
      if (quoteInfo.dateFetched === today) {
        setQuoteData(quoteInfo);
        setIsLoading(false);
      } else {
        fetchQuote();
      }
    } else {
      fetchQuote();
    }
  }, [fetchQuote]);

  if (isLoading) {
    return <p className={styles.loading}>Loading quote...</p>;
  }

  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }

  return (
    <div className={styles.quoteContainer}>
      {quoteData && (
        <>
          <p className={styles.quote}>{quoteData.content}</p>
          <p className={styles.author}>{quoteData.author}</p>
        </>
      )}
    </div>
  );
};

export default QuoteOfTheDay;