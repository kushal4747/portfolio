import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories, skillTags } from '../../data/skills';
import { ArrowUpRight, CheckCircle2, Sparkles, Code2, Compass } from 'lucide-react';
import { FadeIn } from '../common/FadeIn';
import { InfiniteSkillOrbit } from './InfiniteSkillOrbit';

export const SkillsSection: React.FC = () => {
  const [activeRow, setActiveRow] = useState<number | null>(0);

  return (
    <section
      id="skills"
      className="relative bg-white text-[#0C0C0C] rounded-t-[2.5rem] sm:rounded-t-[3.5rem] lg:rounded-t-[5rem] pt-24 md:pt-36 pb-28 md:pb-40 px-6 sm:px-8 lg:px-12 z-20 shadow-2xl overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.04) 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col mb-16 md:mb-24">
          <FadeIn>
            <span className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase font-bold text-gray-400 mb-3 block">
              02 / TECHNICAL CAPABILITIES
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display font-extrabold uppercase tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#0C0C0C] leading-[0.88]">
              SKILLS &amp; TOOLS
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 font-mono text-sm sm:text-base text-gray-500 max-w-2xl">
              Categorized accurately by my current degree stage. Transparent competencies focused on building, problem-solving, and continuous exploration.
            </p>
          </FadeIn>
        </div>

        {/* 5 Massive Numbered Rows */}
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {skillCategories.map((category, index) => {
            const isOpen = activeRow === index;
            return (
              <motion.div
                key={category.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => setActiveRow(isOpen ? null : index)}
                className="group py-8 md:py-12 cursor-pointer transition-colors duration-300 hover:bg-gray-50/80 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left: Number and Title */}
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="font-mono font-bold text-2xl sm:text-3xl text-gray-400 group-hover:text-black transition-colors">
                      {category.number}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0C0C0C] tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                        {category.title}
                      </h3>
                      <span className="font-mono text-xs sm:text-sm text-gray-500 block mt-1">
                        {category.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Right: Technology badges pill */}
                  <div className="flex flex-wrap items-center gap-2 md:justify-end">
                    {category.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full font-mono text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                    <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 group-hover:border-black group-hover:text-black transition-all">
                      <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                </div>

                {/* Expanded Detailed Description & Tech Tags */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-6 border-t border-dashed border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <p className="font-normal text-base md:text-lg text-gray-700 leading-relaxed">
                            {category.description}
                          </p>
                          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-gray-500">
                            <span className="font-semibold text-black uppercase">Current Focus:</span>
                            <span>{category.focus}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 items-start">
                          {category.technologies.map((t) => (
                            <span
                              key={t}
                              className="px-3 py-1.5 rounded-lg bg-black text-white font-mono text-xs font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Infinite Circular Moving Skill Matrix */}
        <div className="mt-24 pt-16 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-gray-400 font-semibold block mb-1">
                DYNAMIC CAPABILITY REPOSITORY
              </span>
              <h4 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight">
                Interactive Skill Matrix
              </h4>
            </div>
            <p className="font-mono text-xs text-gray-500 max-w-sm">
              Continuous 3D orbital trajectory. Drag to spin the orbit, or hover over any node to inspect details.
            </p>
          </div>

          {/* 3D Infinite Circular Loop Orbit System */}
          <InfiniteSkillOrbit skills={skillTags} />
        </div>
      </div>
    </section>
  );
};
