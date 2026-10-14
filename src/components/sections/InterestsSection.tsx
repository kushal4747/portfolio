import React from 'react';
import { motion } from 'framer-motion';
import { interestsList, InterestItem } from '../../data/interests';
import { 
  Code2, Boxes, Sparkles, Globe, ShieldAlert, 
  Terminal, Palette, Cpu, Flame 
} from 'lucide-react';
import { FadeIn } from '../common/FadeIn';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Code2,
  Boxes,
  Sparkles,
  Globe,
  ShieldAlert,
  Terminal,
  Palette,
  Cpu,
  Flame
};

export const InterestsSection: React.FC = () => {
  return (
    <section className="relative py-16 md:py-28 bg-transparent text-[#D7E2EA] px-4 sm:px-8 lg:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#8F9CA7] font-semibold block mb-2">
              06 / CURIOSITY &amp; DOMAINS
            </span>
            <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl text-white tracking-tight uppercase">
              CORE INTERESTS
            </h2>
          </div>
          <p className="font-mono text-xs text-[#8F9CA7] max-w-md">
            The domains that captivate my attention, guide my weekend builds, and fuel my curiosity.
          </p>
        </div>

        {/* Compact Interactive Bento Tags */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
          {interestsList.map((interest, index) => {
            const Icon = iconMap[interest.icon] || Code2;
            return (
              <FadeIn key={interest.name} delay={index * 0.04}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="h-full p-4 sm:p-5 rounded-2xl bg-[#141417] border border-white/10 hover:border-white/25 flex flex-col justify-between group shadow-md"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] tracking-wider uppercase text-gray-500 group-hover:text-cyan-400 transition-colors">
                      {interest.category}
                    </span>
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white mb-1 tracking-wide">
                      {interest.name}
                    </h3>
                    <p className="font-mono text-[11px] text-[#8F9CA7] leading-relaxed line-clamp-2">
                      {interest.description}
                    </p>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
