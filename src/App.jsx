import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import Leadership from './sections/Leadership';
import Contact from './sections/Contact';
import FunZone from './sections/FunZone';
import AIAssistant from './components/AIAssistant';
import SkillsMarquee from './sections/SkillsMarquee';

function App() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-primary-200 selection:text-primary-900">
      {/* Background decorations */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="hidden md:block absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-100/50 blur-[120px]" />
        <div className="hidden md:block absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <SkillsMarquee />
          <Projects />
          <Achievements />
          <Leadership />
          <FunZone />
          <Contact />
        </main>
        <Footer />
        <AIAssistant />
      </div>
    </div>
  );
}

export default App;
