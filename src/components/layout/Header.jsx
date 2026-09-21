import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { MobileNav } from './MobileNav';
import { useTheme } from '../../theme/ThemeProvider';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');
const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Get the App', href: '#get-app' },
    { name: 'Contact', href: '#contact' },
    { name: 'Coverage Areas', href: '#coverage' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-black ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md shadow-2xl shadow-black/80 border-b border-white/10 py-3'
            : 'bg-black border-b border-neutral-900 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center">
            <Logo height="h-9 sm:h-11 md:h-12" />
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = activeNav === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveNav(link.name)}
                  className={`text-sm lg:text-base font-bold italic transition-all duration-200 tracking-wide select-none ${
                    isActive
                      ? 'text-primary font-black drop-shadow-[0_0_8px_rgba(255,200,0,0.4)]'
                      : 'text-white hover:text-primary'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right: Actions (Sign In + Join Now + Theme Switcher) */}
          <div className="flex items-center gap-3 sm:gap-5">
            
            {/* SIGN IN Text Button */}
            <button
              type="button"
              className="text-sm lg:text-base font-black italic tracking-wider uppercase text-white hover:text-primary transition-colors px-2 py-1 select-none cursor-pointer"
            >
              SIGN IN
            </button>

            {/* JOIN NOW Primary Button with exact specification */}
            <Button
              variant="primary"
              size="md"
              className="text-xs sm:text-sm font-black italic tracking-wider"
            >
              JOIN NOW
            </Button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              className="md:hidden p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white hover:text-primary focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
};
