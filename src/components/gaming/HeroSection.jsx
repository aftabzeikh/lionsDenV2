import React from 'react';
import { ChevronsDown } from 'lucide-react';
import { Button } from '../common/Button';
import bannerDesk from '../../assets/images/banner-desk.png';

export const HeroSection = () => {
  return (
    <section className="w-full bg-black  select-none">
      {/* Centered bounded container matching Header width with black spacing on left and right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Floating Rounded Hero Banner Card */}
        <div className="relative w-full overflow-hidden shadow-2xl shadow-black/90 min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[640px] flex items-center bg-black">

          {/* Background Banner Image */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center sm:bg-right lg:bg-center bg-no-repeat pointer-events-none"
            style={{ backgroundImage: `url(${bannerDesk})` }}
          />

          {/* Subtle Contrast Shadow on the left text area */}
          <div className="absolute inset-y-0 left-0 w-full sm:w-[85%] lg:w-[60%] bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none" />

          {/* Left Text & CTA Content (60% width) */}
          <div className="relative z-10 p-2 sm:p-2 md:p-4 lg:p-5 w-full md:w-[60%] lg:w-[60%] flex flex-col items-start text-left space-y-3 sm:space-y-4">

            {/* Top Subtitle */}
            <span className="text-[11px] sm:text-xs md:text-sm font-black tracking-wider uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] italic ">
              WELCOME TO THE HIGH-STAKES CYBER FUTURE
            </span>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black italic tracking-tighter uppercase text-[#F8C45E] drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] leading-[0.92] -ml-0.5 tracking-widest">
              ENTER THE DEN
            </h1>

            {/* Paragraph Description */}
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] max-w-full pb-1 font-normal italic">
              The premium virtual playground where high-stakes adrenaline meets breathtaking neon digital atmosphere. Unleash the beast, command your fortunes, claim the throne.
            </p>

            {/* Primary Action Button */}
            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                className="px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base font-black tracking-wider shadow-[0_0_25px_rgba(248,196,94,0.4)] hover:shadow-[0_0_35px_rgba(248,196,94,0.7)]"
              >
                PLAY NOW
              </Button>
            </div>

          </div>

          {/* Bottom Center Scroll Arrow Indicator */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center text-white/50 animate-bounce">
            <ChevronsDown className="w-8 h-8 sm:w-8 sm:h-8 text-white " />
          </div>

        </div>

      </div>
    </section>
  );
};
