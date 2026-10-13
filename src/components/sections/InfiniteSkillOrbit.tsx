import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SkillTag, SkillLevel } from '../../data/skills';
import { 
  Sparkles, RotateCw, Play, Pause, Compass, 
  Orbit, Layers, Eye, CheckCircle2, ArrowRight 
} from 'lucide-react';

interface InfiniteSkillOrbitProps {
  skills: SkillTag[];
}

export const InfiniteSkillOrbit: React.FC<InfiniteSkillOrbitProps> = ({ skills }) => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<'ALL' | SkillLevel>('ALL');
  const [viewMode, setViewMode] = useState<'orbit' | 'stream'>('orbit');
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSkill, setActiveSkill] = useState<SkillTag | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = clockwise, -1 = counter-clockwise

  // Filter skills by category
  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'ALL') return skills;
    return skills.filter((s) => s.category === selectedCategory);
  }, [skills, selectedCategory]);

  // Orbit angle state (radians)
  const angleRef = useRef(0);
  const velocityRef = useRef(0.0035); // Base rotation speed
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragLastXRef = useRef(0);

  // Position items on the 3D orbit
  const [orbitPositions, setOrbitPositions] = useState<
    { skill: SkillTag; x: number; y: number; z: number; scale: number; opacity: number; zIndex: number }[]
  >([]);

  // Update radius dynamically based on container width
  const [radii, setRadii] = useState({ rx: 340, ry: 100 });

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      if (width < 480) {
        setRadii({ rx: Math.max(130, width * 0.38), ry: 50 });
      } else if (width < 768) {
        setRadii({ rx: Math.max(200, width * 0.40), ry: 75 });
      } else {
        setRadii({ rx: Math.min(370, width * 0.38), ry: 105 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // RequestAnimationFrame loop for continuous infinite circular rotation
  useEffect(() => {
    if (viewMode !== 'orbit' || shouldReduceMotion) return;

    let animId: number;

    const tick = () => {
      if (!isDraggingRef.current) {
        const targetSpeed = isHovered || isPaused ? 0.0006 : 0.004;
        // Smoothly interpolate velocity
        velocityRef.current += (targetSpeed * direction - velocityRef.current) * 0.06;
        angleRef.current += velocityRef.current;
      }

      const total = filteredSkills.length;
      if (total > 0) {
        const step = (Math.PI * 2) / total;
        const positions = filteredSkills.map((skill, i) => {
          const itemAngle = angleRef.current + i * step;
          const x = Math.cos(itemAngle) * radii.rx;
          // Tilted orbit for realistic 3D depth
          const y = Math.sin(itemAngle) * radii.ry;
          const z = Math.sin(itemAngle); // -1 (back) to +1 (front)

          // Normalized scale and opacity based on z-depth
          const scale = 0.74 + ((z + 1) / 2) * 0.38; // 0.74 to 1.12
          const opacity = 0.38 + ((z + 1) / 2) * 0.62; // 0.38 to 1.0
          const zIndex = Math.round((z + 1) * 50);

          return { skill, x, y, z, scale, opacity, zIndex };
        });

        setOrbitPositions(positions);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [filteredSkills, radii, isHovered, isPaused, direction, viewMode, shouldReduceMotion]);

  // Fallback / initial positioning if reduced motion is true
  useEffect(() => {
    if (shouldReduceMotion && viewMode === 'orbit') {
      const total = filteredSkills.length;
      const step = (Math.PI * 2) / total;
      const positions = filteredSkills.map((skill, i) => {
        const itemAngle = i * step;
        const x = Math.cos(itemAngle) * radii.rx;
        const y = Math.sin(itemAngle) * radii.ry;
        const z = Math.sin(itemAngle);
        return {
          skill,
          x,
          y,
          z,
          scale: 0.9,
          opacity: 0.9,
          zIndex: 20
        };
      });
      setOrbitPositions(positions);
    }
  }, [shouldReduceMotion, viewMode, filteredSkills, radii]);

  // Interactive mouse/touch dragging to spin circular orbit manually
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragLastXRef.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragLastXRef.current;
    dragLastXRef.current = e.clientX;
    // Map drag distance to angle change
    angleRef.current += deltaX * 0.008;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Color mapping based on category
  const getCategoryStyles = (category: SkillLevel) => {
    switch (category) {
      case 'USING':
        return {
          badge: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30',
          dot: 'bg-emerald-500',
          borderHover: 'hover:border-emerald-500/80 hover:shadow-emerald-500/15',
          activeGlow: 'shadow-emerald-500/20 border-emerald-500'
        };
      case 'LEARNING':
        return {
          badge: 'bg-cyan-500/10 text-cyan-800 border-cyan-500/30',
          dot: 'bg-cyan-500',
          borderHover: 'hover:border-cyan-500/80 hover:shadow-cyan-500/15',
          activeGlow: 'shadow-cyan-500/20 border-cyan-500'
        };
      case 'EXPLORING':
        return {
          badge: 'bg-purple-500/10 text-purple-800 border-purple-500/30',
          dot: 'bg-purple-500',
          borderHover: 'hover:border-purple-500/80 hover:shadow-purple-500/15',
          activeGlow: 'shadow-purple-500/20 border-purple-500'
        };
    }
  };

  return (
    <div className="w-full select-none" data-cursor="action">
      {/* Top Controls: Filter Pills + Orbit / Stream Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-gray-100 rounded-2xl border border-gray-200">
          {(['ALL', 'USING', 'LEARNING', 'EXPLORING'] as const).map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = cat === 'ALL' ? skills.length : skills.filter((s) => s.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-black text-white shadow-sm'
                    : 'text-gray-600 hover:text-black hover:bg-gray-200/50'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Mode & Orbit Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          {/* Pause / Play Toggle */}
          {viewMode === 'orbit' && (
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? 'Resume rotation' : 'Pause rotation'}
              className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors shadow-xs"
              title={isPaused ? 'Resume Rotation' : 'Pause Rotation'}
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
          )}

          {/* Reverse Direction */}
          {viewMode === 'orbit' && (
            <button
              onClick={() => setDirection((prev) => (prev === 1 ? -1 : 1))}
              aria-label="Reverse direction"
              className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors shadow-xs"
              title="Reverse Rotation"
            >
              <RotateCw className={`w-4 h-4 transition-transform duration-300 ${direction === -1 ? '-scale-x-100' : ''}`} />
            </button>
          )}

          {/* Mode Switcher */}
          <div className="flex items-center p-1 bg-gray-100 rounded-xl border border-gray-200">
            <button
              onClick={() => setViewMode('orbit')}
              className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'orbit' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>3D Orbit</span>
            </button>
            <button
              onClick={() => setViewMode('stream')}
              className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'stream' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Stream</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 3D Orbit Stage */}
      {viewMode === 'orbit' ? (
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            isDraggingRef.current = false;
          }}
          className="relative w-full h-[460px] sm:h-[500px] md:h-[540px] flex items-center justify-center overflow-hidden rounded-3xl bg-radial from-gray-50 to-gray-100/60 border border-gray-200/80 shadow-inner cursor-grab active:cursor-grabbing"
          style={{ perspective: '1100px' }}
        >
          {/* Subtle Ambient Orbital Grid Circles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Outer Orbit Path */}
            <div
              className="absolute rounded-full border border-dashed border-gray-300/80 animate-spin-very-slow pointer-events-none"
              style={{
                width: `${radii.rx * 2}px`,
                height: `${radii.ry * 2.2}px`,
                transform: 'rotateX(62deg)'
              }}
            />
            {/* Middle Orbit Track */}
            <div
              className="absolute rounded-full border border-gray-200 pointer-events-none"
              style={{
                width: `${radii.rx * 1.5}px`,
                height: `${radii.ry * 1.6}px`,
                transform: 'rotateX(62deg)'
              }}
            />
            {/* Soft Central Radial Glow */}
            <div className="w-56 h-56 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          </div>

          {/* Central Holographic Nucleus / Active Inspector Hub */}
          <motion.div
            layout
            className="absolute z-10 pointer-events-auto p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-200/90 shadow-xl max-w-[270px] sm:max-w-xs text-center flex flex-col items-center justify-center transition-all duration-300"
          >
            {activeSkill ? (
              <div>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider mb-2 border ${
                    getCategoryStyles(activeSkill.category).badge
                  }`}
                >
                  {activeSkill.category}
                </span>
                <h5 className="font-display font-extrabold text-xl sm:text-2xl text-gray-900 leading-tight">
                  {activeSkill.name}
                </h5>
                <p className="font-mono text-xs text-gray-500 mt-1 leading-snug">
                  {activeSkill.note || 'Active competency in continuous progression.'}
                </p>
                <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[11px] font-mono text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
                  <span>Interactive Node Selected</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <Orbit className="w-4 h-4 animate-spin-slow" />
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-gray-400 font-bold block">
                  TECH MATRIX NUCLEUS
                </span>
                <h5 className="font-display font-bold text-lg sm:text-xl text-gray-900 mt-0.5">
                  Infinite Loop
                </h5>
                <p className="font-mono text-[11px] text-gray-500 mt-1">
                  Drag to rotate • Hover to inspect
                </p>
              </div>
            )}
          </motion.div>

          {/* Revolving Orbit Nodes in 3D Space */}
          {orbitPositions.map(({ skill, x, y, z, scale, opacity, zIndex }) => {
            const catStyles = getCategoryStyles(skill.category);
            const isCardActive = activeSkill?.name === skill.name;
            const isFrontFacing = z > 0;

            return (
              <div
                key={skill.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSkill(isCardActive ? null : skill);
                }}
                onMouseEnter={() => setActiveSkill(skill)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-shadow will-change-transform cursor-pointer"
                style={{
                  transform: `translate3d(${x}px, ${y}px, ${z * 120}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  filter: z < -0.3 ? 'blur(1px)' : 'none'
                }}
              >
                <div
                  className={`group px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white border shadow-md transition-all duration-200 flex items-center gap-2.5 ${
                    isCardActive
                      ? `${catStyles.activeGlow} shadow-lg ring-2 ring-black/10 scale-105`
                      : 'border-gray-200 hover:border-black/50 hover:shadow-lg'
                  }`}
                >
                  {/* Category Status Dot */}
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${catStyles.dot}`} />

                  {/* Skill Name */}
                  <span className="font-display font-bold text-xs sm:text-sm text-gray-900 tracking-tight whitespace-nowrap">
                    {skill.name}
                  </span>

                  {/* Level Pill for front-facing cards */}
                  {isFrontFacing && (
                    <span
                      className={`hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider border ${catStyles.badge}`}
                    >
                      {skill.category}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Alternative View Mode: Smooth Dual-Track Continuous Marquee Stream */
        <div className="flex flex-col gap-3 py-6 overflow-hidden rounded-3xl bg-gray-50 border border-gray-200/80 p-6">
          {/* Row 1: Forward Stream */}
          <div className="flex gap-3 overflow-hidden">
            <motion.div
              animate={shouldReduceMotion ? {} : { x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
              className="flex gap-3 flex-nowrap"
            >
              {[...filteredSkills, ...filteredSkills].map((skill, index) => {
                const catStyles = getCategoryStyles(skill.category);
                return (
                  <div
                    key={`${skill.name}-stream-1-${index}`}
                    onClick={() => setActiveSkill(skill)}
                    className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 hover:border-black shadow-xs flex items-center gap-2.5 whitespace-nowrap cursor-pointer transition-all hover:scale-105"
                  >
                    <span className={`w-2 h-2 rounded-full ${catStyles.dot}`} />
                    <span className="font-display font-semibold text-sm text-gray-900">{skill.name}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border ${catStyles.badge}`}>
                      {skill.category}
                    </span>
                    {skill.note && (
                      <span className="font-mono text-[11px] text-gray-400 pl-1 border-l border-gray-200">
                        {skill.note}
                      </span>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Row 2: Reverse Stream */}
          <div className="flex gap-3 overflow-hidden">
            <motion.div
              animate={shouldReduceMotion ? {} : { x: ['-50%', '0%'] }}
              transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
              className="flex gap-3 flex-nowrap"
            >
              {[...filteredSkills.slice().reverse(), ...filteredSkills.slice().reverse()].map((skill, index) => {
                const catStyles = getCategoryStyles(skill.category);
                return (
                  <div
                    key={`${skill.name}-stream-2-${index}`}
                    onClick={() => setActiveSkill(skill)}
                    className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 hover:border-black shadow-xs flex items-center gap-2.5 whitespace-nowrap cursor-pointer transition-all hover:scale-105"
                  >
                    <span className={`w-2 h-2 rounded-full ${catStyles.dot}`} />
                    <span className="font-display font-semibold text-sm text-gray-900">{skill.name}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border ${catStyles.badge}`}>
                      {skill.category}
                    </span>
                    {skill.note && (
                      <span className="font-mono text-[11px] text-gray-400 pl-1 border-l border-gray-200">
                        {skill.note}
                      </span>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};
