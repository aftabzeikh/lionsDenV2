import React, { useState } from 'react';
import logoSvg from '../../assets/images/logo.svg';

export const Logo = ({ className = '', height = 'h-10 sm:h-12' }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`flex items-center select-none cursor-pointer group ${className}`}>
      {!hasError ? (
        <img
          src={logoSvg}
          alt="LIONS DEN GAMES"
          className={`${height} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
          onError={() => setHasError(true)}
        />
      ) : (
        /* Dynamic SVG Fallback in case the user's custom file path is changing */
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-primary to-yellow-600 flex items-center justify-center p-1.5 shadow-md shadow-primary/20">
            <span className="text-xl">🦁</span>
          </div>
          <span className="text-xl font-black font-display uppercase tracking-wider text-primary">
            LIONS DEN GAMES
          </span>
        </div>
      )}
    </div>
  );
};
