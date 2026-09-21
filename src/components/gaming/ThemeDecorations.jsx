import React, { useMemo } from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export const ThemeDecorations = () => {
  const { themeName } = useTheme();

  // Generate random stable positions for seasonal particles
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 4.3) % 100}%`,
      delay: `${(i * 0.35) % 5}s`,
      duration: `${6 + ((i * 1.7) % 7)}s`,
      size: `${10 + ((i * 3) % 14)}px`,
      opacity: 0.3 + ((i * 5) % 50) / 100,
    }));
  }, []);

  if (themeName === 'christmas') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute text-white/60 animate-snow"
            style={{
              left: p.left,
              top: '-30px',
              animationDelay: p.delay,
              animationDuration: p.duration,
              fontSize: p.size,
              opacity: p.opacity,
            }}
          >
            ❄
          </div>
        ))}
        {/* Festive top garland subtle glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-emerald-500 to-red-600 opacity-60 shadow-[0_0_12px_rgba(220,38,38,0.5)]" />
      </div>
    );
  }

  if (themeName === 'halloween') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {particles.slice(0, 12).map((p) => (
          <div
            key={p.id}
            className="absolute text-orange-400/40 animate-float-slow"
            style={{
              left: p.left,
              top: `${(p.id * 8) % 80}%`,
              animationDelay: p.delay,
              animationDuration: `${8 + p.id}s`,
              fontSize: p.size,
            }}
          >
            🦇
          </div>
        ))}
        {/* Spooky bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/20 via-transparent to-orange-950/10 pointer-events-none" />
      </div>
    );
  }

  if (themeName === 'thanksgiving') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute text-amber-500/50 animate-leaves"
            style={{
              left: p.left,
              top: '-30px',
              animationDelay: p.delay,
              animationDuration: p.duration,
              fontSize: p.size,
            }}
          >
            🍂
          </div>
        ))}
      </div>
    );
  }

  // Normal theme: subtle golden ambient sparks
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.slice(0, 14).map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-amber-400/30 blur-[1px] animate-pulse"
          style={{
            left: p.left,
            top: `${(p.id * 7) % 90}%`,
            width: `${Math.max(2, (p.id % 4) + 2)}px`,
            height: `${Math.max(2, (p.id % 4) + 2)}px`,
            animationDelay: p.delay,
            animationDuration: `${3 + (p.id % 4)}s`,
          }}
        />
      ))}
    </div>
  );
};
