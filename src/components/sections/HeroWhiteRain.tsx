import React, { useEffect, useRef } from 'react';

interface RainParticle {
  x: number;
  y: number;
  layer: number; // 0 = background, 1 = midground, 2 = foreground
  length: number;
  speed: number;
  baseSpeed: number;
  opacity: number;
  width: number;
  tiltAngle: number; // in radians
  cosAngle: number;
  sinAngle: number;
  dx: number;
  deflectionX: number;
  deflectionY: number;
}

export const HeroWhiteRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const isMobile = window.innerWidth < 768;
    // Desktop: ~120 particles, Mobile: ~40 particles
    const particleCount = isMobile ? 40 : 120;
    const particles: RainParticle[] = [];

    // Distinct attractive slant angle: approx 64° from horizontal (26° tilt to right)
    const baseTiltRad = (64 * Math.PI) / 180;

    const initParticle = (p?: Partial<RainParticle>): RainParticle => {
      // 40% background, 38% midground, 22% foreground
      const rand = Math.random();
      let layer = 0;
      if (rand > 0.78) layer = 2;
      else if (rand > 0.40) layer = 1;

      // Slight natural variation in angle per particle (62° - 66°)
      const tiltAngle = baseTiltRad + (Math.random() - 0.5) * 0.08;
      const cosAngle = Math.cos(tiltAngle);
      const sinAngle = Math.sin(tiltAngle);

      let length: number;
      let speed: number;
      let opacity: number;
      let strokeWidth: number;

      if (layer === 0) {
        // Background: subtle, small, gentle speed
        length = 22 + Math.random() * 20; // 22 - 42px
        speed = 2.4 + Math.random() * 1.4; // 2.4 - 3.8 px/frame
        opacity = 0.09 + Math.random() * 0.09; // 0.09 - 0.18
        strokeWidth = 0.75;
      } else if (layer === 1) {
        // Midground: medium opacity, medium speed, prominent streak
        length = 42 + Math.random() * 30; // 42 - 72px
        speed = 4.6 + Math.random() * 2.2; // 4.6 - 6.8 px/frame
        opacity = 0.18 + Math.random() * 0.14; // 0.18 - 0.32
        strokeWidth = 1.0;
      } else {
        // Foreground: long elegant streak, faster, crisp silvery white
        length = 72 + Math.random() * 38; // 72 - 110px
        speed = 7.5 + Math.random() * 3.2; // 7.5 - 10.7 px/frame
        opacity = 0.28 + Math.random() * 0.16; // 0.28 - 0.44
        strokeWidth = 1.25;
      }

      // Horizontal velocity proportional to angle
      const dx = speed * (cosAngle / sinAngle);

      return {
        x: p?.x ?? (Math.random() * (width + 300) - 200),
        y: p?.y ?? (Math.random() * (height + 150) - 100),
        layer,
        length,
        speed,
        baseSpeed: speed,
        opacity,
        width: strokeWidth,
        tiltAngle,
        cosAngle,
        sinAngle,
        dx,
        deflectionX: 0,
        deflectionY: 0,
        ...p,
      };
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      if (particles.length === 0) {
        for (let i = 0; i < particleCount; i++) {
          particles.push(initParticle());
        }
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Track mouse over canvas/hero
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const heroSection = canvas.closest('#hero') || canvas.parentElement;
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove as EventListener, { passive: true });
      heroSection.addEventListener('mouseleave', handleMouseLeave as EventListener, { passive: true });
    }

    // Pause when Hero is out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Animation Loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gentle organic mouse deflection
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);
          const influenceRadius = 130;

          if (dist < influenceRadius && dist > 1) {
            const force = (1 - dist / influenceRadius) * 1.4;
            p.deflectionX += (mdx / dist) * force * 0.55;
            p.deflectionY += (mdy / dist) * force * 0.25;
          }
        }

        // Deflection decay with smooth restoration
        p.deflectionX *= 0.91;
        p.deflectionY *= 0.91;

        // Advance position along tilted trajectory
        p.x += p.dx + p.deflectionX;
        p.y += p.speed + p.deflectionY;

        // Reset if offscreen (accounting for diagonal sweep to right)
        if (p.y > height + 100 || p.x > width + 150) {
          particles[i] = initParticle({
            x: Math.random() * (width + 250) - 200,
            y: -p.length - Math.random() * 50
          });
          continue;
        }

        // Tilted streak endpoints along the exact angle vector
        const x1 = p.x;
        const y1 = p.y;
        const x2 = p.x + p.length * p.cosAngle;
        const y2 = p.y + p.length * p.sinAngle;

        // High-contrast, elegant gradient from transparent tail to luminous tip
        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(0.5, `rgba(215, 230, 245, ${p.opacity * 0.65})`);
        grad.addColorStop(0.85, `rgba(240, 248, 255, ${p.opacity * 0.95})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${p.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = p.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Delicate sparkling leading droplet for foreground streaks
        if (p.layer === 2) {
          ctx.beginPath();
          ctx.arc(x2, y2, p.width * 0.9, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, p.opacity * 1.4)})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleMouseMove as EventListener);
        heroSection.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0 select-none"
    />
  );
};
