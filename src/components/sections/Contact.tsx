import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../utils/animations';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

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
      className="py-20 max-w-2xl mx-auto"
    >
      <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-12 flex items-center gap-4">
        <span className="text-terminal-green">./contact</span>
        <span className="h-px bg-terminal-border flex-1" />
      </motion.h2>

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
    </motion.div>
  );
};

export default Contact;
