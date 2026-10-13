import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownRight, Terminal, Mail } from 'lucide-react';
import { profileConfig } from '../../data/profile';
import { socialConfig } from '../../data/socials';
import { CircularRotatingProfile } from '../common/CircularRotatingProfile';
import { Magnet } from '../common/Magnet';
import { FadeIn } from '../common/FadeIn';
import { HeroWhiteRain } from './HeroWhiteRain';

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % profileConfig.roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] md:min-h-screen flex flex-col justify-between pt-28 md:pt-36 pb-16 overflow-hidden px-4 sm:px-6 lg:px-12"
    >
      {/* Layer 1: Tilted White Rain Motion Background (Behind all content) */}
      <HeroWhiteRain />

      {/* Layer 2: Subtle Atmospheric Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[850px] h-[500px] md:h-[650px] bg-gradient-to-b from-[#253240]/25 via-[#161f28]/15 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Layer 3: Crystal-Clear Interactive Hero Content (100% Single-Pass, Zero Text Doubling) */}
      <div className="relative z-10 flex flex-col justify-between flex-1">
        {/* Top Tagline Pill */}
        <div className="flex justify-center lg:justify-start max-w-7xl mx-auto w-full mb-6">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-xs text-[#8F9CA7] tracking-wider uppercase">
                {profileConfig.education.shortCollege}
              </span>
              <span className="text-gray-600">•</span>
              <span className="font-mono text-xs text-[#D7E2EA] font-semibold">
                B.Tech CSE
              </span>
            </div>
          </FadeIn>
        </div>

        {/* Main Hero Editorial Stage: Left Typography & Right Profile Image */}
        <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Giant Typography, Subtitle, Intro & CTAs (Cols 1-8) */}
            <div className="lg:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Line 1: HI, I'M */}
              <FadeIn delay={0.15} direction="down">
                <h1 className="font-display font-black tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-[#646973] select-none leading-none mb-1">
                  {profileConfig.heroHeadingLine1}
                </h1>
              </FadeIn>

              {/* Line 2: VISHWAJEET (Huge, Dominant, Unobstructed) */}
              <FadeIn delay={0.2} direction="up" className="w-full">
                <h2 className="w-full font-display font-black tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] xl:text-[9rem] leading-[0.84] uppercase bg-gradient-to-b from-[#BBCCD7] via-[#8F9CA7] to-[#404550] bg-clip-text text-transparent select-none">
                  {profileConfig.heroHeadingLine2}
                </h2>
              </FadeIn>

              {/* Dynamic Animated Subtitle / Role Cycler (Horizontal, Clean, Fixed) */}
              <div className="mt-5 sm:mt-6 flex items-center gap-2 font-mono text-sm sm:text-base text-[#8F9CA7] h-8">
                <Terminal className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="flex-shrink-0">I am a</span>
                <div className="relative w-52 sm:w-64 text-left overflow-hidden h-6 font-semibold text-white">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roleIndex}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="absolute inset-0 block text-[#D7E2EA] whitespace-nowrap"
                    >
                      {profileConfig.roles[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Main Introduction Paragraph */}
              <FadeIn delay={0.3} className="mt-4 max-w-xl">
                <p className="hidden sm:block text-base sm:text-lg text-[#8F9CA7] font-normal leading-relaxed">
                  {profileConfig.bio.heroIntro}
                </p>
                <p className="block sm:hidden text-sm text-[#8F9CA7] font-normal leading-relaxed">
                  {profileConfig.bio.heroIntroMobile}
                </p>
              </FadeIn>

              {/* Hero CTAs: VIEW MY WORK & VISIBLE GMAIL */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                {/* Primary CTA: VIEW MY WORK */}
                <Magnet strength={0.35}>
                  <button
                    onClick={() => scrollTo('projects')}
                    className="group relative px-7 py-3.5 rounded-full bg-[#D7E2EA] text-[#0C0C0C] font-display font-bold text-xs tracking-wider uppercase overflow-hidden shadow-xl shadow-cyan-950/20 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2.5"
                  >
                    <span className="relative z-10">VIEW MY WORK</span>
                    <ArrowDownRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </Magnet>

                {/* Secondary CTA: VISIBLE CLICKABLE GMAIL */}
                <Magnet strength={0.25}>
                  <a
                    href={`mailto:${socialConfig.email}`}
                    className="px-5 sm:px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#D7E2EA] hover:text-white border border-white/10 hover:border-cyan-500/40 font-mono text-xs tracking-wider transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2.5 group shadow-sm"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="font-semibold text-white/95">{socialConfig.email}</span>
                  </a>
                </Magnet>
              </div>
            </div>

            {/* Right Column: Profile Image + Circular Rotating Name (Cols 9-12) */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end mt-6 lg:mt-0">
              <CircularRotatingProfile
                imgSrc={profileConfig.portrait.src}
                fallbackSrc="/profile/profile.svg"
                alt={profileConfig.portrait.alt}
                className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px]"
              />
            </div>
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="flex justify-between items-end max-w-7xl mx-auto w-full pt-8 px-4 text-xs font-mono text-[#5F6B76]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span>VISHWAJEET KUMAR SAHU</span>
          </div>
          <div className="flex items-center gap-1.5 animate-bounce">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDownRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </section>
  );
};
