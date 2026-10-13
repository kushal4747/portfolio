import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { journeyTimeline } from '../../data/journey';
import { FadeIn } from '../common/FadeIn';
import { GraduationCap, BookOpen, Code2, Compass, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  GraduationCap,
  BookOpen,
  Code2,
  Compass
};

export const JourneySection: React.FC = () => {
  return (
    <section
      id="journey"
      className="relative py-28 md:py-40 bg-transparent text-[#D7E2EA] px-6 sm:px-8 lg:px-12 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="05 / CHRONOLOGY"
          title="MY JOURNEY"
          subtitle="A timeline tracking academic milestones, my current engineering immersion, and upcoming fundamentals."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {journeyTimeline.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Code2;
            const isCurrent = item.status === 'current';

            return (
              <FadeIn
                key={item.period}
                delay={index * 0.1}
                className="h-full"
              >
                <div
                  className={`h-full flex flex-col justify-between p-6 sm:p-8 rounded-3xl border transition-all duration-300 relative group ${
                    isCurrent
                      ? 'bg-[#15181F] border-cyan-500/40 shadow-xl shadow-cyan-950/20'
                      : 'bg-[#121417] border-white/10 hover:border-white/25'
                  }`}
                >
                  <div>
                    {/* Top Row: Year/Period and Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                        {item.period}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold tracking-wider uppercase border ${
                          isCurrent
                            ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                            : 'bg-white/5 text-gray-400 border-white/10'
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white mb-4 group-hover:border-white/30 transition-colors">
                      <IconComponent className="w-5 h-5 text-gray-300 group-hover:text-white" />
                    </div>

                    <h3 className="font-display font-bold text-lg text-white mb-3 tracking-wide">
                      {item.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-[#8F9CA7] leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <span className="font-mono text-[11px] text-gray-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {item.highlight}
                    </span>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
