import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, ArrowLeft, Construction, Trophy, Target, Zap } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../utils/animations';

const Games = () => {
  const navigate = useNavigate();

  const comingSoon = [
    { title: 'Cyber Racer', icon: Zap, description: 'High-speed terminal racing game.' },
    { title: 'Code Breaker', icon: Target, description: 'Logic-based puzzle solving.' },
    { title: 'Git Quest', icon: Trophy, description: 'RPG adventure through git commits.' },
  ];

  return (
    <div className="min-h-screen bg-terminal-black text-gray-100 p-8 font-mono relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-terminal-green rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-terminal-amber rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-6xl mx-auto relative z-10"
      >
        <motion.button
          variants={fadeInUp}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-terminal-green hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>cd ..</span>
        </motion.button>

        <motion.div variants={fadeInUp} className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <Gamepad2 size={48} className="text-terminal-green" />
            <h1 className="text-5xl font-bold tracking-tight">/games</h1>
          </div>
          <p className="text-gray-400 text-xl max-w-2xl">
            A sandbox for interactive terminal-based mini-games and experiments. Coming soon...
          </p>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {comingSoon.map((game, index) => (
            <div 
              key={index}
              className="p-8 border border-terminal-border rounded-xl bg-terminal-dim/50 backdrop-blur-md relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <game.icon size={64} />
              </div>
              <div className="relative z-10">
                <Construction className="text-terminal-amber mb-4" size={24} />
                <h3 className="text-2xl font-bold mb-2 text-gray-100">{game.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {game.description}
                </p>
                <div className="h-1 w-full bg-terminal-border rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "30%" }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 1 }}
                    className="h-full bg-terminal-green"
                  />
                </div>
                <p className="text-[10px] text-terminal-green mt-2 tracking-widest uppercase">
                  Development: 30%
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="mt-20 p-12 border border-dashed border-terminal-border rounded-2xl flex flex-col items-center justify-center text-center opacity-60"
        >
          <div className="w-20 h-20 bg-terminal-dim rounded-full flex items-center justify-center mb-6">
            <Construction size={40} className="text-terminal-amber" />
          </div>
          <h2 className="text-2xl font-bold mb-4 italic">"The best games are the ones we build while learning."</h2>
          <p className="text-gray-500 max-w-lg">
            I am currently working on a custom terminal engine to power these mini-games. 
            Stay tuned for the first deployment!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Games;
