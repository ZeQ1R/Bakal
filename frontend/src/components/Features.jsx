import React, { useRef, useEffect, useState } from 'react';
import { Wine, Sun, CalendarCheck, Car, Wifi, Bell, Baby, GlassWater } from 'lucide-react';
import { features } from '../data/mock';

const iconMap = {
  Wine: Wine,
  Sun: Sun,
  CalendarCheck: CalendarCheck,
  Car: Car,
  Wifi: Wifi,
  ConciergeBell: Bell,
  Baby: Baby,
  GlassWater: GlassWater,
};

const Features = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          features.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...new Set([...prev, index])]);
            }, index * 100);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-[0.4em] uppercase">Amenities</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory mt-4 tracking-wide">
            Features & Services
          </h2>
          <div className="w-20 h-px bg-gold mx-auto mt-8" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <div
                key={feature.id}
                className={`group relative p-6 lg:p-8 border border-ivory/10 bg-charcoal/30 hover:bg-charcoal/60 hover:border-gold/30 transition-all duration-500 ${
                  visibleItems.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center mb-4 text-ivory/60 group-hover:text-gold transition-colors duration-500">
                  {IconComponent && <IconComponent size={28} strokeWidth={1.5} />}
                </div>
                {/* Title */}
                <h4 className="text-ivory text-sm lg:text-base tracking-wider">
                  {feature.title}
                </h4>
                {/* Gold accent on hover */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
