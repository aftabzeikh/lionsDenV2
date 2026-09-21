import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { Sparkles, Snowflake, Ghost, Utensils, ChevronDown, Check } from 'lucide-react';

const themeOptions = [
  {
    id: 'normal',
    name: 'Royal Gold',
    badge: 'Standard',
    icon: Sparkles,
    color: 'from-amber-400 to-yellow-600',
    dot: 'bg-amber-400',
  },
  {
    id: 'christmas',
    name: 'Christmas',
    badge: 'Festive',
    icon: Snowflake,
    color: 'from-red-500 to-emerald-600',
    dot: 'bg-red-500',
  },
  {
    id: 'halloween',
    name: 'Halloween',
    badge: 'Spooky',
    icon: Ghost,
    color: 'from-orange-500 to-purple-600',
    dot: 'bg-orange-500',
  },
  {
    id: 'thanksgiving',
    name: 'Thanksgiving',
    badge: 'Harvest',
    icon: Utensils,
    color: 'from-amber-600 to-amber-900',
    dot: 'bg-amber-600',
  },
];

export const ThemeSwitcher = ({ className = '', isCompact = false }) => {
  const { themeName, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentOption = themeOptions.find((t) => t.id === themeName) || themeOptions[0];
  const CurrentIcon = currentOption.icon;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/80 hover:bg-surface border border-border/80 hover:border-primary/50 text-text transition-all duration-200 backdrop-blur-md shadow-sm group focus:outline-none focus:ring-1 focus:ring-primary"
        aria-label="Select Season Theme"
        aria-expanded={isOpen}
      >
        <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-tr ${currentOption.color} text-white shadow-sm shadow-primary/20`}>
          <CurrentIcon className="w-3.5 h-3.5" />
        </div>
        
        {!isCompact && (
          <span className="text-xs font-semibold tracking-wide text-text/90 group-hover:text-text">
            {currentOption.name}
          </span>
        )}

        <ChevronDown className={`w-3.5 h-3.5 text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl bg-surface/95 border border-border/80 shadow-2xl backdrop-blur-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 border-b border-border/50 text-[10px] font-bold uppercase tracking-wider text-muted flex items-center justify-between">
            <span>Seasonal Themes</span>
            <span className="text-primary font-mono">LIVE</span>
          </div>

          <div className="p-1 space-y-1">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isActive = option.id === themeName;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setTheme(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-primary/15 text-primary border border-primary/30 font-semibold'
                      : 'text-text/80 hover:bg-card hover:text-text'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-tr ${option.color} text-white shadow-sm`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs">{option.name}</div>
                      <div className="text-[10px] text-muted">{option.badge}</div>
                    </div>
                  </div>

                  {isActive && <Check className="w-4 h-4 text-primary" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
