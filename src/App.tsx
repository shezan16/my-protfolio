import { useMemo } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useActiveSection } from "./hooks/useActiveSection";

const SECTION_IDS = ["home", "about", "skills", "projects", "experience", "contact"];

export default function App() {
  const sectionIds = useMemo(() => SECTION_IDS, []);
  const activeId = useActiveSection(sectionIds);

  return (
    <div className="min-h-screen bg-cream-50 font-sans text-plum-900 antialiased">
      <Navbar activeId={activeId} />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
