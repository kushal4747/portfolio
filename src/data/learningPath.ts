export interface LearningStep {
  step: number;
  title: string;
  category: 'core' | 'web' | 'theory' | 'applied' | 'future';
  status: 'In Progress' | 'Continuous' | 'Foundation Set' | 'Upcoming';
  statusColor: 'emerald' | 'cyan' | 'blue' | 'purple' | 'amber';
  description: string;
  tags: string[];
}

export const learningPathSteps: LearningStep[] = [
  {
    step: 1,
    title: "PROGRAMMING FUNDAMENTALS",
    category: "core",
    status: "Foundation Set",
    statusColor: "emerald",
    description: "Core logic, computational thinking, control flow, loops, memory concepts, and functional decomposition.",
    tags: ["Conditionals", "Loops", "Functions", "Logic"]
  },
  {
    step: 2,
    title: "PYTHON",
    category: "core",
    status: "In Progress",
    statusColor: "cyan",
    description: "Strengthening Python language mastery, script automation, data manipulation, and structured programming.",
    tags: ["Syntax", "Data Types", "OOP Basics", "File I/O"]
  },
  {
    step: 3,
    title: "WEB DEVELOPMENT",
    category: "web",
    status: "In Progress",
    statusColor: "cyan",
    description: "Semantic HTML5, CSS3 styling, responsive layouts, Flexbox/Grid, and modern browser standards.",
    tags: ["HTML5", "CSS3", "Responsive", "UI"]
  },
  {
    step: 4,
    title: "JAVASCRIPT",
    category: "web",
    status: "In Progress",
    statusColor: "amber",
    description: "DOM manipulation, ES6+ features, asynchronous event loops, and foundational client-side scripting.",
    tags: ["ES6+", "DOM", "Async/Await", "Events"]
  },
  {
    step: 5,
    title: "DATA STRUCTURES & ALGORITHMS",
    category: "theory",
    status: "In Progress",
    statusColor: "blue",
    description: "Arrays, linked lists, stacks, queues, searching/sorting algorithms, and asymptotic time complexity (Big-O).",
    tags: ["Arrays", "Complexity", "Recursion", "Sorting"]
  },
  {
    step: 6,
    title: "COMPUTER SCIENCE FUNDAMENTALS",
    category: "theory",
    status: "In Progress",
    statusColor: "blue",
    description: "Operating system primitives, computer networking models (TCP/IP), database management basics, and architecture.",
    tags: ["OS", "Networking", "DBMS", "Architecture"]
  },
  {
    step: 7,
    title: "AI / MACHINE LEARNING",
    category: "applied",
    status: "Continuous",
    statusColor: "purple",
    description: "Harnessing modern LLM workflows, understanding neural network intuition, and AI-assisted tooling.",
    tags: ["Prompt Engineering", "ML Basics", "Tool Synthesis"]
  },
  {
    step: 8,
    title: "CYBERSECURITY",
    category: "applied",
    status: "Continuous",
    statusColor: "purple",
    description: "Exploring foundational ethical hacking concepts, web security vulnerabilities (OWASP), and network defense.",
    tags: ["Ethical Hacking", "OWASP", "Network Security"]
  },
  {
    step: 9,
    title: "SOFTWARE ENGINEERING",
    category: "future",
    status: "Upcoming",
    statusColor: "emerald",
    description: "System design, clean code architecture, testing methodologies, scalable design patterns, and deployment pipelines.",
    tags: ["System Design", "Architecture", "CI/CD", "Quality"]
  }
];
