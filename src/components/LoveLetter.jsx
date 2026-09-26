import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, ChevronDown } from 'lucide-react';
import { storyData } from '../data/storyChapters';

export default function LoveLetter({ onProceedToFuture }) {
  const [isOpen, setIsOpen] = useState(false);
  const letter = storyData.finalLetter;

  return (
    <section className="py-20 sm:py-28 px-4 bg-[#140b08] text-[#f5ebd9] relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full rounded-full bg-[#8e2034]/10 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-10 relative z-10 text-center">
        {/* Section Header */}
        <div className="space-y-2">
          <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#d4af37]">
            From Tarun’s Heart
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#f5ebd9] tracking-wide">
            {letter.title}
          </h2>
          <p className="font-cormorant italic text-base sm:text-xl text-[#c5a687]">
            {letter.subtitle}
          </p>
        </div>

        {/* Envelope Container */}
        <div className="max-w-xl mx-auto">
          {!isOpen ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="parchment-card p-8 sm:p-12 rounded-xl border-2 border-[#c59b27] shadow-2xl relative cursor-pointer group"
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Envelope Flap Lines */}
              <div className="absolute inset-x-0 top-0 h-28 bg-[#dfceaa] rounded-t-xl [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-md border-b border-[#c59b27]/40 pointer-events-none" />

              <div className="pt-16 pb-8 flex flex-col items-center justify-center space-y-4 relative z-10">
                {/* Wax Seal */}
                <div
                  className="wax-seal"
                  title="Tap to break wax seal and open letter"
                >
                  <span className="font-cinzel-decorative font-bold text-[#ffd700] text-sm tracking-wider">
                    T & T
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="font-cinzel text-sm sm:text-base font-bold text-[#2a170d] tracking-widest uppercase">
                    For Tejaswini (Kanna Amma)
                  </p>
                  <p className="font-cormorant italic text-sm text-[#785942]">
                    Written with all my heart • Tap to open
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Open Handwritten Letter */
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="parchment-card p-6 sm:p-12 rounded-lg border-2 border-[#8e2034]/70 shadow-2xl relative text-left"
            >
              {/* Corner Watermarks */}
              <div className="absolute top-4 left-4 text-[#8e2034]/40 font-cinzel text-xs">❦</div>
              <div className="absolute top-4 right-4 text-[#8e2034]/40 font-cinzel text-xs">❦</div>

              {/* Date Stamp */}
              <div className="text-right border-b border-[#c59b27]/30 pb-3 mb-6">
                <span className="font-cinzel text-xs text-[#8c6b4e] tracking-widest">
                  {letter.date}
                </span>
              </div>

              {/* Letter Content preserving Tarun's genuine Telugu voice */}
              <div className="space-y-4 font-cormorant text-lg sm:text-xl text-[#2a170d] leading-relaxed whitespace-pre-line">
                {letter.teluguText}
              </div>

              {/* Bottom Stamp / Seal */}
              <div className="mt-8 pt-4 border-t border-[#c59b27]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#8e2034]/15 border border-[#8e2034]/40 flex items-center justify-center text-[#8e2034]">
                    <Heart className="w-4 h-4 fill-[#8e2034]" />
                  </div>
                  <span className="font-handwriting text-2xl text-[#8e2034] font-bold">
                    Tarun ❤️ Teju
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onProceedToFuture}
                  className="px-6 py-2.5 rounded-full bg-[#20100a] text-[#ffd700] hover:text-[#ffffff] border border-[#c59b27] font-cinzel text-xs font-semibold tracking-wider hover:scale-105 transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <span>Our Tomorrow</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
