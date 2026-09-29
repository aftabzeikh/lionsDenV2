import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectJackpotGames } from '../../redux/slices/gamesSlice';
import { GameCard } from './GameCard';
import jackpotIcon from '../../assets/images/classic-icon.svg';

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
            {jackpotGames.map((game, idx) => (
              <GameCard
                key={`jackpot-grid-${game.id || game._id || idx}`}
                game={game}
                variant="overlay"
                playButtonTheme="gold"
                className="aspect-[4/5] hover:border-amber-400 hover:shadow-[0_8px_25px_rgba(245,158,11,0.2)]"
              />
            ))}
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
          {/* Horizontal Scrollable Slider Track */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="w-full overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-8 lg:px-12 py-3"
          >
            <div className="flex items-center gap-4 sm:gap-5 md:gap-6 w-max pl-2 pr-12">
              {repeatedSets.flatMap((setIndex) =>
                jackpotGames.map((game, index) => (
                  <GameCard
                    key={`jackpot-set-${setIndex}-${game.id || game._id || `jackpot-${index}`}`}
                    game={game}
                    className="w-[150px] sm:w-[175px] md:w-[195px] shrink-0"
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

