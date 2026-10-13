import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  mode?: 'scroll-reveal' | 'stagger-chars' | 'stagger-words';
  delay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  mode = 'scroll-reveal',
  delay = 0
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const words = text.split(' ');

  if (shouldReduceMotion) {
    return <p className={className}>{text}</p>;
  }

  if (mode === 'scroll-reveal') {
    return (
      <p ref={containerRef} className={`flex flex-wrap ${className}`}>
        {words.map((word, i) => {
          return (
            <WordWithScrollReveal
              key={`${word}-${i}`}
              word={word}
              index={i}
              total={words.length}
              parentRef={containerRef}
            />
          );
        })}
      </p>
    );
  }

  // Character reveal on viewport enter
  if (mode === 'stagger-chars') {
    const characters = Array.from(text);
    return (
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.02,
              delayChildren: delay
            }
          }
        }}
        className={`inline-block ${className}`}
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
              }
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  // Stagger words
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.04,
            delayChildren: delay
          }
        }
      }}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

interface WordProps {
  word: string;
  index: number;
  total: number;
  parentRef: React.RefObject<HTMLParagraphElement>;
}

const WordWithScrollReveal: React.FC<WordProps> = ({ word, index, total, parentRef }) => {
  const { scrollYProgress } = useScroll({
    target: parentRef,
    offset: ["start 0.85", "end 0.45"]
  });

  const step = 1 / total;
  const start = index * step;
  const end = Math.min(1, start + step * 2.5);

  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  const color = useTransform(
    scrollYProgress,
    [start, end],
    ["#4B5563", "#D7E2EA"]
  );

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.25em] transition-colors duration-150"
    >
      {word}
    </motion.span>
  );
};
