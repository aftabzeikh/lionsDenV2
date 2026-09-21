import React, { useState } from 'react';
import { Sparkles, Flame, Dices, Crown, Trophy, Layers, Zap, Search, SlidersHorizontal } from 'lucide-react';

const categories = [
  { id: 'all', name: 'ALL GAMES', icon: Sparkles, count: '3,540' },
  { id: 'popular', name: 'POPULAR', icon: Flame, badge: 'HOT' },
  { id: 'slots', name: 'SLOTS', icon: Dices, count: '2,890' },
  { id: 'live', name: 'LIVE CASINO', icon: Crown, count: '140' },
  { id: 'jackpots', name: 'JACKPOTS', icon: Trophy, count: '$2.8M+' },
  { id: 'megaways', name: 'MEGAWAYS', icon: Layers },
  { id: 'instant', name: 'INSTANT WIN', icon: Zap },
];

export const CategoryNav = ({ onSelectCategory, activeCategory = 'all', className = '' }) => {
  const [selected, setSelected] = useState(activeCategory);

  const handleSelect = (id) => {
    setSelected(id);
    if (onSelectCategory) {
      onSelectCategory(id);
    }
  };

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ${className}`}>
      {/* Category Pills Scroller */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar pb-2 pt-1">
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selected === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelect(cat.id)}
                className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-display uppercase tracking-wider text-xs sm:text-sm font-black transition-all duration-200 shrink-0 select-none cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 via-primary to-amber-500 text-slate-950 shadow-lg shadow-primary/30 ring-1 ring-white/50 scale-[1.02]'
                    : 'bg-surface/80 hover:bg-card text-muted hover:text-text border border-border/80 hover:border-primary/40'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-slate-950 fill-slate-950' : 'text-primary'
                  }`}
                />
                <span>{cat.name}</span>
                {cat.count && !isActive && (
                  <span className="text-[10px] text-muted font-normal font-sans">
                    ({cat.count})
                  </span>
                )}
                {cat.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-red-600 text-white font-extrabold font-sans">
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Filter and Search Quick Buttons */}
        <div className="flex items-center gap-2 shrink-0 pl-2 border-l border-border/60">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface hover:bg-card border border-border text-xs font-bold text-text hover:border-primary/40 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
            <span className="hidden sm:inline">PROVIDERS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
