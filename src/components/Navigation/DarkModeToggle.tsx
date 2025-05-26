import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from '../../contexts/DarkModeContext';
import styles from './DarkModeToggle.module.css';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, setTheme, currentTheme } = useDarkMode();
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleThemeSelect = (theme: 'light' | 'dark' | 'system') => {
    setTheme(theme);
    setShowMenu(false);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setShowMenu(false);
    if (showMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showMenu]);

  const getCurrentIcon = () => {
    switch (currentTheme) {
      case 'system':
        return faDesktop;
      case 'dark':
        return faMoon;
      default:
        return faSun;
    }
  };

  return (
    <div className={styles.darkModeContainer}>
      <button
        className={`${styles.themeButton} ${isDarkMode ? styles.dark : styles.light}`}
        onClick={handleClick}
        aria-label="Theme selector"
      >
        <span className={styles.currentIcon}>
          <FontAwesomeIcon icon={getCurrentIcon()} />
        </span>
        <span className={styles.dropdownArrow}>▼</span>
      </button>

      {showMenu && (
        <div className={styles.themeMenu}>
          <button
            className={`${styles.themeOption} ${currentTheme === 'light' ? styles.active : ''}`}
            onClick={() => handleThemeSelect('light')}
          >
            <span className={styles.themeIcon}>
              <FontAwesomeIcon icon={faSun} />
            </span>
            <span>Light</span>
          </button>
          <button
            className={`${styles.themeOption} ${currentTheme === 'dark' ? styles.active : ''}`}
            onClick={() => handleThemeSelect('dark')}
          >
            <span className={styles.themeIcon}>
              <FontAwesomeIcon icon={faMoon} />
            </span>
            <span>Dark</span>
          </button>
          <button
            className={`${styles.themeOption} ${currentTheme === 'system' ? styles.active : ''}`}
            onClick={() => handleThemeSelect('system')}
          >
            <span className={styles.themeIcon}>
              <FontAwesomeIcon icon={faDesktop} />
            </span>
            <span>System</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DarkModeToggle;