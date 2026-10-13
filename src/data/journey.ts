export interface JourneyItem {
  period: string;
  badge: string;
  title: string;
  description: string;
  highlight: string;
  status: 'completed' | 'current' | 'upcoming';
  icon: string;
}

export const journeyTimeline: JourneyItem[] = [
  {
    period: "2024",
    badge: "FOUNDATION",
    title: "CBSE Class 12 Completion",
    description: "Completed senior secondary school education (CBSE Class 12), building strong foundations in mathematics and science, setting the stage for computer science.",
    highlight: "Analytical Thinking & Problem Solving Roots",
    status: "completed",
    icon: "GraduationCap"
  },
  {
    period: "2026",
    badge: "ACADEMICS",
    title: "Started B.Tech in CSE",
    description: "Commenced Bachelor of Technology (B.Tech) in Computer Science Engineering at Swami Vivekanand Institute of Engineering & Technology (SVIET), Chandigarh.",
    highlight: "SVIET Chandigarh • Computer Science Department",
    status: "completed",
    icon: "BookOpen"
  },
  {
    period: "CURRENTLY",
    badge: "ACTIVE FOCUS",
    title: "Building, Learning & Exploring",
    description: "Practicing programming, frontend development, web technologies, AI tools, and cybersecurity concepts while building personal software like Egon and participating in hackathons.",
    highlight: "Active Development on Egon & Hackathon Ideas",
    status: "current",
    icon: "Code2"
  },
  {
    period: "NEXT",
    badge: "ROADMAP",
    title: "Deepening Fundamentals & Engineering Rigor",
    description: "Strengthening Data Structures & Algorithms (DSA), low-level computer science fundamentals, full-stack software architecture, applied AI, and ethical hacking depth.",
    highlight: "DSA Mastery & Advanced Software Craft",
    status: "upcoming",
    icon: "Compass"
  }
];
