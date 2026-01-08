import React, { useEffect, useRef, useState } from 'react';
import { images } from '../data/mock';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';

const CulinarySignatures = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);
  const { currentLanguage } = useLanguage();
  const t = useTranslation(currentLanguage);

  const signatureImages = [images.plating, images.wellington, images.dish1, images.chef];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setTimeout(() => {
              setVisibleItems((prev) => [...new Set([...prev, index])]);
            }, index * 200);
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = sectionRef.current?.querySelectorAll('.signature-item');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="signatures"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-charcoal"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-gold text-sm tracking-[0.4em] uppercase">{t.signatures.sectionLabel}</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory mt-4 tracking-wide">
            {t.signatures.title}
          </h2>
          <div className="w-20 h-px bg-gold mx-auto mt-8" />
        </div>

        {/* Editorial Grid */}
        <div className="space-y-24 lg:space-y-32">
          {t.signatures.items.map((item, index) => (
            <div
              key={index}
              data-index={index}
              className={`signature-item grid lg:grid-cols-2 gap-8 lg:gap-16 items-center transition-all duration-1000 ${
                visibleItems.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-16'
              } ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <div className="aspect-[4/3] lg:aspect-[3/2] overflow-hidden">
                  <img
                    src={signatureImages[index]}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                </div>
                {/* Gold accent line */}
                <div
                  className={`absolute ${
                    index % 2 === 0
                      ? 'bottom-0 right-0 w-1/2 h-1'
                      : 'bottom-0 left-0 w-1/2 h-1'
                  } bg-gold`}
                />
              </div>

              {/* Content */}
              <div
                className={`${
                  index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''
                }`}
              >
                <span className="text-gold text-sm tracking-[0.3em] uppercase">
                  0{index + 1}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ivory mt-4 mb-6 tracking-wide">
                  {item.title}
                </h3>
                <p className={`text-ivory/60 text-lg leading-relaxed max-w-xl ${
                  index % 2 === 1 ? 'lg:ml-auto' : ''
                }`}>
                  {item.description}
                </p>
                <div
                  className={`mt-8 w-16 h-px bg-ivory/30 ${
                    index % 2 === 1 ? 'lg:ml-auto' : ''
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CulinarySignatures;
