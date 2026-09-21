import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqsData = [
  {
    id: 'perks',
    question: 'ARE THERE PERKS FOR NEW PLAYERS?',
    answer:
      "Absolutely! We provide daily and special welcome bonuses to new players. Upon signing up, you'll receive a welcome bonus, granting you free access to our games.",
  },
  {
    id: 'assistance',
    question: 'CONTINUOUS ASSISTANCE?',
    answer:
      'Our dedicated 24/7 customer support team is always available via live chat and email to assist you with any questions, technical guidance, or account inquiries.',
  },
  {
    id: 'experiences',
    question: "WONDERING ABOUT OTHER PLAYER'S EXPERIENCES?",
    answer:
      'Join our vibrant community on Facebook, Instagram, TikTok, and YouTube to view authentic player wins, community discussions, and gameplay highlights.',
  },
  {
    id: 'purchases',
    question: 'IS THERE A REQUIREMENT TO MAKE PURCHASES TO PARTICIPATE?',
    answer:
      'No purchase is necessary! Lions Den Games is a free social gaming platform intended strictly for entertainment and amusement purposes. You can collect free daily login coins and enjoy all games completely free.',
  },
];

export const FaqSection = () => {
  // Default open first item matching design
  const [openId, setOpenId] = useState('perks');

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#111111] overflow-hidden select-none border-t border-neutral-900">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-amber-400 font-extrabold uppercase tracking-widest text-xs sm:text-sm mb-2 drop-shadow-sm">
            ANY QUESTIONS?
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-wide text-white uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            FREQUENT ASKED QUESTIONS
          </h2>
          <p className="mt-3 text-neutral-300 text-xs sm:text-sm md:text-base italic max-w-xl mx-auto leading-relaxed">
            Uncover common answers regarding wallet interfaces, digital stakes, provably fair gaming, and quick priority node cashouts.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {faqsData.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                onClick={() => toggleFaq(faq.id)}
                className={`rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
                  isOpen
                    ? 'bg-[#181818] border border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.1)] p-5 sm:p-6'
                    : 'bg-[#1a1a1a]/90 hover:bg-[#202020] border border-neutral-800 hover:border-neutral-700 p-5 sm:p-6'
                }`}
              >
                {/* Question Header */}
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-white font-black italic text-sm sm:text-base md:text-lg tracking-wide uppercase">
                    {faq.question}
                  </h3>
                  <div className="shrink-0 text-white flex items-center justify-center">
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-amber-400 stroke-[3]" />
                    ) : (
                      <Plus className="w-5 h-5 text-neutral-400 stroke-[2.5]" />
                    )}
                  </div>
                </div>

                {/* Answer Content */}
                {isOpen && (
                  <div className="pt-2 animate-fadeIn">
                    <p className="text-neutral-300 text-xs sm:text-sm md:text-[15px] italic leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
