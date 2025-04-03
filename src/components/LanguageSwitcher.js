import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ darkMode = true }) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="language-switcher-button w-auto h-10 px-3 rounded-full flex items-center justify-center transition-all"
        style={darkMode ? 
          { background: '#1c1f23', border: '2px solid #22272c' } : 
          { background: '#ffffff', border: '2px solid #e2e8f0' }
        }
        aria-label={t('language.switchTo', { lng: i18n.language === 'en' ? 'Français' : 'English' })}
      >
        <span className={`text-${darkMode ? 'white' : 'gray-700'} flex items-center`}>
          <span className={`mr-2 text-xs font-medium ${darkMode ? '' : 'text-gray-800'}`}>{i18n.language === 'en' ? 'EN' : 'FR'}</span>
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{i18n.language === 'en' ? 'English' : 'Français'}</span>
        </span>
      </button>
      
      {isOpen && (
        <div 
          className="dropdown-menu absolute right-0 mt-2 py-2 rounded-lg shadow-lg z-50"
          style={{ 
            width: '140px',
            backgroundColor: darkMode ? '#0f1011' : '#ffffff',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: darkMode ? '0 5px 15px rgba(0, 0, 0, 0.4)' : '0 5px 15px rgba(0, 0, 0, 0.1)'
          }}
        >
          <button
            onClick={() => changeLanguage('en')}
            className={`w-full text-left px-4 py-2 ${
              i18n.language === 'en' 
                ? darkMode ? 'text-cyan-400' : 'text-primary' 
                : darkMode ? 'text-white' : 'text-gray-700'
            } hover:bg-${darkMode ? 'gray-800' : 'gray-100'}`}
          >
            <span className="flex items-center">
              <span className="mr-2 text-xs font-medium">EN</span>
              <span className={`text-sm ${darkMode ? 'opacity-80' : 'text-gray-500'}`}>English</span>
            </span>
          </button>
          <button
            onClick={() => changeLanguage('fr')}
            className={`w-full text-left px-4 py-2 ${
              i18n.language === 'fr' 
                ? darkMode ? 'text-cyan-400' : 'text-primary' 
                : darkMode ? 'text-white' : 'text-gray-700'
            } hover:bg-${darkMode ? 'gray-800' : 'gray-100'}`}
          >
            <span className="flex items-center">
              <span className="mr-2 text-xs font-medium">FR</span>
              <span className={`text-sm ${darkMode ? 'opacity-80' : 'text-gray-500'}`}>Français</span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 