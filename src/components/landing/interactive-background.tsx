'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

const LASER_COUNT = 30;
const LASER_MIN_SPEED = 0.0005;
const LASER_MAX_SPEED = 0.002;
const LASER_MIN_LENGTH = 100;
const LASER_MAX_LENGTH = 300;
const LASER_THICKNESS = 1;
const CURSOR_INFLUENCE = 0.0008;
const INERTIA = 0.95;

const COLORS = [
  'hsla(180, 100%, 50%, 0.3)', // Cyan
  'hsla(160, 100%, 40%, 0.3)', // Teal
  'hsla(140, 100%, 60%, 0.3)', // Soft Green
];

type Laser = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  color: string;
  angle: number;
};

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lasers = useRef<Laser[]>([]);
  const mouse = useRef<{ x: number; y: number; vx: number; vy: number }>({ x: 0, y: 0, vx: 0, vy: 0 });
  const animationFrameId = useRef<number>();
  const isTabActive = useRef<boolean>(true);
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  const initLasers = useCallback((width: number, height: number) => {
    lasers.current = Array.from({ length: LASER_COUNT }, () => {
      const speed = LASER_MIN_SPEED + Math.random() * (LASER_MAX_SPEED - LASER_MIN_SPEED);
      const angle = Math.random() * 2 * Math.PI;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed * width,
        vy: Math.sin(angle) * speed * height,
        len: LASER_MIN_LENGTH + Math.random() * (LASER_MAX_LENGTH - LASER_MIN_LENGTH),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        angle: 0,
      };
    });
  }, []);

  const animate = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    if (!isTabActive.current) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    lasers.current.forEach((laser) => {
      // Update mouse velocity
      mouse.current.vx *= INERTIA;
      mouse.current.vy *= INERTIA;

      // Influence from mouse
      const dx = mouse.current.x - laser.x;
      const dy = mouse.current.y - laser.y;
      const distSq = dx * dx + dy * dy;
      
      const influence = Math.max(0, 1 - distSq / (canvas.width * canvas.width * 0.25));
      laser.vx += dx * CURSOR_INFLUENCE * influence;
      laser.vy += dy * CURSOR_INFLUENCE * influence;
      
      laser.vx *= INERTIA;
      laser.vy *= INERTIA;

      laser.x += laser.vx;
      laser.y += laser.vy;

      // Boundary checks
      if (laser.x < -laser.len) laser.x = canvas.width + laser.len;
      if (laser.x > canvas.width + laser.len) laser.x = -laser.len;
      if (laser.y < -laser.len) laser.y = canvas.height + laser.len;
      if (laser.y > canvas.height + laser.len) laser.y = -laser.len;

      laser.angle = Math.atan2(laser.vy, laser.vx);

      // Draw laser
      ctx.save();
      ctx.translate(laser.x, laser.y);
      ctx.rotate(laser.angle);
      
      ctx.beginPath();
      ctx.moveTo(-laser.len / 2, 0);
      ctx.lineTo(laser.len / 2, 0);
      
      ctx.lineWidth = LASER_THICKNESS;
      ctx.strokeStyle = laser.color;
      ctx.shadowColor = laser.color;
      ctx.shadowBlur = 10;
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
      initLasers(canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const newX = e.clientX - rect.left;
        const newY = e.clientY - rect.top;
        mouse.current.vx = newX - mouse.current.x;
        mouse.current.vy = newY - mouse.current.y;
        mouse.current.x = newX;
        mouse.current.y = newY;
    };
    window.addEventListener('mousemove', handleMouseMove);

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
    document.addEventListener('visibilitychange', handleVisibilityChange);

    animate(canvas, ctx);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animate, initLasers, isMobile]);

  if (isMobile === undefined) {
    return null; // Or a loading spinner
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
