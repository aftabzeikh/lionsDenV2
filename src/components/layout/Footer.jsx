import React from 'react';
import { Phone } from 'lucide-react';

// Brand & Social Assets
import logoSvg from '../../assets/images/logo.svg';
import flagImg from '../../assets/images/Flag.png';
import fbIcon from '../../assets/images/social-icons/fb-footer.png';
import instaIcon from '../../assets/images/social-icons/insta-footer.png';
import tiktokIcon from '../../assets/images/social-icons/tiktok-footer.png';
import ytIcon from '../../assets/images/social-icons/yt-footer.png';

// Store Badges
import appleStoreBadge from '../../assets/images/social-icons/AppleStore-footer.png';
import googlePlayBadge from '../../assets/images/social-icons/GooglePlay-footer.png';

export const Footer = () => {
  const currentYear = 2026;

  const socialLinks = [
   { name: 'Facebook', icon: fbIcon, href: 'https://www.tiktok.com/@lionsdengame' },
      { name: 'Instagram', icon: instaIcon, href: 'https://www.instagram.com/lionsdengames' },
      { name: 'YouTube', icon: ytIcon, href: 'https://www.youtube.com/@lionsdengames' },
      { name: 'TikTok', icon: tiktokIcon, href: 'https://www.tiktok.com/@lionsdengame' },  
  ];

  const gameLinks = [
    { label: 'About', href: '#about' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Coverage Areas', href: '#coverage' },
  ];

  const trustLinks = [
    { label: 'Terms and Conditions', href: '#terms' },
    { label: 'Privacy', href: '#privacy' },
    { label: 'Promo Rules', href: '#promo-rules' },
  ];

  return (
    <footer className="w-full bg-[#121212] text-white border-t border-neutral-800/80 font-sans select-none">
      {/* Veteran Owned & Operated Continuous Auto-Slide Marquee Banner */}
      <div className="w-full bg-[#1e1e1e] border-b border-neutral-800/80 py-3 overflow-hidden relative">
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-8 shrink-0">
              <img
                src={flagImg}
                alt="US Flag"
                className="w-6 sm:w-7 h-auto object-contain shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              />
              <p className="text-white font-bold italic text-xs sm:text-sm tracking-wide">
                Veteran Owned and Operated; being veteran-owned and operated is more than just a label. It represents a commitment to service, leadership, and excellence that extends beyond military duty and into the realm of business and entrepreneurship.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-10">
          
          {/* Column 1: Brand Logo, Description & Social Icons */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-4">
            <a href="/" className="inline-block transition-transform hover:opacity-95">
              <img
                src={logoSvg}
                alt="Lions Den Games"
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </a>

            <p className="text-neutral-300 text-sm sm:text-[15px] italic leading-relaxed max-w-md">
              Join us at Lionsdengames® and discover the future of online gaming, where art, entertainment, and excitement converge to create an unforgettable journey.
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="w-9 h-9 rounded-full overflow-hidden transition-all duration-300 hover:scale-110 hover:brightness-110 shadow-md shadow-black/40"
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: GAMES Links */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <h3 className="text-white font-bold italic tracking-wider text-base uppercase mb-1">
              GAMES
            </h3>
            <ul className="space-y-2.5">
              {gameLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-300 hover:text-amber-400 italic text-sm transition-colors duration-200 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: TRUST & SAFETY Links */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <h3 className="text-white font-bold italic tracking-wider text-base uppercase mb-1">
              TRUST & SAFETY
            </h3>
            <ul className="space-y-2.5">
              {trustLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-300 hover:text-amber-400 italic text-sm transition-colors duration-200 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: ADDRESS & Contact */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <h3 className="text-white font-bold italic tracking-wider text-base uppercase mb-1">
              ADDRESS
            </h3>
            <div className="text-neutral-300 italic text-sm space-y-1 leading-relaxed">
              <p>J&K Studios</p>
              <p>1925 Grand Ave. Suite 127</p>
              <p>Billings, Montana 59102</p>
              <div className="flex items-center gap-2 pt-1.5">
                <Phone className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <a
                  href="tel:254-290-9210"
                  className="text-neutral-200 hover:text-amber-400 font-semibold tracking-wide transition-colors"
                >
                  254-290-9210
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Middle Compliance & Store Downloads Bar */}
        <div className="pt-6 pb-2 border-t border-neutral-800/80 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: 18+ Badge & Disclaimer */}
          <div className="flex items-start sm:items-center gap-3.5 max-w-3xl">
            <span className="border border-amber-400/80 text-amber-400 text-xs font-bold rounded px-1.5 py-0.5 shrink-0 mt-0.5 sm:mt-0 tracking-wider">
              18+
            </span>
            <p className="text-neutral-400 text-xs sm:text-[13px] italic leading-relaxed">
              NO PURCHASE IS NECESSARY to play on Lions Den Games. ALL GAMES ARE VOID WHERE PROHIBITED BY LAW. For detailed rules and eligibility, please review our Terms of Use. Lions Den Games is a free social gaming platform intended strictly for entertainment and amusement purposes.
            </p>
          </div>

          {/* Right: App Store & Google Play Badges */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#app-store"
              className="inline-block transition-transform duration-200 hover:scale-105 focus:outline-none"
              aria-label="Download on App Store"
            >
              <img
                src={appleStoreBadge}
                alt="App Store"
                className="h-10 sm:h-11 w-auto object-contain rounded-lg shadow-md"
              />
            </a>
            <a
              href="#google-play"
              className="inline-block transition-transform duration-200 hover:scale-105 focus:outline-none"
              aria-label="Get it on Google Play"
            >
              <img
                src={googlePlayBadge}
                alt="Google Play"
                className="h-10 sm:h-11 w-auto object-contain rounded-lg shadow-md"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="w-full bg-[#0a0a0a] py-4 border-t border-neutral-900 px-4 text-center">
        <p className="text-neutral-400 text-xs sm:text-sm italic">
          © {currentYear} Lions Den Games. Licensed by JK Digitals. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
