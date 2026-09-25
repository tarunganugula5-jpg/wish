import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, BookOpen, RotateCcw } from 'lucide-react';
import VintageImage from './VintageImage';
import { storyData } from '../data/storyChapters';

export default function FinalScene({ onReopenDiary, onOpenLightbox }) {
  const [diaryClosed, setDiaryClosed] = useState(false);
  const final = storyData.finalScene;

  return (
    <section className="py-20 sm:py-32 px-4 bg-[#0a0503] text-[#f5ebd9] relative overflow-hidden text-center select-none">
      {/* Background Soft Starlight */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-14 relative z-10">
        {/* Section Marker */}
        <div className="space-y-2">
          <span className="font-cinzel text-xs uppercase tracking-[0.4em] text-[#d4af37]">
            The Journey So Far
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#f5ebd9] tracking-wide">
            {final.title}
          </h2>
        </div>

        {/* Side-by-Side: REAL USER PHOTOGRAPHS Then and Now */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 items-center max-w-2xl mx-auto">
          {/* THEN (Diploma Days) */}
          <div className="space-y-3">
            <span className="font-cinzel text-sm sm:text-base font-bold text-[#c59b27] uppercase tracking-widest block">
              {final.thenLabel}
            </span>
            <VintageImage
              src="./memories/1727523286913.jpg"
              alt="Tarun and Teju Diploma Days"
              caption="Where our destiny quietly began..."
              memoryId={11}
              aspectRatio="min-h-[280px] sm:min-h-[360px] max-h-[440px]"
              onClick={() =>
                onOpenLightbox &&
                onOpenLightbox({
                  id: 11,
                  title: 'Then — Diploma Days',
                  teluguTitle: 'మొదటి రోజులు',
                  displayDate: '2022',
                  description: 'Two quiet classmates unaware of the eternal story waiting to unfold.',
                  images: ['./memories/1727523286913.jpg'],
                })
              }
            />
          </div>

          {/* NOW (Present & Forever) */}
          <div className="space-y-3">
            <span className="font-cinzel text-sm sm:text-base font-bold text-[#8e2034] uppercase tracking-widest block">
              {final.nowLabel}
            </span>
            <VintageImage
              src="./memories/IMG_20250925_113659.jpg"
              alt="Tarun and Teju Now"
              caption="Our hearts forever intertwined"
              memoryId={12}
              aspectRatio="min-h-[280px] sm:min-h-[360px] max-h-[440px]"
              onClick={() =>
                onOpenLightbox &&
                onOpenLightbox({
                  id: 12,
                  title: 'Now — Forever Together',
                  teluguTitle: 'ఇప్పుడు... ఎప్పటికీ',
                  displayDate: '2026 and Beyond',
                  description: 'From friends to something neither of us planned, but neither of us would ever trade.',
                  images: ['./memories/IMG_20250925_113659.jpg'],
                })
              }
            />
          </div>
        </div>

        {/* Animated Handwritten Lines */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-4 max-w-lg mx-auto"
        >
          <div className="w-16 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#c59b27] to-transparent" />

          <p className="font-handwriting text-3xl sm:text-5xl text-[#ffd700]">
            “{final.handwrittenLine1}”
          </p>
          <p className="font-cormorant italic text-xl sm:text-3xl text-[#e8dac7]">
            {final.handwrittenLine2}
          </p>

          <div className="py-2">
            <span className="font-cinzel text-xl sm:text-3xl font-bold tracking-widest text-[#ffd700] px-5 py-2 rounded-full border-2 border-[#c59b27] bg-[#1e110a] shadow-xl">
              {final.infinityDate}
            </span>
          </div>

          <div className="space-y-2 pt-4">
            <p className="font-cinzel text-2xl sm:text-4xl text-[#f5ebd9] font-bold">
              {final.wish1}
            </p>
            <p className="font-cormorant italic text-lg sm:text-2xl text-[#c5a687]">
              {final.wish2}
              <br />
              <span className="text-[#ffd700] font-semibold text-xl sm:text-2xl">
                {final.wish3}
              </span>
            </p>
            <p className="font-handwriting text-3xl sm:text-5xl text-[#8e2034] font-bold pt-2">
              {final.signature}
            </p>
          </div>
        </motion.div>

        {/* Close the Diary Interaction */}
        <div className="pt-8">
          {!diaryClosed ? (
            <button
              type="button"
              onClick={() => setDiaryClosed(true)}
              className="px-8 py-3.5 rounded-full bg-[#1e110a] text-[#ffd700] border-2 border-[#c59b27] font-cinzel text-xs sm:text-sm font-semibold tracking-widest hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xl inline-flex items-center gap-2"
            >
              <span>Close The Diary</span>
              <BookOpen className="w-4 h-4" />
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="w-72 sm:w-84 aspect-[3/4] mx-auto rounded-r-xl rounded-l-sm diary-cover-texture p-6 flex flex-col items-center justify-between text-center border-l-8 border-[#3b2011] shadow-2xl relative"
            >
              {/* Corner Brass Ornaments */}
              <div className="absolute top-3 left-4 text-[#c59b27]/70 font-cinzel text-sm">❧</div>
              <div className="absolute top-3 right-4 text-[#c59b27]/70 font-cinzel text-sm">❧</div>
              <div className="absolute bottom-3 left-4 text-[#c59b27]/70 font-cinzel text-sm">❧</div>
              <div className="absolute bottom-3 right-4 text-[#c59b27]/70 font-cinzel text-sm">❧</div>

              <div className="pt-8">
                <span className="font-cinzel-decorative text-5xl sm:text-6xl text-[#ffd700] tracking-widest font-bold drop-shadow-md">
                  {final.bookClose.monogram}
                </span>
                <p className="font-cinzel text-sm uppercase tracking-[0.3em] text-[#bca280] mt-2 font-bold">
                  {final.bookClose.title}
                </p>
                <div className="w-12 h-0.5 mx-auto bg-[#c59b27]/60 mt-3" />
              </div>

              <div className="py-4">
                <p className="font-cinzel text-sm text-[#ffd700] tracking-widest font-semibold">
                  {final.bookClose.date}
                </p>
              </div>

              <div className="pb-4">
                <p className="font-cormorant italic text-base text-[#bca280]">
                  “{final.bookClose.footer}”
                </p>
                <button
                  type="button"
                  onClick={() => setDiaryClosed(false)}
                  className="mt-3 text-xs font-cinzel text-[#ffd700] hover:underline flex items-center gap-1 mx-auto cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reopen Diary</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
