import React from 'react';
import { Terminal, Code, User, Mail, Cpu } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { id: 'home', label: '~/home', icon: Terminal },
  { id: 'projects', label: '~/projects', icon: Code },
  { id: 'skills', label: '~/skills', icon: Cpu },
  { id: 'about', label: '~/about', icon: User },
  { id: 'contact', label: '~/contact', icon: Mail },
];

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-terminal-dim/90 backdrop-blur-sm border border-terminal-border px-4 py-2 rounded-full z-50 shadow-lg">
      <ul className="flex items-center gap-1 sm:gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={clsx(
                  "flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 font-mono text-sm",
                  isActive 
                    ? "text-terminal-black bg-terminal-green font-bold shadow-[0_0_10px_rgba(74,246,38,0.4)]" 
                    : "text-gray-400 hover:text-terminal-green hover:bg-terminal-border/50"
                )}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
