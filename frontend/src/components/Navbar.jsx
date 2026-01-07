import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data/mock';
import { Button } from './ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex flex-col items-start"
          >
            <span className="font-serif text-2xl lg:text-3xl tracking-[0.3em] text-ivory font-semibold">
              BAKAL
            </span>
            <span className="text-xs tracking-[0.5em] text-gold uppercase mt-0.5">
              Cuisines
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-ivory/80 hover:text-gold text-sm tracking-widest uppercase transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              onClick={() => scrollToSection('#reservations')}
              className="bg-transparent border border-gold text-gold hover:bg-gold hover:text-black px-8 py-6 text-sm tracking-widest uppercase transition-all duration-500"
            >
              Reserve a Table
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-ivory p-2 hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-black/98 backdrop-blur-lg transition-all duration-500 ease-out ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 pb-20">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-ivory text-2xl tracking-[0.3em] uppercase hover:text-gold transition-colors duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.name}
            </a>
          ))}
          <Button
            onClick={() => scrollToSection('#reservations')}
            className="mt-8 bg-gold text-black hover:bg-gold/90 px-10 py-6 text-sm tracking-widest uppercase"
          >
            Reserve a Table
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
