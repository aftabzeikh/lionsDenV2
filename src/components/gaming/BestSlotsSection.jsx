import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Play } from 'lucide-react';
import { selectSlotGames } from '../../redux/slices/gamesSlice';

export const BestSlotsSection = () => {
  const slotGames = useSelector(selectSlotGames);
  const gamesList = slotGames || [];

  // Active showcase index
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Change active game every 5 seconds with smooth animation
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

  if (gamesList.length === 0) return null;

  // Big featured game is at currentIndex
  const activeGame = gamesList[currentIndex % gamesList.length];

  // The 3 small preview cards are 3 DIFFERENT games following the big one
  const previewGames = [
    {
      game: gamesList[(currentIndex + 1) % gamesList.length],
      actualIndex: (currentIndex + 1) % gamesList.length,
    },
    {
      game: gamesList[(currentIndex + 2) % gamesList.length],
      actualIndex: (currentIndex + 2) % gamesList.length,
    },
    {
      game: gamesList[(currentIndex + 3) % gamesList.length],
      actualIndex: (currentIndex + 3) % gamesList.length,
    },
  ];

  const handleSelectGame = (idx) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      setIsAnimating(false);
    }, 200);
  };

  return (
    <section className="relative w-full py-14 sm:py-18 bg-[#111111] text-white overflow-hidden select-none border-t border-neutral-900/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Heading, Description & 3 Distinct Slot Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                {/* Yellow Subtitle */}
                <p className="text-amber-400 font-extrabold italic uppercase tracking-widest text-xs sm:text-sm mb-1.5 drop-shadow-sm">
                  BEST SLOT GAMES
                </p>
                
                {/* Main Display Headline */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-wide text-white uppercase leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                  UNLEASH YOUR INNER KING
                </h2>
              </div>

              {/* Description Paragraphs */}
              <div className="space-y-3.5 text-neutral-300 text-sm sm:text-[15px] italic leading-relaxed">
                <p>
                  Explore a handpicked selection of the Lionsdengames® hottest slot games. With exciting themes, rewarding features, and endless spins, there's always something new to play.
                </p>
                <p className="text-neutral-400">
                  Lionsdengames® is always adding new ways to play, so there's never a dull spin. Browse the hottest titles, discover popular player favorites, and explore games built to keep the excitement going. Pick your game, spin the reels, and see where your next adventure takes you.
                </p>
              </div>
            </div>

            {/* 3 Interactive Slot Thumbnails (All 3 are completely different from the big image) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              {previewGames.map(({ game, actualIndex }, i) => {
                if (!game) return null;

                const categoryLabel =
                  game.category ||
                  (game.table ? 'Table' : game.fishing ? 'Fishing' : 'Slots');

                return (
                  <div
                    key={`${game._id || game.gameId || i}-${actualIndex}`}
                    onClick={() => handleSelectGame(actualIndex)}
                    className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-black border border-neutral-800/90 hover:border-amber-400/80 shadow-md hover:shadow-[0_8px_25px_rgba(245,158,11,0.2)] transition-all duration-300 cursor-pointer flex flex-col justify-end opacity-90 hover:opacity-100 hover:scale-[1.02]"
                  >
                    {/* Thumbnail Image */}
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

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-85" />

                    {/* Active Play Icon indicator on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 scale-90 group-hover:scale-100">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.6)] font-black">
                        <Play className="w-4 h-4 fill-black ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom label */}
                    <div className="relative z-10 w-full p-2 bg-black/90 backdrop-blur-md border-t border-white/5 text-center">
                      <h4 className="text-white font-extrabold text-[11px] sm:text-xs tracking-wide uppercase truncate leading-tight drop-shadow-sm">
                        {game.name}
                      </h4>
                      <p className="text-amber-400 font-bold text-[9px] sm:text-[10px] uppercase tracking-wider mt-0.5">
                        {categoryLabel}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Big Full-Height Animated Featured Slot Showcase Banner (No badges, no slider buttons) */}
          <div
            className="lg:col-span-6 flex items-center justify-center lg:h-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] rounded-3xl sm:rounded-[32px] overflow-hidden bg-neutral-950 border border-neutral-800/80 shadow-[0_16px_50px_rgba(0,0,0,0.85)] group">
              
              {/* Main Showcase Game Image with Animated Transition */}
              <div
                className={`w-full h-full relative transition-all duration-500 ease-out ${
                  isAnimating
                    ? 'opacity-0 scale-95 blur-sm'
                    : 'opacity-100 scale-100 blur-0'
                }`}
              >
                <img
                  src={activeGame?.image}
                  alt={activeGame?.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle edge shading */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              </div>

              {/* Hover Play Button Glow on Big Showcase */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 scale-90 group-hover:scale-100 pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.8)] font-black">
                  <Play className="w-7 h-7 fill-black ml-1" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Center: JOIN NOW Golden Button */}
        <div className="flex justify-center mt-12 sm:mt-14">
          <button
            type="button"
            className="group relative inline-flex items-center justify-center px-10 sm:px-12 py-3.5 sm:py-4 rounded-full font-black italic uppercase tracking-widest text-sm sm:text-base text-slate-950 transition-all duration-300 cursor-pointer shadow-[0_0_25px_rgba(248,196,94,0.4)] hover:shadow-[0_0_35px_rgba(248,196,94,0.7)] hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(95.84deg, #B77E15 4.79%, #F8C45E 51.55%, #B77E15 101.36%)',
            }}
          >
            <span>JOIN NOW</span>
          </button>
        </div>
      </div>
    </section>
  );
};
