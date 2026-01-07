import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-black border-t border-ivory/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="font-serif text-2xl tracking-[0.3em] text-ivory font-semibold">
                BAKAL
              </span>
              <br />
              <span className="text-xs tracking-[0.5em] text-gold uppercase">
                Cuisines
              </span>
            </div>
            <p className="text-ivory/50 text-sm leading-relaxed">
              Where world cuisines meet fire and elegance. An elevated dining
              experience of international flavors and refined barbecue.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-ivory text-sm tracking-[0.3em] uppercase mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-ivory/60 hover:text-gold transition-colors group"
                >
                  <MapPin size={18} className="mt-0.5 flex-shrink-0 group-hover:text-gold" />
                  <span className="text-sm">
                    123 Culinary Avenue<br />
                    Vienna, Austria 1010
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+431234567890"
                  className="flex items-center gap-3 text-ivory/60 hover:text-gold transition-colors group"
                >
                  <Phone size={18} className="flex-shrink-0 group-hover:text-gold" />
                  <span className="text-sm">+43 1 234 567 890</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:reservations@bakalcuisines.com"
                  className="flex items-center gap-3 text-ivory/60 hover:text-gold transition-colors group"
                >
                  <Mail size={18} className="flex-shrink-0 group-hover:text-gold" />
                  <span className="text-sm">reservations@bakalcuisines.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-ivory text-sm tracking-[0.3em] uppercase mb-6">Hours</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-ivory/60">
                <Clock size={18} className="mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-ivory/80">Lunch</p>
                  <p>Tue - Sun: 12:00 - 15:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-ivory/60">
                <Clock size={18} className="mt-0.5 flex-shrink-0 opacity-0" />
                <div className="text-sm">
                  <p className="text-ivory/80">Dinner</p>
                  <p>Tue - Sun: 18:00 - 23:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-ivory/60">
                <Clock size={18} className="mt-0.5 flex-shrink-0 opacity-0" />
                <div className="text-sm">
                  <p className="text-ivory/80">Brunch</p>
                  <p>Sat - Sun: 10:00 - 14:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-ivory/50">
                <Clock size={18} className="mt-0.5 flex-shrink-0 opacity-0" />
                <p className="text-sm italic">Closed Mondays</p>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="text-ivory text-sm tracking-[0.3em] uppercase mb-6">Follow Us</h4>
            <div className="flex gap-4 mb-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-ivory/20 flex items-center justify-center text-ivory/60 hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-ivory/20 flex items-center justify-center text-ivory/60 hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-ivory/20 flex items-center justify-center text-ivory/60 hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
            <p className="text-ivory/40 text-xs leading-relaxed">
              Vegetarian Friendly • Vegan Options<br />
              Private Dining Available
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-ivory/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ivory/40 text-xs tracking-wider">
            © {currentYear} BAKAL : CUISINES. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-ivory/40 text-xs hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-ivory/40 text-xs hover:text-gold transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
