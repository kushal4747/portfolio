export interface SkillCategory {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  focus: string;
}

export type SkillLevel = 'USING' | 'LEARNING' | 'EXPLORING';

export interface SkillTag {
  name: string;
  category: SkillLevel;
  icon?: string;
  note?: string;
}

export const skillCategories: SkillCategory[] = [
  {
    number: "01",
    title: "PROGRAMMING",
    subtitle: "Core Logic & Problem Solving",
    description: "Currently strengthening programming fundamentals, problem solving, loops, functions, data structures and practical Python development.",
    technologies: ["Python", "Algorithms", "Data Structures", "Logic Building"],
    focus: "Strengthening core programming rigor and procedural problem solving."
  },
  {
    number: "02",
    title: "WEB DEVELOPMENT",
    subtitle: "Frontend Interfaces & Dynamics",
    description: "Building modern web interfaces and learning how frontend applications work. Expanding into dynamic JavaScript behavior and modern component architecture.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Modern Web Architecture"],
    focus: "Responsive layout design, semantic markup, and progressive JavaScript learning."
  },
  {
    number: "03",
    title: "DEVELOPMENT TOOLS",
    subtitle: "Workflow, Versioning & Collaboration",
    description: "Utilizing modern developer environments for efficient coding, version control, source management, and collaborative software projects.",
    technologies: ["VS Code", "Git", "GitHub", "Terminal CLI"],
    focus: "Source control discipline, commit habits, and productivity tooling."
  },
  {
    number: "04",
    title: "DESIGN & CREATIVE",
    subtitle: "Interface Aesthetics & Visual Craft",
    description: "Applying Adobe Photoshop as a creative tool for visual presentation, clean interface mockups, asset creation, and modern UI/UX fundamentals.",
    technologies: ["Adobe Photoshop", "Basic UI/UX", "Web Interface Design", "Asset Design"],
    focus: "Creative visual clarity without claiming corporate graphic design agency status."
  },
  {
    number: "05",
    title: "TECHNOLOGY EXPLORATION",
    subtitle: "Emerging Fields & Security Systems",
    description: "Exploring modern AI tools, cybersecurity concepts and software technologies while continuously expanding my technical knowledge.",
    technologies: ["AI Tools & Prompting", "Artificial Intelligence Concepts", "Cybersecurity Basics", "Ethical Hacking Fundamentals"],
    focus: "Continuous curiosity, threat modeling awareness, and cutting-edge tool synthesis."
  }
];

export const skillTags: SkillTag[] = [
  { name: "Python", category: "USING", note: "Primary coding language" },
  { name: "HTML5", category: "USING", note: "Semantic structures" },
  { name: "CSS3", category: "USING", note: "Responsive styling" },
  { name: "VS Code", category: "USING", note: "Primary IDE" },
  { name: "Git", category: "USING", note: "Version control" },
  { name: "Photoshop", category: "USING", note: "Visual design & assets" },
  { name: "Algorithms", category: "USING", note: "Logic & problem solving" },
  { name: "Terminal CLI", category: "USING", note: "Command-line workflow" },
  { name: "JavaScript", category: "LEARNING", note: "Frontend interactivity" },
  { name: "React", category: "LEARNING", note: "Component development" },
  { name: "GitHub", category: "LEARNING", note: "Collaboration & open-source" },
  { name: "UI/UX", category: "LEARNING", note: "User flows & aesthetics" },
  { name: "Data Structures", category: "LEARNING", note: "Algorithmic thinking" },
  { name: "AI Tools", category: "EXPLORING", note: "Productivity & ML concepts" },
  { name: "Cybersecurity", category: "EXPLORING", note: "Ethical hacking & network safety" },
  { name: "Prompt Eng.", category: "EXPLORING", note: "AI workflow synthesis" }
];
