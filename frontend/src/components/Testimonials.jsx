import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
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

  useEffect(() => {
    const nextSlide = () => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 600);
    };
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isAnimating]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-charcoal">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-gold text-sm tracking-[0.4em] uppercase">Voices</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory mt-4 tracking-wide">
            Guest Testimonials
          </h2>
          <div className="w-20 h-px bg-gold mx-auto mt-8" />
        </div>

        {/* Testimonial Slider */}
        <div
          className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Quote Icon */}
          <div className="flex justify-center mb-8">
            <Quote className="text-gold/30" size={48} />
          </div>

          {/* Testimonial Content */}
          <div className="text-center min-h-[200px] flex flex-col items-center justify-center">
            <p
              key={currentIndex}
              className="font-serif text-2xl md:text-3xl lg:text-4xl text-ivory leading-relaxed max-w-4xl mx-auto animate-fade-in"
            >
              "{testimonials[currentIndex].quote}"
            </p>
            <div className="mt-10 animate-fade-in">
              <p className="text-gold text-lg tracking-wider">
                {testimonials[currentIndex].author}
              </p>
              <p className="text-ivory/50 text-sm tracking-wider mt-1">
                {testimonials[currentIndex].title}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <button
              onClick={handlePrev}
              className="p-3 border border-ivory/20 text-ivory/50 hover:border-gold hover:text-gold transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsAnimating(false), 600);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gold w-6'
                      : 'bg-ivory/30 hover:bg-ivory/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 border border-ivory/20 text-ivory/50 hover:border-gold hover:text-gold transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
