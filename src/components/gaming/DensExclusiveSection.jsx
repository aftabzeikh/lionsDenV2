import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Play } from 'lucide-react';
import { selectPopularGames } from '../../redux/slices/gamesSlice';
import exclusiveIcon from '../../assets/images/exclusive-icon.svg';

export const DensExclusiveSection = () => {
  const popularGamesFromRedux = useSelector(selectPopularGames);
  const gamesList = popularGamesFromRedux || [];

  // Active rotation index & animation states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-rotate games every 5 seconds
  useEffect(() => {
    if (isPaused || gamesList.length === 0) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % gamesList.length);
        setIsAnimating(false);
      }, 350);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, gamesList.length]);

  if (!gamesList || gamesList.length === 0) return null;

  // Featured game at current index
  const featuredGame = gamesList[currentIndex % gamesList.length];

  // 8 Grid games following the current index
  const gridGames = Array.from({ length: Math.min(8, gamesList.length - 1) }, (_, i) => {
    const targetIdx = (currentIndex + 1 + i) % gamesList.length;
    return {
      game: gamesList[targetIdx],
      index: targetIdx,
    };
  });

  const handleSelectGame = (targetIdx) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(targetIdx);
      setIsAnimating(false);
    }, 350);
  };

  return (
    <section
      className="relative w-full py-8 sm:py-12 bg-black select-none border-t border-neutral-900/80"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Green Badge + Den's Exclusive Title */}
        <div className="flex items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
          <img src={exclusiveIcon} alt="exclusive-icon" className="w-8 h-8" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black italic tracking-wide text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Den&apos;s Exclusive
          </h2>
        </div>

        {/* Layout Grid: 1 Big Featured Card (Left) + 2x4 Grid (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          
          {/* Left Column: Big Featured Game Card */}
          <div className="lg:col-span-4 xl:col-span-4 flex">
            <div
              className={`group relative w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800/90 shadow-lg transition-all duration-200 ease-out cursor-pointer flex flex-col justify-between ${
                isAnimating ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
              }`}
            >
              {/* Game Poster Image */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={featuredGame.image}
                  alt={featuredGame.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200 ease-out"
                />
                {/* Unified Dark Gradient & Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:bg-black/45 transition-all duration-200 ease-out pointer-events-none" />
              </div>

              {/* Centered Play Button on Hover */}
              <div className="relative z-10 flex-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out scale-90 group-hover:scale-100 pointer-events-none">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/40 border-[4px] border-white text-white flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white text-white ml-1" />
                </div>
              </div>

              {/* Bottom Info Bar */}
              <div className="relative z-10 w-full p-3.5 sm:p-4 bg-black border-t border-white/5 text-center">
                <h3 className="text-white font-black text-sm sm:text-base tracking-wider uppercase truncate leading-tight drop-shadow-sm">
                  {featuredGame.subName || featuredGame.name}
                </h3>
                <p className="text-primary font-bold text-xs sm:text-[13px] uppercase tracking-wider mt-1 drop-shadow-[0_0_8px_rgba(248,196,94,0.3)]">
                  {featuredGame.category || 'Live Table'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 8 Games Grid (2 Rows x 4 Columns) */}
          <div className="lg:col-span-8 xl:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
            {gridGames.map(({ game, index }) => {
              const displayName = game.subName || game.name || 'BLACK JACK';
              const displayCategory = game.category || 'Slots';

              return (
                <div
                  key={game.id || game._id || `pop-grid-${index}`}
                  onClick={() => handleSelectGame(index)}
                  className={`group relative rounded-2xl overflow-hidden bg-black border border-neutral-800/90 shadow-md transition-all duration-200 ease-out cursor-pointer flex flex-col justify-between ${
                    isAnimating ? 'opacity-60 scale-[0.98]' : 'opacity-100 scale-100'
                  }`}
                >
                  {/* Dedicated Image Container */}
                  <div className="relative w-full aspect-square overflow-hidden bg-black">
                    <img
                      src={game.image}
                      alt={game.name}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:bg-black/45 transition-all duration-200 ease-out pointer-events-none" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out z-10 scale-90 group-hover:scale-100 pointer-events-none">
                      <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 border-[3px] border-white text-white flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Info Bar */}
                  <div className="relative z-10 w-full p-2 sm:p-2.5 bg-black border-t border-white/5 text-center shrink-0">
                    <h4 className="text-white font-black text-xs sm:text-[13px] tracking-wide uppercase truncate leading-tight drop-shadow-sm">
                      {displayName}
                    </h4>
                    <p className="text-primary font-bold text-[10px] sm:text-[11px] uppercase tracking-wider mt-0.5 drop-shadow-[0_0_8px_rgba(248,196,94,0.3)]">
                      {displayCategory}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default DensExclusiveSection;
