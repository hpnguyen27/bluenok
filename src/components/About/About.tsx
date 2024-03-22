import React from 'react';
import styles from './About.module.css';
import signatureImage from '../../assets/signature.png';

interface AboutProps {
  content?: string;
}

const About: React.FC<AboutProps> = ({ content }) => {
  const aboutContent = content || process.env.REACT_APP_ABOUT_CONTENT;

  return (
    <div className={styles.centeredContainer}>
      <p className={styles.styledParagraph}>{aboutContent}</p>
      <img src={signatureImage} alt="Signature" className={styles.signatureImage} />
    </div>
  );
};

export default About;
