import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './QuoteOfTheDay.module.css';

interface Quote {
  content: string;
  author: string;
  dateFetched: string;
}

const formatAuthorName = (authorSlug: string): string => {
  return authorSlug
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const QuoteOfTheDay: React.FC = () => {
  const [quoteData, setQuoteData] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuote = async () => {
      const response = await axios.get(process.env.REACT_APP_QUOTE_API_URL ?? '');
      const { content, authorSlug } = response.data[0];
      const author = formatAuthorName(authorSlug);
      const dateFetched = new Date().toISOString().slice(0, 10);
      const quoteInfo: Quote = { content, author, dateFetched };
      localStorage.setItem('quoteData', JSON.stringify(quoteInfo));
      setQuoteData(quoteInfo);
      setIsLoading(false);
    };

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
  }, []);

  if (isLoading) {
    return <p>Loading quote...</p>;
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
