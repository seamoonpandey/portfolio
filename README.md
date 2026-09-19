# 👨‍💻 Seamoon Pandey | Developer Portfolio

A sleek, interactive, terminal-themed portfolio built with **React**, **TypeScript**, and **Framer Motion**. It features both a modern graphical user interface and a fully functional interactive CLI (Virtual File System) to explore projects, skills, and contact info in an authentic developer environment.

![Portfolio GUI](https://via.placeholder.com/800x450.png?text=GUI+View) <!-- Add your screenshot here -->
![Portfolio CLI](https://via.placeholder.com/800x450.png?text=CLI+View) <!-- Add your screenshot here -->

## 🚀 Features

- **Dual Modes**: Seamlessly switch between a beautiful graphical layout and a functional CLI mode.
- **Interactive Terminal**: An authentic OS-like virtual file system (VFS).
  - Use real terminal commands: `cd`, `ls`, `cat`, `pwd`, `mkdir`, `touch`, `whoami`, `clear`.
  - Try commands like `./about`, `./projects`, `./skills`, and `./contact` to fetch data.
  - Explore the hidden `secret` folder for an Easter egg.
- **Markdown-Driven Data**: Content (projects, skills, about me) is stored in markdown files parsed with `gray-matter`.
- **Framer Motion Animations**: Smooth scrolling, staggering lists, and clean entry animations.
- **Responsive Design**: Tailored to look great on desktop, tablet, and mobile.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown Parsing**: [Gray-Matter](https://github.com/jonschlinkert/gray-matter) & [React-Markdown](https://github.com/remarkjs/react-markdown)

## 📖 User Guide

### 1. Graphical Interface
The GUI is designed to mimic an aesthetic hacker/developer setup. Each section acts like an executable command:
- `➜ ~ ./about`: Get to know me.
- `➜ ~ ./projects`: Check out my open-source work and full-stack projects.
- `➜ ~ ./skills`: See my technology stack and tools.
- `➜ ~ ./contact`: Links to reach me via email, GitHub, X (Twitter), and LinkedIn.

### 2. CLI Mode
Click the terminal icon in the navigation bar to toggle CLI Mode. Welcome to `guest@portfolio:~$`!
Try typing the following commands:
- `help` - Lists the primary commands.
- `ls` - View files in the current directory.
- `cd <dir>` - Navigate the file system.
- `cat about.md` - Print the content of my bio.
- `./projects` - Execute the projects binary to view my work.
- `mkdir test` - Create a folder.
- `sudo` - See what happens when you try to elevate privileges.

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/seamoonpandey/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📝 Customization

All data is conveniently stored inside `src/data/cli/`.
- Edit `about.md` to update the bio.
- Edit `projects.md` to update the portfolio items.
- Edit `skills.md` to update the tech stack.
- Edit `contact.md` to update socials.

The system will automatically parse the frontmatter and update both the GUI and CLI instantly.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
*Built with ❤️ by [Seamoon Pandey](https://github.com/seamoonpandey)*
