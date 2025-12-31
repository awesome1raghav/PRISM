
'use client';

import React, { useEffect, useRef } from 'react';

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let pos = { x: target.x, y: target.y };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Reset target to center on resize to avoid jarring jumps
      target = { x: canvas.width / 2, y: canvas.height / 2 };
      pos = { x: target.x, y: target.y };
    };

    resize();
    window.addEventListener('resize', resize);

    const drawPixelGlow = (x: number, y: number) => {
        const coreRadius = 22;
        const glowSteps = 6;

        // Core
        ctx.beginPath();
        ctx.arc(x, y, coreRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#c8f3ff";
        ctx.fill();

        // Pixel glow rings
        for (let i = 1; i <= glowSteps; i++) {
            ctx.beginPath();
            ctx.arc(x, y, coreRadius + i * 10, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0,180,255,${0.15 / i})`;
            ctx.lineWidth = 6;
            ctx.stroke();
        }
    };


    const animate = () => {
      // FULL CLEAR → no background damage
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth drag
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;

      drawPixelGlow(pos.x, pos.y);

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

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
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resize);
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
