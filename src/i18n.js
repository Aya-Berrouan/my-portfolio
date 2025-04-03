import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
// Arabic translation removed

// The translations
const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  }
  // Arabic resource removed
};

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    fallbackLng: "en",
    debug: false,

    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },

    // language detection options
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'language',
      caches: ['localStorage'],
    }
  });

// Update HTML lang attribute when language changes
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  
  // Always use LTR direction since Arabic was removed
  document.documentElement.dir = 'ltr';
  
  // Add specific class for handling different language adjustments
  document.documentElement.classList.forEach(cls => {
    if (cls.startsWith('lang-')) {
      document.documentElement.classList.remove(cls);
    }
  });
  document.documentElement.classList.add(`lang-${lng}`);
});

export default i18n; 