import React, { useState, useRef, useEffect } from 'react';
import styles from './NavigationBar.module.css';
import logo from '../../assets/Untitled.png';
import { Link } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      !burgerRef.current?.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeMenu);
    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  }, []);

  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Logo" className={styles.logoImage} />
      </Link>
      <div ref={menuRef} className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <a href="/about">About</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact</a>
      </div>
      <div
        ref={burgerRef}
        className={`${styles.burger} ${isOpen ? styles.open : ''}`}
        onClick={toggleMenu}
      >
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
    </div>
  );
};

export default NavigationBar;