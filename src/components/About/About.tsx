import React, { useEffect, useRef } from 'react';
import styles from './About.module.css';
import signatureImage from '../../assets/signature.png';

interface AboutProps {
  content?: string;
}

const About: React.FC<AboutProps> = ({ content }) => {
  const aboutContent = content ?? process.env.REACT_APP_ABOUT_CONTENT;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const signatureElement = document.querySelector(`.${styles.signatureImage}`);
      if (signatureElement && containerRef.current) {
        const scrollPosition = window.innerHeight + window.scrollY;
        const signaturePosition = signatureElement.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition >= signaturePosition && containerRef.current.scrollHeight > window.innerHeight) {
          signatureElement.classList.add(styles.signatureImageAnimate);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.centeredContainer}>
      <p className={styles.styledParagraph}>{aboutContent}</p>
      <img src={signatureImage} alt="Signature" className={styles.signatureImage} />
    </div>
  );
};

export default About;