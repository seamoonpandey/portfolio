import React from 'react';
import { useNavigate } from 'react-router-dom';
import TerminalWindow from './layout/TerminalWindow';
import { ArrowLeft, Download } from 'lucide-react';

const ResumePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <TerminalWindow>
      <div className="h-full flex flex-col pt-4 pb-8 h-[75vh]">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-terminal-green transition-colors font-mono"
          >
            <ArrowLeft size={20} />
            <span>cd ~/home</span>
          </button>
          
          <a 
            href="/resume_seamoon_pandey.pdf" 
            download
            className="flex items-center gap-2 px-4 py-2 bg-terminal-green/10 text-terminal-green border border-terminal-green rounded hover:bg-terminal-green hover:text-terminal-black transition-colors font-mono"
          >
            <Download size={18} />
            <span>Download PDF</span>
          </a>
        </div>
        
        <div className="flex-1 w-full bg-white rounded-lg overflow-hidden border border-terminal-border">
          <object 
            data="/resume_seamoon_pandey.pdf" 
            type="application/pdf" 
            className="w-full h-full min-h-[65vh]"
          >
            <p className="p-8 text-center text-gray-800 font-mono">
              Your browser does not support embedded PDFs. 
              <a href="/resume_seamoon_pandey.pdf" className="text-blue-600 underline ml-2">
                Download it here
              </a>.
            </p>
          </object>
        </div>
      </div>
    </TerminalWindow>
  );
};

export default ResumePage;
