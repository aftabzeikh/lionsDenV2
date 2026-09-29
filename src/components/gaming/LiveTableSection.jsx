import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { selectLiveTableGames } from '../../redux/slices/gamesSlice';
import { GameCard } from './GameCard';
import tableIcon from "../../assets/images/table-icon.svg";


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
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-black flex items-center justify-center shadow-[0_0_18px_rgba(245,158,11,0.55)] transition-all duration-200 cursor-pointer opacity-90 group-hover/liveslider:opacity-100 hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
        </button>

        {/* Right Scroll Button */}
        <button
          type="button"
          onClick={handleScrollRight}
          aria-label="Scroll Right"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-black flex items-center justify-center shadow-[0_0_18px_rgba(245,158,11,0.55)] transition-all duration-200 cursor-pointer opacity-90 group-hover/liveslider:opacity-100 hover:scale-110"
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
              liveGames.map((game, index) => (
                <GameCard
                  key={`live-set-${setIndex}-${game.id || game._id || `live-${index}`}`}
                  game={game}
                  variant="stacked"
                  imageAspectRatio="aspect-square"
                  size="lg"
                  playButtonTheme="gold"
                  className="w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px] xl:w-[370px] !rounded-3xl border-neutral-800/90 hover:border-amber-400 shadow-xl hover:shadow-[0_14px_40px_rgba(245,158,11,0.25)] shrink-0"
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
