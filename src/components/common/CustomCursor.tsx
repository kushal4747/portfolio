import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const followerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Disable on touch devices or small screens
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) return;

    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;
    let isVisible = false;
    let isHovering = false;
    let isClicking = false;
    let hoverType = '';
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (followerRef.current) followerRef.current.style.opacity = '1';
        if (dotRef.current) dotRef.current.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (followerRef.current) followerRef.current.style.opacity = '0';
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      if (followerRef.current) followerRef.current.style.opacity = '1';
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };

    const onMouseDown = () => {
      isClicking = true;
      updateState();
    };

    const onMouseUp = () => {
      isClicking = false;
      updateState();
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor') || 'hover';
        isHovering = true;
        hoverType = type;
        updateState();
        return;
      }

      if (target.closest('a') || target.closest('button') || target.closest('input') || target.closest('textarea')) {
        isHovering = true;
        hoverType = 'action';
        updateState();
        return;
      }

      if (target.closest('h1') || target.closest('h2') || target.closest('h3')) {
        isHovering = true;
        hoverType = 'heading';
        updateState();
        return;
      }

      isHovering = false;
      hoverType = '';
      updateState();
    };

    const updateState = () => {
      const follower = followerRef.current;
      const text = textRef.current;
      const dot = dotRef.current;
      if (!follower) return;

      if (isHovering) {
        if (hoverType === 'project' || hoverType === 'view') {
          follower.style.width = '92px';
          follower.style.height = '92px';
          follower.style.backgroundColor = 'rgba(6, 182, 212, 0.12)';
          follower.style.borderColor = 'rgba(6, 182, 212, 0.8)';
          follower.style.backdropFilter = 'contrast(1.15) brightness(1.1)';
          if (text) {
            text.innerText = 'VIEW';
            text.style.opacity = '1';
          }
          if (dot) dot.style.opacity = '0';
        } else if (hoverType === 'action') {
          follower.style.width = isClicking ? '46px' : '56px';
          follower.style.height = isClicking ? '46px' : '56px';
          follower.style.backgroundColor = 'rgba(6, 182, 212, 0.14)';
          follower.style.borderColor = 'rgba(6, 182, 212, 0.85)';
          follower.style.backdropFilter = 'contrast(1.1) brightness(1.12)';
          if (text) {
            text.innerText = '';
            text.style.opacity = '0';
          }
          if (dot) dot.style.opacity = '0';
        } else if (hoverType === 'heading') {
          follower.style.width = '72px';
          follower.style.height = '72px';
          follower.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
          follower.style.borderColor = 'rgba(6, 182, 212, 0.5)';
          follower.style.backdropFilter = 'contrast(1.1) brightness(1.08)';
          if (text) {
            text.innerText = '';
            text.style.opacity = '0';
          }
          if (dot) dot.style.opacity = '0.5';
        }
      } else {
        // Classic idle state: 36px minimal ring, crisp precision
        follower.style.width = isClicking ? '26px' : '36px';
        follower.style.height = isClicking ? '26px' : '36px';
        follower.style.backgroundColor = 'rgba(6, 182, 212, 0.03)';
        follower.style.borderColor = 'rgba(6, 182, 212, 0.4)';
        follower.style.backdropFilter = 'none';
        if (text) {
          text.innerText = '';
          text.style.opacity = '0';
        }
        if (dot) dot.style.opacity = '1';
      }
    };

    // Smooth Lerp loop with classic fluid trailing
    const render = () => {
      const vx = targetX - currentX;
      const vy = targetY - currentY;
      const speed = Math.sqrt(vx * vx + vy * vy);

      // Classic fluid interpolation (0.18 lerp factor)
      currentX += vx * 0.18;
      currentY += vy * 0.18;

      // Subtle velocity stretch along motion angle
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);
      const stretch = Math.min(speed * 0.0012, 0.16);
      const scaleX = 1 + stretch;
      const scaleY = 1 - stretch * 0.5;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
      }

      if (textRef.current) {
        textRef.current.style.transform = `rotate(${-angle}deg) scale(${1 / scaleX}, ${1 / scaleY})`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Classic Fluid Follower Ring */}
      <div
        ref={followerRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9990] opacity-0 transition-[width,height,background-color,border-color] duration-250 ease-out flex items-center justify-center will-change-transform border shadow-[0_0_15px_rgba(6,182,212,0.2)]"
        style={{
          borderColor: 'rgba(6, 182, 212, 0.4)',
          backgroundColor: 'rgba(6, 182, 212, 0.03)',
        }}
      >
        {/* Dynamic Lens Center Label (e.g. VIEW) */}
        <span
          ref={textRef}
          className="font-mono text-[9px] font-bold tracking-widest text-cyan-300 opacity-0 transition-opacity duration-200 pointer-events-none select-none drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]"
        />
      </div>

      {/* Zero-Lag Precision Center Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[9999] opacity-0 transition-opacity duration-150 will-change-transform shadow-[0_0_8px_#22d3ee]"
      />
    </>
  );
};
