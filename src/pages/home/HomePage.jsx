import React from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { HeroSection } from '../../components/gaming/HeroSection';
import { GamesSection } from '../../components/gaming/GamesSection';
import { CommunitySection } from '../../components/gaming/CommunitySection';
import { MobileAppSection } from '../../components/gaming/MobileAppSection';
import { AllDayBonuses } from '../../components/gaming/AllDayBonuses';
import { LeaderBoard } from '../../components/gaming/LeaderBoard';
import { FeedbackSection } from '../../components/gaming/FeedbackSection';
import { OpenDenSection } from '../../components/gaming/OpenDenSection';
import { FaqSection } from '../../components/gaming/FaqSection';
import { JoinPrideSection } from '../../components/gaming/JoinPrideSection';
import { ThemeDecorations } from '../../components/gaming/ThemeDecorations';
import { useTheme } from '../../theme/ThemeProvider';

export const HomePage = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-text flex flex-col relative selection:bg-primary selection:text-slate-950 font-sans">
      {/* Seasonal Ambient Theme Atmosphere (Snow, Bats, Autumn Leaves, Golden Stars) */}
      {/* <ThemeDecorations /> */}

      {/* Sticky Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <HeroSection />

        {/* Dynamic Games Section with Providers & Category Filtering */}
        <GamesSection />

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

      {/* Footer */}
      <Footer />
    </div>
  );
};
