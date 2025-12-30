'use client';

import { cn } from '@/lib/utils';

export function Prism() {
  return (
    <div
      className={cn(
        'absolute inset-0 z-0 flex items-center justify-center opacity-40 perspective-[1000px] pointer-events-none'
      )}
    >
      <div
        className={cn(
          'w-64 h-64 transform-style-3d',
          'animate-float'
        )}
      >
        <div className="absolute w-full h-full transform-style-3d animate-prism-spin">
          {/* Side 1 */}
          <div
            className="absolute top-0 left-0 w-[200px] h-[100px] bg-gradient-to-r from-cyan-400/20 to-blue-500/20 opacity-90 border border-cyan-300/30"
            style={{
              transform: 'rotateY(0deg) translateZ(28.87px)',
            }}
          ></div>
          {/* Side 2 */}
          <div
            className="absolute top-0 left-0 w-[200px] h-[100px] bg-gradient-to-r from-green-400/20 to-teal-500/20 opacity-90 border border-green-300/30"
            style={{
              transform: 'rotateY(120deg) translateZ(28.87px)',
            }}
          ></div>
          {/* Side 3 */}
          <div
            className="absolute top-0 left-0 w-[200px] h-[100px] bg-gradient-to-r from-sky-400/20 to-indigo-500/20 opacity-90 border border-sky-300/30"
            style={{
              transform: 'rotateY(240deg) translateZ(28.87px)',
            }}
          ></div>

          {/* Top Cap */}
           <div
            className="absolute w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[50px] border-b-white/30"
            style={{
              transform: 'translateX(75px) translateY(-50px) rotateX(90deg) rotateZ(180deg) '
            }}
          ></div>

           {/* Bottom Cap */}
           <div
            className="absolute w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[50px] border-b-white/30"
            style={{
              transform: 'translateX(75px) translateY(100px) rotateX(-90deg) '
            }}
          ></div>
        </div>
      </div>
      <style jsx>{`
        .perspective-\[1000px\] {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        @keyframes prism-spin {
          from {
            transform: rotateY(0deg) rotateX(-15deg);
          }
          to {
            transform: rotateY(360deg) rotateX(-15deg);
          }
        }
        .animate-prism-spin {
          animation: prism-spin 25s linear infinite;
        }

        @keyframes float {
          0% {
            transform: translate3d(0, 0, 0);
          }
          25% {
            transform: translate3d(80px, -40px, 20px);
          }
          50% {
            transform: translate3d(40px, 20px, -10px);
          }
          75% {
            transform: translate3d(-60px, 50px, 10px);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-float {
            animation: float 30s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
