import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { UxLab } from './components/UxLab';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-midnight-950 text-slate-100 relative selection:bg-lime-accent selection:text-midnight-950 font-sans">
        {/* Subtle global noise background */}
        <div className="fixed inset-0 bg-grain pointer-events-none -z-0 opacity-70" />

        {/* Custom desktop-only cursor */}
        <CustomCursor />

        {/* Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <Hero />
          <Projects />
          <UxLab />
          <Skills />
          <About />
          <Experience />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
