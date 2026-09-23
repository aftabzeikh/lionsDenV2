import React from 'react';
import bgMobileApp from '../../assets/images/bg-mobileApplicationSection.png';
import appStoreImg from '../../assets/images/AppStore.png';
import googlePlayImg from '../../assets/images/googlePlay.png';

export const MobileAppSection = () => {
  return (
    <section id="get-app" className="relative w-full py-12 md:py-16 bg-[#262626] overflow-hidden select-none border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Banner Card with Background Artwork */}
        <div
          className="w-full bg-cover bg-center border border-amber-500/50 rounded-[28px] sm:rounded-[36px] shadow-2xl shadow-black/95 overflow-hidden relative min-h-[340px] sm:min-h-[380px] lg:min-h-[550px] flex items-center"
          style={{
            backgroundImage: `url(${bgMobileApp})`,
          }}
        >
          {/* Left Dark Gradient Overlay to ensure crisp text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent lg:w-[68%] pointer-events-none" />

          {/* Left Content Area */}
          <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 max-w-xl lg:max-w-2xl flex flex-col items-start text-left">
            <p className="text-amber-400 font-black italic uppercase tracking-wider text-xs sm:text-[13px] mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              PLAY ON THE GO
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] font-black italic tracking-wide text-white uppercase mb-3 leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              YOUR GAMES.<br />ANYTIME. ANYWHERE.
            </h2>

            <p className="text-neutral-200 text-xs sm:text-[13px] md:text-sm lg:text-base italic leading-relaxed mb-6 max-w-lg lg:max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Get the full Den experience right at your fingertips. Download the app, explore your favorite games, and enjoy a smooth gaming experience wherever you are.
            </p>

            {/* Store Download Buttons */}
            <div className="flex items-center gap-3 sm:gap-3.5 flex-wrap sm:flex-nowrap">
              <a
                href="#app-store"
                className="inline-block transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
                aria-label="Download on the App Store"
              >
                <img
                  src={appStoreImg}
                  alt="App Store"
                  className="h-9 sm:h-10.5 w-auto object-contain shadow-lg shadow-black/60"
                />
              </a>

              <a
                href="#google-play"
                className="inline-block transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
                aria-label="Get it on Google Play"
              >
                <img
                  src={googlePlayImg}
                  alt="Google Play"
                  className="h-9 sm:h-10.5 w-auto object-contain shadow-lg shadow-black/60"
                />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
