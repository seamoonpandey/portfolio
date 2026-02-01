import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../utils/animations';
import contactMd from '../../data/cli/contact.md?raw';
import matter from 'gray-matter';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const { data } = matter(contactMd);
  const { links } = data;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert('Command sent! (Simulation)');
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="py-20 max-w-4xl mx-auto px-4"
    >
      <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-12 flex items-center gap-4">
        <span className="text-terminal-green">./contact</span>
        <span className="h-px bg-terminal-border flex-1" />
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-terminal-green font-mono text-sm">
              $ input --name
            </label>
            <input
              type="text"
              id="name"
              value={formState.name}
              onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-terminal-dim border border-terminal-border rounded p-3 text-gray-200 focus:border-terminal-green focus:outline-none transition-colors font-mono"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-terminal-green font-mono text-sm">
              $ input --email
            </label>
            <input
              type="email"
              id="email"
              value={formState.email}
              onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
              className="w-full bg-terminal-dim border border-terminal-border rounded p-3 text-gray-200 focus:border-terminal-green focus:outline-none transition-colors font-mono"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-terminal-green font-mono text-sm">
              $ input --message
            </label>
            <textarea
              id="message"
              rows={4}
              value={formState.message}
              onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
              className="w-full bg-terminal-dim border border-terminal-border rounded p-3 text-gray-200 focus:border-terminal-green focus:outline-none transition-colors font-mono resize-none"
              placeholder="Your message here..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-terminal-green text-terminal-black font-bold rounded hover:bg-green-400 transition-colors font-mono mt-4"
          >
            $ execute send_message.exe
          </button>
        </motion.form>

        <motion.div variants={fadeInUp} className="space-y-8">
          <div>
            <h3 className="text-terminal-amber font-mono text-xl mb-4 border-b border-terminal-border pb-2">
              Connect
            </h3>
            <div className="space-y-4">
              {Object.entries(links || {}).map(([platform, link]) => (
                <div key={platform} className="flex flex-col gap-1">
                  <span className="text-terminal-green font-mono text-xs uppercase tracking-widest">{platform}</span>
                  <a 
                    href={String(link).startsWith('http') ? String(link) : `https://${link}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-terminal-green transition-colors font-mono break-all"
                  >
                    {String(link)}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border border-terminal-border rounded-lg bg-terminal-green/5 font-mono text-xs text-terminal-dim">
            <p className="mb-2">STDOUT:</p>
            <p className="text-terminal-green/60">Waiting for connection...</p>
            <p className="text-terminal-green/40 mt-4 italic">// End of file</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
