import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { learningPathSteps, LearningStep } from '../../data/learningPath';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const LearningPathSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProgress, setActiveProgress] = useState(0);

  // Scroll tracking through the learning pathway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 70%']
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 200 });

  // Update activeProgress state for focus calculation
  useEffect(() => {
    return smoothProgress.on('change', (v) => {
      setActiveProgress(v);
    });
  }, [smoothProgress]);

  // Height of active illuminated timeline line
  const activeLineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="learning"
      ref={containerRef}
      className="relative py-24 md:py-36 bg-transparent text-[#D7E2EA] px-4 sm:px-6 lg:px-12 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeading
          eyebrow="04 / ROADMAP &amp; PROGRESSION"
          title="CURRENTLY LEARNING"
          subtitle="A transparent visual pathway mapping my computer science and software development journey. Scroll to see milestones activate."
        />

        {/* Visual Pathway Container */}
        <div className="relative max-w-4xl mx-auto mt-16">
          {/* Base Inactive Vertical Timeline Track */}
          <div className="absolute left-6 sm:left-8 top-8 bottom-8 w-1 bg-white/10 rounded-full" />

          {/* Active Animated Illuminated Cyan Progress Line */}
          <motion.div
            style={{ height: activeLineHeight }}
            className="absolute left-6 sm:left-8 top-8 w-1 rounded-full bg-gradient-to-b from-cyan-500 via-cyan-400 to-white shadow-[0_0_12px_rgba(6,182,212,0.8)] z-10 origin-top pointer-events-none"
          />

          {/* Glowing Moving Light Orb at the Tip of Active Line */}
          <motion.div
            style={{ top: activeLineHeight }}
            className="absolute left-6 sm:left-8 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
          >
            {/* Soft Cyan Pulsing Aura */}
            <div className="absolute -inset-2 rounded-full bg-cyan-400/25 blur-[3px] animate-pulse" />
            {/* Glowing Core */}
            <div className="relative w-3.5 h-3.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </motion.div>

          {/* Stepper List of Milestone Cards */}
          <div className="space-y-6 sm:space-y-8">
            {learningPathSteps.map((item, index) => {
              const totalSteps = learningPathSteps.length;
              const stepThreshold = index / (totalSteps - 1);
              // Card is reached when scroll progress passes its threshold
              const isReached = activeProgress >= stepThreshold - 0.04;
              // Card is currently focused when progress is closest to it
              const isFocused = Math.abs(activeProgress - stepThreshold) < 0.07;

              return (
                <LearningMilestoneCard
                  key={item.step}
                  item={item}
                  index={index}
                  isReached={isReached}
                  isFocused={isFocused}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

interface MilestoneCardProps {
  item: LearningStep;
  index: number;
  isReached: boolean;
  isFocused: boolean;
}

const LearningMilestoneCard: React.FC<MilestoneCardProps> = ({
  item,
  isReached,
  isFocused
}) => {
  const statusColorClass = {
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
  }[item.statusColor];

  return (
    <div className="relative flex items-start gap-5 sm:gap-8 group">
      {/* Milestone Step Counter Box */}
      <motion.div
        animate={{
          scale: isFocused ? 1.08 : isReached ? 1 : 0.96,
          backgroundColor: isFocused
            ? '#D7E2EA'
            : isReached
              ? '#15181F'
              : '#111215',
          color: isFocused ? '#0C0C0C' : isReached ? '#D7E2EA' : '#5F6B76',
          borderColor: isFocused
            ? '#22d3ee'
            : isReached
              ? 'rgba(6, 182, 212, 0.4)'
              : 'rgba(255, 255, 255, 0.08)',
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative z-10 flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-mono font-bold text-sm sm:text-base border shadow-md transition-shadow"
        style={{
          boxShadow: isFocused
            ? '0 0 20px rgba(6, 182, 212, 0.35)'
            : isReached
              ? '0 0 10px rgba(6, 182, 212, 0.15)'
              : 'none'
        }}
      >
        <span>0{item.step}</span>
      </motion.div>

      {/* Milestone Card Content */}
      <motion.div
        animate={{
          opacity: isReached ? 1 : 0.72,
          y: isReached ? 0 : 6,
          scale: isFocused ? 1.015 : 1,
          borderColor: isFocused
            ? 'rgba(6, 182, 212, 0.5)'
            : isReached
              ? 'rgba(255, 255, 255, 0.14)'
              : 'rgba(255, 255, 255, 0.05)',
          backgroundColor: isFocused
            ? '#161922'
            : isReached
              ? '#131418'
              : '#0E0F12',
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 p-5 sm:p-7 rounded-2xl border transition-all duration-400 select-none shadow-lg"
        style={{
          boxShadow: isFocused
            ? '0 0 25px rgba(6, 182, 212, 0.15)'
            : 'none'
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
          <h3
            className={`font-display font-bold text-lg sm:text-2xl tracking-wide transition-colors duration-300 ${
              isFocused ? 'text-white' : isReached ? 'text-[#D7E2EA]' : 'text-[#8F9CA7]'
            }`}
          >
            {item.title}
          </h3>
          <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] sm:text-[11px] font-semibold border ${statusColorClass}`}>
            {item.status}
          </span>
        </div>

        <p
          className={`font-sans text-xs sm:text-sm leading-relaxed mb-4 transition-colors duration-300 ${
            isReached ? 'text-[#8F9CA7]' : 'text-gray-500'
          }`}
        >
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2.5 py-0.5 rounded-md font-mono text-[11px] transition-colors duration-300 ${
                isReached
                  ? 'bg-white/[0.04] text-gray-300 border border-white/5'
                  : 'bg-white/[0.015] text-gray-600 border border-transparent'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
