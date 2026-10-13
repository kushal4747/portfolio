import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { AnimatedText } from '../common/AnimatedText';
import { FloatingTechElements } from '../common/FloatingTechElements';
import { FadeIn } from '../common/FadeIn';
import { profileConfig } from '../../data/profile';
import { GraduationCap, Cpu, Code2, Sparkles, Terminal } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-28 md:py-40 bg-transparent overflow-hidden px-6 sm:px-8 lg:px-12"
    >
      {/* 3D Floating Tech Objects */}
      <FloatingTechElements />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeading
          eyebrow="01 / WHO I AM"
          title={profileConfig.bio.aboutHeadline}
          subtitle="Honest student journey, hands-on engineering mindset, and continuous technical growth."
        />

        {/* Character-by-Character / Word-by-Word Scroll Reveal Statement */}
        <div className="my-12 md:my-16 max-w-5xl">
          <AnimatedText
            text={profileConfig.bio.aboutParagraph}
            mode="scroll-reveal"
            className="font-display font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.3] tracking-tight"
          />

          {/* Understated Motto Line */}
          <FadeIn delay={0.2} className="mt-8 flex items-center gap-3">
            <div className="h-[1px] w-12 bg-white/20" />
            <p className="font-mono text-sm sm:text-base tracking-[0.2em] uppercase text-white font-semibold">
              "{profileConfig.bio.motto}"
            </p>
          </FadeIn>
        </div>

        {/* 3 Authentic Context Pillars (No Corporate Marketing) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
          {/* Pillar 1: Education */}
          <FadeIn delay={0.1} className="p-6 rounded-2xl bg-[#141417]/80 border border-white/5 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              B.Tech in CSE
            </h3>
            <p className="font-mono text-xs text-[#8F9CA7] leading-relaxed mb-3">
              {profileConfig.education.college}
            </p>
            <div className="inline-block px-2.5 py-1 rounded bg-white/5 font-mono text-[11px] text-gray-400">
              CBSE Class 12: {profileConfig.education.class12Year}
            </div>
          </FadeIn>

          {/* Pillar 2: Engineering Philosophy */}
          <FadeIn delay={0.2} className="p-6 rounded-2xl bg-[#141417]/80 border border-white/5 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Building to Learn
            </h3>
            <p className="font-mono text-xs text-[#8F9CA7] leading-relaxed mb-3">
              I believe the most effective way to understand software architecture and computer science is to build working applications and test hypotheses.
            </p>
            <div className="inline-block px-2.5 py-1 rounded bg-white/5 font-mono text-[11px] text-gray-400">
              Personal &amp; Hackathon Projects
            </div>
          </FadeIn>

          {/* Pillar 3: Technology Exploration */}
          <FadeIn delay={0.3} className="p-6 rounded-2xl bg-[#141417]/80 border border-white/5 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Curiosity &amp; Defense
            </h3>
            <p className="font-mono text-xs text-[#8F9CA7] leading-relaxed mb-3">
              Actively exploring artificial intelligence workflows, web frontend standards, and ethical hacking basics to understand how digital systems interact.
            </p>
            <div className="inline-block px-2.5 py-1 rounded bg-white/5 font-mono text-[11px] text-gray-400">
              AI Tools • Cybersecurity
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
