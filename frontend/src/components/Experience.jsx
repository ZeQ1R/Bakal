import React, { useRef, useEffect, useState } from 'react';
import { images } from '../data/mock';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-charcoal overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
            }`}
          >
            <span className="text-gold text-sm tracking-[0.4em] uppercase">Our Story</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory mt-4 mb-8 tracking-wide leading-tight">
              The BAKAL
              <br />
              Experience
            </h2>
            <div className="w-20 h-px bg-gold mb-8" />
            <p className="text-ivory/70 text-lg lg:text-xl leading-relaxed mb-6">
              At BAKAL : CUISINES, every dish is an expression of culture, fire, and
              craftsmanship. From international inspirations to refined barbecue
              techniques, we deliver an experience defined by precision and passion.
            </p>
            <p className="text-ivory/50 text-base lg:text-lg leading-relaxed">
              Our master chefs draw upon generations of culinary wisdom, combining
              time-honored traditions with contemporary innovation. Each plate tells
              a story—of distant lands, of smoldering flames, of ingredients at their
              peak. This is not simply dining; this is a journey.
            </p>
            <div className="mt-10 flex items-center gap-8">
              <div className="text-center">
                <span className="font-serif text-4xl lg:text-5xl text-gold">15+</span>
                <p className="text-ivory/50 text-sm mt-2 tracking-wider uppercase">Years of Excellence</p>
              </div>
              <div className="w-px h-16 bg-ivory/20" />
              <div className="text-center">
                <span className="font-serif text-4xl lg:text-5xl text-gold">50k+</span>
                <p className="text-ivory/50 text-sm mt-2 tracking-wider uppercase">Guests Served</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div
            className={`relative transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
            }`}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={images.interior}
                  alt="BAKAL Interior"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Gold Frame Accent */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-gold/30 -z-10" />
              {/* Small overlay image */}
              <div className="absolute -bottom-8 -left-8 w-1/2 shadow-2xl hidden lg:block">
                <div className="aspect-square overflow-hidden border-4 border-charcoal">
                  <img
                    src={images.chef}
                    alt="Our Chef"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
