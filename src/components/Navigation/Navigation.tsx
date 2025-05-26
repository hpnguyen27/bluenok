import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import DarkModeToggle from './DarkModeToggle';
import styles from './NavigationBar.module.css';
import logo from '../../assets/Untitled.png';

const NavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

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

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    document.addEventListener('mousedown', closeMenu);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', closeMenu);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Logo" className={styles.logoImage} />
        </Link>

        <div className={styles.menuContainer}>
          <div ref={menuRef} className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
            <Link 
              to="/about" 
              onClick={handleLinkClick}
              className={location.pathname === '/about' ? styles.active : ''}
            >
              About Me
            </Link>
            <Link 
              to="/blog" 
              onClick={handleLinkClick}
              className={location.pathname === '/blog' ? styles.active : ''}
            >
              My Blog
            </Link>
            <Link 
              to="/contact" 
              onClick={handleLinkClick}
              className={location.pathname === '/contact' ? styles.active : ''}
            >
              Contact Me
            </Link>
          </div>
          
          <div className={styles.darkModeWrapper}>
            <DarkModeToggle />
          </div>
        </div>

        <button
          ref={burgerRef}
          className={`${styles.burger} ${isOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <FontAwesomeIcon 
            icon={isOpen ? faTimes : faBars} 
            style={{ transition: 'all 0.3s ease' }}
          />
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;