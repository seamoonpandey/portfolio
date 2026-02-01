import { useState } from 'react';
import TerminalWindow from './components/layout/TerminalWindow';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import InteractiveTerminal from './components/terminal/InteractiveTerminal';
import { Terminal } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isCliMode, setIsCliMode] = useState(false);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <TerminalWindow>
        <div id="home" className="min-h-[60vh] mb-20">
          <Hero />
        </div>
        <div id="projects" className="min-h-screen mb-20">
          <Projects />
        </div>
        <div id="skills" className="min-h-[50vh] mb-20">
           <Skills />
        </div>
         <div id="about" className="min-h-[40vh] mb-20">
           <div className="p-8 border border-terminal-border rounded-lg bg-terminal-dim/50">
             <h2 className="text-2xl font-bold text-terminal-green mb-4">./about</h2>
             <p className="text-gray-300 leading-relaxed">
               I am a passionate developer with a love for clean code and elegant interfaces.
               When I'm not coding, I'm exploring new technologies or contributing to open source.
             </p>
           </div>
        </div>
         <div id="contact" className="min-h-[80vh] mb-24">
           <Contact />
        </div>
        
        {/* Bottom padding for fixed navbar */}
        <div className="h-10"></div>
      </TerminalWindow>
      
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* CLI Toggle Button */}
      <button 
        onClick={() => setIsCliMode(true)}
        className="fixed top-6 right-6 z-50 p-3 bg-terminal-dim border border-terminal-border rounded-full text-terminal-green hover:bg-terminal-border/50 hover:shadow-[0_0_15px_rgba(74,246,38,0.3)] transition-all duration-300"
        title="Open Terminal Mode"
      >
        <Terminal size={24} />
      </button>

      {/* CLI Mode Overlay */}
      {isCliMode && (
        <InteractiveTerminal onExit={() => setIsCliMode(false)} />
      )}
    </>
  );
}

export default App;
