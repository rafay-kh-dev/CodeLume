import React from 'react';
import Navbar from './components/header';
import Hero from './components/hero';
import Services from './components/services';
import Estimator from './components/estimator';
import Portfolio from './components/portfolio';
import Footer from './components/footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Estimator />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}