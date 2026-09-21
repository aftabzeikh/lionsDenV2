import React from 'react';

const bonusesList = [
  {
    id: 'midnight',
    title: 'MID-NIGHT SPECIAL',
    gradient: 'from-[#ff6b81] via-[#ff7979] to-[#ff8e8e]',
    glow: 'shadow-[0_0_22px_rgba(255,107,129,0.55)] hover:shadow-[0_0_32px_rgba(255,107,129,0.85)]',
  },
  {
    id: 'morning',
    title: 'MORNING COFFEE',
    gradient: 'from-[#a8e063] via-[#b8f24a] to-[#d4fc79]',
    glow: 'shadow-[0_0_22px_rgba(184,242,74,0.55)] hover:shadow-[0_0_32px_rgba(184,242,74,0.85)]',
  },
  {
    id: 'lunch',
    title: 'LUNCH SPECIAL',
    gradient: 'from-[#e056fd] via-[#eb8cfc] to-[#f49eff]',
    glow: 'shadow-[0_0_22px_rgba(224,86,253,0.55)] hover:shadow-[0_0_32px_rgba(224,86,253,0.85)]',
  },
  {
    id: 'happy-hour',
    title: 'HAPPY HOUR',
    gradient: 'from-[#48dbfb] via-[#68d8d6] to-[#88d49e]',
    glow: 'shadow-[0_0_22px_rgba(72,219,251,0.55)] hover:shadow-[0_0_32px_rgba(72,219,251,0.85)]',
  },
  {
    id: 'refer',
    title: 'REFER & EARN',
    gradient: 'from-[#f9ca24] via-[#fbc531] to-[#f9d71c]',
    glow: 'shadow-[0_0_22px_rgba(249,202,36,0.55)] hover:shadow-[0_0_32px_rgba(249,202,36,0.85)]',
  },
  {
    id: 'first-deposit',
    title: 'FIRST DEPOSIT',
    gradient: 'from-[#ff9f43] via-[#ffa834] to-[#feca57]',
    glow: 'shadow-[0_0_22px_rgba(255,159,67,0.55)] hover:shadow-[0_0_32px_rgba(255,159,67,0.85)]',
  },
];

export const AllDayBonuses = () => {
  return (
    <section className="relative w-full py-16 md:py-20 bg-black overflow-hidden select-none">
      {/* Background ambient lighting glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full flex flex-col items-center justify-center space-y-10 md:space-y-12">
        
        {/* Top Header: ALL DAY BONUSES (Outlined White) */}
        <div className="text-center px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic tracking-wider text-stroke-white uppercase drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]">
            ALL DAY BONUSES
          </h2>
        </div>

        {/* Continuous Marquee Auto-Slider */}
        <div className="w-full overflow-hidden py-4 relative">
          {/* Subtle side fade gradients for sleek edge blending */}
          <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div className="animate-marquee flex items-center whitespace-nowrap">
            {/* 3 Duplications ensure a completely seamless, infinite continuous loop */}
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-6 sm:gap-8 px-3 sm:px-4 shrink-0">
                {bonusesList.map((bonus) => (
                  <div
                    key={`${setIndex}-${bonus.id}`}
                    className={`bg-gradient-to-r ${bonus.gradient} ${bonus.glow} px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95 shrink-0 border border-white/30`}
                  >
                    <span className="text-black font-black italic tracking-wider text-sm sm:text-base md:text-lg uppercase">
                      {bonus.title}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Tagline: MORE REASONS TO PLAY, MORE TIMES TO WIN. (Outlined Gold) */}
        <div className="text-center px-4">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black italic tracking-wide text-stroke-gold uppercase drop-shadow-[0_0_15px_rgba(248,196,94,0.3)]">
            MORE REASONS TO PLAY, MORE TIMES TO WIN.
          </h3>
        </div>

      </div>
    </section>
  );
};
