import React, { useState } from 'react';
import { AuthHeader } from '../../components/layout/AuthHeader';
import { Footer } from '../../components/layout/Footer';
import { LobbySidebar } from '../../components/layout/LobbySidebar';
import { GamesSection } from '../../components/gaming/GamesSection';
import { JackpotTicker } from '../../components/gaming/JackpotTicker';
import { PromotionSlider } from '../../components/gaming/PromotionSlider';
import { CommunitySection } from '../../components/gaming/CommunitySection';
import { AllDayBonuses } from '../../components/gaming/AllDayBonuses';
import { LeaderBoard } from '../../components/gaming/LeaderBoard';
import { MobileAppSection } from '../../components/gaming/MobileAppSection';
import { FeedbackSection } from '../../components/gaming/FeedbackSection';
import { OpenDenSection } from '../../components/gaming/OpenDenSection';
import { FaqSection } from '../../components/gaming/FaqSection';
import { JoinPrideSection } from '../../components/gaming/JoinPrideSection';
import { useTheme } from '../../theme/ThemeProvider';
import { useSelector } from 'react-redux';
import { BestSlotsSection } from '../../components/gaming/BestSlotsSection';
import { GameProvidersSection } from '../../components/gaming/GameProvidersSection';
import { UnleashExperienceSection } from '../../components/gaming/UnleashExperienceSection';
import NewGamesSection from '../../components/gaming/NewGamesSection';

export const LobbyPage = () => {
  const { theme } = useTheme();
  const reduxAuth = useSelector((state) => state.auth) || {};
  const [activeSidebarItem, setActiveSidebarItem] = useState('Home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const user = reduxAuth.user || {
    name: 'LionKing_77',
    email: 'player@lionsdengaming.com',
    vipTier: 'Gold VIP',
    level: 42,
    vipPoints: 8450,
    wallets: {
      stackingWallet: 2000.00,
      purchasingWallet: 3500.00,
      winningWallet: 1502.36,
    },
  };

  const handleSidebarSelect = (itemName, targetId) => {
    setActiveSidebarItem(itemName);
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-text flex flex-col relative selection:bg-primary selection:text-slate-950 font-sans">

      {/* 1. Permanently Fixed Top Header */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full bg-[#181818] shadow-2xl border-b border-neutral-900">
        <AuthHeader
          user={user}
          wallets={user.wallets}
          className="border-b border-neutral-900/90"
        />
      </div>

      {/* 2. Main Body: Gaming Area with Sidebar followed by Full-Width Sections */}
      <div className="pt-[68px] min-h-screen w-full bg-[#262626] flex-1 flex flex-col">

        {/* Top Gaming Container: Sidebar is sticky alongside JackpotTicker, PromotionSlider, and GamesSection ONLY */}
        <div className="relative w-full flex items-start">

          {/* Left Column: Sticky Sidebar within the Gaming Area */}
          <aside
            className={`hidden lg:flex sticky top-[68px] h-[calc(100vh-68px)] z-40 transition-all duration-300 shrink-0 flex-col bg-[#181818] border-r border-neutral-800/80 shadow-2xl ${isSidebarCollapsed ? 'w-16' : 'w-60'
              }`}
          >
            <LobbySidebar
              activeItem={activeSidebarItem}
              onSelectItem={handleSidebarSelect}
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={setIsSidebarCollapsed}
            />
          </aside>

          {/* Right Column: Gaming Feed (Jackpot, Promotions, Games) */}
          <div className="flex-1 min-w-0 space-y-5 sm:space-y-6 pb-8">

            {/* Sticky Jackpot Ticker - Fixed at top below Header */}
            <div className="sticky top-[68px] z-30 bg-[#262626]/95 backdrop-blur-md p-2">
              <JackpotTicker />
            </div>

            {/* Full-Width Promotions Multi-Card Slider */}
            <div className="w-full overflow-hidden">
              <PromotionSlider />
            </div>

            {/* Dynamic Games Section with Providers & Category Filtering */}
            <GamesSection authenticated={true} />

          </div>

        </div>

        {/* Full-Width Content Feed below GamesSection (No sidebar) */}
        <div className="w-full">
          <BestSlotsSection authenticated={true} />

          {/* Game Providers Marquee Slider Section */}
          <GameProvidersSection authenticated={true} />

          {/* Unleash Your Gaming Experience Feature Section */}
          <UnleashExperienceSection authenticated={true} />

          {/* Next Level Releases New Games Section */}
          <NewGamesSection authenticated={true} />

          {/* Community Section */}
          <CommunitySection />

          {/* All Day Bonuses Continuous Slider Section */}
          <AllDayBonuses />

          {/* Leader Board Section */}
          <LeaderBoard />

          {/* Mobile Application Section */}
          <MobileAppSection />

          {/* Feedback / Community Voices Section */}
          <FeedbackSection />

          {/* Open Den / Featured Experience Section */}
          <OpenDenSection />

          {/* FAQ Section */}
          <FaqSection />
        </div>

        {/* 3. Footer */}
        <Footer />

      </div>

    </div>
  );
};
