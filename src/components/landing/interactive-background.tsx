
'use client';

import React from 'react';

const InteractiveBackground: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationFrameId = React.useRef<number>();

  React.useEffect(() => {
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
    let target = { x: pos.x, y: pos.y };
    let velocity = 0;
    let glow = 0;

    const drawWaterGlow = (x: number, y: number, strength: number) => {
        const radius = 30 + strength * 0.8;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, `rgba(170,240,255,${0.35})`);
        grad.addColorStop(0.4, `rgba(80,180,255,${0.2})`);
        grad.addColorStop(1, `rgba(0,0,0,0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // inertia
        const dx = target.x - pos.x;
        const dy = target.y - pos.y;
        pos.x += dx * 0.18;
        pos.y += dy * 0.18;

        // speed → energy
        velocity = Math.sqrt(dx * dx + dy * dy);
        glow += (velocity - glow) * 0.15;

        // auto fade when stopped
        glow *= 0.9;

        if (glow > 0.5) drawWaterGlow(pos.x, pos.y, glow);

        animationFrameId.current = requestAnimationFrame(animate);
    }
    animate();

    const handlePointerMove = (x: number, y: number) => {
        target.x = x;
        target.y = y;
    }

    const handleMouseMove = (e: MouseEvent) => {
        handlePointerMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            handlePointerMove(touch.clientX, touch.clientY);
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
        <canvas ref={canvasRef} className="block pointer-events-none" />
     </div>
  );
};

export default InteractiveBackground;
