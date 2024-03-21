import React from 'react';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const homeContent = process.env.REACT_APP_HOME_CONTENT;

  return (
    <div className={styles.homeContainer}>
      <p className={styles.homeParagraph}>{homeContent}</p>
    </div>
  );
};

export default Home;
