import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, Star } from 'lucide-react';
import { secretSurprises } from '../data/surprises';

// Modal for displaying discovered surprise
export function SurpriseModal({ surprise, onClose }) {
  if (!surprise) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
        <div className="absolute inset-0" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          className="parchment-card max-w-sm sm:max-w-md w-full p-6 sm:p-7 rounded-lg border-2 border-[#c59b27] shadow-2xl relative z-10 text-center"
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-[#785942] hover:text-[#2a170d] text-sm p-1 rounded font-body cursor-pointer"
          >
            ✕
          </button>

          {/* Icon */}
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#8e2034]/15 border border-[#8e2034]/40 flex items-center justify-center text-[#8e2034]">
            <Heart className="w-6 h-6 fill-[#8e2034]/20" />
          </div>

          <span className="font-cinzel text-xs uppercase tracking-widest text-[#9f7831]">
            A Secret Note
          </span>

          <h4 className="font-cinzel text-lg sm:text-xl font-bold text-[#2a170d] mt-1 mb-3">
            {surprise.title}
          </h4>

          <div className="p-4 rounded bg-[#dfd0b5]/60 border-l-3 border-[#8e2034] text-left">
            <p className="font-cormorant text-base sm:text-lg text-[#3b1d24] font-medium leading-relaxed">
              {surprise.message}
            </p>
            {surprise.english && (
              <p className="font-cormorant italic text-sm sm:text-base text-[#694e35] mt-2 pt-2 border-t border-[#c59b27]/30">
                “{surprise.english}”
              </p>
            )}
          </div>

          <p className="mt-4 font-handwriting text-xl text-[#8e2034] text-right pr-2">
            — With all my love, Nanna ❤️
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// 1. Dried Rose in Diary Margin
export function DriedRose({ onTrigger }) {
  return (
    <motion.button
      type="button"
      onClick={() => onTrigger(secretSurprises.rose)}
      whileHover={{ scale: 1.15, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="inline-block relative p-1 cursor-pointer group"
      title="A dried rose"
    >
      <svg viewBox="0 0 40 40" className="w-8 h-8 filter drop-shadow">
        {/* Stem */}
        <path d="M20 22 Q18 30 16 38" stroke="#4a5d3f" strokeWidth="2" fill="none" />
        <path d="M19 28 Q24 26 26 29" stroke="#4a5d3f" strokeWidth="1.5" fill="none" />
        {/* Rose Petals (Dried Burgundy) */}
        <circle cx="21" cy="18" r="8" fill="#6e1f2d" opacity="0.9" />
        <path d="M16 16 Q21 10 26 16 Q21 22 16 16 Z" fill="#8e2b3c" />
        <circle cx="21" cy="17" r="4" fill="#4d121c" />
      </svg>
      <span className="sr-only">A dried rose pressed in the diary</span>
    </motion.button>
  );
}

// 2. Sketched Margin Heart
export function MarginHeart({ onTrigger }) {
  return (
    <motion.button
      type="button"
      onClick={() => onTrigger(secretSurprises.marginHeart)}
      whileHover={{ scale: 1.25, rotate: -8 }}
      whileTap={{ scale: 0.9 }}
      className="inline-block text-[#8e2034]/70 hover:text-[#8e2034] transition-colors p-1 cursor-pointer"
      title="A heart in the margin"
    >
      <Heart className="w-5 h-5 fill-current" />
    </motion.button>
  );
}

// 3. Golden Star Doodle
export function StarDoodle({ onTrigger }) {
  return (
    <motion.button
      type="button"
      onClick={() => onTrigger(secretSurprises.starDoodle)}
      whileHover={{ scale: 1.25, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      className="inline-block text-[#c59b27] hover:text-[#ffd700] transition-colors p-1 cursor-pointer"
      title="A star in the diary"
    >
      <Star className="w-4 h-4 fill-current" />
    </motion.button>
  );
}

// 4. Underlined Interactive Word
export function UnderlinedWord({ word, surpriseKey = 'alakaWord', onTrigger }) {
  const surprise = secretSurprises[surpriseKey] || secretSurprises.alakaWord;
  return (
    <span
      onClick={() => onTrigger(surprise)}
      className="underline decoration-wavy decoration-[#8e2034]/60 hover:decoration-[#8e2034] cursor-pointer text-[#8e2034] font-medium transition-colors"
      title="A lingering thought"
    >
      {word}
    </span>
  );
}

// 5. Folded Corner Page Peek
export function PageFoldSurprise({ onTrigger }) {
  return (
    <div
      onClick={() => onTrigger(secretSurprises.foldedCorner)}
      className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#bca280] to-transparent cursor-pointer hover:from-[#ffd700] transition-colors shadow-sm"
      style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
      title="A folded page corner"
    />
  );
}
