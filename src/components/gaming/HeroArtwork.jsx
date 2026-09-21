import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { Sparkles, Crown, Flame, Gem } from 'lucide-react';

export const HeroArtwork = ({ className = '' }) => {
  const { themeName } = useTheme();

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Outer Cosmic Glow Vortex */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] rounded-full bg-gradient-to-tr from-purple-600/30 via-primary/30 to-amber-500/20 blur-3xl animate-pulse pointer-events-none" />
      
      {/* Rotating Celestial Rings */}
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] rounded-full border border-primary/20 border-dashed animate-[spin_40s_linear_infinite] pointer-events-none" />
      <div className="absolute w-52 h-52 sm:w-72 sm:h-72 md:w-[360px] md:h-[360px] rounded-full border border-accent/30 animate-[spin_25s_linear_infinite_reverse] pointer-events-none" />

      {/* Main Cosmic Portal Container */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] rounded-full p-2 bg-gradient-to-tr from-amber-500 via-purple-600 to-primary shadow-[0_0_60px_rgba(234,179,8,0.35)] flex items-center justify-center overflow-hidden">
        {/* Portal Inner Background */}
        <div className="w-full h-full rounded-full bg-gradient-to-b from-purple-950 via-slate-950 to-amber-950/80 flex items-center justify-center relative overflow-hidden">
          
          {/* Radial Light Rays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.25)_0%,transparent_70%)] animate-pulse" />

          {/* Majestic Golden Lion Mascot Centerpiece */}
          <div className="relative z-10 flex flex-col items-center transform hover:scale-105 transition-transform duration-500">
            <svg
              viewBox="0 0 200 200"
              className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 text-primary drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="lionGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="40%" stopColor="#eab308" />
                  <stop offset="70%" stopColor="#ca8a04" />
                  <stop offset="100%" stopColor="#854d0e" />
                </linearGradient>
                <linearGradient id="lionCrown" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Lion Crown */}
              <path
                d="M70 45 L85 62 L100 38 L115 62 L130 45 L125 72 L75 72 Z"
                fill="url(#lionCrown)"
                stroke="#fef08a"
                strokeWidth="2"
                filter="url(#goldGlow)"
              />
              <circle cx="100" cy="48" r="3" fill="#ef4444" />
              <circle cx="85" cy="55" r="2.5" fill="#3b82f6" />
              <circle cx="115" cy="55" r="2.5" fill="#22c55e" />

              {/* Mane Outer Spikes */}
              <path
                d="M100 25 L120 45 L145 35 L155 60 L180 65 L175 90 L195 105 L180 125 L190 150 L165 160 L160 185 L135 180 L120 198 L100 185 L80 198 L65 180 L40 185 L35 160 L10 150 L20 125 L5 105 L25 90 L20 65 L45 60 L55 35 L80 45 Z"
                fill="url(#lionGold)"
                fillOpacity="0.85"
                stroke="#fef08a"
                strokeWidth="2"
              />

              {/* Mane Inner Volume */}
              <path
                d="M100 48 L130 75 L155 105 L145 140 L125 168 L100 175 L75 168 L55 140 L45 105 L70 75 Z"
                fill="#1e1b4b"
                stroke="url(#lionGold)"
                strokeWidth="3"
              />

              {/* Lion Face Mask */}
              <path
                d="M72 82 L100 70 L128 82 L138 118 L124 148 L100 160 L76 148 L62 118 Z"
                fill="url(#lionGold)"
              />

              {/* Eyes Glowing Cyan/Gold */}
              <polygon points="80,105 92,108 85,115" fill="#38bdf8" filter="url(#goldGlow)" />
              <polygon points="120,105 108,108 115,115" fill="#38bdf8" filter="url(#goldGlow)" />

              {/* Muzzle & Nose */}
              <polygon points="94,124 106,124 100,133" fill="#0f172a" />
              <path
                d="M100 133 V144 M100 144 C95 147 88 144 86 140 M100 144 C105 147 112 144 114 140"
                stroke="#0f172a"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Whiskers */}
              <line x1="72" y1="135" x2="52" y2="132" stroke="#fef08a" strokeWidth="1.5" />
              <line x1="72" y1="140" x2="50" y2="142" stroke="#fef08a" strokeWidth="1.5" />
              <line x1="128" y1="135" x2="148" y2="132" stroke="#fef08a" strokeWidth="1.5" />
              <line x1="128" y1="140" x2="150" y2="142" stroke="#fef08a" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating 3D Casino Element 1: Ace of Spades (Top Left) */}
      <div className="absolute -top-4 -left-3 sm:-top-6 sm:-left-6 p-2 rounded-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/30 backdrop-blur-md shadow-2xl animate-float-slow rotate-[-12deg] z-20">
        <div className="w-12 h-16 sm:w-14 sm:h-20 bg-slate-900 border border-amber-500/40 rounded-lg p-1.5 flex flex-col justify-between items-center text-amber-400">
          <span className="text-xs font-black self-start">A♠</span>
          <span className="text-lg">♠</span>
          <span className="text-xs font-black self-end">A♠</span>
        </div>
      </div>

      {/* Floating 3D Casino Element 2: Golden Chip (Bottom Right) */}
      <div className="absolute -bottom-4 -right-3 sm:-bottom-6 sm:-right-6 p-2 rounded-full bg-gradient-to-tr from-amber-600/40 to-yellow-400/20 border border-amber-400/50 backdrop-blur-md shadow-2xl animate-float-delayed rotate-[15deg] z-20">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-amber-700 border-2 border-white/60 p-1 flex items-center justify-center shadow-lg text-slate-950 font-black text-xs text-center">
          <div className="w-full h-full rounded-full border border-dashed border-slate-950/40 flex flex-col items-center justify-center">
            <span className="text-[10px] font-bold">100X</span>
            <span className="text-[8px] uppercase">BONUS</span>
          </div>
        </div>
      </div>

      {/* Floating Badge 3: King of Hearts (Top Right) */}
      <div className="absolute top-2 -right-4 sm:top-4 sm:-right-8 p-1.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md shadow-xl animate-float rotate-[18deg] z-10 hidden sm:block">
        <div className="w-11 h-14 bg-red-950/90 border border-red-500/40 rounded-lg p-1 flex flex-col justify-between items-center text-red-400">
          <span className="text-[10px] font-black self-start">K♥</span>
          <span className="text-sm">♥</span>
          <span className="text-[10px] font-black self-end">K♥</span>
        </div>
      </div>

      {/* Floating Badge 4: Sparkling Diamond (Bottom Left) */}
      <div className="absolute bottom-4 -left-6 p-2 rounded-2xl bg-purple-900/60 border border-purple-400/40 backdrop-blur-md shadow-xl animate-float-slow hidden sm:flex items-center gap-1.5 text-purple-200 text-xs font-bold z-20">
        <Gem className="w-4 h-4 text-cyan-300 animate-spin" style={{ animationDuration: '6s' }} />
        <span>VIP CLUB</span>
      </div>
    </div>
  );
};
