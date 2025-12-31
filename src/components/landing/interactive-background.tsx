
'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();

    let target = { x: canvas.width / 2, y: canvas.height / 2 };
    let point = { x: target.x, y: target.y };
    let trail: { x: number; y: number; life: number }[] = [];

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      // Create inertia for the "drag" effect
      point.x = lerp(point.x, target.x, 0.15);
      point.y = lerp(point.y, target.y, 0.15);

      trail.push({ x: point.x, y: point.y, life: 1 });

      // Create a fading effect by repainting with a semi-transparent background
      ctx.fillStyle = 'rgba(11, 18, 32, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the trail
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        p.life -= 0.02; // Decrease life

        if (p.life > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 40 * p.life, 0, Math.PI * 2); // Size based on life
          ctx.fillStyle = `rgba(0, 180, 255, ${p.life * 0.4})`;
          ctx.fill();
        }
      }

      // Remove "dead" particles
      trail = trail.filter(p => p.life > 0);

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        target.x = touch.clientX;
        target.y = touch.clientY;
      }
    };
    
    window.addEventListener('resize', setCanvasDimensions);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
     <div className="fixed inset-0 z-0 overflow-hidden bg-[#0b1220] isolate">
        <canvas ref={canvasRef} className="block" />
        <div className="absolute inset-0 bg-transparent" />
     </div>
  );
};

export default InteractiveBackground;
