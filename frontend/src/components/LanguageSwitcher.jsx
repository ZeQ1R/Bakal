import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useLanguage, languages } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { currentLanguage, switchLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages[currentLanguage];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border border-ivory/20 hover:border-gold/50 text-ivory/80 hover:text-gold transition-all duration-300 text-sm"
        aria-label="Select language"
      >
        <Globe size={16} />
        <span className="hidden sm:inline">{currentLang.name}</span>
        <span className="sm:hidden">{currentLang.code.toUpperCase()}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-full mt-2 min-w-[160px] bg-charcoal border border-ivory/20 shadow-xl z-50 transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        {Object.values(languages).map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              switchLanguage(lang.code);
              setIsOpen(false);
            }}
            className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 transition-all duration-200 ${
              currentLanguage === lang.code
                ? 'bg-gold/20 text-gold'
                : 'text-ivory/70 hover:bg-ivory/5 hover:text-ivory'
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
