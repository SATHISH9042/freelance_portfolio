import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { AmbientBackground } from './components/AmbientBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeTicker } from './components/MarqueeTicker';
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
      <div className="min-h-screen text-slate-100 relative selection:bg-lime-accent selection:text-midnight-950 font-sans transition-colors duration-700">
        {/* Hairline scroll progress bar */}
        <ScrollProgressBar />

        {/* Dynamic theme-reactive ambient lighting and floating constellation canvas */}
        <AmbientBackground />

        {/* Subtle global noise texture overlay */}
        <div className="fixed inset-0 bg-grain pointer-events-none -z-0 opacity-70" />

        {/* Custom desktop-only spring cursor */}
        <CustomCursor />

        {/* Sticky frosted navigation bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <Hero />
          <MarqueeTicker />
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
