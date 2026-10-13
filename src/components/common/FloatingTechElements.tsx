import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

export const FloatingTechElements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 40);
    mouseY.set((clientY / innerHeight - 0.5) * 40);
  };

  // Scroll parallax transforms
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Element 1: 3D Terminal / Code Window (Top Right) */}
      <motion.div
        style={{
          x: smoothX,
          y: yParallaxFast,
          rotateZ: 6,
          rotateX: 12,
          rotateY: -15,
          perspective: 1000
        }}
        className="absolute top-12 right-6 md:right-16 lg:right-28 w-44 md:w-56 p-3.5 rounded-xl bg-[#121418]/80 backdrop-blur-md border border-white/10 shadow-2xl shadow-cyan-950/20"
      >
        <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-[10px] font-mono text-gray-500 ml-auto">dev.py</span>
        </div>
        <div className="font-mono text-[11px] leading-relaxed text-gray-300">
          <p><span className="text-cyan-400">class</span> <span className="text-amber-300">Engineer</span>:</p>
          <p className="pl-3 text-gray-400">focus = <span className="text-emerald-400">"Build &amp; Learn"</span></p>
          <p className="pl-3 text-purple-400">&gt;&gt;&gt; student.solve()</p>
        </div>
      </motion.div>

      {/* Element 2: Floating Python Dual Helix / Symbol (Left Mid) */}
      <motion.div
        style={{
          x: useTransform(smoothX, (v) => -v * 0.8),
          y: yParallaxSlow,
          rotate: rotate1
        }}
        className="absolute top-1/3 left-4 md:left-12 w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-blue-500/10 via-amber-400/10 to-transparent p-4 border border-white/5 backdrop-blur-sm flex items-center justify-center shadow-xl"
      >
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
          <path
            d="M50 15 C32 15 33 23 33 23 L33 31 L51 31 L51 34 L25 34 C16 34 10 40 10 49 C10 58 15 62 23 62 L28 62 L28 54 C28 46 35 41 43 41 L59 41 C65 41 70 36 70 30 L70 23 C70 16 63 15 50 15 Z M42 22 A 3 3 0 1 1 42 21.9 Z"
            fill="#38BDF8"
          />
          <path
            d="M50 85 C68 85 67 77 67 77 L67 69 L49 69 L49 66 L75 66 C84 66 90 60 90 51 C90 42 85 38 77 38 L72 38 L72 46 C72 54 65 59 57 59 L41 59 C35 59 30 64 30 70 L30 77 C30 84 37 85 50 85 Z M58 78 A 3 3 0 1 1 58 77.9 Z"
            fill="#FACC15"
          />
        </svg>
      </motion.div>

      {/* Element 3: 3D Code Bracket Pill (Bottom Left) */}
      <motion.div
        style={{
          x: smoothX,
          y: useTransform(smoothY, (v) => -v * 1.2),
          rotateZ: -12,
          rotateY: 20
        }}
        className="absolute bottom-24 left-10 md:left-24 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-center gap-3 shadow-lg"
      >
        <span className="font-mono text-2xl font-bold text-cyan-400/80 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">&#123;&nbsp;&#125;</span>
        <div className="flex flex-col">
          <span className="font-mono text-[10px] tracking-widest uppercase text-gray-400">clean code</span>
          <span className="font-mono text-xs text-white font-medium">B.Tech CSE</span>
        </div>
      </motion.div>

      {/* Element 4: Floating AI Synaptic Node / Hexagon (Bottom Right) */}
      <motion.div
        style={{
          x: useTransform(smoothX, (v) => v * 1.5),
          y: yParallaxFast,
          rotateZ: 8
        }}
        className="absolute bottom-32 right-8 md:right-24 w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-purple-600/10 via-cyan-500/10 to-transparent border border-purple-500/20 backdrop-blur-md flex items-center justify-center p-3 animate-pulse-subtle"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22D3EE]" />
          <div className="absolute w-2 h-2 rounded-full bg-purple-400 -top-1 left-4 shadow-[0_0_10px_#C084FC]" />
          <div className="absolute w-2 h-2 rounded-full bg-amber-400 bottom-2 right-4 shadow-[0_0_10px_#FBBF24]" />
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <line x1="50" y1="50" x2="25" y2="15" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
            <line x1="50" y1="50" x2="80" y2="85" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};
