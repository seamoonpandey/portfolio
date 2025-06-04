export interface Project {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    image: string;
    detailImages?: string[];
    demoUrl?: string;
    githubUrl: string;
    category: string;
    status: string;
    features: string[];
}

export const projects: Project[] = [
    {
        id: 1,
        title: "nvim.lua",
        description:
            "Customized Neovim configuration using Lua for an enhanced development experience.",
        longDescription:
            "A personalized Neovim setup crafted with Lua, integrating Language Server Protocol (LSP) support, custom keybindings, and a curated selection of plugins to streamline and optimize the coding workflow.",
        technologies: ["Lua", "Neovim", "LSP", "Git", "Shell"],
        image: "/api/placeholder/600/400",
        githubUrl: "https://github.com/seamoonpandey/nvim.lua",
        category: "Tools",
        status: "Active",
        features: [
            "LSP Integration",
            "Custom Keybindings",
            "Plugin Management",
            "Theme Customization",
        ],
    },
    {
        id: 2,
        title: "Content Coin",
        description:
            "Conceptual blockchain-based content platform with a focus on monetization and decentralized governance.",
        longDescription:
            "A theoretical framework for a blockchain-driven content monetization platform, enabling creators to earn tokens for quality content. It emphasizes decentralized governance, smart contracts for revenue sharing, and community-driven content curation.",
        technologies: [
            "Blockchain",
            "Smart Contracts",
            "Web3",
            "React",
            "Solidity",
        ],
        image: "/api/placeholder/600/400",
        githubUrl: "https://github.com/seamoonpandey/content-coin",
        category: "Blockchain",
        status: "Concept",
        features: [
            "Token Economics",
            "Smart Contracts",
            "Decentralized Governance",
            "Content Monetization",
        ],
    },
    {
        id: 3,
        title: "Music",
        description:
            "Ad-free local music player for Android built with Flutter.",
        longDescription:
            "A clean and intuitive music player application for Android devices, developed using Flutter. It supports local music file playback, playlist management, and offers a seamless user experience without any advertisements.",
        technologies: ["Flutter", "Dart", "Android", "Audio APIs", "SQLite"],
        image: "/projects/mujic.png",
        githubUrl: "https://github.com/seamoonpandey/music",
        category: "Mobile",
        status: "Complete",
        features: [
            "Local Music Playback",
            "Playlist Management",
            "No Ads",
            "Clean UI",
        ],
    },
    {
        id: 4,
        title: "C-Games Collection",
        description:
            "A suite of console-based games including Snake & Ladder, Ludo, and Arena battles.",
        longDescription:
            "A collection of classic games implemented in C for console gameplay. This project includes games like Snake & Ladder, Ludo, and custom Arena battles, showcasing game logic and data structure implementations.",
        technologies: [
            "C",
            "Console Graphics",
            "Game Logic",
            "Data Structures",
        ],
        image: "/api/placeholder/600/400",
        githubUrl: "https://github.com/seamoonpandey/c-i-do-whatever",
        category: "Games",
        status: "Complete",
        features: [
            "Snake & Ladder",
            "Ludo Game",
            "Arena Battles",
            "Console Based",
        ],
    },
    {
        id: 5,
        title: "uTechSil",
        description:
            "Flutter application integrating OpenCV and YOLOv8 for real-time object detection.",
        longDescription:
            "An advanced image detection application developed with Flutter, incorporating OpenCV and the YOLOv8 model to perform real-time object detection and analysis. It features camera integration and leverages machine learning capabilities.",
        technologies: [
            "Flutter",
            "OpenCV",
            "YOLOv8",
            "Machine Learning",
            "Camera API",
        ],
        image: "/api/placeholder/600/400",
        githubUrl: "https://github.com/seamoonpandey/uTechSil",
        category: "AI/ML",
        status: "Complete",
        features: [
            "Object Detection",
            "Real-time Processing",
            "YOLOv8 Integration",
            "Camera Support",
        ],
    },
    {
        id: 6,
        title: "Hack-n-Hunt",
        description:
            "Collaborative multiplayer gaming app built with Flutter and Rails API backend.",
        longDescription:
            "A multiplayer gaming platform featuring real-time gameplay and user management. Developed collaboratively with @shishirrijal, it combines a Flutter frontend with a Ruby on Rails API backend to deliver an engaging gaming experience.",
        technologies: [
            "Flutter",
            "API",
            "Real-time",
            "Collaboration",
        ],
        image: "/projects/hack-n-hunt.png",
        githubUrl: "https://github.com/i-ces/treasurehunt-app",
        category: "Games",
        status: "Complete",
        features: [
            "Multiplayer Gaming",
            "Real-time Updates",
            "Rails API",
            "Flutter Frontend",
        ],
    },
    {
        id: 7,
        title: "Buggy Meter",
        description: "Full-stack Instagram clone developed with Ruby on Rails.",
        longDescription:
            "A comprehensive social media application replicating Instagram's core features. Built with Ruby on Rails, it includes user authentication, image uploads, social interactions, and feed management, providing a complete full-stack experience.",
        technologies: [
            "Ruby on Rails",
            "PostgreSQL",
            "HTML/CSS",
            "JavaScript",
            "Bootstrap",
        ],
        image: "/api/placeholder/600/400",
        githubUrl: "https://github.com/seamoonpandey/buggy-meter",
        category: "Full Stack",
        status: "Complete",
        features: [
            "User Authentication",
            "Image Upload",
            "Social Feed",
            "Real-time Updates",
        ],
    },
    {
        id: 8,
        title: "Steganographer",
        description:
            "Command-line steganography tool developed using Bash scripting.",
        longDescription:
            "A steganography utility built with Bash scripting that enables users to hide secret data within image and text files. It supports multiple encoding methods and ensures secure data extraction through the command line.",
        technologies: [
            "Bash",
            "Shell Scripting",
            "Steganography",
            "Linux",
            "Cryptography",
        ],
        image: "/api/placeholder/600/400",
        githubUrl: "https://github.com/seamoonpandey/steganographer",
        category: "Security",
        status: "Complete",
        features: [
            "Data Hiding",
            "Multiple Formats",
            "Secure Extraction",
            "Command Line Interface",
        ],
    },
    {
        id: 9,
        title: "TreasureHunt API",
        description:
            "Backend API for the Hack-n-Hunt multiplayer gaming application.",
        longDescription:
            "A Ruby on Rails-based API serving as the backend for the Hack-n-Hunt multiplayer game. It manages game logic, user authentication, and real-time data handling, facilitating seamless interaction between the frontend and backend components.",
        technologies: [
            "Ruby on Rails",
            "PostgreSQL",
            "REST API",
            "Authentication",
            "Real-time",
        ],
        image: "/api/placeholder/600/400",
        githubUrl: "https://github.com/i-ces/treasurehunt-api-rails",
        category: "Backend",
        status: "Complete",
        features: [
            "RESTful API",
            "User Authentication",
            "Game Logic Management",
            "Real-time Data Handling",
        ],
    },
    {
        id: 10,
        title: "Travel Buddy API",
        description:
            "Backend API for the Travel Buddy application, providing travel-related data services.",
        longDescription:
            "A Ruby on Rails-based API that serves as the backend for the Travel Buddy application. It offers endpoints for managing travel destinations, user data, and integrates with external services to provide comprehensive travel information.",
        technologies: [
            "Ruby on Rails",
            "PostgreSQL",
            "REST API",
            "Authentication",
        ],
        image: "/api/placeholder/600/400",
        githubUrl: "https://github.com/MP078/travel_buddy-api/",
        category: "Backend",
        status: "Active",
        features: [
            "RESTful API",
            "User Management",
            "Destination Data Handling",
            "External API Integration",
        ],
    },
    {
        id: 11,
        title: "Travel Buddy Web",
        description:
            "Frontend web application for the Travel Buddy platform, offering travel planning features.",
        longDescription:
            "A web-based frontend developed using React.js for the Travel Buddy platform. It provides users with an interface to search for travel destinations, view details, and plan their trips, integrating seamlessly with the Travel Buddy API.",
        technologies: ["React.js", "JavaScript", "HTML", "CSS", "REST API"],
        image: "/api/placeholder/600/400",
        githubUrl: "https://github.com/MP078/travelbuddy-web",
        category: "Frontend",
        status: "Active",
        features: [
            "Destination Search",
            "Trip Planning Interface",
            "Responsive Design",
            "API Integration",
        ],
    },
];

export const categories = [
    "All",
    "Tools",
    "Mobile",
    "Games",
    "Full Stack",
    "AI/ML",
    "Blockchain",
    "Security",
    "Backend",
    "Frontend",
];

export const getCategoryEmoji = (category: string): string => {
    switch (category) {
        case "Tools":
            return "⚙️";
        case "Mobile":
            return "📱";
        case "Games":
            return "🎮";
        case "AI/ML":
            return "🤖";
        case "Blockchain":
            return "⛓️";
        case "Security":
            return "🔒";
        case "Backend":
            return "⚡";
        case "Full Stack":
            return "🚀";
        case "Frontend":
            return "💻";
        default:
            return "🚀";
    }
};
