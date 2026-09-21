import React from 'react';

// Import platform logos from src/assets/images/platformLogo
import GameVaultLogo from '../../assets/images/platformLogo/GameVaultLogo.png';
import GoldenDragonLogo from '../../assets/images/platformLogo/GoldenDragonLogo.png';
import JuwaLogo from '../../assets/images/platformLogo/JuwaLogo.png';
import MilkywayLogo from '../../assets/images/platformLogo/MilkywayLogo.png';
import OrionStarsLogo from '../../assets/images/platformLogo/OrionStarsLogo.png';
import PandaMasterLogo from '../../assets/images/platformLogo/PandaMasterLogo.png';
import RiverSweepsLogo from '../../assets/images/platformLogo/RiverSweepsLogo.png';
import VblinkLogo from '../../assets/images/platformLogo/Vblink Logo.png';
import VegasXLogo from '../../assets/images/platformLogo/VegasXLogo.png';
import GameLogo from '../../assets/images/platformLogo/gamelogo.png';
import providerIcon from '../../assets/images/table-icon.svg';

const providersList = [
  { id: 'orion-stars', name: 'Orion Stars', logo: OrionStarsLogo },
  { id: 'panda-master', name: 'Panda Master', logo: PandaMasterLogo },
  { id: 'vblink', name: 'Vblink', logo: VblinkLogo },
  { id: 'vegas-x', name: 'Vegas X', logo: VegasXLogo },
  { id: 'golden-dragon', name: 'Golden Dragon', logo: GoldenDragonLogo },
  { id: 'game-vault', name: 'Game Vault', logo: GameVaultLogo },
  { id: 'juwa', name: 'Juwa', logo: JuwaLogo },
  { id: 'milky-way', name: 'Milkyway', logo: MilkywayLogo },
  { id: 'river-sweeps', name: 'River Sweeps', logo: RiverSweepsLogo },
  { id: 'game-logo', name: 'Game Logo', logo: GameLogo },
];

export const GameProvidersSection = () => {
  return (
    <div className="w-full mt-14 sm:mt-20 select-none relative">
      {/* Section Header: Dealer/Casino Icon + Game Providers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-3">
          {/* Circular Icon Badge */}
          <img src={providerIcon} alt="provider-icon" className="w-8 h-8" />

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-black italic tracking-wide text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Game Providers
          </h3>
        </div>
      </div>

      {/* Full Width Continuous Marquee Slider Track with #262626 Background (7.5 slides visible on screen) */}
      <div className="w-full bg-[#262626] border-y border-neutral-700/60 py-5 sm:py-7 overflow-hidden relative shadow-inner">
        {/* Marquee Track */}
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {/* 3 Sets ensure a completely continuous seamless infinite loop */}
          {[...Array(3)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8 px-3 sm:px-4 shrink-0">
              {providersList.map((provider) => (
                <div
                  key={`${setIdx}-${provider.id}`}
                  className="flex items-center justify-center h-14 sm:h-16 md:h-18 lg:h-20 w-[11.5vw] min-w-[125px] max-w-[165px] px-2 py-1 cursor-pointer transition-all duration-300 hover:scale-110 hover:brightness-125 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
                >
                  <img
                    src={provider.logo}
                    alt={provider.name}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain pointer-events-none"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
