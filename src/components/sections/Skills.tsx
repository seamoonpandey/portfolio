import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../utils/animations';

const skills = {
  Frontend: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion"],
  Backend: ["Node.js", "PostgreSQL", "GraphQL", "Python", "Redis"],
  Tools: ["Git", "Docker", "Linux", "AWS", "Vim"]
};

const Skills: React.FC = () => {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="py-20"
    >
      <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-12 flex items-center gap-4">
        <span className="text-terminal-green">./skills</span>
        <span className="h-px bg-terminal-border flex-1" />
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(skills).map(([category, items]) => (
          <motion.div key={category} variants={fadeInUp} className="space-y-4">
            <h3 className="text-terminal-amber font-mono text-xl border-b border-terminal-border pb-2">
              {category}
            </h3>
            <ul className="space-y-2">
              {items.map((skill) => (
                <li key={skill} className="flex items-center gap-2 text-gray-400 hover:text-terminal-green transition-colors cursor-default group">
                  <span className="opacity-0 group-hover:opacity-100 text-terminal-green transition-opacity">➜</span>
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
