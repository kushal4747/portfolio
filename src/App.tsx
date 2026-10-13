import React from 'react';
import { CustomCursor } from './components/common/CustomCursor';
import { AtmosphericBackground } from './components/common/AtmosphericBackground';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { MarqueeSection } from './components/sections/MarqueeSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { LearningPathSection } from './components/sections/LearningPathSection';
import { JourneySection } from './components/sections/JourneySection';
import { InterestsSection } from './components/sections/InterestsSection';
import { ContactSection } from './components/sections/ContactSection';

export function App() {
  return (
    <div className="relative min-h-screen bg-[#07080B] text-[#D7E2EA] font-sans selection:bg-cyan-500/20 selection:text-white">
      {/* Desktop Custom Interactive Cursor */}
      <CustomCursor />

      {/* Atmospheric Dynamic Background (Aurora orbs, velvety #07080B depth, cyber dot-grid) */}
      <AtmosphericBackground />

      {/* Navigation Header */}
      <Navbar />

      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* Technology Marquee (Two rows opposite directions) */}
        <MarqueeSection />

        {/* About Section with character reveal & 3D tech elements */}
        <AboutSection />

        {/* Skills Section (White background, 5 numbered rows, skill cloud) */}
        <SkillsSection />

        {/* Selected Projects (Sticky stacking cards with Egon as Featured) */}
        <ProjectsSection />

        {/* Currently Learning Pathway */}
        <LearningPathSection />

        {/* My Journey (Academic & technical progression timeline) */}
        <JourneySection />

        {/* Compact Interests Bento Section */}
        <InterestsSection />

        {/* Contact Section */}
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
