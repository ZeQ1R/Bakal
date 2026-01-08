import React, { useRef, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';

const CallToAction = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { currentLanguage } = useLanguage();
  const t = useTranslation(currentLanguage);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToReservations = () => {
    const element = document.querySelector('#reservations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 bg-black overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Decorative Line */}
        <div
          className={`w-20 h-px bg-gold mx-auto mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 w-20' : 'opacity-0 w-0'
          }`}
        />

        {/* Headline */}
        <h2
          className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory leading-tight tracking-wide transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          An experience crafted for those
          <br />
          <span className="text-gold">who expect more.</span>
        </h2>

        {/* CTA Button */}
        <div
          className={`mt-12 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Button
            onClick={scrollToReservations}
            className="bg-gold text-black hover:bg-gold/90 px-12 py-7 text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            Reserve Your Table
          </Button>
        </div>

        {/* Decorative Line */}
        <div
          className={`w-20 h-px bg-gold mx-auto mt-12 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 w-20' : 'opacity-0 w-0'
          }`}
        />
      </div>
    </section>
  );
};

export default CallToAction;
