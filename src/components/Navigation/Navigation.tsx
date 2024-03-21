import React from 'react';
import styles from './NavigationBar.module.css';
import logo from '../../assets/Untitled.png'
import { Link } from 'react-router-dom'; // Import Link


const NavigationBar: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.logo}>  {/* Use Link here */}
        <img src={logo} alt="Logo" className={styles.logoImage}/>
      </Link>
      <div className={styles.menu}>
        <a href="/about">About</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact</a>
      </div>
    </div>
  );
};

export default NavigationBar;
