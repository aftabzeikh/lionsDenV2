import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, ChevronDown, Check, Sparkles, RefreshCw, X, Play } from 'lucide-react';
import {
  fetchGamesData,
  selectAllGames,
  selectProviders,
  selectGamesLoading,
  selectGamesError,
} from '../../redux/slices/gamesSlice';
import { TopPickSection } from './TopPickSection';
import { BestSlotsSection } from './BestSlotsSection';
import { HotTodaySection } from './HotTodaySection';
import { LiveTableSection } from './LiveTableSection';
import { GameProvidersSection } from './GameProvidersSection';
import { JackpotGamesSection } from './JackpotGamesSection';
import { UnleashExperienceSection } from './UnleashExperienceSection';
import { DensExclusiveSection } from './DensExclusiveSection';
import { NewGamesSection } from './NewGamesSection';

import newGameIcon from "../../assets/images/new-game-icon.svg"






// Category Definitions matching the design
const CATEGORIES = [
  { id: 'popular', name: 'Popular', filterKey: 'popular' },
  { id: 'fishing', name: 'Fishing', filterKey: 'fishing' },
  { id: 'live_table', name: 'Live Table', filterKey: 'live_table' },
  { id: 'slots', name: 'Slots', filterKey: 'slots' },
  { id: 'table', name: 'Table', filterKey: 'table' },
];

export const GamesSection = () => {
  const dispatch = useDispatch();
  const games = useSelector(selectAllGames);
  const providers = useSelector(selectProviders);
  const isLoading = useSelector(selectGamesLoading);
  const error = useSelector(selectGamesError);

  // Filter states
  // selectedProviders: array of provider 'filter' strings (e.g. ['arrowedge', 'betsoft', ...])
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [isAllProvidersSelected, setIsAllProvidersSelected] = useState(true);
  
  // Category state (only one can be active at a time)
  const [selectedCategory, setSelectedCategory] = useState(null); // null means all or specific active tab
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Providers row visibility state (toggled when top Providers tab is clicked)
  const [isProvidersRowVisible, setIsProvidersRowVisible] = useState(false);

  // View mode: false = 2-row horizontal slider, true = full grid without slider
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);

  // Slider scroll handlers
  const handleScrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.clientWidth * 0.75, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.clientWidth * 0.75, behavior: 'smooth' });
    }
  };

  // Fetch providers and games on mount into global Redux store
  useEffect(() => {
    dispatch(fetchGamesData());
  }, [dispatch]);

  // Sync selected providers when providers are loaded
  useEffect(() => {
    if (providers.length > 0 && selectedProviders.length === 0) {
      const allFilters = providers.map((p) => p.filter);
      setSelectedProviders(allFilters);
      setIsAllProvidersSelected(true);
    }
  }, [providers, selectedProviders.length]);

  // Provider selection handler
  const handleToggleAllProviders = () => {
    const allFilters = providers.map((p) => p.filter);
    setSelectedProviders(allFilters);
    setIsAllProvidersSelected(true);
  };


  const handleToggleProvider = (filterKey) => {
    const allFilters = providers.map((p) => p.filter);

    // If currently "All" is active and user clicks a specific provider, select only that provider
    if (isAllProvidersSelected) {
      setSelectedProviders([filterKey]);
      setIsAllProvidersSelected(false);
      return;
    }

    // Otherwise toggle the clicked provider
    let updated;
    if (selectedProviders.includes(filterKey)) {
      updated = selectedProviders.filter((k) => k !== filterKey);
    } else {
      updated = [...selectedProviders, filterKey];
    }

    // If no provider selected, fallback to All
    if (updated.length === 0) {
      setSelectedProviders(allFilters);
      setIsAllProvidersSelected(true);
      return;
    }

    // If all individual providers are now selected, mark "All" as active
    if (updated.length === allFilters.length && allFilters.every((f) => updated.includes(f))) {
      setSelectedProviders(allFilters);
      setIsAllProvidersSelected(true);
    } else {
      setSelectedProviders(updated);
      setIsAllProvidersSelected(false);
    }
  };

  // Category selection handler (Single select)
  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      // Toggle off to show all categories if clicked again
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  // Filtered games logic
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      // 1. Provider Filter
      const gameProvider = game.provider?.toLowerCase();
      const matchesProvider =
        isAllProvidersSelected ||
        selectedProviders.some((p) => p.toLowerCase() === gameProvider);

      if (!matchesProvider) return false;

      // 2. Category Filter
      if (selectedCategory) {
        if (selectedCategory === 'popular' && !game.popular) return false;
        if (selectedCategory === 'fishing' && !game.fishing) return false;
        if (selectedCategory === 'slots' && !game.slots) return false;
        if (selectedCategory === 'table' && !game.table) return false;
        if (selectedCategory === 'live_table') {
          const isLive =
            game.provider === 'luckystreak' ||
            game.liveTable ||
            (game.table && game.provider === 'luckystreak');
          if (!isLive) return false;
        }
      }

      // 3. Search Filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = game.name?.toLowerCase().includes(query);
        if (!matchesName) return false;
      }

      return true;
    });
  }, [games, selectedProviders, isAllProvidersSelected, selectedCategory, searchQuery]);

  // Auto slide every 5 seconds when in slider mode
  useEffect(() => {
    if (isExpanded || isPaused || filteredGames.length === 0 || isLoading) {
      return;
    }

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          sliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isExpanded, isPaused, filteredGames.length, isLoading]);

  // Helper to determine display category label for a game card
  const getGameCategoryLabel = (game) => {
    if (game.provider === 'luckystreak' || game.liveTable) return 'Live Table';
    if (game.fishing) return 'Fishing';
    if (game.table) return 'Table';
    if (game.slots) return 'Slots';
    if (game.crash) return 'Crash';
    if (game.jackpots) return 'Jackpots';
    if (game.popular) return 'Popular';
    return 'Slots';
  };

  // Label for the Providers button
  const providerButtonText = useMemo(() => {
    if (isAllProvidersSelected || selectedProviders.length === providers.length) {
      return 'Providers';
    }
    if (selectedProviders.length === 1) {
      const match = providers.find((p) => p.filter === selectedProviders[0]);
      return match ? match.displayName : '1 Provider';
    }
    return `Providers (${selectedProviders.length})`;
  }, [isAllProvidersSelected, selectedProviders, providers]);

  // Active category display name for section title
  const activeCategoryTitle = useMemo(() => {
    if (!selectedCategory) return 'New Games';
    const found = CATEGORIES.find((c) => c.id === selectedCategory);
    return found ? `${found.name} Games` : 'New Games';
  }, [selectedCategory]);

  return (
    <section className="relative w-full py-10 sm:py-14 bg-[#181818] text-white overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Centered Controls & Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <p className="text-amber-400 font-extrabold uppercase tracking-widest text-xs sm:text-sm mb-2 drop-shadow-sm">
            READY FOR THRILLS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-wide text-white uppercase leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            A WIDE ARRAY OF GAMES
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Sourced from world-class developers with custom cinematic themes and maximum payout mechanics.
          </p>
        </div>

        {/* Row 1: Top Tabs Bar (Providers Tab + Category Tabs + Search Bar) */}
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-4">
          {/* Top Tabs: Providers Tab + Category Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Providers Tab Button on Top */}
            <button
              type="button"
              onClick={() => setIsProvidersRowVisible((prev) => !prev)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 border cursor-pointer ${
                isProvidersRowVisible || !isAllProvidersSelected
                  ? 'bg-[#1d1a12] border-amber-400 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/40'
                  : 'bg-[#202022] hover:bg-[#28282b] border-neutral-700/80 text-neutral-200 hover:border-neutral-500'
              }`}
            >
              <span>{providerButtonText}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isProvidersRowVisible ? 'rotate-180 text-amber-400' : 'text-neutral-400'
                }`}
              />
            </button>

            {/* Category Pills (Single select) */}
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryClick(category.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 border cursor-pointer ${
                    isActive
                      ? 'bg-[#1d1a12] border-amber-400 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/40'
                      : 'bg-[#202022] hover:bg-[#28282b] border-neutral-700/80 text-neutral-200 hover:border-neutral-500'
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64 md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-4 pr-10 py-2.5 rounded-full bg-[#3a3746]/40 hover:bg-[#3a3746]/60 focus:bg-[#24222d] border border-neutral-700/80 focus:border-amber-400/80 text-xs sm:text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-amber-400/30 transition-all"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <Search className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            )}
          </div>
        </div>

        {/* Row 2: Providers List Row shown horizontally when Providers Tab is clicked */}
        {isProvidersRowVisible && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-6 p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
            <span className="text-neutral-400 text-xs font-bold uppercase tracking-wider mr-1 shrink-0">
              Select Providers:
            </span>

            {/* "All" Providers Tab */}
            <button
              type="button"
              onClick={handleToggleAllProviders}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 border cursor-pointer ${
                isAllProvidersSelected
                  ? 'bg-amber-400/20 text-amber-400 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/30'
                  : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 border-neutral-700/80'
              }`}
            >
              {isAllProvidersSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
              <span>All</span>
            </button>

            {/* Dynamic Provider Pills */}
            {providers.map((provider) => {
              const isSelected =
                isAllProvidersSelected || selectedProviders.includes(provider.filter);
              const isSoleSelection =
                !isAllProvidersSelected && selectedProviders.includes(provider.filter);

              return (
                <button
                  key={provider.filter}
                  type="button"
                  onClick={() => handleToggleProvider(provider.filter)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 border cursor-pointer ${
                    isSoleSelection
                      ? 'bg-amber-400/20 text-amber-400 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/30'
                      : isAllProvidersSelected
                      ? 'bg-neutral-800/60 text-neutral-200 border-neutral-700/70 hover:bg-neutral-700/80'
                      : 'bg-neutral-800/40 text-neutral-400 border-neutral-800/90 hover:bg-neutral-800 hover:text-neutral-200'
                  }`}
                >
                  {isSelected && (
                    <Check
                      className={`w-3.5 h-3.5 ${
                        isSoleSelection ? 'text-amber-400' : 'text-neutral-400'
                      }`}
                    />
                  )}
                  <span>{provider.displayName}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Section Title Row (e.g. 👾 New Games / Show All > or Show Less) */}
        <div className="flex items-center justify-between mb-5 pt-2">
          <div className="flex items-center gap-2.5">
              <img src={newGameIcon} alt="new-game-icon" className='w-7 h-7' />
            <h3 className="text-lg sm:text-xl font-black italic tracking-wide text-white uppercase">
              {activeCategoryTitle}
            </h3>
            <span className="text-xs text-neutral-500 font-semibold">
              ({filteredGames.length} games)
            </span>
          </div>

          {/* Toggle Show All / Show Less */}
          {filteredGames.length > 0 && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-amber-400 hover:text-amber-300 text-xs sm:text-sm font-extrabold flex items-center gap-1.5 uppercase tracking-wider hover:underline cursor-pointer transition-colors"
            >
              <span>{isExpanded ? 'Show Less' : 'Show All'}</span>
              <span>{isExpanded ? '▲' : '▶'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Games Content Area */}
      {isLoading ? (
        /* Loading Skeletons */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4.5">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div
                key={idx}
                className="aspect-[4/5] rounded-2xl bg-neutral-800/50 border border-neutral-800 animate-pulse flex flex-col justify-end p-3"
              >
                <div className="h-3 bg-neutral-700/60 rounded w-3/4 mb-1.5" />
                <div className="h-2 bg-neutral-700/40 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      ) : error ? (
        /* Error State */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 text-center bg-neutral-900/40 rounded-3xl border border-neutral-800 p-8">
            <p className="text-red-400 font-bold mb-4">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      ) : filteredGames.length === 0 ? (
        /* Empty State */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 text-center bg-neutral-900/40 rounded-3xl border border-neutral-800/80 p-8">
            <p className="text-neutral-400 font-bold text-base mb-2">No games found</p>
            <p className="text-neutral-500 text-xs max-w-sm mx-auto mb-5">
              Try adjusting your provider selection, category tab, or search query.
            </p>
            <button
              type="button"
              onClick={() => {
                handleToggleAllProviders();
                setSelectedCategory(null);
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-xs font-bold transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : isExpanded ? (
        /* EXPANDED GRID VIEW (Show All Mode - Contained with empty space on left/right) */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4.5">
            {filteredGames.map((game) => {
              const categoryLabel = getGameCategoryLabel(game);

              return (
                <div
                  key={game._id || game.gameId}
                  className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/90 hover:border-amber-500/50 shadow-md hover:shadow-[0_8px_25px_rgba(245,158,11,0.15)] transition-all duration-300 cursor-pointer flex flex-col justify-end"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 scale-90 group-hover:scale-100">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.6)] font-black">
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    </div>
                  </div>
                  <div className="relative z-10 w-full p-2.5 sm:p-3 bg-black/80 backdrop-blur-md border-t border-white/5 text-center">
                    <h4 className="text-white font-extrabold text-xs sm:text-[13px] tracking-wide uppercase truncate leading-tight drop-shadow-sm">
                      {game.name}
                    </h4>
                    <p className="text-amber-400 font-bold text-[10px] sm:text-[11px] uppercase tracking-wider mt-0.5 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
                      {categoryLabel}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* 2-ROW HORIZONTAL SLIDER VIEW (Default Mode - Full width / Screen width) */
        <div
          className="relative w-full group/slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Slider Left Scroll Button */}
          <button
            type="button"
            onClick={handleScrollLeft}
            aria-label="Scroll Left"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/80 hover:bg-black text-amber-400 hover:text-amber-300 border border-amber-500/40 hover:border-amber-400 shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition-all duration-200 cursor-pointer hover:scale-110"
          >
            <span className="text-base sm:text-lg font-black font-mono">◀</span>
          </button>

          {/* Slider Right Scroll Button */}
          <button
            type="button"
            onClick={handleScrollRight}
            aria-label="Scroll Right"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/80 hover:bg-black text-amber-400 hover:text-amber-300 border border-amber-500/40 hover:border-amber-400 shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition-all duration-200 cursor-pointer hover:scale-110"
          >
            <span className="text-base sm:text-lg font-black font-mono">▶</span>
          </button>

          {/* 2-Row Horizontal Scrollable Grid across Full Screen Width */}
          <div
            ref={sliderRef}
            className="w-full overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-6 lg:px-8 py-2"
          >
            <div className="grid grid-rows-2 grid-flow-col auto-cols-[145px] sm:auto-cols-[175px] md:auto-cols-[190px] lg:auto-cols-[205px] gap-3.5 sm:gap-4.5 w-max">
              {filteredGames.map((game) => {
                const categoryLabel = getGameCategoryLabel(game);

                return (
                  <div
                    key={game._id || game.gameId}
                    className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/90 hover:border-amber-500/50 shadow-md hover:shadow-[0_8px_25px_rgba(245,158,11,0.15)] transition-all duration-300 cursor-pointer flex flex-col justify-end shrink-0"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 scale-90 group-hover:scale-100">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.6)] font-black">
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-black ml-0.5" />
                      </div>
                    </div>
                    <div className="relative z-10 w-full p-2.5 sm:p-3 bg-black/80 backdrop-blur-md border-t border-white/5 text-center">
                      <h4 className="text-white font-extrabold text-xs sm:text-[13px] tracking-wide uppercase truncate leading-tight drop-shadow-sm">
                        {game.name}
                      </h4>
                      <p className="text-amber-400 font-bold text-[10px] sm:text-[11px] uppercase tracking-wider mt-0.5 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
                        {categoryLabel}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Top Pick Games Slider Section */}
      <TopPickSection />

      {/* Best Slot Games Showcase Section */}
      <BestSlotsSection />

      {/* Hot Today Category Games Slider Section */}
      <HotTodaySection />

      {/* Live Table Games Slider Section */}
      <LiveTableSection />

      {/* Game Providers Marquee Slider Section */}
      <GameProvidersSection />

      {/* Den's Classic Jackpot Games Section */}
      <JackpotGamesSection />

      {/* Unleash Your Gaming Experience Feature Section */}
      <UnleashExperienceSection />

      {/* Den's Exclusive Popular Games Showcase Section */}
      <DensExclusiveSection />

      {/* Next Level Releases New Games Section */}
      <NewGamesSection />
    </section>
  );
};







