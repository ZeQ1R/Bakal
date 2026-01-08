import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Users, Clock, Send, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { images } from '../data/mock';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Reservations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '',
    date: '',
    time: '',
    requests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      // Submit reservation to backend
      await axios.post(`${API}/reservations`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        guests: formData.guests,
        date: formData.date,
        time: formData.time,
        requests: formData.requests || null,
      });
      
      setIsSubmitted(true);
      
      // Reset form after 4 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          guests: '',
          date: '',
          time: '',
          requests: '',
        });
      }, 4000);
    } catch (err) {
      console.error('Reservation error:', err);
      setError(t.reservations.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const timeSlots = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM',
  ];

  const guestOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'];

  return (
    <section
      id="reservations"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={images.ambiance}
          alt="Dining ambiance"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-gold text-sm tracking-[0.4em] uppercase">{t.reservations.sectionLabel}</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory mt-4 tracking-wide">
            {t.reservations.title}
          </h2>
          <div className="w-20 h-px bg-gold mx-auto mt-8" />
          <p className="text-ivory/60 mt-6 text-lg max-w-xl mx-auto">
            {t.reservations.subtitle}
          </p>
        </div>

        {/* Reservation Form */}
        <form
          onSubmit={handleSubmit}
          className={`bg-charcoal/60 backdrop-blur-sm border border-ivory/10 p-8 lg:p-12 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-gold flex items-center justify-center">
                <Send className="text-gold" size={28} />
              </div>
              <h3 className="font-serif text-2xl text-ivory mb-3">{t.reservations.success.title}</h3>
              <p className="text-ivory/60">{t.reservations.success.message}</p>
              <p className="text-ivory/40 text-sm mt-2">{t.reservations.success.emailNote}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 text-red-400">
                  <AlertCircle size={20} />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-ivory/70 text-sm tracking-wider uppercase mb-2">{t.reservations.form.fullName}</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="bg-black/50 border-ivory/20 text-ivory placeholder:text-ivory/30 focus:border-gold h-12"
                    placeholder={t.reservations.form.namePlaceholder}
                    required
                  />
                </div>
                <div>
                  <label className="block text-ivory/70 text-sm tracking-wider uppercase mb-2">{t.reservations.form.email}</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="bg-black/50 border-ivory/20 text-ivory placeholder:text-ivory/30 focus:border-gold h-12"
                    placeholder={t.reservations.form.emailPlaceholder}
                    required
                  />
                </div>
              </div>

              {/* Phone & Guests */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-ivory/70 text-sm tracking-wider uppercase mb-2">Phone</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="bg-black/50 border-ivory/20 text-ivory placeholder:text-ivory/30 focus:border-gold h-12"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-ivory/70 text-sm tracking-wider uppercase mb-2">
                    <Users className="inline w-4 h-4 mr-2" />Number of Guests
                  </label>
                  <Select value={formData.guests} onValueChange={(value) => handleChange('guests', value)}>
                    <SelectTrigger className="bg-black/50 border-ivory/20 text-ivory h-12">
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent className="bg-charcoal border-ivory/20">
                      {guestOptions.map((num) => (
                        <SelectItem key={num} value={num} className="text-ivory hover:bg-gold/20">
                          {num} {num === '1' ? 'Guest' : 'Guests'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-ivory/70 text-sm tracking-wider uppercase mb-2">
                    <Calendar className="inline w-4 h-4 mr-2" />Date
                  </label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="bg-black/50 border-ivory/20 text-ivory focus:border-gold h-12"
                    required
                  />
                </div>
                <div>
                  <label className="block text-ivory/70 text-sm tracking-wider uppercase mb-2">
                    <Clock className="inline w-4 h-4 mr-2" />Time
                  </label>
                  <Select value={formData.time} onValueChange={(value) => handleChange('time', value)}>
                    <SelectTrigger className="bg-black/50 border-ivory/20 text-ivory h-12">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-charcoal border-ivory/20">
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time} className="text-ivory hover:bg-gold/20">
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-ivory/70 text-sm tracking-wider uppercase mb-2">Special Requests</label>
                <Textarea
                  value={formData.requests}
                  onChange={(e) => handleChange('requests', e.target.value)}
                  className="bg-black/50 border-ivory/20 text-ivory placeholder:text-ivory/30 focus:border-gold min-h-[100px]"
                  placeholder="Dietary requirements, special occasions, seating preferences..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-black hover:bg-gold/90 py-6 text-sm tracking-[0.2em] uppercase transition-all duration-500 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Confirm Reservation'}
              </Button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Reservations;
