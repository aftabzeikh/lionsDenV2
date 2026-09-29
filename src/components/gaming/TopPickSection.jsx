import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { selectTopPicks } from '../../redux/slices/gamesSlice';
import { GameCard } from './GameCard';
import flameIcon from '../../assets/images/top-pick-icon.svg';

export const TopPickSection = ({ games: propGames }) => {
  const reduxTopPicks = useSelector(selectTopPicks);
  const topPicks = (propGames && propGames.length > 0 ? propGames : reduxTopPicks).slice(0, 10);

  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const isNormalizingRef = useRef(false);

  // Helper to get total width of one full set of 10 items
  const getSingleSetWidth = useCallback(() => {
    if (!sliderRef.current) return 0;
    return sliderRef.current.scrollWidth / 3;
  }, []);

  // Initialize scroll position to the middle set (Set 2)
  useEffect(() => {
    if (!sliderRef.current || topPicks.length === 0) return;

    const initPosition = () => {
      const singleSetWidth = getSingleSetWidth();
      if (singleSetWidth > 0 && sliderRef.current) {
        sliderRef.current.scrollLeft = singleSetWidth;
      }
    };

    // Small delay to ensure layout measurements are rendered
    const timer = setTimeout(initPosition, 100);
    return () => clearTimeout(timer);
  }, [topPicks.length, getSingleSetWidth]);

  // Handle infinite scroll wrapping seamlessly
  const handleScroll = useCallback(() => {
    if (!sliderRef.current || isNormalizingRef.current || topPicks.length === 0) return;

    const el = sliderRef.current;
    const singleSetWidth = getSingleSetWidth();
    if (singleSetWidth <= 0) return;

    // If scrolled past the second set into third set, jump back to middle set
    if (el.scrollLeft >= singleSetWidth * 2) {
      isNormalizingRef.current = true;
      el.scrollLeft -= singleSetWidth;
      requestAnimationFrame(() => {
        isNormalizingRef.current = false;
      });
    }
    // If scrolled before the second set into first set, jump forward to middle set
    else if (el.scrollLeft <= singleSetWidth * 0.1) {
      isNormalizingRef.current = true;
      el.scrollLeft += singleSetWidth;
      requestAnimationFrame(() => {
        isNormalizingRef.current = false;
      });
    }
  }, [getSingleSetWidth, topPicks.length]);

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

  // Continuous / auto-slide interval (pauses on hover)
  useEffect(() => {
    if (isPaused || topPicks.length === 0) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({ left: 260, behavior: 'smooth' });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, topPicks.length]);

  if (!topPicks || topPicks.length === 0) return null;

  // 3 copies of the 10 games to enable seamless infinite wrapping
  const repeatedSets = [0, 1, 2];

  return (
    <div className="w-full mt-12 sm:mt-16 select-none relative">
      {/* Section Header: Flame Icon + Top Pick */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-3">
          {/* Flame Icon with Gradient Glow */}
          <img src={flameIcon} alt="hot-game-icon" className='w-8 h-8' />
          

          {/* Heading */}
          <h3 className="text-2xl sm:text-3xl font-black italic tracking-wide text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Top Pick
          </h3>
        </div>
      </div>

      {/* Slider Carousel Container */}
      <div
        className="relative w-full group/topslider"
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
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-400 hover:bg-amber-300 active:scale-95 text-black flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all duration-200 cursor-pointer opacity-90 group-hover/topslider:opacity-100 hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Right Scroll Button */}
        <button
          type="button"
          onClick={handleScrollRight}
          aria-label="Scroll Right"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-400 hover:bg-amber-300 active:scale-95 text-black flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all duration-200 cursor-pointer opacity-90 group-hover/topslider:opacity-100 hover:scale-110"
        >
          <ChevronRight className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Horizontal Scrollable Slider Track */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="w-full overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-8 lg:px-12 py-3"
        >
          <div className="flex items-center gap-4 sm:gap-5 md:gap-6 w-max pl-2 pr-12">
            {repeatedSets.flatMap((setIndex) =>
              topPicks.map((game, index) => {
                const rank = index + 1;

                return (
                  <div
                    key={`set-${setIndex}-${game.id || game._id || `top-${rank}`}`}
                    className="relative flex items-center group cursor-pointer shrink-0"
                  >
                    {/* Giant Outlined Rank Number positioned with slight left offset to expose more of the number */}
                    <div className="relative z-0 select-none pointer-events-none -mr-2.5 sm:-mr-3.5 md:-mr-4.5 flex items-center justify-center">
                      <span
                        className={`font-black italic leading-none tracking-tighter drop-shadow-[0_0_12px_rgba(255,255,255,0.08)] select-none ${
                          rank === 10
                            ? 'text-[105px] sm:text-[130px] md:text-[150px]'
                            : 'text-[125px] sm:text-[155px] md:text-[175px]'
                        }`}
                        style={{
                          WebkitTextStroke: '2.5px rgba(255, 255, 255, 0.85)',
                          color: 'transparent',
                          fontFamily: '"Aneba Neue", Impact, sans-serif',
                        }}
                      >
                        {rank}
                      </span>
                    </div>

                    {/* Game Card Container */}
                    <GameCard
                      game={game}
                      className="w-[165px] sm:w-[195px] md:w-[220px]"
                    />
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
