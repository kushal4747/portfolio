import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData, ProjectItem } from '../../data/projects';
import { SectionHeading } from '../common/SectionHeading';
import { ProjectDetailModal } from './ProjectDetailModal';
import { 
  ArrowUpRight, ArrowRight, Github, ExternalLink, 
  Flame, Check, Sparkles, Layers, Lock, Terminal, 
  Cpu, Maximize2, Activity 
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section
      id="projects"
      className="relative py-24 md:py-36 bg-transparent text-[#D7E2EA] px-4 sm:px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeading
          eyebrow="03 / PORTFOLIO ARTIFACTS"
          title="SELECTED PROJECTS"
          subtitle="Modern architectural showcases & hackathon prototypes. Hover over any system to inspect specifications, telemetry, and source code."
        />

        {/* Modern Projects Showcase Cards */}
        <div className="flex flex-col gap-8 md:gap-12 relative mt-16">
          {projectsData.map((project, index) => (
            <ModernProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenDetails={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Deep Architecture Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

interface ModernCardProps {
  project: ProjectItem;
  index: number;
  onOpenDetails: () => void;
}

const ModernProjectCard: React.FC<ModernCardProps> = ({
  project,
  index,
  onOpenDetails
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'features' | 'architecture' | 'telemetry'>('features');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Subtle 3D parallax for mockup image
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setParallax({
      x: ((x - centerX) / centerX) * 6,
      y: ((y - centerY) / centerY) * 6,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setParallax({ x: 0, y: 0 });
  };

  // Construct realistic developer URL slug
  const domainSlug = `https://${project.id}.vishwajeet.dev`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative will-change-transform"
      style={{ zIndex: isHovered ? 25 : 10 }}
      data-cursor="project"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          scale: isHovered ? 1.015 : 1,
          y: isHovered ? -4 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={`group relative rounded-3xl p-6 sm:p-8 lg:p-10 border transition-all duration-400 select-none overflow-hidden ${
          isHovered
            ? 'bg-[#0E1117]/95 border-cyan-500/50 shadow-2xl shadow-cyan-950/40 backdrop-blur-2xl'
            : project.isFeatured
              ? 'bg-[#0B0D12]/90 border-cyan-500/25 shadow-xl shadow-black/60 backdrop-blur-xl'
              : 'bg-[#090B0F]/85 border-white/10 shadow-lg shadow-black/50 backdrop-blur-xl'
        }`}
      >
        {/* Specular Top Border Glow */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent pointer-events-none" />

        {/* Soft Radial Cursor Spotlight */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.10), transparent 50%)`
          }}
        />

        {/* Top Metadata Row: Index, Category, Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <span className="font-mono font-bold text-xs sm:text-sm px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/10 text-cyan-400">
              {project.number} / 03
            </span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs sm:text-sm tracking-wider uppercase text-[#D7E2EA]/90 font-semibold">
                {project.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {project.isFeatured && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-bold shadow-sm shadow-cyan-500/20">
                <Flame className="w-3.5 h-3.5 text-cyan-400" />
                FEATURED ARCHITECTURE
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-gray-300 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {project.status}
            </span>
          </div>
        </div>

        {/* Main Grid: Left Content (7 cols) & Right Window Frame Mockup (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Project Title with hover shine */}
              <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-2 group-hover:text-cyan-100 transition-colors">
                {project.title}
              </h3>

              {/* Tagline */}
              {project.tagline && (
                <p className="font-mono text-xs sm:text-sm text-cyan-400/90 font-medium mb-3">
                  {project.tagline}
                </p>
              )}

              {/* Short Description */}
              <p className="font-sans text-sm sm:text-base text-[#D7E2EA]/85 leading-relaxed mb-6">
                {project.shortDescription}
              </p>

              {/* Interactive Tab Switcher on the Card */}
              <div className="flex items-center gap-2 p-1 bg-black/40 rounded-xl border border-white/10 w-fit mb-5">
                <button
                  type="button"
                  onClick={() => setActiveTab('features')}
                  className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition-all ${
                    activeTab === 'features'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Features &amp; Modules
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('architecture')}
                  className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition-all ${
                    activeTab === 'architecture'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Problem &amp; Approach
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('telemetry')}
                  className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition-all ${
                    activeTab === 'telemetry'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Specs HUD
                </button>
              </div>

              {/* Tab 1: Core Capabilities */}
              {activeTab === 'features' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {project.features.slice(0, 6).map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-mono text-gray-300 hover:border-cyan-500/30 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Problem & Solution Breakdown */}
              {activeTab === 'architecture' && (
                <div className="space-y-3 mb-6">
                  {project.problem && (
                    <div className="p-3.5 rounded-xl bg-red-500/[0.04] border border-red-500/20 text-xs font-sans text-gray-300 leading-relaxed">
                      <span className="font-mono font-bold text-red-400 uppercase tracking-wider block mb-1">
                        Challenge / Problem Statement:
                      </span>
                      {project.problem}
                    </div>
                  )}
                  {project.solution && (
                    <div className="p-3.5 rounded-xl bg-cyan-500/[0.06] border border-cyan-500/30 text-xs font-sans text-cyan-100 leading-relaxed">
                      <span className="font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                        Engineered Solution:
                      </span>
                      {project.solution}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Highlights HUD */}
              {activeTab === 'telemetry' && (
                <div className="grid grid-cols-3 gap-2.5 mb-6">
                  {project.highlights.map((h) => (
                    <div
                      key={h.label}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center"
                    >
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                        {h.label}
                      </span>
                      <span className="block font-mono text-xs sm:text-sm font-bold text-white truncate">
                        {h.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Technologies Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 font-mono text-xs text-gray-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="view"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D7E2EA] text-[#0C0C0C] font-display font-bold text-xs tracking-wider uppercase hover:bg-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all shadow-md"
                  >
                    <span>LAUNCH SYSTEM</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-gray-400 font-mono text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>ACTIVE ITERATION</span>
                  </div>
                )}

                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="action"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-[#D7E2EA] border border-white/10 font-mono text-xs transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GITHUB</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-2 text-gray-500 font-mono text-xs">
                    <Github className="w-3.5 h-3.5" />
                    <span>Repo Available</span>
                  </span>
                )}
              </div>

              {/* View Full Architecture Modal Trigger */}
              <button
                type="button"
                onClick={onOpenDetails}
                data-cursor="view"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/50 font-mono text-xs font-semibold transition-all shadow-xs"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>OPEN SYSTEM SPECS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Modern Developer Window Frame Mockup (Cols 8-12) */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden bg-[#0A0C10] border border-white/15 shadow-2xl shadow-black/80 flex flex-col">
              {/* Browser / IDE Window Top Bar */}
              <div className="bg-[#12151B] px-3.5 py-2.5 border-b border-white/10 flex items-center justify-between gap-2 select-none">
                {/* Traffic Light Dots */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-xs" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-xs" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-xs" />
                </div>

                {/* Simulated URL Capsule */}
                <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-black/50 border border-white/5 text-[11px] font-mono text-gray-400 max-w-[200px] truncate">
                  <Lock className="w-2.5 h-2.5 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{domainSlug}</span>
                </div>

                {/* Status Dot */}
                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="hidden sm:inline">LIVE</span>
                </div>
              </div>

              {/* Viewport Frame with Preview Image */}
              <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden bg-black/80">
                <motion.img
                  src={project.images.cover}
                  alt={`${project.title} Preview`}
                  animate={{
                    scale: isHovered ? 1.06 : 1,
                    x: isHovered ? parallax.x : 0,
                    y: isHovered ? parallax.y : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="w-full h-full object-cover object-center filter brightness-[0.92] saturate-[0.95] group-hover:brightness-[1.05] group-hover:saturate-[1.05] transition-all duration-500"
                />

                {/* Subtle Inner Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Telemetry Chips on the Preview */}
                <div className="absolute bottom-3 inset-x-3 flex justify-between items-center gap-2 pointer-events-none">
                  {project.highlights.slice(0, 2).map((h) => (
                    <div
                      key={h.label}
                      className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-left"
                    >
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-gray-400">
                        {h.label}
                      </span>
                      <span className="block font-mono text-[11px] font-semibold text-white truncate max-w-[120px]">
                        {h.value}
                      </span>
                    </div>
                  ))}
                  <div className="px-2 py-1 rounded-lg bg-cyan-500/20 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-mono text-[10px] font-bold">
                    BUILD 2026
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
