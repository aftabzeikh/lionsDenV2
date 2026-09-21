import React, { useState } from 'react';
import bgJoinPride from '../../assets/images/bg-joinPride.png';

export const JoinPrideSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section
      className="relative w-full py-20 md:py-28 bg-cover bg-center overflow-hidden select-none"
      style={{
        backgroundImage: `url(${bgJoinPride})`,
      }}
    >

      {/* Ambient center lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        
        {/* Subtitle */}
        <p className="text-amber-400 font-extrabold uppercase tracking-widest text-xs sm:text-sm mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          LOREM IPSUM
        </p>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic tracking-wider text-white uppercase mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          JOIN THE PRIDE
        </h2>

        {/* Description Paragraph */}
        <p className="text-neutral-200 text-sm sm:text-base md:text-lg italic max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Do not sit outside. Enter the den today, claim your welcoming bonus package, and take your seat among the elite digital gaming conquerors.
        </p>

        {/* Newsletter / Join Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <div className="relative w-full sm:flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              required
              className="w-full bg-[#1c1c1c]/85 backdrop-blur-md text-white placeholder-neutral-400 border border-neutral-600/70 rounded-2xl px-5 py-3.5 sm:py-4 text-sm sm:text-base italic focus:outline-none focus:border-amber-400/90 focus:ring-2 focus:ring-amber-400/40 shadow-inner transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-black font-black italic tracking-wider text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl shadow-[0_4px_18px_rgba(245,158,11,0.4)] hover:shadow-[0_6px_25px_rgba(245,158,11,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 uppercase shrink-0 cursor-pointer"
          >
            {isSubmitted ? 'WELCOME!' : 'JOIN NOW'}
          </button>
        </form>

        {isSubmitted && (
          <p className="mt-4 text-amber-400 font-bold italic text-sm animate-bounce">
            🎉 Thank you for joining! Check your inbox for exclusive rewards.
          </p>
        )}

      </div>
    </section>
  );
};
