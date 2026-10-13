import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  lightMode?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
  lightMode = false
}) => {
  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  }[align];

  return (
    <div className={`flex flex-col ${alignmentClass} ${className} mb-12 md:mb-16`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`font-mono text-xs md:text-sm tracking-[0.25em] uppercase font-semibold mb-3 ${
            lightMode ? 'text-gray-500' : 'text-[#8F9CA7]'
          }`}
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`font-display font-extrabold uppercase tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] ${
          lightMode
            ? 'text-[#0C0C0C]'
            : 'bg-gradient-to-b from-[#BBCCD7] via-[#8F9CA7] to-[#646973] bg-clip-text text-transparent'
        }`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mt-4 max-w-2xl text-base md:text-lg ${
            lightMode ? 'text-gray-600' : 'text-[#8F9CA7]'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
