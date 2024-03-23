import React from 'react';
import styles from './Home.module.css';
import QuoteOfTheDay from './QuoteOfTheDay';

const Home: React.FC = () => {
  const quoteOfTheDay = process.env.REACT_APP_QUOTE_OF_THE_DAY_INTRODUCTION

  return (
    <div className={styles.homeContainer}>
      <p className={styles.quoteOfTheDayTitle} >{quoteOfTheDay}</p>
      <QuoteOfTheDay />
    </div>
  );
};

export default Home;
