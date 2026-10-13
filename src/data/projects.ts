export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  tagline?: string;
  category: string;
  status: string;
  isFeatured?: boolean;
  shortDescription: string;
  fullDescription: string;
  problem?: string;
  solution?: string;
  features: string[];
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  images: {
    cover: string;
    preview: string;
    badge?: string;
  };
  highlights: {
    label: string;
    value: string;
  }[];
}

export const projectsData: ProjectItem[] = [
  {
    id: "egon",
    number: "01",
    title: "EGON",
    tagline: "Personal B.Tech Journey & Student Productivity Hub",
    category: "PERSONAL PROJECT • STUDENT PRODUCTIVITY • AI",
    status: "Active Development",
    isFeatured: true,
    shortDescription: "A unified platform built to help students architect their learning trajectory from college coursework through to placement readiness.",
    fullDescription: "Egon is my personal B.Tech journey and student productivity application. The vision behind Egon is to create one cohesive hub that helps engineering students structure their academic and self-taught curriculum. It empowers students to configure their course, duration, current skill levels, and learning goals, using AI-assisted roadmap generation to chart practical milestones.",
    problem: "Students frequently juggle coursework and placement preparation with disconnected tools, causing fragmented schedules, missed learning consistency, and unclear preparation roadmaps.",
    solution: "A unified productivity system integrating daily focus routines, custom task execution, study timers, structured course progress tracking, and AI-assisted roadmap generation.",
    features: [
      "Daily Focus & Habit Systems",
      "Custom Tasks & Execution Lists",
      "Focused Study Timer",
      "Structured Learning Roadmaps",
      "College Coursework Tracking",
      "Programming Language Progress",
      "Placement Preparation Tracker",
      "AI-Assisted Roadmap Generation"
    ],
    techStack: [
      "React Native",
      "Expo",
      "TypeScript",
      "AsyncStorage",
      "AI Roadmap Logic"
    ],
    liveUrl: "", // Populate when live deployment is ready
    githubUrl: "", // Populate with repository link
    images: {
      cover: "/projects/egon/logo-glow.png",
      preview: "/projects/egon/tutorial-web.png",
      badge: "/projects/egon/icon.png"
    },
    highlights: [
      { label: "Role", value: "Creator & Lead Developer" },
      { label: "Target", value: "Engineering Students" },
      { label: "Status", value: "Active Iteration" }
    ]
  },
  {
    id: "vyora",
    number: "02",
    title: "VYORA SYSTEM",
    tagline: "Track. Understand. Act. Reduce.",
    category: "HACKATHON PROJECT • FOOD WASTE INTELLIGENCE",
    status: "Concept & Prototype",
    isFeatured: false,
    shortDescription: "A food-waste intelligence platform concept designed to diagnose where losses happen and empower smarter operational decisions.",
    fullDescription: "Vyora System is a food-waste intelligence platform concept designed around understanding where culinary and commercial food waste occurs. By systematically categorizing waste triggers across kitchen workflows, the system provides AI-assisted insights to help food businesses identify waste patterns and reduce preventable operational losses.",
    problem: "Food businesses and commercial kitchens suffer significant revenue loss and ecological impact from unquantified spoilage, overproduction, and plate waste without actionable telemetry.",
    solution: "A dedicated intelligence architecture that logs waste across operational stages, models consumption patterns, and generates AI-assisted recommendations to streamline batch sizing and reduce loss.",
    features: [
      "Spoilage Waste Tracking",
      "Overproduction Diagnostics",
      "Plate Waste Aggregation",
      "Operational Loss Insights",
      "Sales vs. Waste Understanding",
      "AI-Assisted Reduction Recommendations",
      "Visual Analytics Dashboard"
    ],
    techStack: [
      "AI Analytics Concept",
      "Data Intelligence",
      "Dashboard UI",
      "Waste Classification Models"
    ],
    liveUrl: "",
    githubUrl: "",
    images: {
      cover: "/projects/vyora/vyora-cover.svg",
      preview: "/projects/vyora/vyora-dashboard.svg"
    },
    highlights: [
      { label: "Event", value: "Eureka Hackathon Concept" },
      { label: "Domain", value: "Sustainability Tech" },
      { label: "Stage", value: "Prototype Model" }
    ]
  },
  {
    id: "hillguard",
    number: "03",
    title: "HILLGUARD",
    tagline: "AI-Based Early Warning & Landslide Risk Monitoring",
    category: "HACKATHON • AI • DISASTER RISK",
    status: "SIH 2026 Prototype",
    isFeatured: false,
    shortDescription: "A multi-signal disaster risk monitoring software concept analyzing terrain, rainfall, and environmental feeds for early warning.",
    fullDescription: "HillGuard is a software-focused Smart India Hackathon exploration evaluating how multiple heterogeneous environmental data sources can be unified to estimate potential landslide hazard levels. The platform models key physical factors including precipitation trends, soil saturation, terrain inclination, and GIS infrastructure to support transparent decision support.",
    problem: "Hilly transit corridors and vulnerable communities suffer devastating landslide hazards with limited early warning due to isolated sensor feeds and lack of integrated terrain risk evaluation.",
    solution: "A multi-source GIS risk intelligence platform combining precipitation velocity, soil moisture saturation, slope geometry, and historical landslide data to generate early hazard alerts.",
    features: [
      "Rainfall Trend Analysis",
      "Soil Moisture Saturation Checks",
      "Slope Angle & Elevation Mapping",
      "Satellite Terrain Changes",
      "Historical Landslide Incident Data",
      "Roads & Critical Access Corridors",
      "Nearby Village Exposure Index",
      "GIS / GPS Spatial Visualization"
    ],
    techStack: [
      "GIS Decision Support",
      "Environmental Signal Engine",
      "Multi-Factor Risk Modeling",
      "Early Warning Logic"
    ],
    liveUrl: "",
    githubUrl: "",
    images: {
      cover: "/projects/hillguard/hillguard-preview.webp",
      preview: "/projects/hillguard/hillguard-dashboard.svg"
    },
    highlights: [
      { label: "Initiative", value: "Smart India Hackathon (SIH)" },
      { label: "Scope", value: "Northeast Corridors" },
      { label: "Nature", value: "Research & Simulation" }
    ]
  }
];
