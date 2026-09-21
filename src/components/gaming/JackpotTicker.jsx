import React, { useState, useEffect } from 'react';
import { Trophy, Sparkles, TrendingUp, Flame } from 'lucide-react';
import { useTheme } from '../../theme/ThemeProvider';

export const JackpotTicker = ({ className = '' }) => {
  const { themeName } = useTheme();
  // Live ticking jackpot amount starting from a realistic high value
  const [jackpot, setJackpot] = useState(2845920.45);
  const [lastWinner, setLastWinner] = useState({
    user: 'Alex_Vip',
    amount: '$45,820.00',
    game: 'Gates of Olympus',
  });

  useEffect(() => {
    // Increment jackpot organically every 1.5 seconds
    const interval = setInterval(() => {
      setJackpot((prev) => prev + (Math.random() * 2.8 + 0.5));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const formattedJackpot = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(jackpot);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-950/40 to-amber-500/15 border border-primary/40 backdrop-blur-xl p-4 sm:p-5 shadow-2xl shadow-primary/10 group ${className}`}
    >
      {/* Background Animated Glow */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-accent/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Jackpot Header & Value */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-primary to-yellow-600 flex items-center justify-center text-slate-950 shadow-lg shadow-primary/30 shrink-0 animate-bounce">
            <Trophy className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black tracking-widest text-primary uppercase flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-primary text-primary" />
                MEGA JACKPOT POOL
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
                LIVE
              </span>
            </div>
            {/* Pulsing Jackpot Number */}
            <div className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 drop-shadow-[0_2px_12px_rgba(234,179,8,0.5)]">
              {formattedJackpot}
            </div>
          </div>
        </div>

        {/* Live Recent Winner Capsule */}
        <div className="flex items-center gap-3 bg-surface/80 border border-border/80 rounded-xl px-3.5 py-2 text-xs backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <div>
            <div className="text-muted text-[10px] uppercase font-bold tracking-wider">
              Recent Big Win
            </div>
            <div className="font-semibold text-text">
              <span className="text-primary font-bold">{lastWinner.user}</span> won{' '}
              <span className="text-emerald-400 font-extrabold">{lastWinner.amount}</span> on{' '}
              <span className="text-text/80">{lastWinner.game}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
