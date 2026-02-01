import aboutMd from '../../data/cli/about.md?raw';
import projectsMd from '../../data/cli/projects.md?raw';
import skillsMd from '../../data/cli/skills.md?raw';
import contactMd from '../../data/cli/contact.md?raw';
import helpMd from '../../data/cli/help.md?raw';

type CommandOutput = {
  type: 'text' | 'error' | 'success' | 'clear';
  content?: string;
};

const fileSystem: Record<string, string> = {
  'about.md': aboutMd,
  'projects.md': projectsMd,
  'skills.md': skillsMd,
  'contact.md': contactMd,
  'help.md': helpMd,
};

const commands: Record<string, string> = {
  'about': 'about.md',
  'projects': 'projects.md',
  'skills': 'skills.md',
  'contact': 'contact.md',
  'help': 'help.md',
};

export const parseCommand = (input: string): CommandOutput => {
  const trimmed = input.trim();
  if (!trimmed) return { type: 'text', content: '' };

  const parts = trimmed.split(' ');
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case 'ls':
      return { 
        type: 'success', 
        content: Object.keys(fileSystem).join('  ') 
      };

    case 'cat':
      if (args.length === 0) return { type: 'error', content: 'usage: cat [file]' };
      const file = args[0];
      if (fileSystem[file]) {
        return { type: 'text', content: fileSystem[file] };
      }
      return { type: 'error', content: `cat: ${file}: No such file or directory` };

    case 'clear':
      return { type: 'clear' };

    case 'whoami':
      return { type: 'success', content: 'guest@portfolio' };

    case 'date':
      return { type: 'success', content: new Date().toString() };

    case 'pwd':
      return { type: 'success', content: '/home/moon/portfolio' };
      
    case 'exit':
       // This will be handled by the component side to toggle view
       return { type: 'success', content: 'Exiting CLI mode...' };

    default:
      // Check aliases
      if (commands[cmd]) {
        return { type: 'text', content: fileSystem[commands[cmd]] };
      }
      return { type: 'error', content: `zsh: command not found: ${cmd}` };
  }
};
