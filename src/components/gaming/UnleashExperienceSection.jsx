import React from 'react';

// Import images from src/assets/images/unleash
import unleashBg from '../../assets/images/unleash/unleash-bg.png';
import excitingGamesImg from '../../assets/images/unleash/Exciting Games.png';
import attractiveRewardsImg from '../../assets/images/unleash/Attractive Rewards.png';
import safeSecureImg from '../../assets/images/unleash/Safe & Secure Gaming.png';
import fastPayoutsImg from '../../assets/images/unleash/Fast & Easy Payouts.png';
import supportImg from '../../assets/images/unleash/24_7 Support.png';

const featuresList = [
  {
    id: 'exciting-games',
    title: 'Exciting Games',
    image: excitingGamesImg,
  },
  {
    id: 'attractive-rewards',
    title: 'Attractive Rewards',
    image: attractiveRewardsImg,
  },
  {
    id: 'safe-secure',
    title: 'Safe & Secure Gaming',
    image: safeSecureImg,
  },
  {
    id: 'fast-payouts',
    title: 'Fast & Easy Payouts',
    image: fastPayoutsImg,
  },
  {
    id: 'support',
    title: '24/7 Support',
    image: supportImg,
  },
];

export const UnleashExperienceSection = () => {
  return (
    <section className="relative w-full py-16 sm:py-24 overflow-hidden select-none border-t border-neutral-900/80 bg-black">
      {/* Background Graphic */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none opacity-95"
        style={{
          backgroundImage: `url(${unleashBg})`,
        }}
      />

      {/* Subtle Edge Shading for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />


      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Top Centered Golden Button */}
        <div className="mb-6 sm:mb-8">
          <button
            type="button"
            className="group relative inline-flex items-center justify-center px-10 sm:px-12 py-3 sm:py-3.5 rounded-full font-black italic uppercase tracking-widest text-sm sm:text-base text-slate-950 transition-all duration-300 cursor-pointer shadow-[0_0_25px_rgba(248,196,94,0.45)] hover:shadow-[0_0_35px_rgba(248,196,94,0.75)] hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(95.84deg, #B77E15 4.79%, #F8C45E 51.55%, #B77E15 101.36%)',
            }}
          >
            <span>JOIN NOW</span>
          </button>
        </div>

        {/* Header Titles */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-amber-400 font-extrabold italic uppercase tracking-widest text-xs sm:text-sm mb-2 drop-shadow-sm">
            WELCOME TO THE PRIDE
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic tracking-wide text-white uppercase leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            UNLEASH YOUR GAMING EXPERIENCE
          </h2>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base italic leading-relaxed max-w-2xl mx-auto">
            Step into the den of premium gaming. We've curated an experience where your excitement, security, and rewards are our primary focus.
          </p>
        </div>

        {/* 5 Feature Icons Row */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 md:gap-10 items-start justify-center">
          {featuresList.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center justify-center group cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Golden Icon Container */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center mb-3 sm:mb-4">
                <img
                  src={feature.image}
                  alt={feature.title}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_16px_rgba(245,158,11,0.35)] group-hover:scale-110 group-hover:drop-shadow-[0_6px_22px_rgba(245,158,11,0.6)] transition-all duration-300"
                />
              </div>

              {/* Title Underneath */}
              <h4 className="text-white font-bold italic text-xs sm:text-sm md:text-base text-center leading-snug tracking-wide group-hover:text-amber-400 transition-colors duration-200">
                {feature.title}
              </h4>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
