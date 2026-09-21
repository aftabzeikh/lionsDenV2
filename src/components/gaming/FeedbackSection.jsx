import React, { useState, useEffect, useRef } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';

const fallbackFeedbacks = [
  {
    _id: '1',
    userId: { username: 'Vesper_D' },
    message:
      'The live poker dealer atmosphere is unmatched. Translucent glass interface cards and zero withdrawal delays make this my forever home.',
  },
  {
    _id: '2',
    userId: { username: 'Kora Neon' },
    message:
      'Lions Royal Gold tier rewards have already netted me real luxury merchandise. Highly recommend standard slots, RTP values are transparent and high.',
  },
  {
    _id: '3',
    userId: { username: 'HyperX' },
    message:
      "That 200% welcoming match promo set my balance on a trajectory I didn't think possible. Immediate crypto cashout is incredibly reliable.",
  },
  {
    _id: '4',
    userId: { username: 'Bigolcountry' },
    message: "I think you're the best in the industry.",
  },
  {
    _id: '5',
    userId: {
      username: 'Chelseydawn97',
      image:
        'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=962368299407169&height=50&width=50&ext=1746029065&hash=Aba-wRUIOGXgp2tqxAS1nXRc',
    },
    message: 'Love this platform! Incredible rewards and instant withdrawals ❤️',
  },
  {
    _id: '6',
    userId: { username: 'singabecerro' },
    message: "It's currently my favorite casino site! Not even close.",
  },
];

const avatarGradients = [
  'from-cyan-500 via-blue-600 to-indigo-600',
  'from-fuchsia-600 via-pink-500 to-rose-500',
  'from-amber-500 via-orange-600 to-yellow-400',
  'from-emerald-500 via-teal-600 to-cyan-500',
  'from-purple-600 via-violet-500 to-indigo-600',
];

const FeedbackAvatar = ({ user, index }) => {
  const [imgError, setImgError] = useState(false);
  const username = user?.username || 'Gamer';
  const initial = username.charAt(0).toUpperCase();
  const gradient = avatarGradients[index % avatarGradients.length];

  if (user?.image && !imgError) {
    return (
      <img
        src={user.image}
        alt={username}
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-amber-400/40 shadow-md shrink-0"
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr ${gradient} flex items-center justify-center font-black text-white text-sm border border-amber-400/40 shadow-md shrink-0`}
    >
      {initial}
    </div>
  );
};

export const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState(fallbackFeedbacks);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(
          'https://www.lionsprideengineering.com/api/v1/feedback/approved-feedback',
          {
            headers: {
              accept: 'application/json, text/plain, */*',
            },
          }
        );
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const result = await response.json();
        if (isMounted && Array.isArray(result?.data) && result.data.length > 0) {
          setFeedbacks(result.data);
        }
      } catch (err) {
        console.error('Failed to load live feedback, using fallback data:', err);
      }
    };

    fetchFeedbacks();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalItems = feedbacks.length;
  // Maximum scroll step so we don't scroll past the end
  const maxIndex = Math.max(0, totalItems - 1);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Auto-scroll every 10 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused || totalItems === 0) return;
    const timer = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(timer);
  }, [isPaused, totalItems, maxIndex]);

  // 5 Dots Pagination indicator
  const TOTAL_DOTS = 5;
  const activeDot =
    maxIndex > 0 ? Math.round((currentIndex / maxIndex) * (TOTAL_DOTS - 1)) : 0;

  const handleDotClick = (dotIdx) => {
    const targetIdx = Math.round((dotIdx / (TOTAL_DOTS - 1)) * maxIndex);
    setCurrentIndex(targetIdx);
  };

  return (
    <section
      className="relative w-full py-16 md:py-24 bg-[#181818] overflow-hidden select-none border-t border-neutral-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient background lighting */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" /> */}

      {/* Section Header */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-10 sm:mb-14 relative z-10">
        <p className="text-amber-400 font-extrabold uppercase tracking-widest text-xs sm:text-sm mb-2">
          COMMUNITY VOICES
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-wide text-white">
          INSIDE THE PRIDE
        </h2>
        <p className="mt-3 text-neutral-300 text-xs sm:text-sm md:text-base italic max-w-xl mx-auto leading-relaxed">
          What top high-stake players and casual arcade veterans are saying about their stay in the LionsDen.
        </p>
      </div>

      {/* Edge-to-Edge Feedback Cards Carousel Track */}
      <div className="w-full relative z-10 px-4 sm:px-8 lg:px-12 mb-10 overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out gap-5 sm:gap-6"
          style={{
            transform: `translateX(calc(-${currentIndex} * (360px + 1.25rem)))`,
          }}
        >
          {feedbacks.map((item, idx) => (
            <div
              key={item._id || idx}
              className="w-[320px] sm:w-[360px] md:w-[380px] shrink-0 bg-[#262626] border border-amber-500/40 hover:border-amber-500/80 rounded-[12px] p-6 sm:p-7 shadow-2xl shadow-black/80 flex flex-col justify-between transition-all duration-300 min-h-[220px] group"
            >
              {/* Top Profile Header */}
              <div className="flex items-center gap-3.5 mb-4">
                <FeedbackAvatar user={item.userId} index={idx} />
                <div>
                  <h4 className="text-white font-bold italic text-sm sm:text-base truncate max-w-[170px]">
                    {item.userId?.username || 'Player'}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Message Body */}
              <p className="text-neutral-300 text-xs sm:text-sm italic leading-relaxed line-clamp-4 flex-1">
                "{item.message}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Navigation: Arrows & Active Dots */}
      <div className="flex items-center justify-center gap-5 relative z-10">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Feedback"
          className="text-neutral-400 hover:text-white transition-colors p-2 cursor-pointer focus:outline-none"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* 5 Dots Indicator - Guaranteed always one active dot */}
        <div className="flex items-center gap-2.5">
          {[...Array(TOTAL_DOTS)].map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => handleDotClick(dotIdx)}
              aria-label={`Go to feedback page ${dotIdx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeDot === dotIdx
                  ? 'w-2.5 h-2.5 bg-white scale-125'
                  : 'w-2 h-2 bg-neutral-600 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Feedback"
          className="text-neutral-400 hover:text-white transition-colors p-2 cursor-pointer focus:outline-none"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
