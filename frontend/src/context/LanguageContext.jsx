import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const languages = {
  en: { code: 'en', name: 'English', flag: '🇬🇧' },
  mk: { code: 'mk', name: 'Македонски', flag: '🇲🇰' },
  sq: { code: 'sq', name: 'Shqip', flag: '🇦🇱' },
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const saved = localStorage.getItem('bakal-language');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('bakal-language', currentLanguage);
  }, [currentLanguage]);

  const switchLanguage = (langCode) => {
    if (languages[langCode]) {
      setCurrentLanguage(langCode);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, switchLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
