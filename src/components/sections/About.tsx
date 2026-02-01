import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../utils/animations';
import aboutMd from '../../data/cli/about.md?raw';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const About: React.FC = () => {
  const parsed = matter(aboutMd || '');
  const content = parsed.content || '';

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="py-20"
    >
      <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-12 flex items-center gap-4">
        <span className="text-terminal-green">./about</span>
        <span className="h-px bg-terminal-border flex-1" />
      </motion.h2>

      <motion.div 
        variants={fadeInUp}
        className="prose prose-invert max-w-none p-8 border border-terminal-border rounded-lg bg-terminal-dim/30 backdrop-blur-sm"
      >
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>,
            h1: ({ children }) => <h1 className="text-2xl font-bold text-terminal-green mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-bold text-terminal-amber mb-3">{children}</h2>,
            ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-400">{children}</ul>,
            li: ({ children }) => <li className="hover:text-terminal-green transition-colors">{children}</li>,
            strong: ({ children }) => <strong className="text-terminal-amber font-semibold">{children}</strong>,
          }}
        >
          {content}
        </ReactMarkdown>
      </motion.div>
    </motion.div>
  );
};

export default About;
