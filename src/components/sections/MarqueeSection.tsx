import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import { marqueeRow1, marqueeRow2, TechMarqueeItem } from '../../data/marquee';
import { 
  Code, Layout, Palette, FileCode, Atom, Terminal, GitBranch, 
  Github, Image, Sparkles, Globe, ShieldAlert, Compass, Cpu 
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Code,
  Layout,
  Palette,
  FileCode,
  Atom,
  Terminal,
  GitBranch,
  Github,
  Image,
  Sparkles,
  Globe,
  ShieldAlert,
  Compass,
  Cpu
};

export const MarqueeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // Parallax offsets based on scroll
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-180, 0]);

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-28 overflow-hidden bg-[#0C0C0C] border-y border-white/5"
    >
      {/* Section Eyebrow */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="font-mono text-xs tracking-[0.25em] text-[#8F9CA7] uppercase">
            MY TECH WORLD · CONTINUOUS LEARNING
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-[#5F6B76]">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> USING</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> LEARNING</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> EXPLORING</span>
        </div>
      </div>

      {/* Row 1: Leftward Movement */}
      <div className="relative w-full overflow-hidden mb-6 flex">
        <motion.div
          style={{ x: x1 }}
          className="flex gap-4 md:gap-6 animate-marquee-left hover:[animation-play-state:paused]"
        >
          {/* Double the list for infinite seamless loop */}
          {[...marqueeRow1, ...marqueeRow1, ...marqueeRow1].map((item, idx) => (
            <MarqueeCard key={`row1-${item.id}-${idx}`} item={item} />
          ))}
        </motion.div>
      </div>

      {/* Row 2: Rightward Movement */}
      <div className="relative w-full overflow-hidden flex">
        <motion.div
          style={{ x: x2 }}
          className="flex gap-4 md:gap-6 animate-marquee-right hover:[animation-play-state:paused]"
        >
          {[...marqueeRow2, ...marqueeRow2, ...marqueeRow2].map((item, idx) => (
            <MarqueeCard key={`row2-${item.id}-${idx}`} item={item} />
          ))}
        </motion.div>
      </div>

      {/* Gradient Fades on edges for smooth vignette */}
      <div className="absolute inset-y-0 left-0 w-6 sm:w-16 md:w-32 bg-gradient-to-r from-[#0C0C0C] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-6 sm:w-16 md:w-32 bg-gradient-to-l from-[#0C0C0C] to-transparent pointer-events-none z-10" />
    </section>
  );
};

const MarqueeCard: React.FC<{ item: TechMarqueeItem }> = ({ item }) => {
  const IconComponent = iconMap[item.icon] || Code;

  const badgeColor = {
    USING: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    LEARNING: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    EXPLORING: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  }[item.badge];

  return (
    <div
      className="flex-shrink-0 w-56 xs:w-64 md:w-72 p-4 sm:p-5 rounded-2xl bg-[#141417] border border-white/10 hover:border-white/25 transition-all duration-300 hover:scale-[1.02] group shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white group-hover:border-white/20 transition-colors">
          <IconComponent className="w-5 h-5 text-[#D7E2EA] group-hover:scale-110 transition-transform" />
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider border ${badgeColor}`}>
          {item.badge}
        </span>
      </div>

      <h4 className="font-display font-bold text-lg text-white mb-1 tracking-wide">
        {item.name}
      </h4>

      <p className="font-mono text-xs text-[#8F9CA7] leading-relaxed">
        {item.highlight}
      </p>
    </div>
  );
};
