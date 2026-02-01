import React from 'react';
import { motion } from 'framer-motion';

interface TerminalWindowProps {
  children: React.ReactNode;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-terminal-black flex items-center justify-center p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-terminal-dim rounded-lg shadow-2xl overflow-hidden border border-terminal-border flex flex-col h-[90vh]"
      >
        {/* Terminal Header */}
        <div className="bg-[#1a1a1a] px-4 py-2 flex items-center gap-2 border-b border-terminal-border">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
          </div>
          <div className="flex-1 text-center text-sm text-gray-400 font-mono">
            moon@portfolio: ~ (zsh)
          </div>
        </div>

        {/* Terminal Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-thin scrollbar-thumb-terminal-border scrollbar-track-terminal-dim">
           <div className="p-4 sm:p-8">
             {children}
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TerminalWindow;
