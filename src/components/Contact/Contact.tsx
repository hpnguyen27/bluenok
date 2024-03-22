import React from 'react';
import styles from './Contact.module.css';
import linkedinIcon from '../../assets/linkedin.png';
import emailIcon from '../../assets/mail.png';

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
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
          <img src={linkedinIcon} alt="LinkedIn" className={styles.icon} />
        </a>
        <img
          src={emailIcon}
          alt="Email"
          className={styles.icon}
          onClick={handleEmailClick}
        />
      </div>
    </div>
  );
};

export default Contact;