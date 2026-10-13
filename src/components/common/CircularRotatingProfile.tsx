import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Magnet } from './Magnet';

interface CircularRotatingProfileProps {
  imgSrc: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  photoClassName?: string;
}

export const CircularRotatingProfile: React.FC<CircularRotatingProfileProps> = ({
  imgSrc,
  fallbackSrc,
  alt,
  className = '',
  photoClassName = ''
}) => {
  const [currentSrc, setCurrentSrc] = useState(imgSrc);
  const [hasError, setHasError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  // Text for the circular path around the photo
  const circularText = "VISHWAJEET KUMAR SAHU • CSE STUDENT • DEVELOPER • ";
  const textRadius = 195;
  const pathCircumference = Math.round(2 * Math.PI * textRadius); // ~1225px

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Outer Rotating Circular Typography SVG */}
      <motion.div
        animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 24 // 24s for a serene, premium rotation
        }}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      >
        <svg
          viewBox="0 0 460 460"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Clockwise circular path */}
            <path
              id="heroNameCirclePath"
              d={`M 230, 230 m -${textRadius}, 0 a ${textRadius},${textRadius} 0 1,1 ${textRadius * 2},0 a ${textRadius},${textRadius} 0 1,1 -${textRadius * 2},0`}
            />
          </defs>

          {/* Subtle decorative orbit guide line */}
          <circle
            cx="230"
            cy="230"
            r={textRadius + 14}
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <circle
            cx="230"
            cy="230"
            r={textRadius - 16}
            fill="none"
            stroke="rgba(6, 182, 212, 0.15)"
            strokeWidth="1"
          />

          {/* Circular Text following the path */}
          <text
            className="fill-[#8F9CA7] font-mono text-[11px] font-semibold tracking-[0.24em] uppercase"
          >
            <textPath
              href="#heroNameCirclePath"
              textLength={pathCircumference}
              lengthAdjust="spacing"
            >
              {circularText + circularText}
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Stationary Centered Profile Photo with Magnet Physics */}
      <Magnet strength={0.2}>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative group cursor-pointer"
          data-cursor="view"
        >
          {/* Soft Depth Ambient Glow */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Profile Photo Circular Container */}
          <div className={`relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-cyan-400/50 bg-[#121418] shadow-[0_0_30px_rgba(6,182,212,0.12)] group-hover:shadow-[0_0_45px_rgba(6,182,212,0.22)] transition-all duration-500 ${photoClassName}`}>
            <img
              src={currentSrc}
              alt={alt}
              onError={handleImageError}
              className="w-full h-full object-cover object-center filter saturate-[0.98] contrast-[1.04] group-hover:scale-105 group-hover:brightness-105 transition-all duration-500 ease-out"
            />

            {/* Subtle Inner Vignette & Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Clean Status Chip at Bottom */}
            <div className="absolute bottom-2.5 inset-x-0 flex justify-center pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-mono text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ACTIVE
              </span>
            </div>
          </div>
        </motion.div>
      </Magnet>
    </div>
  );
};
