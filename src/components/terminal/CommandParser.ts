import aboutMd from '../../data/cli/about.md?raw';
import projectsMd from '../../data/cli/projects.md?raw';
import skillsMd from '../../data/cli/skills.md?raw';
import contactMd from '../../data/cli/contact.md?raw';
import helpMd from '../../data/cli/help.md?raw';
import matter from 'gray-matter';
import { VirtualFileSystem, type VFSNode } from './vfs';

type CommandOutput = {
  type: 'text' | 'error' | 'success' | 'clear';
  content?: string;
  cwd?: string;
};

const formatFrontmatter = (md: string) => {
  try {
    const { data, content } = matter(md);
    let output = content.trim();

    if (data.projects) {
      output += '\n\n' + data.projects.map((p: { title: string; description: string; detail?: string; tech: string[]; github: string; live?: string }) => 
        `[${p.title}]\n${p.detail || p.description}\nTech: ${p.tech.join(', ')}\nGithub: ${p.github}`
      ).join('\n\n');
    }

    if (data.skills) {
      output += '\n\n' + Object.entries(data.skills).map(([cat, items]) => 
        `${cat}: ${(items as string[]).join(', ')}`
      ).join('\n');
    }

    return output.trim() || 'No content available.';
  } catch {
    return md;
  }
};

const initialData: Record<string, VFSNode> = {
  'about.md': { type: 'file', content: formatFrontmatter(aboutMd) },
  'projects.md': { type: 'file', content: formatFrontmatter(projectsMd) },
  'skills.md': { type: 'file', content: formatFrontmatter(skillsMd) },
  'contact.md': { type: 'file', content: formatFrontmatter(contactMd) },
  'help.md': { type: 'file', content: formatFrontmatter(helpMd) },
  'secret': {
    type: 'dir',
    children: {
      'flag.txt': { type: 'file', content: 'CTF{y0u_f0und_th3_s3cr3t}' }
    }
  }
};

export const vfs = new VirtualFileSystem(initialData);

const aliases: Record<string, string> = {
  'about': 'about.md',
  'projects': 'projects.md',
  'skills': 'skills.md',
  'contact': 'contact.md',
  'help': 'help.md',
  './about': 'about.md',
  './projects': 'projects.md',
  './skills': 'skills.md',
  './contact': 'contact.md',
};

export const parseCommand = (input: string, history: string[] = []): CommandOutput => {
  const trimmed = input.trim();
  if (!trimmed) return { type: 'text', content: '' };

  const parts = trimmed.split(' ').filter(Boolean);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case 'ls': {
      const target = args[0] || '';
      const list = vfs.ls(target);
      if (!list) {
        return { type: 'error', content: `ls: cannot access '${target}': No such file or directory` };
      }
      return { 
        type: 'success', 
        content: list.join('  ') || '(empty directory)'
      };
    }

    case 'cd': {
      const target = args[0] || '/home/guest';
      if (vfs.cd(target)) {
        return { type: 'success', cwd: vfs.cwd };
      }
      return { type: 'error', content: `cd: ${target}: No such file or directory` };
    }

    case 'pwd':
      return { type: 'success', content: vfs.cwd };

    case 'mkdir': {
      if (args.length === 0) return { type: 'error', content: 'usage: mkdir [dir]' };
      const target = args[0];
      if (vfs.mkdir(target)) {
        return { type: 'success' };
      }
      return { type: 'error', content: `mkdir: cannot create directory '${target}': File exists or parent does not exist` };
    }

    case 'touch': {
      if (args.length === 0) return { type: 'error', content: 'usage: touch [file]' };
      const target = args[0];
      if (vfs.touch(target)) {
        return { type: 'success' };
      }
      return { type: 'error', content: `touch: cannot touch '${target}': Is a directory or parent does not exist` };
    }

    case 'cat': {
      if (args.length === 0) return { type: 'error', content: 'usage: cat [file]' };
      const target = args[0];
      const content = vfs.cat(target);
      if (content === null) {
        return { type: 'error', content: `cat: ${target}: No such file or directory` };
      }
      if (content === 'Is a directory') {
        return { type: 'error', content: `cat: ${target}: Is a directory` };
      }
      return { type: 'text', content };
    }

    case 'rm': {
       return { type: 'error', content: `rm: permission denied` };
    }

    case 'clear':
      return { type: 'clear' };

    case 'whoami':
      return { type: 'success', content: 'guest' };

    case 'date':
      return { type: 'success', content: new Date().toString() };

    case 'sudo':
      return { type: 'error', content: 'guest is not in the sudoers file. This incident will be reported.' };
      
    case 'echo':
      return { type: 'text', content: args.join(' ') };
      
    case 'history': {
      const historyList = history.join('\n');
      return { type: 'text', content: historyList || 'History is empty.' };
    }

    case 'exit':
       return { type: 'success', content: 'Exiting CLI mode...' };

    default:
      if (aliases[cmd]) {
        const content = vfs.cat(aliases[cmd]);
        if (content && content !== 'Is a directory') {
          return { type: 'text', content };
        }
      }
      return { type: 'error', content: `zsh: command not found: ${cmd}` };
  }
};
