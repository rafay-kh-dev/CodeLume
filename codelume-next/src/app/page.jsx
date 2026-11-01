import dynamic from "next/dynamic";
import Hero from "@/components/hero";
import About from "@/components/about";

const MeetRafay = dynamic(() => import("@/components/MeetRafay"));
const Service = dynamic(() => import("@/components/service"));
const OurProcess = dynamic(() => import("@/components/ourprocess"));
const DevToolsSection = dynamic(() => import("@/components/devtoolssection"));
const Calculator = dynamic(() => import("@/components/calculator"));
const Testimonials = dynamic(() => import("@/components/testimonials"));
const Faq = dynamic(() => import("@/components/faq"));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-hidden bg-white">
      <Hero />
      <MeetRafay />
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