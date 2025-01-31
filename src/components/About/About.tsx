import React, { useEffect, useRef } from 'react';
import styles from './About.module.css';
import signatureImage from '../../assets/signature.png';

const About: React.FC = () => {
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
      <p className={styles.centeredText}>
        <strong>My Judgement-Free Zone!</strong>  
        <br />
        (AKA: A Place Where I Say Things and Pretend No One Judges Me)  
        <br /><br />
        This is where I spill my thoughts on business, technology, and whatever else crosses my mind—without fear of judgment (or at least, without <em>me</em> seeing it).  
        <br /><br />
        Feel free to read, nod, forget everything by tomorrow, or overanalyze it if you’ve got time. No pressure—I won’t know either way.  
        <br /><br />
        It’s also a place where you can follow my journey… or not. Honestly, I respect your right to not care.  
        <br /><br />
        <strong>But guess what? IF YOU’RE HERE.</strong>  
        <br />
        So might as well enjoy my short stories. Or long ones. It all depends on your definition of “long.”  
      </p>
      <img src={signatureImage} alt="Signature" className={styles.signatureImage} />
    </div>
  );
};

export default About;
