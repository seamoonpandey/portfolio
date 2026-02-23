import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Code2 } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
}

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-terminal-black border-2 border-terminal-green rounded-xl shadow-2xl shadow-terminal-green/20 pointer-events-auto overflow-hidden"
            >
              {/* Header */}
              <div className="sticky top-0 bg-terminal-dim border-b border-terminal-border p-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <Code2 className="text-terminal-green" size={24} />
                  <h2 className="text-2xl font-bold text-gray-100 font-mono">
                    {project.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-terminal-green transition-colors p-2 hover:bg-terminal-border/50 rounded-lg"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto font-mono">
                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-terminal-green text-sm mb-2 flex items-center gap-2">
                    <span className="text-terminal-amber">$</span> cat README.md
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h3 className="text-terminal-green text-sm mb-3 flex items-center gap-2">
                    <span className="text-terminal-amber">$</span> ls technologies/
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-4 py-2 bg-terminal-dim border border-terminal-border rounded-lg text-terminal-amber text-sm font-medium hover:border-terminal-green transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="space-y-3">
                  <h3 className="text-terminal-green text-sm mb-3 flex items-center gap-2">
                    <span className="text-terminal-amber">$</span> cat links.txt
                  </h3>
                  
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-terminal-dim border border-terminal-border rounded-lg hover:border-terminal-green transition-colors group"
                  >
                    <Github className="text-gray-400 group-hover:text-terminal-green transition-colors" size={24} />
                    <div className="flex-1">
                      <div className="text-gray-300 font-medium">Source Code</div>
                      <div className="text-gray-500 text-sm">View on GitHub</div>
                    </div>
                    <ExternalLink className="text-gray-500 group-hover:text-terminal-green transition-colors" size={20} />
                  </a>

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-terminal-dim border border-terminal-border rounded-lg hover:border-terminal-green transition-colors group"
                  >
                    <ExternalLink className="text-gray-400 group-hover:text-terminal-green transition-colors" size={24} />
                    <div className="flex-1">
                      <div className="text-gray-300 font-medium">Live Demo</div>
                      <div className="text-gray-500 text-sm">Visit website</div>
                    </div>
                    <ExternalLink className="text-gray-500 group-hover:text-terminal-green transition-colors" size={20} />
                  </a>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-terminal-dim border-t border-terminal-border p-4 flex items-center justify-between">
                <span className="text-gray-500 text-sm font-mono">
                  Press <kbd className="px-2 py-1 bg-terminal-black border border-terminal-border rounded text-terminal-green text-xs">ESC</kbd> to close
                </span>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-terminal-green/10 border border-terminal-green text-terminal-green rounded-lg hover:bg-terminal-green hover:text-terminal-black transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
