import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { images } from '../data/mock';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { currentLanguage } = useLanguage();
  const t = useTranslation(currentLanguage);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 transform transition-transform duration-[2000ms]"
          style={{
            backgroundImage: `url(${images.hero})`,
            transform: isVisible ? 'scale(1)' : 'scale(1.1)',
          }}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-6 lg:px-8">
        <div className="max-w-5xl text-center">
          {/* Decorative Line */}
          <div
            className={`w-24 h-px bg-gold mx-auto mb-8 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 w-24' : 'opacity-0 w-0'
            }`}
          />

          {/* Main Headline */}
          <h1
            className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-ivory leading-tight tracking-wide transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {t.hero.headline}
            <br />
            <span className="text-gold">{t.hero.headlineAccent}</span>
          </h1>

          {/* Subheading */}
          <p
            className={`mt-8 text-ivory/70 text-lg md:text-xl lg:text-2xl font-light tracking-wide max-w-3xl mx-auto transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {t.hero.subheading}
          </p>

          {/* CTA Buttons */}
          <div
            className={`mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Button
              onClick={() => scrollToSection('#menus')}
              className="bg-transparent border-2 border-ivory text-ivory hover:bg-ivory hover:text-black px-10 py-6 text-sm tracking-[0.2em] uppercase transition-all duration-500"
            >
              {t.hero.viewMenus}
            </Button>
            <Button
              onClick={() => scrollToSection('#reservations')}
              className="bg-gold text-black hover:bg-gold/90 px-10 py-6 text-sm tracking-[0.2em] uppercase transition-all duration-500"
            >
              {t.hero.reserveNow}
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={() => scrollToSection('#signatures')}
            className="flex flex-col items-center text-ivory/50 hover:text-gold transition-colors duration-300 group"
            aria-label="Scroll down"
          >
            <span className="text-xs tracking-[0.3em] uppercase mb-3">{t.hero.discover}</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
