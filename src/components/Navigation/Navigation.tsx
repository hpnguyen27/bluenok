import React, { useState } from 'react';
import styles from './NavigationBar.module.css';
import logo from '../../assets/Untitled.png';
import { Link } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Logo" className={styles.logoImage} />
      </Link>
      <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <a href="/about">About</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact</a>
      </div>
      <div className={`${styles.burger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
    </div>
    </div>
  );
};

export default NavigationBar;