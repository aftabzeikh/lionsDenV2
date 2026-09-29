import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Promotion Assets
import facebookImg from '../../assets/images/promotions/facebook.png';
import instagramImg from '../../assets/images/promotions/instagram.png';
import signupBonusImg from '../../assets/images/promotions/50percent.png';
import midnightImg from '../../assets/images/promotions/midnight.png';
import morningCoffeeImg from '../../assets/images/promotions/morningCoffee.png';
import lunchSpecialImg from '../../assets/images/promotions/lunchSpecial.png';
import happyHourImg from '../../assets/images/promotions/happyHour.png';

export const PROMOTIONS_DATA = [
  {
    id: 1,
    title: 'CLAIM REWARDS & FREE COINS',
    description: 'Like us on Facebook for exclusive updates.',
    buttonText: 'Like us on Facebook',
    image: facebookImg,
    gradient: 'linear-gradient(90deg, #002A78 0%, #004EDE 100%)',
    link: 'https://www.facebook.com/lionsdengames',
  },
  {
    id: 2,
    title: 'CLAIM REWARDS & FREE COINS',
    description: 'Follow us on Instagram for exclusive updates.',
    buttonText: 'Follow us on Instagram',
    image: instagramImg,
    gradient: 'linear-gradient(90deg, #780044 0%, #DE007E 100%)',
    link: 'https://www.instagram.com/lionsdengames',
  },
  {
    id: 3,
    title: '50% SIGNUP BONUS',
    description: 'Complete your account verification and get bonus on your first purchase',
    buttonText: 'Buy Now',
    image: signupBonusImg || instagramImg,
    gradient: 'linear-gradient(90deg, #005229 0%, #009A4D 100%)',
    link: '#buy-now',
  },
  {
    id: 4,
    title: 'MIDNIGHT SPECIAL BONUS',
    description: 'Unlock continuous rewards at Lions Den Games with our lineup of exclusive bonuses',
    buttonText: null,
    image: midnightImg,
    gradient: 'linear-gradient(90deg, #000A1E 0%, #002E84 100%)',
  },
  {
    id: 5,
    title: 'MORNING COFFEE BONUS',
    description: 'Unlock continuous rewards at Lions Den Games with our lineup of exclusive bonuses',
    buttonText: null,
    image: morningCoffeeImg,
    gradient: 'linear-gradient(90deg, #003F6F 0%, #0079D5 100%)',
  },
  {
    id: 6,
    title: 'LUNCH SPECIAL BONUS',
    description: 'Unlock continuous rewards at Lions Den Games with our lineup of exclusive bonuses',
    buttonText: null,
    image: lunchSpecialImg,
    gradient: 'linear-gradient(90deg, #4D3D00 0%, #8B6F00 100%)',
  },
  {
    id: 7,
    title: 'HAPPY HOUR BONUS',
    description: 'Unlock continuous rewards at Lions Den Games with our lineup of exclusive bonuses',
    buttonText: null,
    image: happyHourImg,
    gradient: 'linear-gradient(90deg, #003937 0%, #008C88 100%)',
  },
];

export const PromotionSlider = ({ className = '' }) => {
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const isNormalizingRef = useRef(false);

  // Triple set for infinite looping
  const infinitePromotions = [
    ...PROMOTIONS_DATA,
    ...PROMOTIONS_DATA,
    ...PROMOTIONS_DATA,
  ];

  const getSingleSetWidth = useCallback(() => {
    if (!sliderRef.current) return 0;
    return sliderRef.current.scrollWidth / 3;
  }, []);

  // Initialize to the middle set
  useEffect(() => {
    if (!sliderRef.current) return;
    const timer = setTimeout(() => {
      const singleSetWidth = getSingleSetWidth();
      if (singleSetWidth > 0 && sliderRef.current) {
        sliderRef.current.scrollLeft = singleSetWidth;
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [getSingleSetWidth]);

  // Handle infinite scroll wrap
  const handleScroll = useCallback(() => {
    if (!sliderRef.current || isNormalizingRef.current) return;
    const el = sliderRef.current;
    const singleSetWidth = getSingleSetWidth();
    if (singleSetWidth <= 0) return;

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
  }, [getSingleSetWidth]);

  // Auto-slide every 4.5s
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (!sliderRef.current || isNormalizingRef.current) return;
      const el = sliderRef.current;
      const cardWidth = 530; // Approx card width + gap
      el.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    if (!sliderRef.current) return;
    const cardWidth = 530;
    sliderRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (!sliderRef.current) return;
    const cardWidth = 530;
    sliderRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  return (
    <div
      className={`relative w-full overflow-hidden group/slider select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous Promotion"
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/85 hover:bg-neutral-900 border border-[#F8C45E] text-[#F8C45E] flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.9)] opacity-0 group-hover/slider:opacity-100 transition-all duration-200 cursor-pointer active:scale-90"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next Promotion"
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/85 hover:bg-neutral-900 border border-[#F8C45E] text-[#F8C45E] flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.9)] opacity-0 group-hover/slider:opacity-100 transition-all duration-200 cursor-pointer active:scale-90"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Horizontal Carousel Container */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex items-stretch gap-3 sm:gap-6 overflow-x-auto px-0 sm:px-2 py-2 scroll-smooth scrollbar-none"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {infinitePromotions.map((promo, idx) => (
          <div
            key={`${promo.id}-${idx}`}
            className="flex-none w-[310px] sm:w-[420px] md:w-[480px] lg:w-[540px] rounded-sm sm:rounded-md border-2 border-[#F8C45E] overflow-hidden shadow-2xl relative transition-transform duration-300 hover:scale-[1.015]"
            style={{
              background: promo.gradient,
            }}
          >
            {/* Subtle Gradient & Glass Highlights */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />

            <div className="relative z-10 p-4 sm:p-5 md:p-6 h-full flex items-center justify-between gap-3 sm:gap-4 min-h-[160px] sm:min-h-[190px] md:min-h-[210px]">
              
              {/* Left: Text Content & Optional CTA Button */}
              <div className="flex-1 flex flex-col justify-between h-full space-y-2 sm:space-y-3 z-10">
                <div className="space-y-1 sm:space-y-1.5">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black italic tracking-wide text-[#F8C45E] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-tight">
                    {promo.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-[15px] font-medium italic text-white/95 leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] max-w-[280px] sm:max-w-[320px]">
                    {promo.description}
                  </p>
                </div>

                {/* Optional Action Button */}
                {promo.buttonText && (
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (promo.link && promo.link.startsWith('http')) {
                          window.open(promo.link, '_blank');
                        }
                      }}
                      className="inline-flex items-center justify-center px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-black italic uppercase text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#B77E15] via-[#F8C45E] to-[#B77E15] shadow-[0_0_15px_rgba(248,196,94,0.4)] hover:shadow-[0_0_25px_rgba(248,196,94,0.7)] hover:brightness-110 active:scale-95 transition-all cursor-pointer select-none"
                    >
                      {promo.buttonText}
                    </button>
                  </div>
                )}
              </div>

              {/* Right: 3D Artwork Image */}
              <div className="shrink-0 flex items-center justify-center w-28 sm:w-36 md:w-44 lg:w-48 h-auto">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-auto max-h-32 sm:max-h-40 md:max-h-44 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] transform hover:scale-105 transition-transform duration-300"
                />
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
