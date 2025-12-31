
'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  
  // Using refs to store simulation state to prevent re-renders on update
  const simState = useRef({
    w: 0,
    h: 0,
    scale: 3, // Increased scale for better performance on more devices
    cols: 0,
    rows: 0,
    current: new Float32Array(),
    previous: new Float32Array(),
    damping: 0.985,
  }).current;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      simState.w = canvas.width = window.innerWidth;
      simState.h = canvas.height = window.innerHeight;
      simState.cols = Math.floor(simState.w / simState.scale);
      simState.rows = Math.floor(simState.h / simState.scale);
      
      const size = simState.cols * simState.rows;
      // Re-initialize buffers only if size has changed
      if(simState.current.length !== size) {
        simState.current = new Float32Array(size);
        simState.previous = new Float32Array(size);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const disturb = (x: number, y: number, strength = 500) => {
      const cx = Math.floor(x / simState.scale);
      const cy = Math.floor(y / simState.scale);
      if (cx > 1 && cx < simState.cols - 1 && cy > 1 && cy < simState.rows - 1) {
        simState.current[cx + cy * simState.cols] = strength;
      }
    };

    const step = () => {
      for (let y = 1; y < simState.rows - 1; y++) {
        for (let x = 1; x < simState.cols - 1; x++) {
          const i = x + y * simState.cols;
          simState.current[i] =
            (simState.previous[i - 1] +
              simState.previous[i + 1] +
              simState.previous[i - simState.cols] +
              simState.previous[i + simState.cols]) /
              2 -
            simState.current[i];
          simState.current[i] *= simState.damping;
        }
      }
      // Swap buffers
      [simState.current, simState.previous] = [simState.previous, simState.current];
    };

    const render = () => {
      ctx.clearRect(0, 0, simState.w, simState.h);
      for (let y = 0; y < simState.rows; y++) {
        for (let x = 0; x < simState.cols; x++) {
          const i = x + y * simState.cols;
          const v = simState.previous[i];
          if (v !== 0) {
            const alpha = Math.min(Math.abs(v) / 600, 0.25);
            ctx.fillStyle = `rgba(120,220,255,${alpha})`;
            ctx.fillRect(x * simState.scale, y * simState.scale, simState.scale, simState.scale);
          }
        }
      }
    };

    const animate = () => {
      step();
      render();
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      disturb(e.clientX, e.clientY, 500);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // Prevent scrolling
      const touch = e.touches[0];
      disturb(touch.clientX, touch.clientY, 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Initial disturbance to make it interesting on load
    setTimeout(() => {
        disturb(simState.w / 2, simState.h / 2, 1000);
    }, 500);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [simState]);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #0f1c2d, #070b14)',
      }}
    >
      <canvas
        id="water"
        ref={canvasRef}
        className="block fixed inset-0 pointer-events-none"
      />
    </div>
  );
};

export default InteractiveBackground;
