'use client';

export function Prism() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center opacity-50 perspective-[1000px] pointer-events-none">
      <div className="relative w-96 h-96 animate-slow-spin">
        <div className="absolute w-full h-full transform-style-3d">
          {/* Main Prism Faces */}
          <div className="absolute w-full h-full border-l-[250px] border-l-transparent border-r-[250px] border-r-transparent border-b-[400px] border-b-primary/10 transform rotate-y-0 translate-z-[125px]"></div>
          <div className="absolute w-full h-full border-l-[250px] border-l-transparent border-r-[250px] border-r-transparent border-b-[400px] border-b-accent/10 transform rotate-y-120 translate-z-[125px]"></div>
          <div className="absolute w-full h-full border-l-[250px] border-l-transparent border-r-[250px] border-r-transparent border-b-[400px] border-b-secondary/20 transform rotate-y-240 translate-z-[125px]"></div>

          {/* Light Rays */}
          <div className="ray ray1"></div>
          <div className="ray ray2"></div>
          <div className="ray ray3"></div>
          <div className="ray ray4"></div>
          <div className="ray ray5"></div>
        </div>
      </div>
      <style jsx>{`
        .perspective-\[1000px\] {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .animate-slow-spin {
          animation: spin 30s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotateY(0deg) rotateX(10deg);
          }
          to {
            transform: rotateY(360deg) rotateX(10deg);
          }
        }
        .ray {
          position: absolute;
          top: 50%;
          left: -100%;
          width: 300%;
          height: 1px;
          background: linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent);
          opacity: 0;
          animation: radiate 8s ease-out infinite;
        }
        .ray1 { transform: rotate(15deg) translateY(-80px); animation-delay: 0s; }
        .ray2 { transform: rotate(5deg) translateY(-20px); animation-delay: 1.5s; background: linear-gradient(90deg, transparent, hsl(var(--accent) / 0.4), transparent); }
        .ray3 { transform: rotate(-5deg) translateY(40px); animation-delay: 3s; }
        .ray4 { transform: rotate(-15deg) translateY(100px); animation-delay: 4.5s; background: linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent); }
        .ray5 { transform: rotate(0deg) translateY(10px); animation-delay: 6s; background: linear-gradient(90deg, transparent, hsl(var(--accent) / 0.2), transparent); }

        @keyframes radiate {
          0% {
            opacity: 0;
            transform-origin: 100% 50%;
            transform: scaleX(0);
          }
          20% {
            opacity: 1;
            transform: scaleX(1);
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform-origin: 0% 50%;
            transform: scaleX(0);
          }
        }
      `}</style>
    </div>
  );
}
