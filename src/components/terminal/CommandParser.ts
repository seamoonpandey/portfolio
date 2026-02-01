import aboutMd from '../../data/cli/about.md?raw';
import projectsMd from '../../data/cli/projects.md?raw';
import skillsMd from '../../data/cli/skills.md?raw';
import contactMd from '../../data/cli/contact.md?raw';
import helpMd from '../../data/cli/help.md?raw';
import matter from 'gray-matter';

type CommandOutput = {
  type: 'text' | 'error' | 'success' | 'clear';
  content?: string;
};

const formatFrontmatter = (md: string) => {
  try {
    const { data, content } = matter(md);
    let output = content.trim();

    // If there's structured data but little content, format the data for terminal
    if (data.projects) {
      output += '\n\n' + data.projects.map((p: any) => 
        `[${p.title}]\n${p.description}\nTech: ${p.tech.join(', ')}\nGithub: ${p.github}`
      ).join('\n\n');
    }

    if (data.skills) {
      output += '\n\n' + Object.entries(data.skills).map(([cat, items]: any) => 
        `${cat}: ${items.join(', ')}`
      ).join('\n');
    }

    return output.trim() || 'No content available.';
  } catch (e) {
    return md;
  }
};

const fileSystem: Record<string, string> = {
  'about.md': formatFrontmatter(aboutMd),
  'projects.md': formatFrontmatter(projectsMd),
  'skills.md': formatFrontmatter(skillsMd),
  'contact.md': formatFrontmatter(contactMd),
  'help.md': formatFrontmatter(helpMd),
};

const commands: Record<string, string> = {
  'about': 'about.md',
  'projects': 'projects.md',
  'skills': 'skills.md',
  'contact': 'contact.md',
  'help': 'help.md',
};

export const parseCommand = (input: string, history: string[] = []): CommandOutput => {
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
      
    case 'history':
      const historyList = history.join('\n');
      return { type: 'text', content: historyList || 'History is empty.' };

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
