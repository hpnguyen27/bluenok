import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  currentTheme: 'light' | 'dark' | 'system';
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check system preference
  const getSystemPreference = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }

    const updateDarkMode = () => {
      const theme = savedTheme || 'system';
      if (theme === 'system') {
        setIsDarkMode(getSystemPreference());
      } else {
        setIsDarkMode(theme === 'dark');
      }
    };

    updateDarkMode();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (currentTheme === 'system') {
        setIsDarkMode(getSystemPreference());
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [currentTheme]);

  // Update CSS variables and body class
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (isDarkMode) {
      body.classList.add('dark-mode');
      // Dark mode variables
      root.style.setProperty('--bg-color', '#1a1a1a');
      root.style.setProperty('--text-color', '#ffffff');
      root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.05)');
      root.style.setProperty('--card-border', 'rgba(255, 255, 255, 0.1)');
      root.style.setProperty('--nav-bg', 'rgba(26, 26, 26, 0.95)');
      root.style.setProperty('--nav-border', 'rgba(152, 84, 2, 0.2)');
      // Blog-specific variables
      root.style.setProperty('--code-bg', '#2d3748');
      root.style.setProperty('--code-text', '#e2e8f0');
      root.style.setProperty('--link-color', '#ffcc66');
      root.style.setProperty('--link-hover-color', '#ffd700');
    } else {
      body.classList.remove('dark-mode');
      // Light mode variables
      root.style.setProperty('--bg-color', '#f7f7f7');
      root.style.setProperty('--text-color', '#333333');
      root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.08)');
      root.style.setProperty('--card-border', 'rgba(255, 255, 255, 0.15)');
      root.style.setProperty('--nav-bg', 'rgba(255, 255, 255, 0.95)');
      root.style.setProperty('--nav-border', 'rgba(152, 84, 2, 0.08)');
      // Blog-specific variables
      root.style.setProperty('--code-bg', '#f6f8fa');
      root.style.setProperty('--code-text', '#24292e');
      root.style.setProperty('--link-color', '#985402');
      root.style.setProperty('--link-hover-color', '#a75d04');
    }
  }, [isDarkMode]);

  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
    
    if (theme === 'system') {
      setIsDarkMode(getSystemPreference());
    } else {
      setIsDarkMode(theme === 'dark');
    }
  };

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, setTheme, currentTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};