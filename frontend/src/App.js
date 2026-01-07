import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CulinarySignatures from './components/CulinarySignatures';
import MenuSection from './components/MenuSection';
import Experience from './components/Experience';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Reservations from './components/Reservations';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App bg-black min-h-screen">
      <Navbar />
      <Hero />
      <CulinarySignatures />
      <MenuSection />
      <Experience />
      <Features />
      <Gallery />
      <Testimonials />
      <Reservations />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default App;
