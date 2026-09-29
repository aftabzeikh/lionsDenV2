import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { selectHotTodayGames } from '../../redux/slices/gamesSlice';
import { GameCard } from './GameCard';
import flameIcon from '../../assets/images/hot-icon.svg';

export const HotTodaySection = ({ games: propGames }) => {
  const reduxHotToday = useSelector(selectHotTodayGames);
  const hotGames = propGames && propGames.length > 0 ? propGames : reduxHotToday || [];

  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const isNormalizingRef = useRef(false);

  // Helper to get total width of one full set
  const getSingleSetWidth = useCallback(() => {
    if (!sliderRef.current) return 0;
    return sliderRef.current.scrollWidth / 3;
  }, []);

  // Initialize scroll position to the middle set (Set 2)
  useEffect(() => {
    if (!sliderRef.current || hotGames.length === 0) return;

    const initPosition = () => {
      const singleSetWidth = getSingleSetWidth();
      if (singleSetWidth > 0 && sliderRef.current) {
        sliderRef.current.scrollLeft = singleSetWidth;
      }
    };

    const timer = setTimeout(initPosition, 100);
    return () => clearTimeout(timer);
  }, [hotGames.length, getSingleSetWidth]);

  // Handle infinite scroll wrapping seamlessly
  const handleScroll = useCallback(() => {
    if (!sliderRef.current || isNormalizingRef.current || hotGames.length === 0) return;

    const el = sliderRef.current;
    const singleSetWidth = getSingleSetWidth();
    if (singleSetWidth <= 0) return;

    if (el.scrollLeft >= singleSetWidth * 2) {
      isNormalizingRef.current = true;
      el.scrollLeft -= singleSetWidth;
      requestAnimationFrame(() => {
        isNormalizingRef.current = false;
      });
    } else if (el.scrollLeft <= 5) {
      isNormalizingRef.current = true;
      el.scrollLeft += singleSetWidth;
      requestAnimationFrame(() => {
        isNormalizingRef.current = false;
      });
    }
  }, [getSingleSetWidth, hotGames.length]);

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
    if (isPaused || hotGames.length === 0) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({ left: 240, behavior: 'smooth' });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, hotGames.length]);

  if (!hotGames || hotGames.length === 0) return null;

  // 3 duplicate sets to enable seamless infinite wrapping
  const repeatedSets = [0, 1, 2];

  return (
    <div className="w-full mt-14 sm:mt-18 select-none relative">
      {/* Section Header: Flame Icon + Hot Today */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-3">
          {/* Flame Icon with Gradient Glow */}
          <img src={flameIcon} alt="hot-game-icon" className='w-8 h-8' />


          {/* Heading */}
          <h3 className="text-2xl sm:text-3xl font-black italic tracking-wide text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Hot Today
          </h3>
        </div>
      </div>

      {/* Slider Carousel Container */}
      <div
        className="relative w-full group/hotslider"
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
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-400 hover:bg-amber-300 active:scale-95 text-black flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all duration-200 cursor-pointer opacity-90 group-hover/hotslider:opacity-100 hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Right Scroll Button */}
        <button
          type="button"
          onClick={handleScrollRight}
          aria-label="Scroll Right"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-400 hover:bg-amber-300 active:scale-95 text-black flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all duration-200 cursor-pointer opacity-90 group-hover/hotslider:opacity-100 hover:scale-110"
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
              hotGames.map((game, index) => (
                <GameCard
                  key={`hot-set-${setIndex}-${game.id || game._id || `hot-${index}`}`}
                  game={game}
                  className="w-[150px] sm:w-[175px] md:w-[195px] shrink-0"
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
