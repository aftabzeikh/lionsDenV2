import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { selectLiveTableGames } from '../../redux/slices/gamesSlice';
import tableIcon from "../../assets/images/table-icon.svg"


export const LiveTableSection = ({ games: propGames }) => {
  const reduxLiveTable = useSelector(selectLiveTableGames);
  const liveGames = propGames && propGames.length > 0 ? propGames : reduxLiveTable || [];

  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const isNormalizingRef = useRef(false);

  // Helper to get total width of one full set of items
  const getSingleSetWidth = useCallback(() => {
    if (!sliderRef.current) return 0;
    return sliderRef.current.scrollWidth / 3;
  }, []);

  // Initialize scroll position to the middle set (Set 2)
  useEffect(() => {
    if (!sliderRef.current || liveGames.length === 0) return;

    const initPosition = () => {
      const singleSetWidth = getSingleSetWidth();
      if (singleSetWidth > 0 && sliderRef.current) {
        sliderRef.current.scrollLeft = singleSetWidth;
      }
    };

    const timer = setTimeout(initPosition, 100);
    return () => clearTimeout(timer);
  }, [liveGames.length, getSingleSetWidth]);

  // Handle infinite scroll wrapping seamlessly
  const handleScroll = useCallback(() => {
    if (!sliderRef.current || isNormalizingRef.current || liveGames.length === 0) return;

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
    }
    // Scrolled before second set -> jump forward to middle set
    else if (el.scrollLeft <= singleSetWidth * 0.1) {
      isNormalizingRef.current = true;
      el.scrollLeft += singleSetWidth;
      requestAnimationFrame(() => {
        isNormalizingRef.current = false;
      });
    }
  }, [getSingleSetWidth, liveGames.length]);

  // Scroll handlers for Left and Right buttons
  const handleScrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -440, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 440, behavior: 'smooth' });
    }
  };

  // Continuous auto-slide interval (pauses on hover)
  useEffect(() => {
    if (isPaused || liveGames.length === 0) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({ left: 440, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, liveGames.length]);

  if (!liveGames || liveGames.length === 0) return null;

  // 3 duplicate sets to enable seamless infinite wrapping
  const repeatedSets = [0, 1, 2];

  return (
    <div className="w-full mt-14 sm:mt-20 select-none relative">
      {/* Section Header: Live Casino Dealer Icon + Live Table Games */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-3">
          {/* Live Casino Dealer Circular Icon Badge */}
          <img src={tableIcon} alt="table-icon" className="w-8 h-8" />

          {/* Heading */}
          <h3 className="text-2xl sm:text-3xl font-black italic tracking-wide text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Live Table Games
          </h3>
        </div>
      </div>

      {/* Slider Carousel Container */}
      <div
        className="relative w-full group/liveslider"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left Scroll Button */}
        <button
          type="button"
          onClick={handleScrollLeft}
          aria-label="Scroll Left"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-black flex items-center justify-center shadow-[0_0_18px_rgba(245,158,11,0.55)] transition-all duration-200 cursor-pointer opacity-90 group-hover/liveslider:opacity-100 hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
        </button>

        {/* Right Scroll Button */}
        <button
          type="button"
          onClick={handleScrollRight}
          aria-label="Scroll Right"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-black flex items-center justify-center shadow-[0_0_18px_rgba(245,158,11,0.55)] transition-all duration-200 cursor-pointer opacity-90 group-hover/liveslider:opacity-100 hover:scale-110"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
        </button>

        {/* Horizontal Scrollable Slider Track */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="w-full overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-8 lg:px-12 py-3"
        >
          {/* Big slide size: exactly 3.5 cards visible on screen */}
          <div className="flex items-center gap-5 sm:gap-6 md:gap-7 w-max pl-2 pr-12">
            {repeatedSets.flatMap((setIndex) =>
              liveGames.map((game, index) => {
                const categoryName = game.category || 'Live Table';

                return (
                  <div
                    key={`live-set-${setIndex}-${game.id || game._id || `live-${index}`}`}
                    className="relative flex items-center group cursor-pointer shrink-0"
                  >
                    {/* Big Game Card Container (3.5 slides on screen) */}
                    <div className="relative z-10 w-[290px] sm:w-[350px] md:w-[390px] lg:w-[430px] xl:w-[460px] aspect-[4/4] sm:aspect-[4/4.1] rounded-3xl overflow-hidden bg-black border border-neutral-800/90 group-hover:border-amber-400 shadow-xl group-hover:shadow-[0_14px_40px_rgba(245,158,11,0.25)] transition-all duration-300 flex flex-col justify-end">
                      {/* Game Thumbnail Image */}
                      <img
                        src={game.image}
                        alt={game.name}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80';
                        }}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Subtle Top-to-Bottom Shading */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-300" />

                      {/* Glowing Play Hover Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 scale-90 group-hover:scale-100 pointer-events-none">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.75)] font-black">
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-black ml-0.5" />
                        </div>
                      </div>

                      {/* Bottom Info Bar: Game Title + Yellow Category */}
                      <div className="relative z-20 w-full p-3 sm:p-4 bg-black/90 backdrop-blur-md border-t border-white/5 text-center">
                        <h4 className="text-white font-black text-sm sm:text-base md:text-lg tracking-wide uppercase truncate leading-tight drop-shadow-sm">
                          {game.name}
                        </h4>
                        <p className="text-amber-400 font-bold text-xs sm:text-[13px] uppercase tracking-wider mt-1 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
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
    </div>
  );
};
