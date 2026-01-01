'use client';

import React, { useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  
  const simState = useRef({
    w: 0,
    h: 0,
    scale: 4,
    cols: 0,
    rows: 0,
    current: new Float32Array(),
    previous: new Float32Array(),
    damping: 0.92,
    lastDisturb: 0,
    strength: 350,
    threshold: 1.5,
  }).current;

  // For this component, we will force the light theme colors to match the logo aesthetic
  const isDark = false; 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const resize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      
      const newCols = Math.floor(newW / simState.scale);
      const newRows = Math.floor(newH / simState.scale);

      if (newCols !== simState.cols || newRows !== simState.rows) {
        simState.w = canvas.width = newW;
        simState.h = canvas.height = newH;
        simState.cols = newCols;
        const size = newCols * newRows;
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

    // New render function with logo-inspired colors
    const render = () => {
      ctx.clearRect(0, 0, simState.w, simState.h);
      const imageData = ctx.createImageData(simState.w, simState.h);
      const data = imageData.data;

      for (let i = 0; i < simState.current.length; i++) {
        const x = i % simState.cols;
        const y = Math.floor(i / simState.cols);
        const v = simState.current[i];

        if (Math.abs(v) > simState.threshold) {
          const intensity = Math.min(Math.abs(v) / 150, 1);
          
          // Gradient: Teal -> Green -> Amber
          let r, g, b;
          if (intensity > 0.66) {
            // Teal part
            r = 77; g = 158; b = 153; // Teal
          } else if (intensity > 0.33) {
            // Green part
            r = 101; g = 153; b = 82; // Green
          } else {
            // Amber part
            r = 217; g = 160; b = 61; // Amber
          }

          const alpha = Math.min(intensity, 0.5);

          for (let py = 0; py < simState.scale; py++) {
            for (let px = 0; px < simState.scale; px++) {
              const pixelX = x * simState.scale + px;
              const pixelY = y * simState.scale + py;
              if (pixelX < simState.w && pixelY < simState.h) {
                const pixelIndex = (pixelY * simState.w + pixelX) * 4;
                data[pixelIndex] = r;
                data[pixelIndex + 1] = g;
                data[pixelIndex + 2] = b;
                data[pixelIndex + 3] = alpha * 255;
              }
            }
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
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
  }, [simState, isDark]);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden"
      style={{
        backgroundColor: isDark ? 'hsl(215 19% 25%)' : 'hsl(48 33% 94%)',
      }}
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
