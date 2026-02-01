import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { parseCommand } from './CommandParser';
import { motion } from 'framer-motion';

interface InteractiveTerminalProps {
  onExit: () => void;
}

type HistoryItem = {
  command: string;
  output?: string;
  type: 'text' | 'error' | 'success';
};

const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ onExit }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // Initial welcome message
    if (history.length === 0) {
      setHistory([
        { command: '', output: 'Welcome to the interactive terminal! Type "help" to see available commands.', type: 'success' }
      ]);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (input.trim().toLowerCase() === 'exit') {
        onExit();
        return;
    }

    const result = parseCommand(input);

    if (result.type === 'clear') {
      setHistory([]);
    } else {
      setHistory(prev => [...prev, { 
        command: input, 
        output: result.content, 
        type: result.type as any 
      }]);
    }
    setInput('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 z-[60] bg-terminal-black/95 backdrop-blur-md flex flex-col p-4 sm:p-8 font-mono"
    >
      <div className="flex justify-between items-center border-b border-terminal-border pb-4 mb-4">
        <div className="flex items-center gap-2 text-terminal-green">
          <TerminalIcon size={20} />
          <span className="font-bold">CLI Mode</span>
        </div>
        <button onClick={onExit} className="text-gray-400 hover:text-red-500 transition-colors">
          <X size={24} />
        </button>
      </div>

      <div 
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-terminal-border scrollbar-track-transparent"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, i) => (
          <div key={i} className="mb-2">
            {item.command && (
              <div className="flex gap-2 text-gray-400">
                <span className="text-terminal-green">moon@portfolio:~$</span>
                <span>{item.command}</span>
              </div>
            )}
            {item.output && (
              <div className={`whitespace-pre-wrap mt-1 ${
                item.type === 'error' ? 'text-red-400' : 
                item.type === 'success' ? 'text-terminal-green' : 'text-gray-300'
              }`}>
                {item.output}
              </div>
            )}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <span className="text-terminal-green">moon@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-gray-100 caret-terminal-green"
            autoFocus
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </motion.div>
  );
};

export default InteractiveTerminal;
