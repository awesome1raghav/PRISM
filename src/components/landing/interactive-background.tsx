
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

    const animate = () => {
      // Smooth inertia
      point.x += (target.x - point.x) * 0.12;
      point.y += (target.y - point.y) * 0.12;

      trail.push({ x: point.x, y: point.y, life: 1 });

      // Clean fade (NO IMPRINTS)
      ctx.fillStyle = "rgba(11,18,32,0.35)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Limit trail length (VERY IMPORTANT)
      if (trail.length > 18) trail.shift();

      ctx.globalCompositeOperation = "lighter";

      for (const p of trail) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 32 * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,220,255,${p.life * 0.18})`;
        ctx.fill();
        p.life *= 0.85;
      }

      ctx.globalCompositeOperation = "source-over";

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
     <div 
        className="fixed inset-0 z-0 overflow-hidden isolate"
        style={{ background: 'radial-gradient(circle at center, #0f1c2d, #070b14)' }}
     >
        <canvas ref={canvasRef} className="block" />
     </div>
  );
};

export default InteractiveBackground;
