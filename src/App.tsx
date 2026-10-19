import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
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
import { AllProjectsPage } from './components/AllProjectsPage';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'all-projects'>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#all-projects') {
      return 'all-projects';
    }
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#all-projects') {
        setCurrentView('all-projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenAllProjects = () => {
    window.location.hash = '#all-projects';
    setCurrentView('all-projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    window.location.hash = '';
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white text-black relative selection:bg-black selection:text-white font-sans antialiased">
        {/* Hairline scroll progress bar */}
        <ScrollProgressBar />

        {/* Subtle global noise texture overlay */}
        <div className="fixed inset-0 bg-grain pointer-events-none -z-0 opacity-40" />

        {/* Custom desktop-only spring cursor */}
        <CustomCursor />

        {currentView === 'all-projects' ? (
          <AllProjectsPage onBackToHome={handleBackToHome} />
        ) : (
          <>
            {/* Sticky frosted navigation bar */}
            <Navbar />

            {/* Main Content Sections */}
            <main className="relative z-10">
              <Hero />
              <MarqueeTicker />
              <Projects onOpenAllProjects={handleOpenAllProjects} />
              <UxLab />
              <Skills />
              <About />
              <Experience />
              <Contact />
            </main>

            {/* Footer */}
            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
