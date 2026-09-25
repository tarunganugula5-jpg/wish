import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Feather, Sparkles } from 'lucide-react';
import { storyData } from '../data/storyChapters';
import { MarginHeart } from './HiddenSurprises';

export default function WhyILoveYou({ onTriggerSurprise }) {
  const section = storyData.whyILoveYou;

  return (
    <section className="py-20 sm:py-28 px-4 bg-[#120a07] text-[#f5ebd9] relative overflow-hidden">
      {/* Background Amber Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 rounded-full bg-[#ffaa3b]/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Feather className="w-4 h-4 text-[#c59b27]" />
            <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#d4af37]">
              Diary Confessions
            </span>
            <Feather className="w-4 h-4 text-[#c59b27] transform -scale-x-100" />
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#f5ebd9] tracking-wide">
            {section.title}
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#c5a687]">
            {section.subtitle}
          </p>

          <div className="w-20 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#c59b27] to-transparent mt-2" />
        </div>

        {/* Handwritten Diary Fragments (Torn Parchment Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {section.fragments.map((frag, idx) => (
            <motion.div
              key={frag.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={`parchment-card p-6 sm:p-7 rounded-sm shadow-xl border border-[#c59b27]/40 relative group ${
                idx === section.fragments.length - 1
                  ? 'md:col-span-2 max-w-xl mx-auto border-2 border-[#8e2034]/60 text-center'
                  : ''
              }`}
            >
              {/* Scotch tape in corner */}
              <div
                className={`scotch-tape -top-2 ${
                  idx % 2 === 0 ? '-left-2 -rotate-6' : '-right-2 rotate-6'
                }`}
              />

              {/* Fragment Roman Numeral / Leaf */}
              <div className="flex items-center justify-between border-b border-[#c59b27]/30 pb-2 mb-3">
                <span className="font-cinzel text-xs font-bold text-[#8e2034] tracking-widest">
                  FRAGMENT {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'][idx]}
                </span>
                <Heart className="w-3.5 h-3.5 text-[#c59b27] fill-[#c59b27]/20" />
              </div>

              {/* Heading */}
              <h3 className="font-cormorant text-lg sm:text-xl font-bold text-[#2a170d] mb-2">
                {frag.heading}
              </h3>

              {/* Body Text */}
              <p className="font-cormorant text-base sm:text-lg text-[#382417] leading-relaxed whitespace-pre-line">
                {frag.text}
              </p>

              {/* Bottom Ink Stamp for final card */}
              {idx === section.fragments.length - 1 && (
                <div className="mt-4 pt-3 border-t border-[#8e2034]/30 flex justify-center items-center gap-2">
                  <span className="font-handwriting text-2xl text-[#8e2034] font-bold">
                    — Forever your Nanna ❤️
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Gentle Interactive Surprise */}
        <div className="text-center pt-4">
          <MarginHeart onTrigger={onTriggerSurprise} />
        </div>
      </div>
    </section>
  );
}
