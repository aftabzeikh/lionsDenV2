import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { selectAllGames } from '../../redux/slices/gamesSlice';

export const NewGamesSection = ({authenticated=false}) => {
  const allGames = useSelector(selectAllGames);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Pool of 20 random games directly from redux store
  const random20Games = useMemo(() => {
    if (!allGames || allGames.length === 0) return [];
    const shuffled = [...allGames].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 20);
  }, [allGames]);

  // Navigate forward
  const handleNext = () => {
    if (isAnimating || random20Games.length === 0) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % random20Games.length);
      setIsAnimating(false);
    }, 250);
  };

  // Navigate backward
  const handlePrev = () => {
    if (isAnimating || random20Games.length === 0) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIdx((prev) => (prev - 1 + random20Games.length) % random20Games.length);
      setIsAnimating(false);
    }, 250);
  };

  if (!random20Games || random20Games.length === 0) return null;

  const firstSlide = random20Games[activeIdx % random20Games.length];
  const secondSlide = random20Games[(activeIdx + 1) % random20Games.length];

  return (
    <section className="relative w-full py-10 sm:py-16 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Outer Curved Panel Container (Zero right padding so 2nd slide reaches edge) */}
        <div className="relative rounded-[28px] sm:rounded-[38px] bg-black border border-amber-300  py-6 pl-6 pr-0 sm:py-10 sm:pl-10 sm:pr-0 lg:py-12 lg:pl-12 lg:pr-0 overflow-hidden">
          
          {/* Subtle Ambient Background Glows */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 items-center">
            
            {/* Left Column: Content Section (55%) */}
            <div className="w-full lg:w-[55%] flex flex-col items-start z-10 pr-6 sm:pr-8 lg:pr-6">
              <span className="text-amber-400 font-extrabold italic uppercase tracking-wider text-xs sm:text-sm mb-2.5 drop-shadow-sm">
                DEN&apos;S EXCITEMENT
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black italic tracking-wide text-white uppercase leading-[1.1] mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                NEXT LEVEL RELEASES
              </h2>

              <p className="text-neutral-300 text-xs sm:text-sm italic leading-relaxed mb-4">
                Explore fresh titles, immersive themes, and new gameplay experiences. From high-energy slots to exciting table, live, and fishing games, there&apos;s always something new to explore.
              </p>

              <p className="text-neutral-300 text-xs sm:text-sm italic leading-relaxed mb-6 sm:mb-8">
                Stay ahead of the latest drops and find the games at Lionsdengames®. Your next favorite game could be waiting.
              </p>

              {/* Gold Gradient Join Now Button */}
              <button
                type="button"
                className="group relative inline-flex items-center justify-center px-10 sm:px-12 py-3 sm:py-3.5 rounded-full font-black italic uppercase tracking-widest text-sm sm:text-base text-slate-950 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(248,196,94,0.4)] hover:shadow-[0_0_30px_rgba(248,196,94,0.7)] hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(95.84deg, #B77E15 4.79%, #F8C45E 51.55%, #B77E15 101.36%)',
                }}
              >
                <span>{authenticated ? 'SHOW ALL' : 'JOIN NOW'}</span>
              </button>
            </div>

            {/* Right Column: Slider Section (45%) */}
            <div className="w-full lg:w-[45%] relative h-[360px] sm:h-[420px] md:h-[460px] flex items-center overflow-hidden pr-0 pl-10 sm:pl-12 shrink-0">
              
              {/* Left Arrow Button - Positioned outside of the blur overlay */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Game"
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded bg-neutral-900/95 hover:bg-neutral-800 text-amber-400 border border-amber-500/50 hover:border-amber-400 flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>

              {/* Left Side Blur / Fade Overlay (on the slide, after the button) */}
              <div className="absolute left-10 sm:left-12 top-0 bottom-0 w-14 sm:w-18 bg-gradient-to-r from-black via-black/85 to-transparent pointer-events-none z-10 backdrop-blur-[2px]" />

              {/* Right Arrow Button positioned at exact right edge with 0 space */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Game"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-l bg-amber-400 hover:bg-amber-300 text-black border-y border-l border-amber-300 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 font-black"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
              </button>

              {/* 2 Slides Container: 80% First Slide + 20% Second Slide */}
              <div className="w-full h-full flex gap-3 sm:gap-4 items-center pr-0">
                
                {/* 1st Slide: 80% Width (Image Only) */}
                <div
                  onClick={handleNext}
                  className={`group relative w-[78%] sm:w-[80%] h-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-neutral-900 border border-neutral-800/90 hover:border-amber-500/60 shadow-2xl transition-all duration-300 cursor-pointer shrink-0 ${
                    isAnimating ? 'opacity-70 scale-[0.98]' : 'opacity-100 scale-100'
                  }`}
                >
                  <img
                    src={firstSlide.image}
                    alt=""
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-40 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

                  {/* Play Button on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 scale-90 group-hover:scale-100">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.7)] font-black">
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-black ml-1" />
                    </div>
                  </div>
                </div>

                {/* 2nd Slide: 20% Width (Image Only, extends to right edge without blur) */}
                <div
                  onClick={handleNext}
                  className={`group relative w-[22%] sm:w-[20%] h-full rounded-l-[24px] sm:rounded-l-[32px] rounded-r-none overflow-hidden bg-neutral-900 border-l border-y border-neutral-800/90 hover:border-amber-500/60 shadow-2xl transition-all duration-300 cursor-pointer shrink-0 ${
                    isAnimating ? 'opacity-70 scale-[0.98]' : 'opacity-100 scale-100'
                  }`}
                >
                  <img
                    src={secondSlide.image}
                    alt=""
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-40 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default NewGamesSection;
