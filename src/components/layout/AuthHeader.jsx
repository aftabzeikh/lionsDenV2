import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  Bell, 
  User, 
  Menu, 
  X, 
  Wallet, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  History, 
  Settings, 
  LogOut, 
  Plus, 
  CheckCheck,
  CreditCard,
  Trophy
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { useTheme } from '../../theme/ThemeProvider';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

// Coin Assets
import goldCoin from '../../assets/images/coins/gold.svg';
import silverCoin from '../../assets/images/coins/silver.svg';
import bronzeCoin from '../../assets/images/coins/bronze.svg';

export const AuthHeader = ({
  user: propUser,
  wallets: propWallets,
  notificationCount: propNotificationCount = 10,
  onGetLdc,
  onNavigate,
  className = '',
}) => {
  const dispatch = useDispatch();
  const reduxAuth = useSelector((state) => state.auth) || {};
  const { theme } = useTheme();

  // Scroll state for header backdrop
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  // Dropdown States
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Refs for click outside
  const walletRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Wallet balances with default demo values matching the 7002.36 specification
  const defaultWallets = {
    stackingWallet: 2000.00,
    purchasingWallet: 3500.00,
    winningWallet: 1502.36,
  };

  const walletData = propWallets || reduxAuth.user?.wallets || defaultWallets;
  
  const stackingWallet = Number(walletData.stackingWallet || 0);
  const purchasingWallet = Number(walletData.purchasingWallet || 0);
  const winningWallet = Number(walletData.winningWallet || 0);
  const totalSum = stackingWallet + purchasingWallet + winningWallet;

  // Format currency numbers nicely
  const formatNumber = (num) => {
    return Number(num).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // User details
  const currentUser = propUser || reduxAuth.user || {
    name: 'LionKing_77',
    email: 'player@lionsdengaming.com',
    vipTier: 'Gold VIP',
    avatar: null,
  };

  // Mock Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Daily Bonus Credited!',
      desc: 'You received 500.00 LDC from the Daily Spin.',
      time: '10m ago',
      unread: true,
      icon: '🎁',
    },
    {
      id: 2,
      title: 'Tournament Win!',
      desc: 'Placed #2 in Vegas Rush! +1,250.00 LDC Winning Wallet.',
      time: '1h ago',
      unread: true,
      icon: '🏆',
    },
    {
      id: 3,
      title: 'New Game Available',
      desc: 'Check out the new Buffalo Gold Blitz slot game.',
      time: '3h ago',
      unread: false,
      icon: '🎰',
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length || propNotificationCount;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (walletRef.current && !walletRef.current.contains(event.target)) {
        setIsWalletOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsWalletOpen(false);
        setIsNotificationsOpen(false);
        setIsProfileOpen(false);
        setIsMobileNavOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Get the App', href: '#get-app' },
    { name: 'Contact', href: '#contact' },
    { name: 'Coverage Areas', href: '#coverage' },
  ];

  const handleNavClick = (linkName, href) => {
    setActiveNav(linkName);
    if (onNavigate) {
      onNavigate(linkName, href);
    }
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md shadow-2xl shadow-black/90 border-b border-neutral-800/80 py-2.5'
            : 'bg-black/90 backdrop-blur-sm border-b border-neutral-900 py-3.5'
        } ${className}`}
      >
        <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center shrink-0">
            <Logo height="h-8 sm:h-10 md:h-11" />
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = activeNav === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavClick(link.name, link.href)}
                  className={`text-sm xl:text-base font-bold italic tracking-wide transition-all duration-200 select-none ${
                    isActive
                      ? 'text-[#F8C45E] font-black drop-shadow-[0_0_10px_rgba(248,196,94,0.45)]'
                      : 'text-neutral-200 hover:text-[#F8C45E]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right: Authenticated Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 md:gap-4.5">
            
            {/* 1. Wallet Sum & Coins Dropdown */}
            <div className="relative" ref={walletRef}>
              <button
                type="button"
                onClick={() => {
                  setIsWalletOpen(!isWalletOpen);
                  setIsNotificationsOpen(false);
                  setIsProfileOpen(false);
                }}
                aria-expanded={isWalletOpen}
                aria-label="Wallet breakdown dropdown"
                className={`flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer select-none ${
                  isWalletOpen
                    ? 'bg-neutral-900 border-[#F8C45E] shadow-[0_0_15px_rgba(248,196,94,0.3)] ring-1 ring-[#F8C45E]/50'
                    : 'bg-black/80 hover:bg-neutral-900/90 border-[#F8C45E]/80 hover:border-[#F8C45E] shadow-[0_0_8px_rgba(248,196,94,0.15)]'
                }`}
              >
                {/* Default Gold Coin Icon */}
                <img
                  src={goldCoin}
                  alt="Gold Coin"
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain shrink-0 drop-shadow-[0_0_6px_rgba(248,196,94,0.5)]"
                />

                {/* Sum of all 3 wallets */}
                <span className="text-xs sm:text-sm md:text-[15px] font-black tracking-wide text-white font-mono">
                  {formatNumber(totalSum)}
                </span>

                {/* Chevron Dropdown Arrow */}
                <ChevronDown
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F8C45E] transition-transform duration-200 ${
                    isWalletOpen ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              {/* Wallet Details Dropdown Popover */}
              {isWalletOpen && (
                <div className="absolute right-0 mt-2 w-44 sm:w-48 rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-[#F8C45E]/40 shadow-[0_12px_35px_rgba(0,0,0,0.85)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  
                  {/* Wallets List: 1. Stacking (Bronze), 2. Purchasing (Silver), 3. Winning (Gold) */}
                  <div className="space-y-1.5">
                    
                    {/* First: Stacking Wallet (Bronze Coin) */}
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800/80 border border-neutral-800/60 transition-colors">
                      <img
                        src={bronzeCoin}
                        alt="Bronze Coin"
                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow-[0_0_6px_rgba(180,83,9,0.4)]"
                      />
                      <span className="text-xs sm:text-sm font-black text-amber-200/90 font-mono tracking-wide">
                        {formatNumber(stackingWallet)}
                      </span>
                    </div>

                    {/* Second: Purchasing Wallet (Silver Coin) */}
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800/80 border border-neutral-800/60 transition-colors">
                      <img
                        src={silverCoin}
                        alt="Silver Coin"
                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow-[0_0_6px_rgba(148,163,184,0.4)]"
                      />
                      <span className="text-xs sm:text-sm font-black text-slate-200 font-mono tracking-wide">
                        {formatNumber(purchasingWallet)}
                      </span>
                    </div>

                    {/* Third: Winning Wallet (Gold Coin) */}
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800/80 border border-[#F8C45E]/20 transition-colors">
                      <img
                        src={goldCoin}
                        alt="Gold Coin"
                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow-[0_0_8px_rgba(248,196,94,0.5)]"
                      />
                      <span className="text-xs sm:text-sm font-black text-[#F8C45E] font-mono tracking-wide">
                        {formatNumber(winningWallet)}
                      </span>
                    </div>

                  </div>

                </div>
              )}
            </div>

            {/* 2. Notification Bell Icon with Badge */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsWalletOpen(false);
                  setIsProfileOpen(false);
                }}
                aria-label="Notifications"
                className={`relative p-2 rounded-full transition-all duration-200 cursor-pointer ${
                  isNotificationsOpen
                    ? 'text-[#F8C45E] bg-neutral-900 ring-1 ring-[#F8C45E]/40'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900/60'
                }`}
              >
                <Bell className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                
                {/* Notification Badge */}
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#F8C45E] text-slate-950 text-[10px] font-black font-mono w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full flex items-center justify-center ring-2 ring-black shadow-md">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Popover */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2.5 w-76 sm:w-84 rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-neutral-800 shadow-[0_15px_40px_rgba(0,0,0,0.85)] p-3.5 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between pb-2.5 border-b border-neutral-800">
                    <div className="flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-[#F8C45E]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">
                        Notifications
                      </span>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllAsRead}
                        className="text-[11px] text-[#F8C45E] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCheck className="w-3 h-3" />
                        Mark read
                      </button>
                    )}
                  </div>

                  <div className="mt-2.5 space-y-2 max-h-64 overflow-y-auto pr-1">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-2.5 rounded-xl border transition-colors flex items-start gap-2.5 ${
                          notif.unread
                            ? 'bg-neutral-900/90 border-[#F8C45E]/30'
                            : 'bg-neutral-900/40 border-neutral-800/60 opacity-75'
                        }`}
                      >
                        <span className="text-base shrink-0">{notif.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">{notif.title}</p>
                          <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-2">{notif.desc}</p>
                          <p className="text-[9px] text-[#F8C45E]/80 mt-1 font-mono">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. User Profile Avatar */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsWalletOpen(false);
                  setIsNotificationsOpen(false);
                }}
                aria-label="User profile menu"
                className={`p-1 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  isProfileOpen
                    ? 'ring-2 ring-[#F8C45E] bg-neutral-900'
                    : 'hover:ring-2 hover:ring-neutral-700'
                }`}
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-700 border border-neutral-600 flex items-center justify-center text-white overflow-hidden shadow-inner">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-200" />
                  )}
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2.5 w-60 sm:w-64 rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-neutral-800 shadow-[0_15px_40px_rgba(0,0,0,0.85)] p-3 z-50 animate-in fade-in zoom-in-95 duration-200">
                  
                  {/* User Profile Card */}
                  <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#F8C45E]/10 border border-[#F8C45E]/40 flex items-center justify-center text-[#F8C45E]">
                        <User className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-white truncate">{currentUser.name}</p>
                        <span className="inline-block mt-0.5 text-[10px] font-bold text-[#F8C45E] bg-[#F8C45E]/10 px-1.5 py-0.2 rounded border border-[#F8C45E]/20">
                          {currentUser.vipTier}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-1 text-xs font-semibold text-neutral-300">
                    <button
                      type="button"
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-neutral-900 hover:text-[#F8C45E] transition-colors cursor-pointer text-left"
                    >
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span>VIP Club & Rewards</span>
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-neutral-900 hover:text-[#F8C45E] transition-colors cursor-pointer text-left"
                    >
                      <History className="w-4 h-4 text-neutral-400" />
                      <span>Transaction History</span>
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-neutral-900 hover:text-[#F8C45E] transition-colors cursor-pointer text-left"
                    >
                      <Settings className="w-4 h-4 text-neutral-400" />
                      <span>Account Settings</span>
                    </button>
                  </div>

                  <div className="my-2 border-t border-neutral-800" />

                  {/* Logout Button */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-red-950/40 text-red-400 hover:text-red-300 transition-colors cursor-pointer text-xs font-bold text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>

                </div>
              )}
            </div>

            {/* 4. GET LDC Golden Gradient Action Button */}
            <button
              type="button"
              onClick={onGetLdc}
              className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-black italic text-xs sm:text-sm tracking-wider uppercase text-slate-950 bg-gradient-to-r from-[#B77E15] via-[#F8C45E] to-[#B77E15] shadow-[0_0_15px_rgba(248,196,94,0.35)] hover:shadow-[0_0_25px_rgba(248,196,94,0.6)] hover:brightness-110 active:scale-98 transition-all cursor-pointer select-none"
            >
              GET LDC
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-[#F8C45E] focus:outline-none cursor-pointer"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

          </div>

        </div>
      </header>

      {/* Authenticated Mobile Navigation Drawer */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileNavOpen(false)}
          />

          {/* Drawer Menu */}
          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-neutral-950 border-l border-neutral-800 h-full p-5 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl animate-in slide-in-from-right duration-200">
            
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <Logo height="h-8" />
                <button
                  type="button"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile User Card */}
              <div className="mt-4 p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#F8C45E]/20 text-[#F8C45E] flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white">{currentUser.name}</p>
                    <p className="text-[10px] text-[#F8C45E] font-bold">{currentUser.vipTier}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onGetLdc}
                  className="px-3 py-1 rounded-full text-[11px] font-black bg-gradient-to-r from-amber-500 to-[#F8C45E] text-slate-950 uppercase"
                >
                  GET LDC
                </button>
              </div>

              {/* Mobile Wallets Breakdown Section */}
              <div className="mt-4 p-2.5 rounded-2xl bg-neutral-900/90 border border-[#F8C45E]/30 space-y-1.5">
                
                {/* Stacking */}
                <div className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-xl bg-neutral-950/60 border border-neutral-800/60">
                  <img src={bronzeCoin} alt="Bronze Coin" className="w-5 h-5" />
                  <span className="font-bold text-amber-200/90 font-mono">{formatNumber(stackingWallet)}</span>
                </div>

                {/* Purchasing */}
                <div className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-xl bg-neutral-950/60 border border-neutral-800/60">
                  <img src={silverCoin} alt="Silver Coin" className="w-5 h-5" />
                  <span className="font-bold text-slate-200 font-mono">{formatNumber(purchasingWallet)}</span>
                </div>

                {/* Winning */}
                <div className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-xl bg-neutral-950/60 border border-[#F8C45E]/20">
                  <img src={goldCoin} alt="Gold Coin" className="w-5 h-5" />
                  <span className="font-bold text-[#F8C45E] font-mono">{formatNumber(winningWallet)}</span>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="mt-5 space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeNav === link.name;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => {
                        handleNavClick(link.name, link.href);
                        setIsMobileNavOpen(false);
                      }}
                      className={`block px-3 py-2.5 rounded-xl text-sm font-bold italic tracking-wide transition-all ${
                        isActive
                          ? 'bg-[#F8C45E]/10 text-[#F8C45E] border-l-4 border-[#F8C45E]'
                          : 'text-neutral-200 hover:bg-neutral-900 hover:text-[#F8C45E]'
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </nav>

            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-neutral-800 space-y-2">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-red-400 font-bold text-xs hover:bg-neutral-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
