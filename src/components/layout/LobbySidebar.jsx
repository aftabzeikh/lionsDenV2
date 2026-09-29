import React, { useState, useEffect } from 'react';
import { Menu, ChevronLeft, ChevronRight, ChevronDown, Check } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProviders, fetchGamesData } from '../../redux/slices/gamesSlice';

// Sidebar Icons
import getLdcIcon from '../../assets/images/sidebar-icons/Get LDC 1.svg';
import referFriendIcon from '../../assets/images/sidebar-icons/Refer Friend 1.svg';
import referralCampaignIcon from '../../assets/images/sidebar-icons/Referral Campaign 1.svg';
import homeIcon from '../../assets/images/sidebar-icons/Home 1.svg';
import newGamesIcon from '../../assets/images/sidebar-icons/New Games 1.svg';
import hotTodayIcon from '../../assets/images/sidebar-icons/Hot Today Icon 1.svg';
import favIcon from '../../assets/images/sidebar-icons/Fav 1.svg';
import slotGamesIcon from '../../assets/images/sidebar-icons/Slots Games 1.svg';
import tableGamesIcon from '../../assets/images/sidebar-icons/Table Games 1.svg';
import fishingIcon from '../../assets/images/sidebar-icons/Fishing 1.svg';
import densClassicIcon from '../../assets/images/sidebar-icons/Den\'s Classic 1.svg';
import densExcitementIcon from '../../assets/images/sidebar-icons/Den\'s Excitement 1.svg';
import densExclusiveIcon from '../../assets/images/sidebar-icons/Den\'s Exclusive 1.svg';
import bestSlotsIcon from '../../assets/images/sidebar-icons/Best Slots 1.svg';
import liveTableIcon from '../../assets/images/sidebar-icons/Live Table Icon 1.svg';
import providersIcon from '../../assets/images/sidebar-icons/Providers 1.svg';
import bonusHuntIcon from '../../assets/images/sidebar-icons/Bonus Hunt 1.svg';
import cardGamesIcon from '../../assets/images/sidebar-icons/Card Games 1.svg';

export const LobbySidebar = ({
  activeItem = 'Home',
  onSelectItem,
  isCollapsed: propIsCollapsed,
  onToggleCollapse,
  className = '',
}) => {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentActive, setCurrentActive] = useState(activeItem);
  const [isProvidersOpen, setIsProvidersOpen] = useState(false);
  const reduxProviders = useSelector(selectProviders) || [];

  // Fetch games & providers data if not yet loaded
  useEffect(() => {
    if (reduxProviders.length === 0) {
      dispatch(fetchGamesData());
    }
  }, [dispatch, reduxProviders.length]);

  const collapsed = propIsCollapsed !== undefined ? propIsCollapsed : isCollapsed;

  const toggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse(!collapsed);
    } else {
      setIsCollapsed(!collapsed);
    }
  };

  const handleItemClick = (name, targetId) => {
    setCurrentActive(name);
    if (onSelectItem) {
      onSelectItem(name, targetId);
    }
  };

  const getProviderName = (prov) => {
    if (typeof prov === 'string') return prov;
    return prov.displayName || prov.name || prov.title || prov.filter || 'Provider';
  };

  const getProviderFilter = (prov) => {
    if (typeof prov === 'string') return prov;
    return prov.filter || prov.displayName || prov.name || '';
  };

  const navMenuItems = [
    { id: 'home', name: 'Home', icon: homeIcon, target: 'home' },
    { id: 'new-games', name: 'New Games', icon: newGamesIcon, target: 'new-games' },
    { id: 'hot-today', name: 'Hot Today', icon: hotTodayIcon, target: 'hot-today' },
    { id: 'favorites', name: 'Favorites', icon: favIcon, target: 'favorites' },
    { id: 'slot-games', name: 'Slot Games', icon: slotGamesIcon, target: 'slots' },
    { id: 'table-games', name: 'Table Games', icon: tableGamesIcon, target: 'table' },
    { id: 'fishing', name: 'Fishing', icon: fishingIcon, target: 'fishing' },
    { id: 'dens-classic', name: "Den's Classic", icon: densClassicIcon, target: 'dens-classic' },
    { id: 'dens-excitement', name: "Den's Excitement", icon: densExcitementIcon, target: 'dens-excitement' },
    { id: 'dens-exclusive', name: "Den's Exclusive", icon: densExclusiveIcon, target: 'dens-exclusive' },
    { id: 'best-slots', name: 'Best Slots', icon: bestSlotsIcon, target: 'best-slots' },
    { id: 'live-table-games', name: 'Live Table Games', icon: liveTableIcon, target: 'live_table' },
    { id: 'providers', name: 'Providers', icon: providersIcon, isExpandable: true },
    { id: 'bonus-hunt', name: 'Bonus Hunt', icon: bonusHuntIcon, target: 'bonus-hunt' },
    { id: 'card-games', name: 'Card Games', icon: cardGamesIcon, target: 'card-games' },
  ];

  const footerLinks = [
    { name: 'Contact Us', href: '#contact' },
    { name: 'Term & Conditions', href: '#terms' },
    { name: 'Privacy', href: '#privacy' },
    { name: 'Promo Rules', href: '#promo-rules' },
  ];

  return (
    <aside
      className={`h-full flex flex-col gap-2 select-none transition-all duration-300 bg-[#181818] p-2.5 ${
        collapsed ? 'w-16' : 'w-60'
      } ${className}`}
    >
      
      {/* 1. Fixed Collapse / Expand Button (Fixed at top of sidebar) */}
      <div className="shrink-0">
        <button
          type="button"
          onClick={toggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={`w-full h-10 rounded-xl bg-[#222222] hover:bg-neutral-800 border border-neutral-700/70 shadow-sm flex items-center transition-all duration-200 cursor-pointer ${
            collapsed ? 'justify-center px-1.5' : 'justify-between px-3.5'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {/* Hamburger Icon */}
            <Menu className="w-4 h-4 text-neutral-300 shrink-0 stroke-[2.2]" />

            {/* Collapse Text */}
            {!collapsed && (
              <span className="text-xs sm:text-sm font-black italic tracking-wide text-neutral-200 font-sans">
                Collapse
              </span>
            )}
          </div>

          {/* Chevron Indicator */}
          {!collapsed ? (
            <ChevronLeft className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          ) : (
            <ChevronRight className="w-3 h-3 text-neutral-400 shrink-0 hidden" />
          )}
        </button>
      </div>

      {/* 2. Scrollable Buttons & Menu Panel (Scrolls beneath the fixed Collapse button) */}
      <div className="flex-1 overflow-y-auto scrollbar-none pr-0.5 space-y-2">
        
        {/* Action Buttons (h-10) */}
        <div className="flex flex-col gap-2">
          
          {/* Get LDC (Red Pill) */}
          <button
            type="button"
            onClick={() => handleItemClick('Get LDC', 'get-ldc')}
            title="Get LDC"
            className={`w-full h-10 rounded-xl bg-gradient-to-r from-[#990000] via-[#CC0000] to-[#FF0000] border-2 border-amber-400/90 shadow-[0_0_12px_rgba(255,0,0,0.35)] flex items-center cursor-pointer hover:brightness-110 active:scale-98 transition-all group ${
              collapsed ? 'justify-center px-1.5' : 'gap-2.5 px-3.5'
            }`}
          >
            <img
              src={getLdcIcon}
              alt="Get LDC"
              className="w-5 h-5 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform shrink-0"
            />
            {!collapsed && (
              <span className="text-white font-black italic tracking-wide text-xs sm:text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-sans truncate">
                Get LDC
              </span>
            )}
          </button>

          {/* Refer Friends (Blue Pill) */}
          <button
            type="button"
            onClick={() => handleItemClick('Refer Friends', 'refer-friends')}
            title="Refer Friends"
            className={`w-full h-10 rounded-xl bg-gradient-to-r from-[#004899] via-[#0066CC] to-[#0088FF] border-2 border-amber-400/90 shadow-[0_0_12px_rgba(0,102,204,0.35)] flex items-center cursor-pointer hover:brightness-110 active:scale-98 transition-all group ${
              collapsed ? 'justify-center px-1.5' : 'gap-2.5 px-3.5'
            }`}
          >
            <img
              src={referFriendIcon}
              alt="Refer Friends"
              className="w-5 h-5 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform shrink-0"
            />
            {!collapsed && (
              <span className="text-white font-black italic tracking-wide text-xs sm:text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-sans truncate">
                Refer Friends
              </span>
            )}
          </button>

          {/* Referral Campaign (Green Pill) */}
          <button
            type="button"
            onClick={() => handleItemClick('Referral Campaign', 'referral-campaign')}
            title="Referral Campaign"
            className={`w-full h-10 rounded-xl bg-gradient-to-r from-[#005522] via-[#007733] to-[#00AA44] border-2 border-amber-400/90 shadow-[0_0_12px_rgba(0,170,68,0.35)] flex items-center cursor-pointer hover:brightness-110 active:scale-98 transition-all group ${
              collapsed ? 'justify-center px-1.5' : 'gap-2.5 px-3.5'
            }`}
          >
            <img
              src={referralCampaignIcon}
              alt="Referral Campaign"
              className="w-5 h-5 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform shrink-0"
            />
            {!collapsed && (
              <span className="text-white font-black italic tracking-wide text-xs sm:text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-sans truncate">
                Referral Campaign
              </span>
            )}
          </button>

        </div>

        {/* Main Navigation Panel with Linear Gradient #5C5C5C and No Border */}
        <div
          className={`w-full rounded-2xl flex flex-col shadow-xl shadow-black/40 transition-all ${
            collapsed ? 'p-1.5' : 'p-2.5'
          }`}
          style={{
            background: 'linear-gradient(180deg, #5C5C5C 0%, #5C5C5C 100%)',
          }}
        >
          
          {/* Navigation Items List */}
          <div className="space-y-1">
            {navMenuItems.map((item) => {
              const isParentActive = currentActive === item.name;

              if (item.isExpandable) {
                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => setIsProvidersOpen(!isProvidersOpen)}
                      title={collapsed ? item.name : undefined}
                      className={`w-full flex items-center rounded-xl text-left transition-all cursor-pointer ${
                        collapsed ? 'justify-center p-2' : 'justify-between px-3 py-2.5'
                      } ${
                        isParentActive
                          ? 'bg-black/25 text-white font-black'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
                        <img src={item.icon} alt={item.name} className="w-5 h-5 object-contain shrink-0" />
                        {!collapsed && (
                          <span className="text-sm font-black italic tracking-wide text-white font-sans">
                            {item.name}
                          </span>
                        )}
                      </div>
                      {!collapsed && (
                        <div className="flex items-center gap-1.5">
                          {reduxProviders.length > 0 && (
                            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-black/40 text-white/90">
                              {reduxProviders.length}
                            </span>
                          )}
                          <ChevronDown
                            className={`w-4 h-4 text-white/80 transition-transform duration-200 ${
                              isProvidersOpen ? 'rotate-180 text-white' : ''
                            }`}
                          />
                        </div>
                      )}
                    </button>

                    {/* Expandable Providers Submenu */}
                    {isProvidersOpen && !collapsed && (
                      <div className="pl-4 pr-1 py-1 space-y-0.5 border-l-2 border-white/30 ml-5 my-1 animate-in fade-in slide-in-from-top-1 duration-150">
                        {/* All Providers Option */}
                        <button
                          type="button"
                          onClick={() => handleItemClick('All Providers', 'games-section')}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs font-bold transition-all cursor-pointer ${
                            currentActive === 'All Providers'
                              ? 'bg-black/30 text-white font-black'
                              : 'text-white/90 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            currentActive === 'All Providers' ? 'bg-white' : 'bg-white/50'
                          }`} />
                          <span className="truncate italic">All Providers</span>
                        </button>

                        {/* List of Fetched Providers from GamesSection */}
                        {reduxProviders.length > 0 ? (
                          reduxProviders.map((prov) => {
                            const name = getProviderName(prov);
                            const isProvActive = currentActive === name;

                            return (
                              <button
                                key={getProviderFilter(prov) || name}
                                type="button"
                                onClick={() => handleItemClick(name, 'games-section')}
                                title={name}
                                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs font-bold transition-all cursor-pointer ${
                                  isProvActive
                                    ? 'bg-black/30 text-white font-black'
                                    : 'text-white/90 hover:text-white hover:bg-white/10'
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                  isProvActive ? 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]' : 'bg-white/50'
                                }`} />
                                <span className="truncate italic">{name}</span>
                              </button>
                            );
                          })
                        ) : (
                          <span className="block px-2.5 py-1 text-[11px] text-white/70 italic">
                            Loading providers...
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item.name, item.target)}
                  title={collapsed ? item.name : undefined}
                  className={`w-full flex items-center rounded-xl text-left transition-all cursor-pointer ${
                    collapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2.5'
                  } ${
                    isParentActive
                      ? 'bg-black/25 text-white font-black'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-5 h-5 object-contain shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                  />
                  {!collapsed && (
                    <span className="text-sm font-black italic tracking-wide text-white font-sans">
                      {item.name}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Divider & Footer Text Links */}
          {!collapsed && (
            <>
              <div className="my-3 border-t border-white/40" />
              <div className="px-3 py-1 space-y-2">
                {footerLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-xs sm:text-sm font-light italic text-white/90 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </>
          )}

        </div>

      </div>

    </aside>
  );
};
