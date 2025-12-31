
'use client';

import React, { useRef, useEffect } from 'react';

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let pos = { x: canvas.width / 2, y: canvas.height / 2 };
    let vel = { x: 0, y: 0 };
    let target = { x: pos.x, y: pos.y };

    let energy = 0;

    const drawLiquid = (x: number, y: number, vx: number, vy: number, power: number) => {
      const radius = 26 + power * 0.9;
      const stretch = Math.min(power * 1.2, 40);
      const angle = Math.atan2(vy, vx);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      const grad = ctx.createRadialGradient(0, 0, 0, stretch, 0, radius + stretch);
      grad.addColorStop(0, `rgba(200,250,255,0.85)`);
      grad.addColorStop(0.4, `rgba(120,220,255,0.45)`);
      grad.addColorStop(1, `rgba(0,0,0,0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(
        stretch * 0.6,
        0,
        radius + stretch,
        radius * 0.9,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      vel.x += (target.x - pos.x) * 0.25;
      vel.y += (target.y - pos.y) * 0.25;

      vel.x *= 0.72;
      vel.y *= 0.72;

      pos.x += vel.x;
      pos.y += vel.y;

      const speed = Math.hypot(vel.x, vel.y);
      energy += (speed * 1.4 - energy) * 0.18;
      energy *= 0.94;

      if (energy > 0.5) {
        drawLiquid(pos.x, pos.y, vel.x, vel.y, energy);
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      target.x = touch.clientX;
      target.y = touch.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

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
      className="fixed inset-0 z-0 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #0f1c2d, #070b14)',
      }}
    >
      <canvas
        ref={canvasRef}
        className="block pointer-events-none"
      />
    </div>
  );
};

export default InteractiveBackground;
