import React from 'react';
import lionCommunityImg from '../../assets/images/community/lion-community.png';
import fbIcon from '../../assets/images/community/fb.png';
import instaIcon from '../../assets/images/community/insta.png';
import ytIcon from '../../assets/images/community/yt.png';
import tiktokIcon from '../../assets/images/community/tiktok.png';

export const CommunitySection = () => {
  const socialFollowLinks = [
    { name: 'Facebook', icon: fbIcon, href: 'https://facebook.com' },
    { name: 'Instagram', icon: instaIcon, href: 'https://instagram.com' },
    { name: 'YouTube', icon: ytIcon, href: 'https://youtube.com' },
    { name: 'TikTok', icon: tiktokIcon, href: 'https://tiktok.com' },
  ];

  return (
    <section className="relative w-full pt-12 sm:pt-16 pb-8 lg:pb-0 bg-[#181818] overflow-hidden select-none border-t border-neutral-900">
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          
          {/* Left Column: Community Info & Follow Us Card */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6 pb-6 lg:pb-16">
            
            {/* Tagline & Main Title */}
            <div>
              <p className="text-amber-400 font-extrabold uppercase tracking-widest text-xs sm:text-sm mb-2 drop-shadow-sm">
                THE FUN NEVER STOPS
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black italic tracking-wide text-white uppercase leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                JOIN OUR COMMUNITY
              </h2>
            </div>

            {/* Description Paragraphs */}
            <div className="space-y-4 max-w-xl text-neutral-300 text-sm sm:text-base italic leading-relaxed">
              <p>
                Claim 1 free Lionsdengames® Coin every day just for logging in. No purchase necessary—register today to start playing instantly.
              </p>
              <p>
                Boost your first deposit with a{' '}
                <span className="text-amber-400 font-extrabold not-italic">50% MATCH BONUS</span> on your initial purchase. Secure your rewards and jump straight into the action.
              </p>
            </div>

            {/* FOLLOW US ON Card */}
            <div className="w-full max-w-sm pt-2">
              <div className="bg-[#181818]/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-amber-500/30 shadow-[0_0_25px_rgba(245,158,11,0.15)] flex flex-col items-center text-center">
                <h3 className="text-amber-400 font-black italic text-xl sm:text-2xl tracking-wider uppercase mb-5 drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]">
                  FOLLOW US ON
                </h3>
                
                {/* Social Icons Row - White Icons with Transparent Background */}
                <div className="flex items-center justify-center gap-5 sm:gap-6 w-full">
                  {socialFollowLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-all duration-300 hover:scale-120 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] cursor-pointer"
                    >
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Stable Lion Mascot */}
          <div className="lg:col-span-6 flex items-end justify-center lg:justify-end relative">
            <div className="relative w-full max-w-lg lg:max-w-xl">
              <img
                src={lionCommunityImg}
                alt="Lions Den Community Mascot"
                className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
