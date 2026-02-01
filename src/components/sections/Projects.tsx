import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../../utils/animations';

const projects = [
  {
    title: "EcoTrack",
    description: "A sustainable lifestyle tracking PWA built with React and Firebase.",
    tech: ["React", "Firebase", "PWA", "Tailwind"],
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    title: "DevTerminal",
    description: "A web-based terminal emulator for developer portfolio templates.",
    tech: ["TypeScript", "React", "Framer Motion"],
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    title: "CryptoDash",
    description: "Real-time cryptocurrency dashboard with D3.js visualizations.",
    tech: ["Next.js", "D3.js", "CoinGecko API"],
    github: "https://github.com",
    live: "https://example.com"
  }
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  return (
    <motion.div 
      variants={fadeInUp}
      className="group relative p-6 bg-terminal-dim border border-terminal-border rounded-lg hover:border-terminal-green transition-colors overflow-hidden"
    >
      <div className="absolute inset-0 bg-terminal-green/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 flex flex-col h-full gap-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-100 group-hover:text-terminal-green transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-2 text-gray-400">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-terminal-green">
              <Github size={20} />
            </a>
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="hover:text-terminal-green">
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map(t => (
            <span key={t} className="text-xs px-2 py-1 border border-terminal-border rounded text-terminal-amber">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
    // Parallax setup could go here if we wanted complex background movement
    // For now, we'll stick to a clean grid layout which fits the terminal aesthetic better
    
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-20"
    >
      <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-12 flex items-center gap-4">
        <span className="text-terminal-green">./projects</span>
        <span className="h-px bg-terminal-border flex-1" />
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
