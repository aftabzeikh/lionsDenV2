import React from 'react';
import { X, Home, Info, Smartphone, Mail, MapPin } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { ThemeSwitcher } from '../common/ThemeSwitcher';

const navItems = [
  { label: 'Home', icon: Home, href: '#', active: true },
  { label: 'About', icon: Info, href: '#about' },
  { label: 'Get the App', icon: Smartphone, href: '#get-app' },
  { label: 'Contact', icon: Mail, href: '#contact' },
  { label: 'Coverage Areas', icon: MapPin, href: '#coverage' },
];

export const MobileNav = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 bottom-0 left-0 w-[85%] max-w-sm bg-black border-r border-neutral-800 p-5 flex flex-col justify-between shadow-2xl z-50 overflow-y-auto">
        <div>
          {/* Top bar */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <Logo height="h-8" />
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Auth Buttons */}
          <div className="grid grid-cols-2 gap-2.5 my-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-neutral-700 text-white font-black text-xs uppercase tracking-wider hover:border-amber-400 hover:text-amber-400 transition-colors"
            >
              SIGN IN
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={onClose}
              className="w-full text-xs font-black uppercase tracking-wider"
            >
              JOIN NOW
            </Button>
          </div>

          {/* Nav links */}
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold transition-all ${
                    item.active
                      ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="pt-6 border-t border-neutral-800 mt-6 text-center">
          <p className="text-xs text-neutral-500">
            Lions Den Games • All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};
