import React from 'react';
import openLionImg from '../../assets/images/open-lion.png';

export const OpenDenSection = () => {
  return (
    <section className="relative w-full py-16 md:py-24 bg-[#141414] overflow-hidden select-none border-t border-neutral-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Main Featured Experience Banner Card */}
        <div className="w-full bg-[#0d0d0d] border border-[#a67c2e]/70 rounded-[28px] sm:rounded-[36px] shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative flex flex-col lg:flex-row items-center justify-between min-h-[360px] lg:min-h-[400px]">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-3/5 p-8 sm:p-12 lg:pl-12 lg:pr-4 flex flex-col justify-center items-start text-left z-20">
            <p className="text-[#f59e0b] font-black italic uppercase tracking-wider text-xs sm:text-sm mb-2.5">
              FEATURED EXPERIENCE
            </p>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[35px] font-black italic tracking-wide text-white uppercase mb-4 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              THE DEN IS ALWAYS OPEN
            </h2>

            <p className="text-neutral-300 text-xs sm:text-sm md:text-[14px] italic leading-relaxed max-w-sm">
              Your next favorite game could be one click away. Explore featured titles, trending games, and new additions to keep your gaming experience fresh.
            </p>
          </div>

          {/* Right Lion Image Column (Big, grounded at bottom, overflowing top & right) */}
          <div className="w-full lg:w-2/5 relative flex items-end justify-center lg:justify-end z-10 lg:self-stretch min-h-[260px] sm:min-h-[320px] lg:min-h-0">
            <div className="relative w-full h-full flex items-end justify-end">
              <img
                src={openLionImg}
                alt="The Den is Always Open"
                className="w-full lg:w-auto h-auto lg:h-[108%] xl:h-[116%] max-w-none object-contain object-bottom-right lg:absolute lg:bottom-0 lg:-right-12 xl:-right-16 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] pointer-events-none"
              />
            </div>
          </div>

        </div>

        {/* Centered EXPLORE DEN Action Button */}
        <div className="mt-8 sm:mt-10">
          <a
            href="#games"
            className="inline-block bg-gradient-to-b from-[#f5b842] via-[#df9b28] to-[#be7f19] text-black font-black italic tracking-wider text-sm sm:text-base px-10 sm:px-12 py-3 sm:py-3.5 rounded-full shadow-[0_4px_18px_rgba(245,158,11,0.4)] hover:shadow-[0_6px_25px_rgba(245,158,11,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 uppercase cursor-pointer"
          >
            EXPLORE DEN
          </a>
        </div>

      </div>
    </section>
  );
};
