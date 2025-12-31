
'use client';

import React, { useRef, useEffect } from 'react';

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  
  // Using refs to store simulation state to prevent re-renders on update
  const simState = useRef({
    w: 0,
    h: 0,
    scale: 4, // Increased scale for better performance
    cols: 0,
    rows: 0,
    current: new Float32Array(),
    previous: new Float32Array(),
    damping: 0.985,
    lastDisturb: 0,
    strength: 350,
    threshold: 1.5,
  }).current;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      simState.w = canvas.width = window.innerWidth;
      simState.h = canvas.height = window.innerHeight;
      
      const newCols = Math.floor(simState.w / simState.scale);
      const newRows = Math.floor(simState.h / simState.scale);

      if (newCols !== simState.cols || newRows !== simState.rows) {
        simState.cols = newCols;
        simState.rows = newRows;
        const size = simState.cols * simState.rows;
        simState.current = new Float32Array(size);
        simState.previous = new Float32Array(size);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const disturb = (x: number, y: number, strength = simState.strength) => {
      const cx = Math.floor(x / simState.scale);
      const cy = Math.floor(y / simState.scale);
      if (cx > 1 && cx < simState.cols - 1 && cy > 1 && cy < simState.rows - 1) {
        simState.previous[cx + cy * simState.cols] = strength;
      }
    };

    const step = () => {
      for (let y = 1; y < simState.rows - 1; y++) {
        for (let x = 1; x < simState.cols - 1; x++) {
          const i = x + y * simState.cols;
          const scheduler =
            (simState.previous[i - 1] +
              simState.previous[i + 1] +
              simState.previous[i - simState.cols] +
              simState.previous[i + simState.cols]) / 2 -
            simState.current[i];
          simState.current[i] = scheduler * simState.damping;
        }
      }
      [simState.current, simState.previous] = [simState.previous, simState.current];
    };

    const render = () => {
      ctx.clearRect(0, 0, simState.w, simState.h);
      for (let y = 0; y < simState.rows; y++) {
        for (let x = 0; x < simState.cols; x++) {
          const i = x + y * simState.cols;
          const v = simState.previous[i];
          
          if (Math.abs(v) > simState.threshold) {
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

    const handleInteraction = (x: number, y: number) => {
        const now = performance.now();
        if (now - simState.lastDisturb > 16) { // ~60fps throttle
            disturb(x, y);
            simState.lastDisturb = now;
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleInteraction(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // Prevent scrolling
      const touch = e.touches[0];
      handleInteraction(touch.clientX, touch.clientY);
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
