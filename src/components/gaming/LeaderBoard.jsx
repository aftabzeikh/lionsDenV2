import React, { useState, useEffect } from 'react';
import bgLeaderboard from '../../assets/images/leaderBoard/bg-leaderBoard.png';
import machine777 from '../../assets/images/leaderBoard/777.png';
import rank1Img from '../../assets/images/leaderBoard/1.png';
import rank2Img from '../../assets/images/leaderBoard/2.png';
import rank3Img from '../../assets/images/leaderBoard/3.png';

// Fallback avatar gradients & icons for players without images
const avatarGradients = [
  'from-blue-600 via-indigo-500 to-purple-600',
  'from-purple-600 via-pink-500 to-red-500',
  'from-amber-500 via-orange-600 to-yellow-400',
  'from-emerald-500 via-teal-600 to-cyan-500',
  'from-rose-500 via-fuchsia-600 to-indigo-600',
  'from-cyan-500 via-blue-600 to-violet-600',
  'from-yellow-400 via-amber-500 to-orange-500',
];

// Helper to format Bet Amount
const formatBet = (bet) => {
  if (!bet || bet === '0' || parseFloat(bet) === 0) {
    return 'BONUS PLAY';
  }
  return `${bet} LDC`;
};

// Helper to format Winnings
const formatWinning = (win) => {
  if (!win) return '$0';
  const str = String(win).trim();
  if (str.startsWith('$')) return str;
  return `$${str}`;
};

// Player Avatar Component
const PlayerAvatar = ({ user, index, size = 'w-9 h-9' }) => {
  const [imgError, setImgError] = useState(false);
  const username = user?.username || 'Player';
  const initial = username.charAt(0).toUpperCase();
  const gradient = avatarGradients[index % avatarGradients.length];

  if (user?.image && !imgError) {
    return (
      <img
        src={user.image}
        alt={username}
        className={`${size} rounded-full object-cover border border-white/20 shadow-md`}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className={`${size} rounded-full bg-gradient-to-tr ${gradient} flex items-center justify-center font-black text-white text-xs border border-white/20 shadow-md shadow-black/40`}
    >
      {initial}
    </div>
  );
};

export const LeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://www.lionsprideengineering.com/api/v1/notifications/leaderboard', {
          headers: {
            'accept': 'application/json, text/plain, */*',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (isMounted && result?.success && Array.isArray(result.data) && result.data.length > 0) {
          setLeaderboardData(result.data);
        }
      } catch (err) {
        console.error('Failed to fetch leaderboard details, falling back to cache:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const top1 = leaderboardData[0];
  const top2 = leaderboardData[1];
  const top3 = leaderboardData[2];
  const restPlayers = leaderboardData.slice(3);

  return (
    <section
      className="relative w-full py-16 md:py-24 bg-cover bg-center overflow-hidden select-none"
      style={{
        backgroundImage: `url(${bgLeaderboard})`,
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Title Section with 777 Floating Machine */}
        <div className="relative text-center mb-12 sm:mb-16">
          {/* 777 Slot Machine Graphic on Top Right */}
          <div className="hidden sm:block absolute right-0 -top-6 md:-top-10 w-28 md:w-36 lg:w-44 animate-float">
            <img
              src={machine777}
              alt="777 Machine"
              className="w-full h-auto object-contain drop-shadow-[0_10px_25px_rgba(245,158,11,0.4)]"
            />
          </div>

          <p className="text-amber-400 font-extrabold uppercase tracking-widest text-xs sm:text-sm mb-2 drop-shadow-sm">
            HIGH SCORES & LEGENDS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-wide text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] uppercase">
            LEADER BOARD
          </h2>
          <p className="mt-3 text-neutral-300 text-xs sm:text-sm md:text-base italic max-w-xl mx-auto leading-relaxed">
            Celebrate the boldest bettors and their thrilling wins! Compare your bets and victories with fellow players—will you claim the top spot?
          </p>
        </div>

        {/* Podium Area: Rank 2 (Left), Rank 1 (Center), Rank 3 (Right) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 md:gap-8 items-end max-w-3xl mx-auto mb-14 md:mb-20">

          {/* Rank 2 (Silver) */}
          {top2 && (
            <div className="flex flex-col items-center text-center transition-transform hover:scale-105 duration-300">
              <div className="mb-2">
                <span className="block text-[10px] sm:text-xs uppercase text-neutral-400 font-semibold tracking-wider">
                  WINNINGS
                </span>
                <span className="text-sm sm:text-lg md:text-xl font-black italic text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]">
                  {formatWinning(top2.win_amount)}
                </span>
              </div>

              {/* Podium graphic */}
              <div className="relative w-full max-w-[170px] sm:max-w-[210px] mb-3">
                <img
                  src={rank2Img}
                  alt="Rank 2"
                  className="w-full h-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                />
              </div>

              <div className="space-y-0.5">
                <h4 className="text-sm sm:text-base md:text-lg font-black italic text-white tracking-wide truncate max-w-[120px] sm:max-w-[160px]">
                  {top2.userId?.username || 'Player'}
                </h4>
                <p className="text-[10px] sm:text-xs text-neutral-400 font-bold uppercase tracking-wider">
                  BET VALUE: <span className="text-neutral-200">{formatBet(top2.bet_amount)}</span>
                </p>
              </div>
            </div>
          )}

          {/* Rank 1 (Gold) - Elevated Center */}
          {top1 && (
            <div className="flex flex-col items-center text-center -translate-y-4 sm:-translate-y-8 transition-transform hover:scale-105 duration-300">
              <div className="mb-2">
                <span className="block text-[10px] sm:text-xs uppercase text-amber-400/90 font-bold tracking-wider">
                  WINNINGS
                </span>
                <span className="text-base sm:text-xl md:text-2xl font-black italic text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]">
                  {formatWinning(top1.win_amount)}
                </span>
              </div>

              {/* Podium graphic */}
              <div className="relative w-full max-w-[190px] sm:max-w-[240px] mb-3">
                <img
                  src={rank1Img}
                  alt="Rank 1"
                  className="w-full h-auto object-contain drop-shadow-[0_10px_24px_rgba(245,158,11,0.5)]"
                />
              </div>

              <div className="space-y-0.5">
                <h4 className="text-base sm:text-lg md:text-xl font-black italic text-amber-400 tracking-wide truncate max-w-[140px] sm:max-w-[190px]">
                  {top1.userId?.username || 'Player'}
                </h4>
                <p className="text-[10px] sm:text-xs text-neutral-300 font-bold uppercase tracking-wider">
                  BET VALUE: <span className="text-amber-300">{formatBet(top1.bet_amount)}</span>
                </p>
              </div>
            </div>
          )}

          {/* Rank 3 (Bronze) */}
          {top3 && (
            <div className="flex flex-col items-center text-center transition-transform hover:scale-105 duration-300">
              <div className="mb-2">
                <span className="block text-[10px] sm:text-xs uppercase text-neutral-400 font-semibold tracking-wider">
                  WINNINGS
                </span>
                <span className="text-sm sm:text-lg md:text-xl font-black italic text-amber-500 drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)]">
                  {formatWinning(top3.win_amount)}
                </span>
              </div>

              {/* Podium graphic */}
              <div className="relative w-full max-w-[170px] sm:max-w-[210px] mb-3">
                <img
                  src={rank3Img}
                  alt="Rank 3"
                  className="w-full h-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                />
              </div>

              <div className="space-y-0.5">
                <h4 className="text-sm sm:text-base md:text-lg font-black italic text-white tracking-wide truncate max-w-[120px] sm:max-w-[160px]">
                  {top3.userId?.username || 'Player'}
                </h4>
                <p className="text-[10px] sm:text-xs text-neutral-400 font-bold uppercase tracking-wider">
                  BET VALUE: <span className="text-neutral-200">{formatBet(top3.bet_amount)}</span>
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Leaderboard Table (#4 - #10) */}
        <div className="max-w-4xl mx-auto bg-black/60 backdrop-blur-md rounded-2xl p-3 sm:p-6 md:p-8 border border-amber-500/20 shadow-2xl shadow-black/90">

          {/* Table Header Row */}
          <div className="grid grid-cols-12 gap-2 sm:gap-4 px-3 sm:px-6 py-2.5 sm:py-3 text-neutral-400 text-xs sm:text-sm font-black italic uppercase tracking-wider border-b border-neutral-800/80 mb-2">
            <div className="col-span-2 text-left">RANK</div>
            <div className="col-span-4 sm:col-span-5 text-left">PLAYER</div>
            <div className="col-span-3 text-right">BET VALUE</div>
            <div className="col-span-3 sm:col-span-2 text-right">WINNINGS</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-2">
            {restPlayers.map((player, idx) => {
              const rankNum = idx + 4;
              return (
                <div
                  key={player._id || idx}
                  className="grid grid-cols-12 gap-2 sm:gap-4 items-center px-3 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#151515]/90 hover:bg-[#202020] border border-neutral-800/40 hover:border-amber-500/30 transition-all duration-200"
                >
                  {/* Rank Column */}
                  <div className="col-span-2 text-left font-black italic text-xs sm:text-sm text-neutral-400">
                    #{rankNum}
                  </div>

                  {/* Player Avatar & Username */}
                  <div className="col-span-4 sm:col-span-5 flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                    <PlayerAvatar user={player.userId} index={idx} size="w-7 h-7 sm:w-8 sm:h-8" />
                    <span className="font-bold italic text-xs sm:text-sm text-white truncate">
                      {player.userId?.username || 'Player'}
                    </span>
                  </div>

                  {/* Bet Value */}
                  <div className="col-span-3 text-right text-xs sm:text-sm font-bold italic text-neutral-300">
                    {formatBet(player.bet_amount)}
                  </div>

                  {/* Winnings */}
                  <div className="col-span-3 sm:col-span-2 text-right text-xs sm:text-sm font-black italic text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
                    {formatWinning(player.win_amount)}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
