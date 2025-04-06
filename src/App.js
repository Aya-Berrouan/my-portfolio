import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import './i18n'; // Import i18n configuration
import LanguageSwitcher from './components/LanguageSwitcher';
import emailjs from '@emailjs/browser';

// Available color themes
const colorThemes = {
  pink: {
    name: "Pink",
    primary: "#FFA4B8",
    secondary: "#E86C8D",
  },
  blue: {
    name: "Blue", 
    primary: "#64B5F6",
    secondary: "#1976D2",
  },
  green: {
    name: "Green",
    primary: "#81C784",
    secondary: "#388E3C",
  },
  purple: {
    name: "Purple",
    primary: "#BA68C8",
    secondary: "#7B1FA2",
  },
  orange: {
    name: "Orange",
    primary: "#FFB74D",
    secondary: "#F57C00",
  },
  teal: {
    name: "Teal",
    primary: "#4DB6AC",
    secondary: "#00796B",
  },
  red: {
    name: "Red",
    primary: "#EF5350",
    secondary: "#C62828",
  },
  yellow: {
    name: "Yellow",
    primary: "#FFEE58",
    secondary: "#FBC02D",
  },
  cyan: {
    name: "Cyan",
    primary: "#26C6DA",
    secondary: "#0097A7",
  }
};

// Blog post component to properly use hooks
const BlogPost = ({ post, index, isDarkMode, type }) => {
  const [showFullArticle, setShowFullArticle] = useState(false);
  const { t } = useTranslation();
  const isPrimary = type === 'fullstack';
  const colorVar = isPrimary ? '--color-primary' : '--color-secondary';
  const textColorClass = isPrimary ? 'text-primary' : 'text-secondary';

  return (
    <div 
      key={index} 
      className={`rounded-lg`}
    >
      <h4 className={`text-lg font-bold mb-3 ${textColorClass}`}>{post.title}</h4>
      
      {showFullArticle ? (
        <>
          <div 
            className={`text-sm mb-4 article-content ${isDarkMode ? 'text-soft-gray' : 'text-dark-gray'}`}
            style={{ whiteSpace: 'pre-wrap' }} 
            dangerouslySetInnerHTML={{ __html: post.content
              .replace(/\n\n## /g, '<br/><br/><h5 class="text-md font-bold mt-5 mb-2">')
              .replace(/\n\n### /g, '<br/><br/><h6 class="text-sm font-bold mt-4 mb-2">')
              .replace(/\n\n/g, '<br/><br/>')
              .replace(/<img.*?alt="(.*?)".*?>/g, '')
              .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 text-gray-200 p-4 rounded-md my-4 overflow-x-auto text-xs"><code>$1</code></pre>')
              .replace(/- (.*?)$/gm, '<div class="flex items-start mb-1"><span class="inline-block w-2 h-2 rounded-full mr-2 mt-1.5" style="background-color: var(' + colorVar + ')"></span><span>$1</span></div>')
            }}
          />
          <button
            onClick={() => setShowFullArticle(false)}
            className="text-sm font-medium mt-3 py-2 px-4 rounded-full transition-all duration-300 flex items-center"
            style={{ 
              backgroundColor: `rgba(var(${colorVar}-rgb), 0.1)`, 
              color: `var(${colorVar})`,
              border: `1px solid var(${colorVar})`
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            {t('blog.readLess')}
          </button>
        </>
      ) : (
        <>
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>
            {post.excerpt}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${textColorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className={textColorClass}>{post.date}</span>
              <span className={`mx-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>•</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{post.readTime}</span>
            </div>
            <button
              onClick={() => setShowFullArticle(true)}
              className="text-sm font-medium py-2 px-4 rounded-full transition-all duration-300 flex items-center"
              style={{ 
                backgroundColor: `rgba(var(${colorVar}-rgb), 0.1)`, 
                color: `var(${colorVar})`,
                border: `1px solid var(${colorVar})`
              }}
            >
              {t('blog.readMore')}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [colorTheme, setColorTheme] = useState('pink');
  const [activeTab, setActiveTab] = useState('Bio');
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState('');
  const colorPickerRef = useRef(null);
  const { t, i18n } = useTranslation();
  
  // Refs
  const contactFormRef = useRef(null);
  
  // Detect mobile size for proper theme switcher positioning
  // Check for mobile size on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') === 'dark';
    setDarkMode(savedTheme);
    
    const savedColorTheme = localStorage.getItem('colorTheme');
    if (savedColorTheme && Object.keys(colorThemes).includes(savedColorTheme)) {
      setColorTheme(savedColorTheme);
    }
    
    // Apply saved theme to document
    if (savedTheme) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty('--scrollbar-track-color', '#121212');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.setProperty('--scrollbar-track-color', '#f0f0f0');
    }
  }, []);

  // Apply color theme CSS variables
  useEffect(() => {
    if (colorTheme && colorThemes[colorTheme]) {
      const primary = colorThemes[colorTheme].primary;
      const secondary = colorThemes[colorTheme].secondary;
      
      // Set CSS variables
      document.documentElement.style.setProperty('--color-primary', primary);
      document.documentElement.style.setProperty('--color-secondary', secondary);
      
      // Set scrollbar variables to match theme
      document.documentElement.style.setProperty('--scrollbar-thumb-color', primary);
      document.documentElement.style.setProperty('--scrollbar-thumb-hover-color', secondary);
      
      // Parse and set RGB values
      const primaryRGB = hexToRgb(primary);
      const secondaryRGB = hexToRgb(secondary);
      if (primaryRGB) {
        document.documentElement.style.setProperty(
          '--color-primary-rgb', 
          `${primaryRGB.r}, ${primaryRGB.g}, ${primaryRGB.b}`
        );
      }
      if (secondaryRGB) {
        document.documentElement.style.setProperty(
          '--color-secondary-rgb', 
          `${secondaryRGB.r}, ${secondaryRGB.g}, ${secondaryRGB.b}`
        );
      }
      
      // Save to localStorage
      localStorage.setItem('colorTheme', colorTheme);
    }
  }, [colorTheme]);

  // Handle clicks outside of color picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setColorPickerOpen(false);
      }
    };

    if (colorPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [colorPickerOpen]);

  // Toggle dark/light theme
  const toggleTheme = () => {
    const newThemeValue = !darkMode;
    setDarkMode(newThemeValue);
    
    if (newThemeValue) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty('--scrollbar-track-color', '#121212');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.setProperty('--scrollbar-track-color', '#f0f0f0');
    }
    
    localStorage.setItem('theme', newThemeValue ? 'dark' : 'light');
  };

  // Change color theme
  const changeColorTheme = (themeName) => {
    if (colorThemes[themeName]) {
      // Add transition animation class
      const flowerImage = document.querySelector('.flower-emoji img');
      if (flowerImage) {
        flowerImage.classList.add('theme-changing');
        setTimeout(() => {
          flowerImage.classList.remove('theme-changing');
        }, 500); // Remove class after animation duration
      }
      
      setColorTheme(themeName);
      setColorPickerOpen(false);
    }
  };

  // Helper function to convert hex to RGB
  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Add this helper function before the return statement
  const getLevelIndicator = (level) => {
    let levelText = '';
    if (level >= 90) {
      levelText = t('skills.levels.expert');
    } else if (level >= 75) {
      levelText = t('skills.levels.advanced');
    } else if (level >= 60) {
      levelText = t('skills.levels.intermediate');
    } else {
      levelText = t('skills.levels.beginner');
    }
    
    return (
      <span 
        className="skill-level-indicator ml-2" 
        title={levelText}
      >
        {level >= 90 ? 'E' : level >= 75 ? 'A' : level >= 60 ? 'I' : 'B'}
      </span>
    );
  };

  // Add this useEffect after the existing state hooks
  useEffect(() => {
    // Scroll to active tab content
    const tabContent = document.getElementById('tab-content');
    if (tabContent) {
      tabContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeTab]);

  // Handle contact form submission
  const sendEmail = (e) => {
    e.preventDefault();
    setContactStatus('sending');

    // Add current time to the form data
    const currentTime = new Date().toLocaleString();
    const formData = new FormData(contactFormRef.current);
    formData.append('time', currentTime);

    // Convert FormData to template parameters object
    const templateParams = {
      user_name: formData.get('user_name'),
      user_email: formData.get('user_email'),
      message: formData.get('message'),
      time: currentTime
    };

    emailjs.send('service_0bjudu6', 'template_bb2i1xi', templateParams, 'KbrCLExvsOT5O0cSm')
      .then((result) => {
        setContactStatus('success');
        contactFormRef.current.reset();
      }, (error) => {
        setContactStatus('error');
        console.error('Error sending email:', error);
      });
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-dark-bg text-white' : 'bg-light-bg text-dark-gray'}`}>
      {/* Theme Switcher Group */}
      <div className="theme-switcher-group fixed z-50 flex gap-2 p-2 rounded-full shadow-lg" 
        style={{
          ...(isMobile ? 
            { bottom: '80px', right: '20px' } : 
            { top: '20px', right: '20px' }),
          ...(darkMode ? 
            { backgroundColor: '#0f1011', border: '1px solid #262b31' } : 
            { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' })
        }}
      >
        {/* Dark/Light mode toggle */}
        <button
          onClick={toggleTheme}
          className="theme-toggle w-10 h-10 rounded-full flex items-center justify-center transition-all"
          style={darkMode ? 
            { background: '#1c1f23', border: '2px solid #22272c' } : 
            { background: '#ffffff', border: '2px solid #e2e8f0' }
          }
          aria-label={darkMode ? t('themeSwitcher.lightMode') : t('themeSwitcher.darkMode')}
        >
          <div className={`sun-icon absolute flex items-center justify-center w-full h-full ${darkMode ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" style={{ color: `rgb(var(--color-primary-rgb))` }}>
              <circle cx="12" cy="12" r="5" style={{ fill: `rgb(var(--color-primary-rgb))` }}></circle>
              <g className="sun-rays" style={{ stroke: `rgb(var(--color-primary-rgb))` }}>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </g>
            </svg>
          </div>
          <div className={`moon-icon absolute flex items-center justify-center w-full h-full ${darkMode ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" style={{ color: `rgb(var(--color-primary-rgb))` }}>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" style={{ fill: `rgb(var(--color-primary-rgb))`, stroke: `rgb(var(--color-primary-rgb))` }}></path>
            </svg>
          </div>
        </button>

        {/* Color theme picker */}
        <div className="relative">
          <button
            onClick={() => setColorPickerOpen(!colorPickerOpen)}
            className="color-picker-button w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={darkMode ? 
              { background: '#1c1f23', border: '2px solid #22272c' } : 
              { background: '#ffffff', border: '2px solid #e2e8f0' }
            }
            aria-label={t('themeSwitcher.changeTheme')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" style={{ color: `rgb(var(--color-primary-rgb))` }}>
              <circle cx="12" cy="12" r="5" style={{ fill: `rgb(var(--color-primary-rgb))`, stroke: `rgb(var(--color-primary-rgb))` }}></circle>
            </svg>
          </button>
          <div 
            className={`color-picker-dropdown ${colorPickerOpen ? 'open' : ''} absolute z-10 right-0 mt-2 grid grid-cols-3 gap-3`} 
            style={{ 
              width: '126px', 
              padding: '12px', 
              backgroundColor: darkMode ? '#0f1011' : '#ffffff',
              borderRadius: '12px', 
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: darkMode ? '0 5px 15px rgba(0, 0, 0, 0.4)' : '0 5px 15px rgba(0, 0, 0, 0.1)'
            }}
            ref={colorPickerRef}
          >
            {/* Pink */}
              <button
              onClick={() => changeColorTheme('pink')}
              className={`color-theme-option ${colorTheme === 'pink' ? 'ring-white' : ''}`}
                style={{
                backgroundColor: '#ff6b9d', 
                width: '28px', 
                height: '28px',
                borderRadius: '50%',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(0, 0, 0, 0.15)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                filter: 'saturate(1.3) brightness(1.1)'
              }}
              aria-label="Pink theme"
            />
            {/* Blue */}
            <button
              onClick={() => changeColorTheme('blue')}
              className={`color-theme-option ${colorTheme === 'blue' ? 'ring-white' : ''}`}
              style={{ 
                backgroundColor: '#4a8cff', 
                width: '28px', 
                height: '28px',
                borderRadius: '50%',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(0, 0, 0, 0.15)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                filter: 'saturate(1.3) brightness(1.1)'
              }}
              aria-label="Blue theme"
            />
            {/* Green */}
            <button
              onClick={() => changeColorTheme('green')}
              className={`color-theme-option ${colorTheme === 'green' ? 'ring-white' : ''}`}
              style={{ 
                backgroundColor: '#4cd973', 
                width: '28px', 
                height: '28px',
                borderRadius: '50%',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(0, 0, 0, 0.15)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                filter: 'saturate(1.3) brightness(1.1)'
              }}
              aria-label="Green theme"
            />
            {/* Purple */}
            <button
              onClick={() => changeColorTheme('purple')}
              className={`color-theme-option ${colorTheme === 'purple' ? 'ring-white' : ''}`}
              style={{ 
                backgroundColor: '#9b5bff', 
                width: '28px', 
                height: '28px',
                borderRadius: '50%',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(0, 0, 0, 0.15)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                filter: 'saturate(1.3) brightness(1.1)'
              }}
              aria-label="Purple theme"
            />
            {/* Orange */}
            <button
              onClick={() => changeColorTheme('orange')}
              className={`color-theme-option ${colorTheme === 'orange' ? 'ring-white' : ''}`}
              style={{ 
                backgroundColor: '#ff8c29', 
                width: '28px', 
                height: '28px',
                borderRadius: '50%',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(0, 0, 0, 0.15)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                filter: 'saturate(1.3) brightness(1.1)'
              }}
              aria-label="Orange theme"
            />
            {/* Teal */}
            <button
              onClick={() => changeColorTheme('teal')}
              className={`color-theme-option ${colorTheme === 'teal' ? 'ring-white' : ''}`}
              style={{ 
                backgroundColor: '#20d5aa', 
                width: '28px', 
                height: '28px',
                borderRadius: '50%',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(0, 0, 0, 0.15)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                filter: 'saturate(1.3) brightness(1.1)'
              }}
              aria-label="Teal theme"
            />
            {/* Red */}
            <button
              onClick={() => changeColorTheme('red')}
              className={`color-theme-option ${colorTheme === 'red' ? 'ring-white' : ''}`}
              style={{ 
                backgroundColor: '#ff5252', 
                width: '28px', 
                height: '28px',
                borderRadius: '50%',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(0, 0, 0, 0.15)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                filter: 'saturate(1.3) brightness(1.1)'
              }}
              aria-label="Red theme"
            />
            {/* Yellow */}
            <button
              onClick={() => changeColorTheme('yellow')}
              className={`color-theme-option ${colorTheme === 'yellow' ? 'ring-white' : ''}`}
              style={{ 
                backgroundColor: '#ffcc29', 
                width: '28px', 
                height: '28px',
                borderRadius: '50%',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(0, 0, 0, 0.15)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                filter: 'saturate(1.3) brightness(1.1)'
              }}
              aria-label="Yellow theme"
            />
            {/* Cyan */}
            <button
              onClick={() => changeColorTheme('cyan')}
              className={`color-theme-option ${colorTheme === 'cyan' ? 'ring-white' : ''}`}
              style={{ 
                backgroundColor: '#1dcdea', 
                width: '28px', 
                height: '28px',
                borderRadius: '50%',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(0, 0, 0, 0.15)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                filter: 'saturate(1.3) brightness(1.1)'
              }}
              aria-label="Cyan theme"
            />
          </div>
        </div>

        {/* Language Switcher */}
        <LanguageSwitcher darkMode={darkMode} />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        {/* Header with logo - centered on all screen sizes */}
        <div className="flex justify-center items-center pt-4 mb-8 w-full">
          <div className={`font-code text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold logo-text logo-typing relative ${darkMode ? 'dark-logo' : 'light-logo'}`}>
            <span className={darkMode ? 'text-white' : 'text-dark-gray'}>&lt;</span>
            <span className="text-primary">{t('header.title')}</span>
            <span className={darkMode ? 'text-white' : 'text-dark-gray'}> /</span>
            <div className="typing-container">
              <div className="typing-text">
                <span className="text-primary typing-content"></span>
              </div>
            </div>
            <span className="inline-block flower-emoji-container">
              <span className="flower-emoji relative" style={{ display: 'inline-block', padding: '4px' }}>
                <img 
                  src={process.env.PUBLIC_URL + `/images/logo-flower-${colorTheme}.png`} 
                  alt={`${colorThemes[colorTheme]?.name || 'Pink'} flower logo`} 
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 inline-block"
                  style={{ 
                    position: 'relative', 
                    top: '1px'
                  }}
                  onError={(e) => {
                    // Fallback to pink flower if the themed one doesn't exist
                    e.target.onerror = null;
                    e.target.src = process.env.PUBLIC_URL + "/images/logo-flower-pink.png";
                  }}
                />
              </span>
            </span>
            <span className={darkMode ? 'text-white' : 'text-dark-gray'}>&gt;</span>
          </div>
        </div>
      
        {/* Mobile menu button */}
        <div className="fixed top-4 right-4 md:hidden z-50">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className={`p-2 rounded-lg z-50 transition-colors ${darkMode ? 'text-white hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-200'}`}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Header with greeting */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 pt-12 sm:pt-8">
          <div className="flex flex-col items-center md:items-start fade-in">
            <h1 className={`font-code text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-center md:text-left ${darkMode ? 'glow-text' : 'light-glow-text'}`}>
              <span className="text-primary">Aya</span> Berrouan!
            </h1>
            <p className={`text-base sm:text-lg md:text-xl text-center md:text-left max-w-2xl ${darkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>
              {t('header.bio')}
        </p>
        <a
              href={process.env.PUBLIC_URL + `/files/CV Aya Berrouan(${i18n.language === 'en' ? 'English' : 'Français'}).pdf`} 
              download
              style={{ marginTop: '1rem', backgroundColor: 'var(--color-primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: '9999px', display: 'inline-block', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>{t('downloadCV')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ marginLeft: '8px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </a>
          </div>
          
          <div className="mt-8 md:mt-0 relative fade-in">
            <div className={`w-52 h-52 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-primary shadow-xl ${darkMode ? 'border-glow' : 'light-border-glow'}`}>
              <img 
                src={process.env.PUBLIC_URL + "/images/real-profile.png"} 
                alt="Aya Berrouan" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badge text - Removed to avoid redundancy */}
            <div className={`absolute -bottom-3 -right-3 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg ${darkMode ? 'bg-dark-surface' : 'bg-white'} border-2`} style={{ borderColor: 'var(--color-primary)' }}>
              <div className="text-center px-1">
                <div className="text-primary font-code font-bold mb-0.5" style={{ fontSize: '9px' }}>FULL STACK</div>
                <div className="text-primary font-code font-bold" style={{ fontSize: '9px' }}>DEVELOPER</div>
                <div className="my-1 mx-auto w-12 h-px bg-primary opacity-70"></div>
                <div className="text-primary font-code font-bold mt-0.5" style={{ fontSize: '9px' }}>DATA SCIENCE</div>
                <div className="text-primary font-code font-bold" style={{ fontSize: '9px' }}>STUDENT</div>
              </div>
            </div>
          </div>
      </header>

        {/* Navigation Tabs - Mobile */}
        <nav className={`fixed inset-0 z-40 md:hidden transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out flex flex-col justify-center items-center ${darkMode ? 'bg-dark-bg bg-opacity-95' : 'bg-light-bg bg-opacity-95'}`}>
          <ul className="flex flex-col space-y-8 text-center">
            {['Bio', 'Projects', 'Portfolio', 'Blog', 'Testimonials', 'Skills', 'Experiences', 'Journey', 'Contact'].map((tab) => (
              <li key={tab} className="relative">
                <button
                  className={`font-medium text-xl ${
                    activeTab === tab 
                      ? 'text-primary' 
                      : darkMode 
                        ? 'text-soft-gray hover:text-white' 
                        : 'text-dark-gray hover:text-black'
                  }`}
                  onClick={() => {
                    setActiveTab(tab);
                    setMobileMenuOpen(false);
                  }}
                >
                  {t(`navigation.${tab.toLowerCase()}`)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Navigation Tabs - Desktop */}
        <nav className={`mb-8 md:mb-12 border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'} hidden md:block`}>
          <ul className="flex space-x-8">
            {['Bio', 'Projects', 'Portfolio', 'Blog', 'Testimonials', 'Skills', 'Experiences', 'Journey', 'Contact'].map((tab) => (
              <li key={tab} className="relative pb-2">
                <button
                  className={`font-medium text-lg hover-scale ${
                    activeTab === tab 
                      ? 'text-primary' 
                      : darkMode 
                        ? 'text-soft-gray hover:text-white' 
                        : 'text-dark-gray hover:text-black'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {t(`navigation.${tab.toLowerCase()}`)}
                </button>
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-md"></div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Content based on active tab */}
        <div id="tab-content" key={activeTab} className={`min-h-[250px] sm:min-h-[300px] p-5 sm:p-8 rounded-lg shadow-xl fade-in ${darkMode ? 'bg-dark-surface' : 'bg-light-surface'}`}>
          {activeTab === 'Bio' && (
            <div className="space-y-6 md:space-y-8">
              <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4">{t('bio.title')}</h2>
              <p className={`text-sm sm:text-base ${darkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>
                {t('bio.paragraph1')}
              </p>
                <p className={`text-sm sm:text-base mt-3 ${darkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>
                {t('bio.paragraph2')}
              </p>
              </div>
              
              {/* Video Pitch Section Inside Bio */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4">{t('pitch.title')}</h2>
                <div className="relative w-full" style={{padding: '56.25% 0 0 0'}}>
                  <iframe 
                    src="https://player.vimeo.com/video/1072953539?h=f7b2881c4b&badge=0&autopause=0&player_id=0&app_id=58479" 
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                    style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} 
                    title="Pitch"
                  ></iframe>
                </div>
                <script src="https://player.vimeo.com/api/player.js"></script>
              </div>
            </div>
          )}
          
          {activeTab === 'Portfolio' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4">Portfolio</h2>
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                <div className={`p-4 rounded-lg hover-scale ${darkMode ? 'bg-dark-bg' : 'bg-light-bg'}`}>
                  <h3 className="text-base sm:text-lg font-bold mb-2">🏃‍♀️ RunCasablanca - Team Project</h3>
                  <p className={`text-sm sm:text-base mb-3 ${darkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>
                    A collaborative project that promotes running events and activities in Casablanca, connecting runners and enhancing the local running community through technology.
                  </p>
                  <div className="text-xs sm:text-sm text-primary font-code mb-4">React • Node.js • Express • MongoDB • Tailwind CSS</div>
                  
                  <div className="aspect-video w-full mb-4 rounded-lg overflow-hidden">
                    <iframe 
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/PFEpE2Q5Qos" 
                      title="RunCasablanca Project Demo" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  
                  <div className="mt-2">
                    <a 
                      href="/files/RunCasablanca Project.pptx.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-sm font-medium transition-colors"
                      style={{ color: 'var(--color-primary)' }}
                      onMouseOver={e => e.currentTarget.style.color = 'var(--color-secondary)'}
                      onMouseOut={e => e.currentTarget.style.color = 'var(--color-primary)'}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View Project Presentation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Projects' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4">{t('portfolio.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className={`p-4 rounded-lg hover-scale ${darkMode ? 'bg-dark-bg' : 'bg-light-bg'}`}>
                  <h3 className="text-base sm:text-lg font-bold mb-2">🛍️ {t('portfolio.project1.title')}</h3>
                  <p className={`text-sm sm:text-base mb-3 ${darkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>{t('portfolio.project1.description')}</p>
                  <div className="text-xs sm:text-sm text-primary font-code">{t('portfolio.project1.technologies')}</div>
                </div>
                <div className={`p-4 rounded-lg hover-scale ${darkMode ? 'bg-dark-bg' : 'bg-light-bg'}`}>
                  <h3 className="text-base sm:text-lg font-bold mb-2">🕯️ {t('portfolio.project2.title')}</h3>
                  <p className={`text-sm sm:text-base mb-3 ${darkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>{t('portfolio.project2.description')}</p>
                  <div className="text-xs sm:text-sm text-primary font-code">{t('portfolio.project2.technologies')}</div>
                  <div className="mt-3">
                    <a 
                      href="https://vimeo.com/1072257806/0b05e641df?ts=0&share=copy" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-sm font-medium transition-colors"
                      style={{ color: 'var(--color-primary)' }}
                      onMouseOver={e => e.currentTarget.style.color = 'var(--color-secondary)'}
                      onMouseOut={e => e.currentTarget.style.color = 'var(--color-primary)'}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {t('portfolio.watchDemo', 'Watch Demo')}
                    </a>
                  </div>
                </div>
                <div className={`p-4 rounded-lg hover-scale ${darkMode ? 'bg-dark-bg' : 'bg-light-bg'}`}>
                  <h3 className="text-base sm:text-lg font-bold mb-2">🎮 {t('portfolio.project3.title')}</h3>
                  <p className={`text-sm sm:text-base mb-3 ${darkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>{t('portfolio.project3.description')}</p>
                  <div className="text-xs sm:text-sm text-primary font-code">{t('portfolio.project3.technologies')}</div>
                  <div className="mt-3">
                    <a 
                      href="https://vimeo.com/1072260879/03d5edfcce?ts=0&share=copy" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-sm font-medium transition-colors"
                      style={{ color: 'var(--color-primary)' }}
                      onMouseOver={e => e.currentTarget.style.color = 'var(--color-secondary)'}
                      onMouseOut={e => e.currentTarget.style.color = 'var(--color-primary)'}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {t('portfolio.watchDemo', 'Watch Demo')}
                    </a>
                  </div>
                </div>
                <div className={`p-4 rounded-lg hover-scale ${darkMode ? 'bg-dark-bg' : 'bg-light-bg'}`}>
                  <h3 className="text-base sm:text-lg font-bold mb-2">📚 {t('portfolio.project4.title')}</h3>
                  <p className={`text-sm sm:text-base mb-3 ${darkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>{t('portfolio.project4.description')}</p>
                  <div className="text-xs sm:text-sm text-primary font-code">{t('portfolio.project4.technologies')}</div>
                </div>
                <div className={`p-4 rounded-lg hover-scale ${darkMode ? 'bg-dark-bg' : 'bg-light-bg'} md:col-span-2`}>
                  <h3 className="text-base sm:text-lg font-bold mb-2">🌐 {t('portfolio.project5.title')}</h3>
                  <p className={`text-sm sm:text-base mb-3 ${darkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>{t('portfolio.project5.description')}</p>
                  <div className="text-xs sm:text-sm text-primary font-code">{t('portfolio.project5.technologies')}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Skills' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4">{t('skills.title')}</h2>
              <p className={`text-sm sm:text-base mb-6 ${darkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>
                {t('skills.subtitle')}
              </p>
              
              {/* Skills Categories - Rearranged to be stacked vertically */}
              <div className="flex flex-col gap-6">
                {/* Frontend Skills */}
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-dark-bg' : 'bg-light-bg'}`}>
                  <h3 className="text-base sm:text-lg font-bold mb-4 text-primary flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {t('skills.categories.frontend')}
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Object.entries(t('skills.items', { returnObjects: true }))
                      .filter(([_, skill]) => skill.category === 'frontend')
                      .map(([key, skill]) => (
                        <div key={key} className="skill-item flex flex-col items-center" style={{ width: '100px' }}> {/* Set a fixed width */}
                          <div className="mb-2 flex flex-col items-center">
                            <img 
                              src={key === 'powerbi' ? `/images/skills/${key}.png` : `/images/skills/${key}.svg`}
                              alt={skill.name}
                              className="h-12 w-12 mb-2 object-contain"
                              onError={(e) => {
                                e.target.onerror = null;
                                if (key === 'powerbi' || key === 'tailwind' || key === 'laravel') {
                                  // For these specific skills, try an alternative source
                                  if (key === 'tailwind') {
                                    e.target.src = "https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg";
                                  } else if (key === 'laravel') {
                                    e.target.src = "https://cdn.worldvectorlogo.com/logos/laravel-2.svg";
                                  } else {
                                    e.target.src = `/images/skills/${key}.png`;
                                  }
                                } else {
                                  e.target.src = `/images/skills/${key}.png`;
                                }
                              }}
                            />
                            <span className="text-sm font-medium text-center">
                              {skill.name}
                            </span>
                          </div>
                          <div className="w-full">
                            <div className="flex items-center w-full">
                              <div className={`flex-grow h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div 
                              className="skill-progress h-2 rounded-full bg-primary" 
                              style={{ width: `${skill.level}%` }}
                            ></div>
                              </div>
                              <span className="text-xs font-medium ml-2">{skill.level}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                {/* Backend Skills */}
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-dark-bg' : 'bg-light-bg'}`}>
                  <h3 className="text-base sm:text-lg font-bold mb-4 text-primary flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                    {t('skills.categories.backend')}
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Object.entries(t('skills.items', { returnObjects: true }))
                      .filter(([_, skill]) => skill.category === 'backend')
                      .map(([key, skill]) => (
                        <div key={key} className="skill-item flex flex-col items-center">
                          <div className="mb-2 flex flex-col items-center">
                            <img 
                              src={key === 'powerbi' ? `/images/skills/${key}.png` : `/images/skills/${key}.svg`}
                              alt={skill.name}
                              className="h-12 w-12 mb-2 object-contain"
                              onError={(e) => {
                                e.target.onerror = null;
                                if (key === 'powerbi' || key === 'tailwind' || key === 'laravel') {
                                  // For these specific skills, try an alternative source
                                  if (key === 'tailwind') {
                                    e.target.src = "https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg";
                                  } else if (key === 'laravel') {
                                    e.target.src = "https://cdn.worldvectorlogo.com/logos/laravel-2.svg";
                                  } else {
                                    e.target.src = `/images/skills/${key}.png`;
                                  }
                                } else {
                                  e.target.src = `/images/skills/${key}.png`;
                                }
                              }}
                            />
                            <span className="text-sm font-medium text-center">
                              {skill.name}
                            </span>
                          </div>
                          <div className="w-full">
                            <div className="flex items-center w-full">
                              <div className={`flex-grow h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div 
                              className="skill-progress h-2 rounded-full bg-primary" 
                              style={{ width: `${skill.level}%` }}
                            ></div>
                              </div>
                              <span className="text-xs font-medium ml-2">{skill.level}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                {/* Tools & Others Skills */}
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-dark-bg' : 'bg-light-bg'}`}>
                  <h3 className="text-base sm:text-lg font-bold mb-4 text-primary flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                    {t('skills.categories.tools')}
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Object.entries(t('skills.items', { returnObjects: true }))
                      .filter(([_, skill]) => skill.category === 'tools')
                      .map(([key, skill]) => (
                        <div key={key} className="skill-item flex flex-col items-center">
                          <div className="mb-2 flex flex-col items-center">
                            <img 
                              src={key === 'powerbi' ? `/images/skills/${key}.png` : `/images/skills/${key}.svg`}
                              alt={skill.name}
                              className="h-12 w-12 mb-2 object-contain"
                              onError={(e) => {
                                e.target.onerror = null;
                                if (key === 'powerbi' || key === 'tailwind' || key === 'laravel') {
                                  // For these specific skills, try an alternative source
                                  if (key === 'tailwind') {
                                    e.target.src = "https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg";
                                  } else if (key === 'laravel') {
                                    e.target.src = "https://cdn.worldvectorlogo.com/logos/laravel-2.svg";
                                  } else {
                                    e.target.src = `/images/skills/${key}.png`;
                                  }
                                } else {
                                  e.target.src = `/images/skills/${key}.png`;
                                }
                              }}
                            />
                            <span className="text-sm font-medium text-center">
                              {skill.name}
                            </span>
                          </div>
                          <div className="w-full">
                            <div className="flex items-center w-full">
                              <div className={`flex-grow h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div 
                              className="skill-progress h-2 rounded-full bg-primary" 
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                              <span className="text-xs font-medium ml-2">{skill.level}%</span>
                        </div>
                  </div>
                      </div>
                    ))}
                </div>
              </div>
              </div>
            </div>
          )}

          {activeTab === 'Experiences' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4">{t('experiences.title')}</h2>
              <p className={`text-sm sm:text-base mb-6 ${darkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>
                {t('experiences.subtitle')}
              </p>
              
              {/* Timeline */}
              <div className="relative timeline-container">
                {/* Vertical Timeline Line */}
                <div className="absolute left-6 md:left-1/2 transform md:translate-x-[-50%] top-0 bottom-0 w-0.5 bg-primary bg-opacity-50 z-0"></div>
                
                {/* Timeline Events */}
                <div className="space-y-16">
                  {t('experiences.timeline', { returnObjects: true }).map((event, index) => (
                    <div key={index} className={`relative flex flex-col md:flex-row md:justify-between animate-fade-in-up animation-delay-${index} ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                      {/* Timeline Dot */}
                      <div className="absolute left-6 md:left-1/2 transform translate-y-8 md:translate-x-[-50%] w-4 h-4 rounded-full bg-primary z-10 timeline-dot"></div>
                      
                      {/* Content */}
                      <div className={`ml-16 md:ml-0 md:w-5/12 p-4 rounded-lg shadow-md transition-all timeline-content animation-delay-${index} ${darkMode ? 'bg-dark-bg' : 'bg-light-bg'}`}>
                        <div className="py-1 px-3 rounded-full bg-primary text-white inline-block text-sm font-medium mb-3 shadow-md">{event.year}</div>
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3">{event.icon}</span>
                          <div>
                            <h3 className="text-lg font-bold">{event.title}</h3>
                            <p className="text-sm text-primary font-medium">📍 {event.company}</p>
                          </div>
                        </div>
                        <p className={`text-sm whitespace-pre-line mt-2 ${darkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Journey' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4">{t('journey.title')}</h2>
              <p className={`text-sm sm:text-base mb-6 ${darkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>
                {t('journey.subtitle')}
              </p>
              
              {/* Timeline */}
              <div className="relative timeline-container">
                {/* Vertical Timeline Line */}
                <div className="absolute left-6 md:left-1/2 transform md:translate-x-[-50%] top-0 bottom-0 w-0.5 bg-primary bg-opacity-50 z-0"></div>
                
                {/* Timeline Events */}
                <div className="space-y-16">
                  {t('journey.timeline', { returnObjects: true }).map((event, index) => (
                    <div key={index} className={`relative flex flex-col md:flex-row md:justify-between animate-fade-in-up animation-delay-${index} ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                      {/* Timeline Dot */}
                      <div className="absolute left-6 md:left-1/2 transform translate-y-8 md:translate-x-[-50%] w-4 h-4 rounded-full bg-primary z-10 timeline-dot"></div>
                      
                      {/* Content */}
                      <div className={`ml-16 md:ml-0 md:w-5/12 p-4 rounded-lg shadow-md transition-all timeline-content animation-delay-${index} ${darkMode ? 'bg-dark-bg' : 'bg-light-bg'}`}>
                        <div className="py-1 px-3 rounded-full bg-primary text-white inline-block text-sm font-medium mb-3 shadow-md">{event.year}</div>
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3">{event.icon}</span>
                          <h3 className="text-lg font-bold">{event.title}</h3>
                        </div>
                        <p className={`text-sm whitespace-pre-line mt-2 ${darkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Contact' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4">{t('contact.title')}</h2>
              <p className={`text-sm sm:text-base mb-6 ${darkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>
                {t('contact.subtitle')}
              </p>
              
              <form ref={contactFormRef} onSubmit={sendEmail} className="space-y-4 max-w-2xl mx-auto">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    id="name"
                    required
                    className={`block w-full rounded-md p-3 focus:outline-none transition-all duration-300 ${darkMode ? 'bg-[#1a1f2e] text-white' : 'bg-gray-100 text-gray-800'} border-0`}
                    style={{ 
                      borderBottom: '2px solid transparent',
                      borderBottomColor: 'var(--color-primary)'
                    }}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    id="email"
                    required
                    className={`block w-full rounded-md p-3 focus:outline-none transition-all duration-300 ${darkMode ? 'bg-[#1a1f2e] text-white' : 'bg-gray-100 text-gray-800'} border-0`}
                    style={{ 
                      borderBottom: '2px solid transparent',
                      borderBottomColor: 'var(--color-primary)'
                    }}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    {t('contact.message')}
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    required
                    className={`block w-full rounded-md p-3 focus:outline-none transition-all duration-300 ${darkMode ? 'bg-[#1a1f2e] text-white' : 'bg-gray-100 text-gray-800'} border-0`}
                    style={{ 
                      borderLeft: '2px solid transparent',
                      borderLeftColor: 'var(--color-primary)'
                    }}
                  ></textarea>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={contactStatus === 'sending'}
                    className="w-full py-3 px-4 border-0 rounded-md text-sm font-medium text-white focus:outline-none disabled:opacity-50"
                    style={{ 
                      background: 'var(--color-primary)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'var(--color-secondary)'}
                    onMouseOut={e => e.currentTarget.style.background = 'var(--color-primary)'}
                  >
                    {contactStatus === 'sending' ? t('contact.sending') : t('contact.send')}
                  </button>
                </div>
                
                {contactStatus === 'success' && (
                  <div className="p-3 mt-4 rounded-md text-center text-sm" 
                    style={{ 
                      backgroundColor: 'rgba(var(--color-primary-rgb), 0.2)',
                      color: 'var(--color-primary)'
                    }}>
                    {t('contact.success')}
                  </div>
                )}
                
                {contactStatus === 'error' && (
                  <div className="p-3 mt-4 bg-red-900 text-red-200 rounded-md text-center text-sm">
                    {t('contact.error')}
                  </div>
                )}
              </form>
            </div>
          )}

          {/* Blog Section */}
          {activeTab === 'Blog' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4">{t('blog.title')}</h2>
              <p className={`text-sm sm:text-base mb-6 ${darkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>
                {t('blog.subtitle')}
              </p>
              
              {/* Full Stack Development Section */}
              <div className="mb-10">
                <h3 className="text-lg sm:text-xl font-bold mb-5 flex items-center">
                  <span className="inline-block w-8 h-8 rounded-full mr-2 flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)', opacity: 0.8 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </span>
                  <span className="text-primary">{t('blog.fullstack.title')}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {t('blog.fullstack.posts', { returnObjects: true }).map((post, index) => {
                    const BlogPostComponent = ({ post, index, isDarkMode, type }) => {
                      const [showFullArticle, setShowFullArticle] = useState(false);
                      const { t } = useTranslation();
                      const isPrimary = type === 'fullstack';
                      const colorVar = isPrimary ? '--color-primary' : '--color-secondary';
                      const textColorClass = isPrimary ? 'text-primary' : 'text-secondary';
                      
                      return (
                        <div 
                          key={`fullstack-post-${index}`}
                          className={`rounded-lg ${darkMode ? 'bg-dark-bg' : 'bg-light-bg'} overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-1 hover:shadow-xl ${showFullArticle ? 'md:col-span-2' : ''}`}
                          style={{ height: showFullArticle ? 'auto' : '260px' }}
                        >
                          <div className="h-3" style={{ backgroundColor: 'var(--color-primary)', opacity: 0.8 }}></div>
                          <div className="p-5 h-full flex flex-col">
                            <h4 className={`text-lg font-bold mb-2 ${textColorClass}`}>{post.title}</h4>
                            
                            {showFullArticle ? (
                              <>
                                <div 
                                  className={`text-sm mb-4 article-content ${isDarkMode ? 'text-soft-gray' : 'text-dark-gray'}`}
                                  style={{ whiteSpace: 'pre-wrap' }} 
                                  dangerouslySetInnerHTML={{ __html: post.content
                                    .replace(/\n\n## /g, '<br/><br/><h5 class="text-md font-bold mt-5 mb-2">')
                                    .replace(/\n\n### /g, '<br/><br/><h6 class="text-sm font-bold mt-4 mb-2">')
                                    .replace(/\n\n/g, '<br/><br/>')
                                    .replace(/<img.*?alt="(.*?)".*?>/g, '')
                                    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 text-gray-200 p-4 rounded-md my-4 overflow-x-auto text-xs"><code>$1</code></pre>')
                                    .replace(/- (.*?)$/gm, '<div class="flex items-start mb-1"><span class="inline-block w-2 h-2 rounded-full mr-2 mt-1.5" style="background-color: var(' + colorVar + ')"></span><span>$1</span></div>')
                                  }}
                                />
                                <button
                                  onClick={() => setShowFullArticle(false)}
                                  className="text-sm font-medium mt-3 py-2 px-4 rounded-full transition-all duration-300 flex items-center"
                                  style={{ 
                                    backgroundColor: `rgba(var(${colorVar}-rgb), 0.1)`, 
                                    color: `var(${colorVar})`,
                                    border: `1px solid var(${colorVar})`
                                  }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                  {t('blog.readLess')}
                                </button>
                              </>
                            ) : (
                              <div className="flex flex-col h-full">
                                <p className={`text-sm mb-2 line-clamp-3 ${isDarkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>
                                  {post.excerpt}
                                </p>
                                <div className="flex justify-between items-center mt-auto">
                                  <div className="flex items-center text-xs">
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${textColorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className={textColorClass}>{post.date}</span>
                                    <span className={`mx-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>•</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{post.readTime}</span>
                                  </div>
                                  <button
                                    onClick={() => setShowFullArticle(true)}
                                    className="text-sm font-medium py-1.5 px-3 rounded-full transition-all duration-300 flex items-center"
                                    style={{ 
                                      backgroundColor: `rgba(var(${colorVar}-rgb), 0.1)`, 
                                      color: `var(${colorVar})`,
                                      border: `1px solid var(${colorVar})`
                                    }}
                                  >
                                    {t('blog.readMore')}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    };
                    
                    return (
                      <div key={`fullstack-container-${index}`} className={`${index === 0 ? 'col-span-1 md:col-span-1' : 'col-span-1 md:col-span-1'}`}>
                        <BlogPostComponent 
                          post={post}
                          index={index}
                          isDarkMode={darkMode}
                          type="fullstack"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Data Science Section */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-5 flex items-center">
                  <span className="inline-block w-8 h-8 rounded-full mr-2 flex items-center justify-center" style={{ backgroundColor: 'var(--color-secondary)', opacity: 0.8 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </span>
                  <span className="text-secondary">{t('blog.datascience.title')}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {t('blog.datascience.posts', { returnObjects: true }).map((post, index) => {
                    const BlogPostComponent = ({ post, index, isDarkMode, type }) => {
                      const [showFullArticle, setShowFullArticle] = useState(false);
                      const { t } = useTranslation();
                      const isPrimary = type === 'fullstack';
                      const colorVar = isPrimary ? '--color-primary' : '--color-secondary';
                      const textColorClass = isPrimary ? 'text-primary' : 'text-secondary';
                      
                      return (
                        <div 
                          key={`datascience-post-${index}`}
                          className={`rounded-lg ${darkMode ? 'bg-dark-bg' : 'bg-light-bg'} overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-1 hover:shadow-xl ${showFullArticle ? 'md:col-span-2' : ''}`}
                          style={{ height: showFullArticle ? 'auto' : '260px' }}
                        >
                          <div className="h-3" style={{ backgroundColor: 'var(--color-secondary)', opacity: 0.8 }}></div>
                          <div className="p-5 h-full flex flex-col">
                            <h4 className={`text-lg font-bold mb-2 ${textColorClass}`}>{post.title}</h4>
                            
                            {showFullArticle ? (
                              <>
                                <div 
                                  className={`text-sm mb-4 article-content ${isDarkMode ? 'text-soft-gray' : 'text-dark-gray'}`}
                                  style={{ whiteSpace: 'pre-wrap' }} 
                                  dangerouslySetInnerHTML={{ __html: post.content
                                    .replace(/\n\n## /g, '<br/><br/><h5 class="text-md font-bold mt-5 mb-2">')
                                    .replace(/\n\n### /g, '<br/><br/><h6 class="text-sm font-bold mt-4 mb-2">')
                                    .replace(/\n\n/g, '<br/><br/>')
                                    .replace(/<img.*?alt="(.*?)".*?>/g, '')
                                    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 text-gray-200 p-4 rounded-md my-4 overflow-x-auto text-xs"><code>$1</code></pre>')
                                    .replace(/- (.*?)$/gm, '<div class="flex items-start mb-1"><span class="inline-block w-2 h-2 rounded-full mr-2 mt-1.5" style="background-color: var(' + colorVar + ')"></span><span>$1</span></div>')
                                  }}
                                />
                                <button
                                  onClick={() => setShowFullArticle(false)}
                                  className="text-sm font-medium mt-3 py-2 px-4 rounded-full transition-all duration-300 flex items-center"
                                  style={{ 
                                    backgroundColor: `rgba(var(${colorVar}-rgb), 0.1)`, 
                                    color: `var(${colorVar})`,
                                    border: `1px solid var(${colorVar})`
                                  }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                  {t('blog.readLess')}
                                </button>
                              </>
                            ) : (
                              <div className="flex flex-col h-full">
                                <p className={`text-sm mb-2 line-clamp-3 ${isDarkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>
                                  {post.excerpt}
                                </p>
                                <div className="flex justify-between items-center mt-auto">
                                  <div className="flex items-center text-xs">
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${textColorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className={textColorClass}>{post.date}</span>
                                    <span className={`mx-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>•</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{post.readTime}</span>
                                  </div>
                                  <button
                                    onClick={() => setShowFullArticle(true)}
                                    className="text-sm font-medium py-1.5 px-3 rounded-full transition-all duration-300 flex items-center"
                                    style={{ 
                                      backgroundColor: `rgba(var(${colorVar}-rgb), 0.1)`, 
                                      color: `var(${colorVar})`,
                                      border: `1px solid var(${colorVar})`
                                    }}
                                  >
                                    {t('blog.readMore')}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    };
                    
                    return (
                      <div key={`datascience-container-${index}`} className={`${index === 0 ? 'col-span-1 md:col-span-1' : 'col-span-1 md:col-span-1'}`}>
                        <BlogPostComponent 
                          post={post}
                          index={index}
                          isDarkMode={darkMode}
                          type="datascience"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Testimonials Section */}
          {activeTab === 'Testimonials' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4">{t('testimonials.title')}</h2>
              <p className={`text-sm sm:text-base mb-6 ${darkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>
                {t('testimonials.subtitle')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className={`p-6 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-1 hover:shadow-xl ${darkMode ? 'bg-dark-bg' : 'bg-light-bg'}`}>
                  <div className="flex items-start mb-4">
                    <div className="rounded-full bg-primary bg-opacity-20 p-3 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1 text-primary">{t('testimonials.codeAlpha.title')}</h3>
                      <p className={`text-sm mb-2 ${darkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>
                        {t('testimonials.codeAlpha.position')}
                      </p>
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-6 ${darkMode ? 'text-soft-gray' : 'text-dark-gray'}`}>
                    {t('testimonials.codeAlpha.description')}
                  </p>
                  
                  <div className="w-full mb-6">
                    <div className="aspect-[1/1.3] w-full relative rounded-lg overflow-hidden border border-gray-300">
                      <iframe 
                        src="/files/CodeAlpha_LetterOfRecommendation.pdf"
                        className="absolute inset-0 w-full h-full"
                        title="CodeAlpha Letter of Recommendation"
                        frameBorder="0"
                      ></iframe>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <a 
                      href="/files/CodeAlpha_LetterOfRecommendation.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm font-medium py-2 px-4 rounded-full transition-all duration-300 flex items-center"
                      style={{ 
                        backgroundColor: `rgba(var(--color-primary-rgb), 0.1)`, 
                        color: `var(--color-primary)`,
                        border: `1px solid var(--color-primary)`
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {t('testimonials.codeAlpha.viewDocument')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 flex items-center justify-center p-2 rounded-full ${darkMode ? 'bg-dark-surface bg-opacity-80' : 'bg-white bg-opacity-90'} backdrop-blur-sm shadow-lg`}>
          <div className="flex space-x-2 sm:space-x-3">
            <a href="#contact"
               className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors hover-scale ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-light-gray'}`}
               aria-label={t('socialLinks.email')}
               onClick={(e) => {
                 e.preventDefault();
                 setActiveTab('Contact');
                 // Smooth scroll to contact section
                 const tabContent = document.getElementById('tab-content');
                 if (tabContent) {
                   tabContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                 }
               }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <a 
              href="https://github.com/Aya-Berrouan" 
              target="_blank" 
              rel="noopener noreferrer" 
               className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors hover-scale ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-light-gray'}`}
               aria-label={t('socialLinks.github')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-primary">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/aya-berrouan/" target="_blank" rel="noopener noreferrer"
               className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors hover-scale ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-light-gray'}`}
               aria-label={t('socialLinks.linkedin')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-primary">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Small-screen-only floating action button */}
        <div className="fixed bottom-4 left-4 md:hidden z-20">
          <button 
            onClick={() => setActiveTab('Bio')} 
            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg hover-scale"
            aria-label={t('navigation.bio')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Copyright Footer */}
      <footer className="mt-auto py-6 text-center" style={{
        backgroundColor: darkMode ? '#0f1011' : '#f8fafc',
        borderTop: darkMode ? '1px solid #262b31' : '1px solid #e2e8f0'
      }}>
        <div className="container mx-auto px-4">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} Aya Berrouan. {t('footer.rights')}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
