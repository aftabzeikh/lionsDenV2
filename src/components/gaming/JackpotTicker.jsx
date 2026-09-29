import React from 'react';

// Jackpot & Coins Assets
import jackpotBg from '../../assets/images/jackpot/jackpot-bg.png';
import jackpotImg from '../../assets/images/jackpot/jackpot-img.svg';
import bronzeCoin from '../../assets/images/coins/bronze.svg';
import silverCoin from '../../assets/images/coins/silver.svg';
import goldCoin from '../../assets/images/coins/gold.svg';

export const JackpotTicker = ({
  bronzeAmount = 20,
  silverAmount = 500,
  goldAmount = 5000,
  className = '',
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-sm sm:rounded-md border-2 border-primary select-none group ${className}`}
    >
      {/* Edge-to-edge Background Image (Scaled slightly to trim PNG padding and fully cover 100%) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={jackpotBg}
          alt="Jackpot Background"
          className="w-full h-full object-cover object-center scale-[1.08] brightness-105"
        />
        {/* Subtle Ambient Depth Tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Subtle Golden Sheen Glow on hover */}
      <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

      {/* Main Banner Content Row - Always Single Row (flex-nowrap) */}
      <div className="relative z-10 px-3 sm:px-6 md:px-10 lg:px-12 py-2.5 sm:py-3.5 md:py-5 flex flex-nowrap items-center justify-between gap-2 sm:gap-6 overflow-hidden">
        
        {/* Left: JACKPOT Logo Artwork */}
        <div className="flex items-center shrink-0">
          <img
            src={jackpotImg}
            alt="JACKPOT"
            className="h-6 sm:h-9 md:h-12 lg:h-16 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] transform group-hover:scale-105 transition-transform duration-300 shrink-0"
          />
        </div>

        {/* Jackpot Coin Tiers Container (Single line) */}
        <div className="flex items-center justify-end sm:justify-around flex-1 gap-2.5 sm:gap-5 md:gap-8 lg:gap-14 max-w-3xl shrink-0">
          
          {/* Tier 1: Bronze Coin + 20 */}
          <div className="flex items-center gap-1 sm:gap-2.5 md:gap-3 group/tier shrink-0">
            <img
              src={bronzeCoin}
              alt="Bronze Tier Coin"
              className="w-5 h-5 sm:w-8 sm:h-8 md:w-11 md:h-11 lg:w-14 lg:h-14 object-contain shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] group-hover/tier:scale-110 transition-transform duration-200"
            />
            <span className="text-xs sm:text-xl md:text-2xl lg:text-4xl font-black italic tracking-tight sm:tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-sans">
              {bronzeAmount}
            </span>
          </div>

          {/* Tier 2: Silver Coin + 500 */}
          <div className="flex items-center gap-1 sm:gap-2.5 md:gap-3 group/tier shrink-0">
            <img
              src={silverCoin}
              alt="Silver Tier Coin"
              className="w-5 h-5 sm:w-8 sm:h-8 md:w-11 md:h-11 lg:w-14 lg:h-14 object-contain shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] group-hover/tier:scale-110 transition-transform duration-200"
            />
            <span className="text-xs sm:text-xl md:text-2xl lg:text-4xl font-black italic tracking-tight sm:tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-sans">
              {silverAmount}
            </span>
          </div>

          {/* Tier 3: Gold Coin + 5000 */}
          <div className="flex items-center gap-1 sm:gap-2.5 md:gap-3 group/tier shrink-0">
            <img
              src={goldCoin}
              alt="Gold Tier Coin"
              className="w-5 h-5 sm:w-8 sm:h-8 md:w-11 md:h-11 lg:w-14 lg:h-14 object-contain shrink-0 drop-shadow-[0_4px_12px_rgba(248,196,94,0.4)] group-hover/tier:scale-110 transition-transform duration-200"
            />
            <span className="text-xs sm:text-xl md:text-2xl lg:text-4xl font-black italic tracking-tight sm:tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-sans">
              {goldAmount}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export const JackpotBanner = JackpotTicker;
