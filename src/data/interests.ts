export interface InterestItem {
  name: string;
  category: string;
  icon: string;
  description: string;
}

export const interestsList: InterestItem[] = [
  {
    name: "Coding",
    category: "Craft",
    icon: "Code2",
    description: "Writing clean, functional code to solve everyday challenges."
  },
  {
    name: "Software Development",
    category: "Engineering",
    icon: "Boxes",
    description: "Architecting modular, maintainable software and applications."
  },
  {
    name: "AI & Modern Tools",
    category: "Intelligence",
    icon: "Sparkles",
    description: "Experimenting with intelligent workflows and generative tooling."
  },
  {
    name: "Web Development",
    category: "Interface",
    icon: "Globe",
    description: "Crafting fluid, high-contrast, accessible web experiences."
  },
  {
    name: "Cybersecurity",
    category: "Security",
    icon: "ShieldAlert",
    description: "Understanding system defenses, threat surfaces, and digital safety."
  },
  {
    name: "Ethical Hacking",
    category: "Exploration",
    icon: "Terminal",
    description: "Investigating how networks communicate and how vulnerabilities arise."
  },
  {
    name: "UI/UX Design",
    category: "Aesthetics",
    icon: "Palette",
    description: "Designing tactile, dark-mode interfaces with clear typography."
  },
  {
    name: "Tech Exploration",
    category: "Curiosity",
    icon: "Cpu",
    description: "Keeping pace with evolving developer tools and frameworks."
  },
  {
    name: "Building Real Projects",
    category: "Execution",
    icon: "Flame",
    description: "Transforming raw ideas into practical software like Egon."
  }
];
