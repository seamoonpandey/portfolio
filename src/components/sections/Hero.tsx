import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../utils/animations';

const Hero: React.FC = () => {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="flex flex-col gap-8 py-20"
    >
      <motion.div variants={fadeInUp} className="space-y-4">
        <div className="flex items-center gap-2 text-terminal-green">
          <span className="text-terminal-amber">➜</span>
          <span className="font-bold">~</span>
          <span className="opacity-75">whoami</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          Hello, I'm <span className="text-terminal-green">Moon</span>
        </h1>
        <h2 className="text-xl sm:text-3xl text-gray-400">
          Full Stack Developer & UI/UX Enthusiast
        </h2>
      </motion.div>

      <motion.div variants={fadeInUp} className="p-6 border border-terminal-border bg-black/20 rounded-lg backdrop-blur-sm font-mono text-sm leading-relaxed overflow-x-auto text-gray-300 shadow-inner">
        <p className="whitespace-pre">
{`   __  __
  |  \\/  | ___   ___  _ __
  | |\\/| |/ _ \\ / _ \\| '_ \\
  | |  | | (_) | (_) | | | |
  |_|  |_|\\___/ \\___/|_| |_|

  > Initializing developer profile...
  > Loading skills module... [OK]
  > Mounting creative engine... [OK]
  > Ready to build.`}
        </p>
      </motion.div>
      
      <motion.div variants={fadeInUp} className="space-y-4 max-w-2xl">
        <p className="text-lg text-gray-400">
         I build accessible, pixel-perfect, and performant web experiences.
         I'm focused on creating interactive terminal-like interfaces that 
         combine nostalgia with modern UX.
        </p>
      </motion.div>

      <motion.div variants={fadeInUp} className="flex gap-4 pt-4">
        <a href="#projects" className="px-6 py-3 bg-terminal-green text-terminal-black font-bold rounded hover:bg-green-400 transition-colors">
          View Projects
        </a>
        <a href="/cv.pdf" download className="px-6 py-3 border border-terminal-green text-terminal-green rounded hover:bg-terminal-green/10 transition-colors flex items-center gap-2">
          <span>Download CV</span>
        </a>
        <a href="#contact" className="px-6 py-3 border border-terminal-border text-gray-400 rounded hover:text-terminal-green hover:border-terminal-green transition-colors">
          Contact Me
        </a>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
