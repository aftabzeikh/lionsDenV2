import React from 'react';

const bonusesList = [
  {
    id: 'midnight',
    title: 'MID-NIGHT SPECIAL',
    background: 'linear-gradient(90deg, #FF7676 0%, #FFC3C3 48%, #FF7676 100%)',
    glow: 'shadow-[0_0_22px_rgba(255,118,118,0.55)] hover:shadow-[0_0_32px_rgba(255,118,118,0.85)]',
  },
  {
    id: 'morning',
    title: 'MORNING COFFEE',
    background: 'linear-gradient(90deg, #CDFF76 0%, #ECFFCB 48%, #CDFF76 100%)',
    glow: 'shadow-[0_0_22px_rgba(205,255,118,0.55)] hover:shadow-[0_0_32px_rgba(205,255,118,0.85)]',
  },
  {
    id: 'lunch',
    title: 'LUNCH SPECIAL',
    background: 'linear-gradient(90deg, #E876FF 0%, #F1ABFF 48%, #E876FF 100%)',
    glow: 'shadow-[0_0_22px_rgba(232,118,255,0.55)] hover:shadow-[0_0_32px_rgba(232,118,255,0.85)]',
  },
  {
    id: 'happy-hour',
    title: 'HAPPY HOUR',
    background: 'linear-gradient(90deg, #76C1FF 0%, #C0E2FF 48%, #76C1FF 100%)',
    glow: 'shadow-[0_0_22px_rgba(118,193,255,0.55)] hover:shadow-[0_0_32px_rgba(118,193,255,0.85)]',
  },
  {
    id: 'refer',
    title: 'REFER & EARN',
    background: 'linear-gradient(90deg, #FFC800 0%, #FFE792 48%, #FFC800 100%)',
    glow: 'shadow-[0_0_22px_rgba(255,200,0,0.55)] hover:shadow-[0_0_32px_rgba(255,200,0,0.85)]',
  },
  {
    id: 'first-deposit',
    title: 'FIRST DEPOSIT',
    background: 'linear-gradient(90deg, #FF76D6 0%, #FFC7EE 48%, #FF76D6 100%)',
    glow: 'shadow-[0_0_22px_rgba(255,118,214,0.55)] hover:shadow-[0_0_32px_rgba(255,118,214,0.85)]',
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
                    style={{ background: bonus.background }}
                    className={`${bonus.glow} px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95 shrink-0 border border-white/30`}
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
