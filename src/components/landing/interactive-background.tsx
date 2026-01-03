
'use client';

import React, { useRef, useEffect } from 'react';

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  const simState = useRef({
    w: 0,
    h: 0,
    scale: 1, // Changed from 4 to 1 for higher resolution
    cols: 0,
    rows: 0,
    current: new Float32Array(),
    previous: new Float32Array(),
    damping: 0.92,
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
      simState.cols = Math.floor(simState.w / simState.scale);
      const size = simState.cols * (simState.rows = Math.floor(simState.h / simState.scale));
      simState.current = new Float32Array(size);
      simState.previous = new Float32Array(size);
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
      
      for (let i = 0; i < simState.current.length; i++) {
        const v = simState.current[i];

        if (Math.abs(v) > simState.threshold) {
            const x = i % simState.cols;
            const y = Math.floor(i / simState.cols);
            const intensity = Math.min(Math.abs(v) / 100, 1);
            
            let r, g, b;
            if (intensity > 0.5) { // Teal
                r = 0; g = 128; b = 128;
            } else { // Green
                r = 56; g = 163; b = 165;
            }

            const alpha = Math.min(intensity * 0.4, 0.4);
            const radius = Math.min(intensity * 10, 10);

            ctx.beginPath();
            ctx.arc(x * simState.scale, y * simState.scale, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.fill();
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
        if (now - simState.lastDisturb > 16) { 
            disturb(x, y);
            simState.lastDisturb = now;
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleInteraction(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); 
      const touch = e.touches[0];
      handleInteraction(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

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
    >
      <canvas
        id="water"
        ref={canvasRef}
        className="block fixed inset-0 pointer-events-none"
      />
       <div className="noise-background absolute inset-0"></div>
    </div>
  );
};

export default InteractiveBackground;
