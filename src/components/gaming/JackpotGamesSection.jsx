import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { selectJackpotGames } from '../../redux/slices/gamesSlice';
import jackpotIcon from '../../assets/images/table-icon.svg';



export const JackpotGamesSection = ({ games: propGames }) => {
  const reduxJackpots = useSelector(selectJackpotGames);
  const jackpotGames = propGames && propGames.length > 0 ? propGames : reduxJackpots || [];

  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isNormalizingRef = useRef(false);

  // Helper to get total width of one full set of items
  const getSingleSetWidth = useCallback(() => {
    if (!sliderRef.current) return 0;
    return sliderRef.current.scrollWidth / 3;
  }, []);

  // Initialize scroll position to the middle set (Set 2)
  useEffect(() => {
    if (!sliderRef.current || jackpotGames.length === 0 || isExpanded) return;

    const initPosition = () => {
      const singleSetWidth = getSingleSetWidth();
      if (singleSetWidth > 0 && sliderRef.current) {
        sliderRef.current.scrollLeft = singleSetWidth;
      }
    };

    const timer = setTimeout(initPosition, 100);
    return () => clearTimeout(timer);
  }, [jackpotGames.length, isExpanded, getSingleSetWidth]);

  // Handle infinite scroll wrapping seamlessly
  const handleScroll = useCallback(() => {
    if (!sliderRef.current || isNormalizingRef.current || jackpotGames.length === 0 || isExpanded) return;

    const el = sliderRef.current;
    const singleSetWidth = getSingleSetWidth();
    if (singleSetWidth <= 0) return;

    // Scrolled into third set -> jump back to middle set
    if (el.scrollLeft >= singleSetWidth * 2) {
      isNormalizingRef.current = true;
      el.scrollLeft -= singleSetWidth;
      requestAnimationFrame(() => {
        isNormalizingRef.current = false;
      });
    } else if (el.scrollLeft <= singleSetWidth * 0.1) {
      isNormalizingRef.current = true;
      el.scrollLeft += singleSetWidth;
      requestAnimationFrame(() => {
        isNormalizingRef.current = false;
      });
    }
  }, [getSingleSetWidth, jackpotGames.length, isExpanded]);

  // Scroll handlers for Left and Right buttons
  const handleScrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  // Continuous auto-slide interval (pauses on hover)
  useEffect(() => {
    if (isPaused || jackpotGames.length === 0 || isExpanded) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({ left: 240, behavior: 'smooth' });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, jackpotGames.length, isExpanded]);

  if (!jackpotGames || jackpotGames.length === 0) return null;

  // 3 duplicate sets to enable seamless infinite wrapping
  const repeatedSets = [0, 1, 2];

  return (
    <div className="w-full mt-14 sm:mt-18 select-none relative">
      {/* Section Header: Circular Icon + Den's Classic + Show All */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-between">
          {/* Left Title & Icon */}
          <div className="flex items-center gap-3">
            {/* Circular Dealer/Casino Icon Badge */}
            <img src={jackpotIcon} alt="jackpot-icon" className="w-8 h-8" />

            {/* Heading */}
            <h3 className="text-2xl sm:text-3xl font-black italic tracking-wide text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Den's Classic
            </h3>
          </div>

          {/* Right Action: Show All > */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-amber-400 hover:text-amber-300 font-black italic uppercase text-xs sm:text-sm tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{isExpanded ? 'Show Less' : 'Show All'}</span>
            <span className="text-xs">{isExpanded ? '▲' : '▶'}</span>
          </button>
        </div>
      </div>

      {/* View Mode: Expanded Grid or Continuous Infinite Slider */}
      {isExpanded ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4.5">
            {jackpotGames.map((game, idx) => {
              const categoryName =
                game.category ||
                (game.fishing ? 'Fishing' : game.table ? 'Table' : game.liveTable ? 'Live Table' : 'Slots');

              return (
                <div
                  key={`jackpot-grid-${game.id || game._id || idx}`}
                  className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-black border border-neutral-800/90 hover:border-amber-400 shadow-md hover:shadow-[0_8px_25px_rgba(245,158,11,0.2)] transition-all duration-300 cursor-pointer flex flex-col justify-end"
                >
                  <img
                    src={game.image}
                    alt={game.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80';
                    }}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300" />
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 scale-90 group-hover:scale-100 pointer-events-none">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.7)] font-black">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-black ml-0.5" />
                    </div>
                  </div>

                  <div className="relative z-20 w-full p-2.5 sm:p-3 bg-black/90 backdrop-blur-md border-t border-white/5 text-center">
                    <h4 className="text-white font-black text-xs sm:text-[13px] tracking-wide uppercase truncate leading-tight drop-shadow-sm">
                      {game.name}
                    </h4>
                    <p className="text-amber-400 font-bold text-[10px] sm:text-[11px] uppercase tracking-wider mt-0.5 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
                      {categoryName}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Slider Carousel Container */
        <div
          className="relative w-full group/jackpotslider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Left Scroll Button */}
          {/* <button
            type="button"
            onClick={handleScrollLeft}
            aria-label="Scroll Left"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-400 hover:bg-amber-300 active:scale-95 text-black flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all duration-200 cursor-pointer opacity-90 group-hover/jackpotslider:opacity-100 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 stroke-[3]" />
          </button> */}

          {/* Right Scroll Button */}
          {/* <button
            type="button"
            onClick={handleScrollRight}
            aria-label="Scroll Right"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-400 hover:bg-amber-300 active:scale-95 text-black flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all duration-200 cursor-pointer opacity-90 group-hover/jackpotslider:opacity-100 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 stroke-[3]" />
          </button> */}

          {/* Horizontal Scrollable Slider Track */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="w-full overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-8 lg:px-12 py-3"
          >
            <div className="flex items-center gap-4 sm:gap-5 md:gap-6 w-max pl-2 pr-12">
              {repeatedSets.flatMap((setIndex) =>
                jackpotGames.map((game, index) => {
                  const categoryName =
                    game.category ||
                    (game.fishing ? 'Fishing' : game.table ? 'Table' : game.liveTable ? 'Live Table' : 'Slots');

                  return (
                    <div
                      key={`jackpot-set-${setIndex}-${game.id || game._id || `jackpot-${index}`}`}
                      className="relative flex items-center group cursor-pointer shrink-0"
                    >
                      {/* Game Card Container */}
                      <div className="relative z-10 w-[150px] sm:w-[175px] md:w-[195px] aspect-[4/5] rounded-2xl overflow-hidden bg-black border border-neutral-800/90 group-hover:border-amber-400 shadow-lg group-hover:shadow-[0_8px_30px_rgba(245,158,11,0.25)] transition-all duration-300 flex flex-col justify-end">
                        {/* Game Thumbnail Image */}
                        <img
                          src={game.image}
                          alt={game.name}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src =
                              'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80';
                          }}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Subtle Top-to-Bottom Shading */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300" />

                        {/* Glowing Play Hover Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 scale-90 group-hover:scale-100 pointer-events-none">
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.7)] font-black">
                            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-black ml-0.5" />
                          </div>
                        </div>

                        {/* Bottom Info Bar: Game Title + Yellow Category */}
                        <div className="relative z-20 w-full p-2.5 sm:p-3 bg-black/90 backdrop-blur-md border-t border-white/5 text-center">
                          <h4 className="text-white font-black text-xs sm:text-[13px] tracking-wide uppercase truncate leading-tight drop-shadow-sm">
                            {game.name}
                          </h4>
                          <p className="text-amber-400 font-bold text-[10px] sm:text-[11px] uppercase tracking-wider mt-0.5 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
                            {categoryName}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
