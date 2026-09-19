import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../../utils/animations';
import projectsMd from '../../data/cli/projects.md?raw';
import matter from 'gray-matter';
import ProjectDetailModal from './ProjectDetailModal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Project {
  title: string;
  description: string;
  detail?: string;
  tech: string[];
  github: string;
  live: string;
}

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  return (
    <motion.div 
      variants={fadeInUp}
      onClick={onClick}
      className="group relative p-6 bg-terminal-dim border border-terminal-border rounded-lg hover:border-terminal-green transition-colors overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 bg-terminal-green/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 flex flex-col h-full gap-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-100 group-hover:text-terminal-green transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-2 text-gray-400">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-terminal-green"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={20} />
            </a>
            {project.live && (
              <a 
                href={project.live} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-terminal-green"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={20} />
              </a>
            )}
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
  const parsed = matter(projectsMd || '');
  const data = parsed.data || {};
  const projects: Project[] = data.projects || [];
  
  const flagship = projects.find(p => p.title === 'RedSentinel');
  const remainingProjects = projects.filter(p => p.title !== 'RedSentinel');

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20"
      >
        <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-12 flex items-center gap-4">
          <div className="flex items-center gap-2 text-terminal-green">
            <span className="text-terminal-amber">➜</span>
            <span className="font-bold">~</span>
            <span className="opacity-75">cd projects</span>
          </div>
          <span className="h-px bg-terminal-border flex-1" />
        </motion.h2>

        {flagship && (
          <motion.div variants={fadeInUp} className="mb-16 border border-terminal-green rounded-lg bg-terminal-dim/30 overflow-hidden relative">
            <div className="absolute -top-10 -right-10 p-4 opacity-5 text-terminal-green pointer-events-none">
              <Star size={250} />
            </div>
            <div className="p-8 relative z-10">
              <div className="flex items-center gap-2 text-terminal-amber mb-2">
                <Star size={16} fill="currentColor" />
                <span className="font-mono text-sm tracking-widest uppercase font-bold">Flagship Project</span>
              </div>
              <h3 className="text-4xl font-bold text-terminal-green mb-6">{flagship.title}</h3>
              
              <div className="prose prose-invert max-w-none font-mono mb-8">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-400">{children}</ul>,
                    li: ({ children }) => <li className="hover:text-terminal-green transition-colors">{children}</li>,
                    strong: ({ children }) => <strong className="text-terminal-amber font-semibold">{children}</strong>,
                  }}
                >
                  {flagship.detail || flagship.description}
                </ReactMarkdown>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {flagship.tech.map(t => (
                  <span key={t} className="px-3 py-1 bg-terminal-black border border-terminal-green/30 rounded text-terminal-green text-sm font-medium">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a href={flagship.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-terminal-green text-terminal-black font-bold rounded hover:bg-green-400 transition-colors">
                  <Github size={20} /> Source Code
                </a>
                {flagship.live && (
                  <a href={flagship.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border border-terminal-border text-gray-300 hover:text-terminal-green hover:border-terminal-green rounded transition-colors">
                    <ExternalLink size={20} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {remainingProjects.length > 0 && (
          <motion.h3 variants={fadeInUp} className="text-xl font-bold text-gray-400 mb-8 flex items-center gap-4">
            <span className="text-terminal-border">ls -la ./other_projects</span>
            <span className="h-px bg-terminal-border/30 flex-1" />
          </motion.h3>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingProjects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>
      </motion.div>

      <ProjectDetailModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Projects;
