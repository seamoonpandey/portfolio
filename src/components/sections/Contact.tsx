import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../utils/animations';
import contactMd from '../../data/cli/contact.md?raw';
import matter from 'gray-matter';
import { Github, Twitter, Linkedin, Mail, Send, ExternalLink, Globe } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  
  // Safely parse frontmatter with hardcoded fallback for development stability
  let data: any = {};
  try {
    const parsed = matter(contactMd || '');
    data = parsed.data || {};
  } catch (e) {
    console.error('Error parsing contact markdown:', e);
  }

  // Fallback data if parsing failed or returned empty
  const email = data.email || 'moon@example.com';
  const links = data.links || {
    GitHub: 'github.com/moon',
    Twitter: '@moon_dev',
    LinkedIn: 'linkedin.com/in/moon'
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return <Github size={18} />;
      case 'twitter': return <Twitter size={18} />;
      case 'linkedin': return <Linkedin size={18} />;
      case 'email': return <Mail size={18} />;
      default: return <Globe size={18} />;
    }
  };

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
              onChange={(e) => setFormState((prev: typeof formState) => ({ ...prev, name: e.target.value }))}
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
              onChange={(e) => setFormState((prev: typeof formState) => ({ ...prev, email: e.target.value }))}
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
              onChange={(e) => setFormState((prev: typeof formState) => ({ ...prev, message: e.target.value }))}
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
            <h3 className="text-terminal-amber font-mono text-xl mb-6 border-b border-terminal-border pb-2 flex items-center gap-2">
              <Send size={20} /> Connect
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {email && (
                <a 
                  href={`mailto:${email}`}
                  className="group flex items-center justify-between p-4 border border-terminal-border rounded hover:border-terminal-green hover:bg-terminal-green/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-terminal-green group-hover:scale-110 transition-transform">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="block text-terminal-green font-mono text-[10px] uppercase tracking-widest">Email</span>
                      <span className="text-gray-300 font-mono text-sm">{email}</span>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-terminal-border group-hover:text-terminal-green opacity-0 group-hover:opacity-100 transition-all" />
                </a>
              )}
              
              {Object.entries(links || {}).map(([platform, link]) => (
                <a 
                  key={platform}
                  href={String(link).startsWith('http') ? String(link) : (platform.toLowerCase() === 'twitter' && String(link).startsWith('@') ? `https://twitter.com/${String(link).slice(1)}` : `https://${link}`)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 border border-terminal-border rounded hover:border-terminal-green hover:bg-terminal-green/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-terminal-green group-hover:scale-110 transition-transform">
                      {getPlatformIcon(platform)}
                    </div>
                    <div>
                      <span className="block text-terminal-green font-mono text-[10px] uppercase tracking-widest">{platform}</span>
                      <span className="text-gray-300 font-mono text-sm">{String(link)}</span>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-terminal-border group-hover:text-terminal-green opacity-0 group-hover:opacity-100 transition-all" />
                </a>
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
