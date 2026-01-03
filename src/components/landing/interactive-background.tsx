
'use client';

import React, { useRef, useEffect } from 'react';

interface Ripple {
  x: number;
  y: number;
  age: number;
  maxAge: number;
  radius: number;
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const ripples = useRef<Ripple[]>([]).current;
  const lastInteractionTime = useRef<number>(0);

  const config = {
    rippleColor: 'hsl(173, 97%, 50%)', // Neon Teal from dark theme primary
    rippleGap: 10,
    maxRipples: 40,
    rippleDuration: 800, // milliseconds, approx 0.8s
    idleTimeout: 100, // milliseconds to wait before clearing
  };

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

    const addRipple = (x: number, y: number) => {
      if (ripples.length > config.maxRipples) {
        ripples.shift();
      }
      ripples.push({
        x,
        y,
        age: 0,
        maxAge: config.rippleDuration,
        radius: 0,
      });
      lastInteractionTime.current = performance.now();
    };

    let lastTime = 0;
    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only draw if there's recent interaction
      if (performance.now() - lastInteractionTime.current < config.idleTimeout + config.rippleDuration) {
        ctx.globalCompositeOperation = 'lighter';
        
        for (let i = ripples.length - 1; i >= 0; i--) {
          const ripple = ripples[i];
          ripple.age += deltaTime;

          if (ripple.age > ripple.maxAge) {
            ripples.splice(i, 1);
            continue;
          }

          const life = ripple.age / ripple.maxAge; // 0 to 1
          const easeOut = 1 - Math.pow(1 - life, 3); // Easing function

          ripple.radius = easeOut * 70;
          const opacity = 1 - easeOut;

          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);

          const gradient = ctx.createRadialGradient(
            ripple.x,
            ripple.y,
            ripple.radius * 0.8,
            ripple.x,
            ripple.y,
            ripple.radius
          );

          gradient.addColorStop(0, `rgba(0, 0, 0, 0)`);
          gradient.addColorStop(1, `${config.rippleColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      } else {
        ripples.length = 0; // Clear all ripples when idle
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    const handleInteraction = (x: number, y: number) => {
      addRipple(x, y);
    };

    let lastMoveTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
        const now = performance.now();
        if (now - lastMoveTime > config.rippleGap) {
            handleInteraction(e.clientX, e.clientY);
            lastMoveTime = now;
        }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
       const now = performance.now();
        if (now - lastMoveTime > config.rippleGap) {
            handleInteraction(touch.clientX, touch.clientY);
            lastMoveTime = now;
        }
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
  }, [config, ripples]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-background">
      <canvas ref={canvasRef} className="block fixed inset-0 pointer-events-none" />
    </div>
  );
};

export default InteractiveBackground;
