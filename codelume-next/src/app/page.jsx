import Hero from "../components/hero";
import About from "../components/about";
import Service from "../components/service";
import OurProcess from "../components/ourprocess";
import DevToolsSection from "../components/devtoolssection";
import Calculator from "../components/calculator";
import Testimonials from "../components/testimonials";
import Faq from "../components/faq";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-hidden">
      <Hero />
      <About />
      <Service />
      <OurProcess />
      <DevToolsSection />
      <Calculator />
      <Testimonials />
      <Faq />
    </main>
  );
}