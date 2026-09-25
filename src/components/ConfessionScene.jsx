import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Calendar } from 'lucide-react';
import VintageImage from './VintageImage';
import { storyData } from '../data/storyChapters';

export default function ConfessionScene({ onOpenLightbox }) {
  const chapter = storyData.chapter6;

  return (
    <section className="py-20 sm:py-28 px-4 bg-[#140b08] text-[#f5ebd9] relative overflow-hidden">
      {/* Background Red Thread / Twilight Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full rounded-full bg-[#8e2034]/15 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-12 relative z-10">
        {/* Large Cinematic Typography for 15 MARCH 2025 */}
        <div className="text-center space-y-1">
          <span className="font-cinzel text-xs uppercase tracking-[0.4em] text-[#d4af37]">
            {chapter.number}
          </span>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="pt-2"
          >
            <div className="font-cinzel font-black tracking-widest text-6xl sm:text-8xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-[#fbf5b7] via-[#d4af37] to-[#8c6b2d] leading-none drop-shadow-2xl">
              15
            </div>
            <div className="font-cinzel font-semibold tracking-[0.25em] text-2xl sm:text-4xl text-[#ebd8b7] mt-1">
              MARCH
            </div>
            <div className="font-cinzel tracking-[0.4em] text-xl sm:text-2xl text-[#bca280]">
              2025
            </div>
          </motion.div>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#c59b27] pt-2">
            {chapter.subtitle}
          </p>
        </div>

        {/* The Golden Instruction & Telugu Words Parchment */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="parchment-card p-6 sm:p-12 rounded-xl border-2 border-[#8e2034]/60 shadow-2xl relative"
        >
          {/* Decorative Corner Seals */}
          <div className="absolute top-3 left-3 text-[#8e2034] font-cinzel text-sm">✦</div>
          <div className="absolute top-3 right-3 text-[#8e2034] font-cinzel text-sm">✦</div>

          <div className="text-center space-y-3">
            <p className="font-cormorant italic text-base sm:text-lg text-[#5a3e2a]">
              {chapter.leadIn}
            </p>
            <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl text-[#8e2034] font-bold tracking-wide">
              {chapter.instruction}
            </h3>
          </div>

          <div className="w-20 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#8e2034] to-transparent my-6" />

          {/* Telugu Confession Memory Lines */}
          <div className="space-y-4 text-center max-w-lg mx-auto py-2">
            <div className="space-y-2 bg-[#dfd0b5]/50 p-6 rounded-lg border border-[#c59b27]/30 shadow-inner">
              {chapter.teluguConfession.map((line, i) => (
                <p
                  key={i}
                  className="font-cormorant text-xl sm:text-3xl text-[#2a170d] font-bold leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Transliteration */}
            <div className="space-y-1 pt-2">
              {chapter.transliteration.map((line, i) => (
                <p key={i} className="font-cormorant italic text-sm sm:text-base text-[#694e35]">
                  {line}
                </p>
              ))}
            </div>

            <p className="text-xs font-body text-[#8c6b4e] italic pt-2">
              (As fondly remembered and treasured in my heart)
            </p>
          </div>

          <div className="w-16 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#c59b27] to-transparent my-6" />

          {/* Aftermath Narrative */}
          <div className="space-y-3 text-center max-w-md mx-auto text-[#382417] font-cormorant text-base sm:text-lg leading-relaxed">
            {chapter.aftermath.map((paragraph, idx) => (
              <p
                key={idx}
                className={
                  idx === chapter.aftermath.length - 1
                    ? 'font-bold text-2xl sm:text-3xl text-[#8e2034] font-cinzel pt-2'
                    : ''
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* The Red String of Fate Connecting Two Real Photographs */}
        <div className="relative pt-6">
          <div className="text-center mb-6">
            <span className="font-cinzel text-xs uppercase tracking-widest text-[#d4af37]">
              Bound by Destiny • 15 March 2025
            </span>
          </div>

          {/* Connected Photos Row using meet4.jpg & meet5.jpg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 items-center relative">
            {/* SVG Red Thread of Fate Connecting both frames */}
            <div className="hidden sm:block absolute inset-0 pointer-events-none z-20">
              <svg className="w-full h-full" viewBox="0 0 600 300" fill="none">
                <path
                  d="M180 150 Q300 70 420 150"
                  stroke="#b22234"
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                  className="red-thread-glow animate-pulse"
                />
                <circle cx="300" cy="110" r="10" fill="#8e2034" />
                <circle cx="300" cy="110" r="5" fill="#ffd700" />
              </svg>
            </div>

            {/* Tarun Polaroid */}
            <div className="relative">
              <VintageImage
                src="./memories/meet4.jpg"
                alt="Tarun"
                caption="Tarun (Nanna) — Hearing your words"
                memoryId={7}
                aspectRatio="min-h-[300px] sm:min-h-[380px] max-h-[440px]"
                onClick={() =>
                  onOpenLightbox &&
                  onOpenLightbox({
                    id: 7,
                    title: '15 March 2025 — Tarun',
                    teluguTitle: 'నా మనసు తెలిసిన క్షణం',
                    displayDate: '15 March 2025',
                    description:
                      'When she spoke those honest words, my heart whispered yes long before my voice did.',
                    images: ['./memories/meet4.jpg'],
                  })
                }
              />
            </div>

            {/* Teju Polaroid */}
            <div className="relative">
              <VintageImage
                src="./memories/meet5.jpg"
                alt="Tejeswini"
                caption="Tejeswini (Kanna Amma) — Confessing her love"
                memoryId={7}
                aspectRatio="min-h-[300px] sm:min-h-[380px] max-h-[440px]"
                onClick={() =>
                  onOpenLightbox &&
                  onOpenLightbox({
                    id: 7,
                    title: '15 March 2025 — Tejeswini',
                    teluguTitle: 'ప్రేమగా మారిన స్నేహం',
                    displayDate: '15 March 2025',
                    description:
                      '“Chala time nunchi alochinchanu... Nuvvante naaku chala istam.” The day our story truly began.',
                    images: ['./memories/meet5.jpg'],
                  })
                }
              />
            </div>
          </div>

          {/* Date Tag Banner */}
          <div className="mt-8 text-center">
            <div className="inline-block px-7 py-3 rounded-full bg-[#20100a] border-2 border-[#ffd700]/70 shadow-2xl">
              <p className="font-cinzel text-xs sm:text-sm font-semibold tracking-wider text-[#ffd700]">
                {chapter.dateTag}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
