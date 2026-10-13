export interface TechMarqueeItem {
  id: string;
  name: string;
  badge: 'USING' | 'LEARNING' | 'EXPLORING';
  highlight: string;
  icon: string;
  accent: string;
}

export const marqueeRow1: TechMarqueeItem[] = [
  {
    id: "python",
    name: "Python",
    badge: "USING",
    highlight: "Primary Programming Language",
    icon: "Code",
    accent: "#38BDF8"
  },
  {
    id: "html5",
    name: "HTML5",
    badge: "USING",
    highlight: "Semantic Web Structure",
    icon: "Layout",
    accent: "#FB923C"
  },
  {
    id: "css3",
    name: "CSS3",
    badge: "USING",
    highlight: "Modern Responsive Styling",
    icon: "Palette",
    accent: "#60A5FA"
  },
  {
    id: "javascript",
    name: "JavaScript",
    badge: "LEARNING",
    highlight: "Dynamic Web Scripting",
    icon: "FileCode",
    accent: "#FACC15"
  },
  {
    id: "react",
    name: "React",
    badge: "LEARNING",
    highlight: "Component-Based UI",
    icon: "Atom",
    accent: "#22D3EE"
  },
  {
    id: "vscode",
    name: "VS Code",
    badge: "USING",
    highlight: "Main Developer IDE",
    icon: "Terminal",
    accent: "#0284C7"
  },
  {
    id: "git",
    name: "Git",
    badge: "USING",
    highlight: "Source Control & Commits",
    icon: "GitBranch",
    accent: "#F97316"
  }
];

export const marqueeRow2: TechMarqueeItem[] = [
  {
    id: "github",
    name: "GitHub",
    badge: "LEARNING",
    highlight: "Open Source & Collaboration",
    icon: "Github",
    accent: "#E2E8F0"
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    badge: "USING",
    highlight: "Interface & Asset Design",
    icon: "Image",
    accent: "#38BDF8"
  },
  {
    id: "ai-tools",
    name: "AI Tools",
    badge: "EXPLORING",
    highlight: "Generative Workflows & Prompts",
    icon: "Sparkles",
    accent: "#C084FC"
  },
  {
    id: "web-dev",
    name: "Web Development",
    badge: "LEARNING",
    highlight: "Client Architecture & DOM",
    icon: "Globe",
    accent: "#34D399"
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    badge: "EXPLORING",
    highlight: "Defensive Concepts & Hacking",
    icon: "ShieldAlert",
    accent: "#F87171"
  },
  {
    id: "uiux",
    name: "UI / UX",
    badge: "LEARNING",
    highlight: "Minimal High-Contrast Design",
    icon: "Compass",
    accent: "#A78BFA"
  },
  {
    id: "dsa",
    name: "DSA Foundations",
    badge: "LEARNING",
    highlight: "Algorithms & Complexity",
    icon: "Cpu",
    accent: "#818CF8"
  }
];
