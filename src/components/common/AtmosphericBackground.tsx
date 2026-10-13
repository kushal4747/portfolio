import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const AtmosphericBackground: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Deep Base Gradient */}
      <div className="absolute inset-0 bg-[#07080B]" />

      {/* Modern Technical Dot-Grid Matrix with Radial Fade */}
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(215, 226, 234, 0.25) 1px, transparent 0)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 85%)'
        }}
      />

      {/* Floating Aurora Orb 1: Cyan Glow (Top Right) */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          x: [0, 40, -20, 0],
          y: [0, -30, 25, 0],
          scale: [1, 1.1, 0.95, 1],
          opacity: [0.14, 0.22, 0.16, 0.14]
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: 'easeInOut'
        }}
        className="absolute -top-32 right-1/4 w-[550px] md:w-[750px] h-[550px] md:h-[750px] rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-transparent blur-[140px]"
      />

      {/* Floating Aurora Orb 2: Violet / Indigo Ambient (Mid Left) */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          x: [0, -35, 25, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.95, 1.08, 1],
          opacity: [0.10, 0.18, 0.12, 0.10]
        }}
        transition={{
          repeat: Infinity,
          duration: 22,
          ease: 'easeInOut'
        }}
        className="absolute top-1/3 -left-48 w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full bg-gradient-to-tr from-indigo-500/15 via-purple-600/10 to-transparent blur-[150px]"
      />

      {/* Floating Aurora Orb 3: Emerald / Teal Horizon (Bottom Center) */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          x: [0, 30, -30, 0],
          y: [0, -25, 35, 0],
          scale: [1, 1.05, 0.92, 1],
          opacity: [0.08, 0.15, 0.10, 0.08]
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: 'easeInOut'
        }}
        className="absolute bottom-1/4 left-1/3 w-[600px] md:w-[800px] h-[600px] md:h-[800px] rounded-full bg-gradient-to-t from-emerald-500/15 via-cyan-600/10 to-transparent blur-[160px]"
      />

      {/* Subtle Noise / Film Grain Simulation */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 pointer-events-none" />
    </div>
  );
};
