import React from 'react';
import Navbar from './components/header';
import Hero from './components/hero';
import Services from './components/services';
import Portfolio from './components/portfolio';
import Testimonials from './components/testimonial';
import Footer from './components/footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-blue-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}