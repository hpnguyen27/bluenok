/* filepath: /Users/nin/Desktop/BlueNok/bluenok/src/components/Contact/Contact.tsx */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const linkedinUrl = process.env.REACT_APP_LINKEDIN_URL;
  const emailAddress = process.env.REACT_APP_EMAIL_ADDRESS;

  const handleEmailClick = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <div className={styles.contactContainer}>
      <p className={styles.contactText}>Feel free to contact me at:</p>
      <div className={styles.iconContainer}>
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
          <FontAwesomeIcon icon={faLinkedin} className={`${styles.icon} ${styles.linkedinIcon}`} />
        </a>
        <button onClick={handleEmailClick} className={styles.iconButton}>
          <FontAwesomeIcon icon={faEnvelope} className={`${styles.icon} ${styles.emailIcon}`} />
        </button>
      </div>
    </div>
  );
};

export default Contact;