import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import TerminalWindow from './components/layout/TerminalWindow';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import InteractiveTerminal from './components/terminal/InteractiveTerminal';
import { Terminal, Gamepad2 } from 'lucide-react';
import About from './components/sections/About';
import Games from './components/Games';

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    const sections = ['home', 'projects', 'skills', 'about', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (section: string) => {
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
           <About />
        </div>
         <div id="contact" className="min-h-[80vh] mb-24">
           <Contact />
        </div>
        
        <div className="h-10"></div>
      </TerminalWindow>
      
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      <button 
        onClick={() => navigate('/games')}
        className="fixed top-24 right-6 z-50 p-3 bg-terminal-dim border border-terminal-border rounded-full text-terminal-green hover:bg-terminal-border/50 hover:shadow-[0_0_15px_rgba(74,246,38,0.3)] transition-all duration-300"
        title="Games Sandbox"
      >
        <Gamepad2 size={24} />
      </button>

      <button 
        onClick={() => navigate('/cli')}
        className="fixed top-6 right-6 z-50 p-3 bg-terminal-dim border border-terminal-border rounded-full text-terminal-green hover:bg-terminal-border/50 hover:shadow-[0_0_15px_rgba(74,246,38,0.3)] transition-all duration-300"
        title="Open Terminal Mode"
      >
        <Terminal size={24} />
      </button>
    </>
  );
};

const CliPage = () => {
  const navigate = useNavigate();
  return <InteractiveTerminal onExit={() => navigate('/')} />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cli" element={<CliPage />} />
        <Route path="/games" element={<Games />} />
      </Routes>
    </Router>
  );
}

export default App;
