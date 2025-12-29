'use client';

import React, { useRef, useEffect, useCallback } from 'react';

const PARTICLE_COUNT = 50;
const PARTICLE_SPEED = 0.5;
const INTERACTION_STRENGTH = 0.05;
const INERTIA = 0.9;
const GLOW_BLUR = 10;
const PARTICLE_MIN_LENGTH = 150;
const PARTICLE_MAX_LENGTH = 350;
const PARTICLE_THICKNESS = 1.5;

const COLORS = [
  'hsla(180, 100%, 50%, 0.3)', // Cyan
  'hsla(160, 100%, 40%, 0.3)', // Teal
  'hsla(140, 100%, 60%, 0.3)', // Soft Green
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  color: string;
};

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const animationFrameId = useRef<number>();
  const isTabActive = useRef<boolean>(true);
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  const initParticles = useCallback((width: number, height: number) => {
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const angle = Math.random() * 2 * Math.PI;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * PARTICLE_SPEED,
        vy: Math.sin(angle) * PARTICLE_SPEED,
        len: PARTICLE_MIN_LENGTH + Math.random() * (PARTICLE_MAX_LENGTH - PARTICLE_MIN_LENGTH),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    });
  }, []);

  const animate = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    if (!isTabActive.current) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current.forEach((p) => {
      // Apply mouse influence
      if (mouse.current.x !== null && mouse.current.y !== null) {
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        p.vx += dx * INTERACTION_STRENGTH * 0.01; // Scale down for smoother effect
        p.vy += dy * INTERACTION_STRENGTH * 0.01;
      }
      
      // Apply inertia
      p.vx *= INERTIA;
      p.vy *= INERTIA;

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Boundary checks (wrap around)
      if (p.x > canvas.width + p.len) p.x = -p.len;
      if (p.x < -p.len) p.x = canvas.width + p.len;
      if (p.y > canvas.height + p.len) p.y = -p.len;
      if (p.y < -p.len) p.y = canvas.height + p.len;

      const angle = Math.atan2(p.vy, p.vx);

      // Draw particle
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(angle);
      
      ctx.beginPath();
      ctx.moveTo(-p.len / 2, 0);
      ctx.lineTo(p.len / 2, 0);
      
      ctx.lineWidth = PARTICLE_THICKNESS;
      ctx.strokeStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = GLOW_BLUR;
      ctx.stroke();
      
      ctx.restore();
    });

    animationFrameId.current = requestAnimationFrame(() => animate(canvas, ctx));
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResizeCheck = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResizeCheck);
    return () => window.removeEventListener('resize', handleResizeCheck);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.current.x = e.clientX - rect.left;
        mouse.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    }

    const handleVisibilityChange = () => {
      isTabActive.current = !document.hidden;
      if (isTabActive.current) {
        animationFrameId.current = requestAnimationFrame(() => animate(canvas, ctx));
      } else {
        if(animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
      }
    };

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    animate(canvas, ctx);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animate, initParticles, isMobile]);
  
  if (isMobile === undefined) {
    return null;
  }

  if (isMobile) {
    return (
        <div className="absolute inset-0 -z-10 bg-background mobile-fallback" />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 bg-background"
    />
  );
};

export default InteractiveBackground;
