import React, { useEffect, useRef } from 'react';
import styles from './About.module.css';
import signatureImage from '../../assets/signature.png';

const About: React.FC = () => {
  const signatureRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.fadeInUp);
        }
      });
    }, { threshold: 0.3 });

    if (signatureRef.current) {
      observer.observe(signatureRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.aboutSection}>
      <div className={styles.contentWrapper}>
        <div className={styles.heroSection}>
          <h1 className={styles.mainTitle}>My Judgement-Free Zone!</h1>
          <p className={styles.subtitle}>
            (AKA: A Place Where I Say Things and Pretend No One Judges Me)
          </p>
        </div>
        
        <div className={styles.mainContent}>
          <div className={styles.introBlock}>
            <p className={styles.introText}>
              This is where I spill my thoughts on business, technology, and whatever else crosses my mind—without fear of judgment. Feel free to read, nod, forget everything by tomorrow, or overanalyze it. No pressure—I won't know either way.
            </p>
            
            <p className={styles.highlightText}>
              <strong>But guess what? If you're here...</strong>
            </p>
            
            <p className={styles.subText}>
              So might as well enjoy my stories. Short or long—depends on your definition.
            </p>
          </div>
        </div>
        
        <div className={styles.signatureSection}>
          <img 
            ref={signatureRef}
            src={signatureImage} 
            alt="Personal signature" 
            className={styles.signatureImage}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
