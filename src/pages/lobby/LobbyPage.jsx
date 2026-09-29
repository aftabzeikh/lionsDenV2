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

      {/* 2. Main Body with Fixed Left Sidebar & Scrollable Main Gaming Feed */}
      <div className="pt-[68px] min-h-screen w-full bg-[#262626] flex-1 flex flex-col">
        
        {/* Left Column: Permanently Fixed Sidebar (No gap below header, touches left edge, bg-[#181818]) */}
        <aside
          className={`hidden lg:flex fixed top-[68px] bottom-0 left-0 z-40 transition-all duration-300 flex-col bg-[#181818] border-r border-neutral-800/80 shadow-2xl ${
            isSidebarCollapsed ? 'w-16' : 'w-60'
          }`}
        >
          <LobbySidebar
            activeItem={activeSidebarItem}
            onSelectItem={handleSidebarSelect}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={setIsSidebarCollapsed}
          />
        </aside>

        {/* Right Content Area: Offset by Reduced Sidebar Width */}
        <div
          className={`flex-1 min-w-0 transition-all duration-300 ${
            isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-60'
          }`}
        >
          <main className="w-full space-y-5 sm:space-y-6 pb-12">
            
            {/* Sticky Jackpot Ticker - Fixed at top below Header, to the right of fixed Sidebar */}
            <div className="sticky top-[68px] z-30 bg-[#262626]/95 backdrop-blur-md p-2">
              <JackpotTicker />
            </div>

            {/* Full-Width Promotions Multi-Card Slider */}
            <div className="w-full overflow-hidden">
              <PromotionSlider />
            </div>

            {/* Dynamic Games Section with Providers & Category Filtering */}
            <GamesSection authenticated={true}/>

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

            {/* Join The Pride Section */}
            <JoinPrideSection />

          </main>

          {/* 3. Footer */}
          <Footer />
        </div>

      </div>

    </div>
  );
};
