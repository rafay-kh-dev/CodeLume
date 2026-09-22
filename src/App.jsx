import React from "react";
import Navbar from "./components/header";
import Hero from "./components/hero";
import Services from "./components/services";
import TechStack from "./components/techStack";
import OurProcess from "./components/ourprocess";
import Portfolio from "./components/portfolio";
import Testimonials from "./components/testimonial";
import About from "./components/about";
import FAQ from "./components/faq";
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-blue-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <TechStack />
        <OurProcess />
        <Portfolio />
        <Testimonials />
        <About />
        <FAQ />
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
