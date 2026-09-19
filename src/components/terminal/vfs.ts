export type VFSFile = { type: 'file'; content: string };
export type VFSDir = { type: 'dir'; children: Record<string, VFSNode> };
export type VFSNode = VFSFile | VFSDir;

export class VirtualFileSystem {
  root: VFSDir;
  cwd: string;

  constructor(initialData: Record<string, VFSNode>) {
    this.root = {
      type: 'dir',
      children: {
        'home': {
          type: 'dir',
          children: {
            'guest': {
              type: 'dir',
              children: initialData
            }
          }
        }
      }
    };
    this.cwd = '/home/guest';
  }

  resolvePath(path: string): string {
    if (!path) return this.cwd;
    
    let parts: string[];
    let current: string[];

    if (path.startsWith('/')) {
      parts = path.split('/').filter(Boolean);
      current = [];
    } else {
      parts = path.split('/').filter(Boolean);
      current = this.cwd.split('/').filter(Boolean);
    }

    for (const part of parts) {
      if (part === '.') continue;
      if (part === '..') {
        current.pop();
      } else {
        current.push(part);
      }
    }

    return '/' + current.join('/');
  }

  getNode(path: string): VFSNode | null {
    const resolved = this.resolvePath(path);
    if (resolved === '/') return this.root;

    const parts = resolved.split('/').filter(Boolean);
    let current: VFSNode = this.root;

    for (const part of parts) {
      if (current.type !== 'dir') return null;
      if (!(part in current.children)) return null;
      current = current.children[part];
    }
    return current;
  }

  ls(path: string = ''): string[] | null {
    const node = this.getNode(path);
    if (!node) return null;
    if (node.type === 'file') return [path.split('/').pop()!];
    return Object.keys(node.children).sort();
  }

  cat(path: string): string | null {
    const node = this.getNode(path);
    if (!node) return null;
    if (node.type === 'dir') return 'Is a directory';
    return node.content;
  }

  cd(path: string): boolean {
    const node = this.getNode(path);
    if (!node || node.type !== 'dir') return false;
    this.cwd = this.resolvePath(path);
    return true;
  }

  mkdir(path: string): boolean {
    const resolved = this.resolvePath(path);
    if (resolved === '/') return false;

    const parts = resolved.split('/').filter(Boolean);
    const newDirName = parts.pop()!;
    const parentPath = '/' + parts.join('/');
    
    const parent = this.getNode(parentPath);
    if (!parent || parent.type !== 'dir') return false;
    if (newDirName in parent.children) return false;

    parent.children[newDirName] = { type: 'dir', children: {} };
    return true;
  }
  
  touch(path: string, content: string = ''): boolean {
    const resolved = this.resolvePath(path);
    if (resolved === '/') return false;

    const parts = resolved.split('/').filter(Boolean);
    const fileName = parts.pop()!;
    const parentPath = '/' + parts.join('/');
    
    const parent = this.getNode(parentPath);
    if (!parent || parent.type !== 'dir') return false;
    
    const existing = parent.children[fileName];
    if (existing && existing.type === 'dir') return false;

    parent.children[fileName] = { type: 'file', content };
    return true;
  }
}
