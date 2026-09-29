import React from 'react';
import { Play } from 'lucide-react';

const DEFAULT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80';

/**
 * Helper to determine category label for a game
 */
export const getGameCategory = (game) => {
  if (!game) return 'Slots';
  if (game.category) return game.category;
  if (game.provider === 'luckystreak' || game.liveTable) return 'Live Table';
  if (game.fishing) return 'Fishing';
  if (game.table) return 'Craps';
  if (game.slots) return 'Slots';
  if (game.crash) return 'Crash';
  if (game.jackpots) return 'Jackpots';
  if (game.popular) return 'Popular';
  return 'Slots';
};

/**
 * Reusable Game Card Component for LionsDen Gaming
 *
 * @param {Object} game - Game data object
 * @param {string} [variant='stacked'] - 'stacked' (image + bottom info bar) or 'overlay' (full height cover image with overlay bottom bar)
 * @param {string} [size='md'] - 'sm' | 'md' | 'lg'
 * @param {string} [playButtonTheme='white'] - 'white' | 'gold'
 * @param {string} [playButtonSize] - 'sm' | 'md' | 'lg' (defaults to size)
 * @param {string} [imageAspectRatio='aspect-square'] - Aspect ratio for stacked image container (e.g., 'aspect-square', 'aspect-[16/10]', 'aspect-[16/9]')
 * @param {string} [imageFit='cover'] - 'cover' | 'contain'
 */
export const GameCard = ({
  game,
  title,
  category,
  onClick,
  variant = 'stacked', // 'stacked' | 'overlay'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  imageAspectRatio = 'aspect-square',
  imageFit = 'cover', // 'cover' | 'contain'
  playButtonTheme = 'white', // 'white' | 'gold'
  playButtonSize,
  fallbackImage = DEFAULT_FALLBACK_IMAGE,
  showCategory = true,
  children,
}) => {
  if (!game) return null;

  const gameTitle = title || game.subName || game.name || 'Game';
  const categoryLabel = category || getGameCategory(game);
  const imageUrl = game.image || fallbackImage;

  const effectivePlaySize = playButtonSize || size;

  // Sizing definitions
  const sizingMap = {
    sm: {
      playButton: 'w-9 h-9 sm:w-10 sm:h-10',
      playIcon: 'w-4 h-4 sm:w-4.5 sm:h-4.5',
      title: 'text-[11px] sm:text-xs',
      category: 'text-[9px] sm:text-[10px] mt-0.5',
      padding: 'p-1.5 sm:p-2',
    },
    md: {
      playButton: 'w-11 h-11 sm:w-13 sm:h-13',
      playIcon: 'w-5 h-5 sm:w-6 sm:h-6',
      title: 'text-xs sm:text-[13px]',
      category: 'text-[10px] sm:text-[11px] mt-0.5',
      padding: 'p-2 sm:p-2.5',
    },
    lg: {
      playButton: 'w-14 h-14 sm:w-16 sm:h-16',
      playIcon: 'w-6 h-6 sm:w-7 sm:h-7',
      title: 'text-sm sm:text-base md:text-lg',
      category: 'text-xs sm:text-[13px] mt-1',
      padding: 'p-2.5 sm:p-3.5',
    },
  };

  const currentSizing = sizingMap[size] || sizingMap.md;
  const playBtnStyle = sizingMap[effectivePlaySize]?.playButton || currentSizing.playButton;
  const playIconStyle = sizingMap[effectivePlaySize]?.playIcon || currentSizing.playIcon;

  // Render Play Button
  const renderPlayButton = () => {
    if (playButtonTheme === 'gold') {
      return (
        <div
          className={`${playBtnStyle} rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.75)] font-black`}
        >
          <Play className={`${playIconStyle} fill-black ml-0.5`} />
        </div>
      );
    }
    return (
      <div
        className={`${playBtnStyle} rounded-full bg-black/40 border-[3px] border-white text-white flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
      >
        <Play className={`${playIconStyle} fill-white text-white ml-0.5`} />
      </div>
    );
  };

  // OVERLAY VARIANT (Full Height Image with bottom translucent overlay bar)
  if (variant === 'overlay') {
    return (
      <div
        onClick={onClick}
        className={`group relative rounded-2xl overflow-hidden bg-black border border-neutral-800/90 shadow-md transition-all duration-300 ease-out cursor-pointer flex flex-col justify-end ${className}`}
      >
        {/* Full-bleed cover image */}
        <img
          src={imageUrl}
          alt={gameTitle}
          loading="lazy"
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
          className={`absolute inset-0 w-full h-full ${
            imageFit === 'contain' ? 'object-contain' : 'object-cover'
          } group-hover:scale-105 transition-transform duration-500 ease-out`}
        />

        {/* Shading overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" />

        {/* Centered Play Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20 scale-90 group-hover:scale-100 pointer-events-none">
          {renderPlayButton()}
        </div>

        {/* Bottom Info Bar */}
        <div
          className={`relative z-20 w-full ${currentSizing.padding} bg-black/90 backdrop-blur-md border-t border-white/5 text-center shrink-0`}
        >
          <h4
            className={`text-white font-black ${currentSizing.title} tracking-wide uppercase truncate leading-tight drop-shadow-sm`}
          >
            {gameTitle}
          </h4>
          {showCategory && (
            <p
              className={`text-primary font-bold ${currentSizing.category} uppercase tracking-wider drop-shadow-[0_0_8px_rgba(248,196,94,0.3)]`}
            >
              {categoryLabel}
            </p>
          )}
        </div>

        {children}
      </div>
    );
  }

  // STACKED VARIANT (Dedicated aspect-ratio image container + distinct bottom info bar)
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden bg-black border border-neutral-800/90 shadow-md transition-all duration-200 ease-out cursor-pointer flex flex-col justify-between ${className}`}
    >
      {/* Dedicated Image Container */}
      <div className={`relative w-full ${imageAspectRatio} overflow-hidden bg-black flex items-center justify-center`}>
        <img
          src={imageUrl}
          alt={gameTitle}
          loading="lazy"
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
          className={`w-full h-full ${
            imageFit === 'contain' ? 'object-contain' : 'object-cover'
          } group-hover:scale-105 transition-all duration-200 ease-out`}
        />
        {/* Unified Dark Gradient & Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:bg-black/45 transition-all duration-200 ease-out pointer-events-none" />

        {/* Centered Play Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out z-10 scale-90 group-hover:scale-100 pointer-events-none">
          {renderPlayButton()}
        </div>
      </div>

      {/* Bottom Info Bar: Game Title + Primary Amber Category */}
      <div
        className={`relative z-10 w-full ${currentSizing.padding} bg-black border-t border-white/5 text-center shrink-0`}
      >
        <h4
          className={`text-white font-black ${currentSizing.title} tracking-wide uppercase truncate leading-tight drop-shadow-sm`}
        >
          {gameTitle}
        </h4>
        {showCategory && (
          <p
            className={`text-primary font-bold ${currentSizing.category} uppercase tracking-wider drop-shadow-[0_0_8px_rgba(248,196,94,0.3)]`}
          >
            {categoryLabel}
          </p>
        )}
      </div>

      {children}
    </div>
  );
};

export default GameCard;
