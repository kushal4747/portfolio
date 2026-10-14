import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../../data/projects';
import { 
  X, ArrowUpRight, Github, ExternalLink, Check, 
  Layers, AlertCircle, Lightbulb, Flame, Calendar, Tag 
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose
}) => {
  // Handle ESC key press and body scroll locking
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 xs:p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#121418] border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-2xl text-[#D7E2EA] z-10 custom-scrollbar"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 sm:top-7 sm:right-7 p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors z-20"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-sm font-bold text-cyan-400">
              {project.number}
            </span>
            <span className="text-gray-600">•</span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#8F9CA7]">
              {project.category}
            </span>
            {project.isFeatured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-semibold">
                <Flame className="w-3 h-3 text-cyan-400" />
                FEATURED WORK
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300 font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {project.status}
            </span>
          </div>

          {/* Title & Tagline */}
          <h2 className="font-display font-black text-2xl xs:text-3xl sm:text-5xl text-white tracking-tight mb-2">
            {project.title}
          </h2>
          {project.tagline && (
            <p className="font-mono text-xs sm:text-base text-cyan-300/80 mb-6">
              {project.tagline}
            </p>
          )}

          {/* Media Showcase Preview with Adaptive Aspect Ratio & Ambient Backdrop */}
          <div className="relative rounded-2xl overflow-hidden bg-black/90 border border-white/10 aspect-[16/10] sm:aspect-[16/9] mb-8 shadow-inner flex items-center justify-center">
            {/* Ambient Blurred Fill */}
            <img
              src={project.images.cover}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-35 scale-125 pointer-events-none select-none"
            />
            {/* Main Crisp Foreground Image */}
            <img
              src={project.images.cover}
              alt={`${project.title} Cover`}
              className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain filter brightness-[0.98] select-none"
            />
            {project.images.preview && project.images.preview !== project.images.cover && (
              <div className="hidden sm:block absolute bottom-4 right-4 w-44 h-28 rounded-xl overflow-hidden border border-white/25 shadow-2xl bg-[#141418] z-20">
                <img
                  src={project.images.preview}
                  alt={`${project.title} detail`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {project.highlights.map((h) => (
              <div
                key={h.label}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5"
              >
                <span className="block font-mono text-[10px] uppercase text-gray-400 tracking-wider">
                  {h.label}
                </span>
                <strong className="block font-sans text-sm text-white font-semibold mt-0.5">
                  {h.value}
                </strong>
              </div>
            ))}
          </div>

          {/* Problem & Solution Breakdown */}
          {(project.problem || project.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {project.problem && (
                <div className="p-5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20">
                  <div className="flex items-center gap-2 mb-2 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4" />
                    <span>The Problem</span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}
              {project.solution && (
                <div className="p-5 rounded-2xl bg-cyan-500/[0.04] border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4" />
                    <span>The Solution</span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Detailed Full Description */}
          <div className="mb-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">
              PROJECT OVERVIEW
            </h4>
            <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Core Capabilities */}
          <div className="mb-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">
              CORE ARCHITECTURE &amp; CAPABILITIES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-mono text-gray-300"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">
              TECHNOLOGIES &amp; TOOLS
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-white/[0.06] border border-white/10 font-mono text-xs text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D7E2EA] text-[#0C0C0C] font-display font-bold text-xs tracking-wider uppercase hover:bg-white transition-all shadow-lg"
                >
                  <span>LIVE PROJECT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 font-mono text-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>IN ACTIVE DEVELOPMENT</span>
                </div>
              )}

              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-[#D7E2EA] border border-white/10 font-mono text-xs tracking-wider uppercase transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GITHUB REPO</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-3 py-2 text-gray-500 font-mono text-xs">
                  <Github className="w-3.5 h-3.5" />
                  <span>Codebase In Repo</span>
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
