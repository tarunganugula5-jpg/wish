import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, MapPin, Eye } from 'lucide-react';
import VintageImage from './VintageImage';
import { storyData } from '../data/storyChapters';

export default function SimhachalamScene({ onOpenLightbox, onTriggerSurprise }) {
  const [handClasped, setHandClasped] = useState(false);
  const chapter = storyData.chapter4;

  return (
    <section className="py-16 sm:py-24 px-4 relative overflow-hidden bg-[#160d08]">
      {/* Background radial warmth simulating holy temple twilight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full rounded-full bg-[#ffaa3b]/8 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-10 relative z-10">
        {/* Chapter Header */}
        <div className="text-center space-y-2">
          <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#d4af37]">
            {chapter.number}
          </span>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#f5ebd9] tracking-wide">
            {chapter.title}
          </h2>
          <p className="font-cormorant italic text-base sm:text-xl text-[#c5a687]">
            {chapter.subtitle}
          </p>
          <div className="flex items-center justify-center gap-1.5 text-xs font-cinzel text-[#ffd700] pt-1">
            <MapPin className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Simhachalam Temple • February 2025</span>
          </div>
        </div>

        {/* Narrative Parchment Card with REAL SIMHACHALAM PHOTOGRAPHS */}
        <div className="parchment-card p-6 sm:p-10 rounded-lg border border-[#c59b27]/40 shadow-2xl relative">
          <div className="space-y-4 text-[#382417] text-base sm:text-lg font-cormorant leading-relaxed">
            {chapter.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Real Temple Photos Row */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <VintageImage
              src="./memories/shimhachalam.jpg"
              alt="Simhachalam Temple Darshan"
              caption="Simhachalam Sacred Darshan"
              memoryId={4}
              aspectRatio="min-h-[280px] sm:min-h-[350px] max-h-[420px]"
              onClick={() =>
                onOpenLightbox &&
                onOpenLightbox({
                  id: 4,
                  title: 'Simhachalam Temple Darshan',
                  teluguTitle: 'సింహాచల క్షేత్రంలో పవిత్ర దర్శనం',
                  displayDate: 'February 2025',
                  location: 'Simhachalam Temple',
                  description:
                    'Seeking blessings together before the Hyderabad internship journey began. A divine memory etched in our hearts.',
                  images: ['./memories/shimhachalam.jpg'],
                })
              }
            />

            <VintageImage
              src="./memories/shimhachalam2.jpg"
              alt="The Hand I Didn't Want to Let Go"
              caption="Coming down the temple steps..."
              memoryId={5}
              aspectRatio="min-h-[280px] sm:min-h-[350px] max-h-[420px]"
              onClick={() =>
                onOpenLightbox &&
                onOpenLightbox({
                  id: 5,
                  title: "The Hand I Didn't Want to Let Go",
                  teluguTitle: 'సింహాచలం మెట్లపై... ఆ చెయ్యి',
                  displayDate: 'February 2025',
                  location: 'Simhachalam Temple Steps',
                  description:
                    'After darshan, while descending the steps, she reached out and held my hand. It was only a hand, but it didn’t feel like only a hand.',
                  quote: chapter.climaxScene.line6,
                  images: ['./memories/shimhachalam2.jpg'],
                })
              }
            />
          </div>
        </div>

        {/* Cinematic Climax: The Hand-Holding Interactive Visual */}
        <div className="parchment-card p-8 sm:p-12 rounded-xl border-2 border-[#c59b27] shadow-2xl text-center space-y-8 relative overflow-hidden heartbeat-gentle">
          {/* Subtle Heartbeat Glow Behind */}
          <div className="absolute inset-0 bg-radial from-[#8e2034]/15 via-transparent to-transparent pointer-events-none" />

          <p className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#8e2034] font-semibold">
            {chapter.climaxScene.lead}
          </p>

          <h3 className="font-cormorant italic text-2xl sm:text-3xl text-[#2a170d] font-semibold">
            “{chapter.climaxScene.holding}”
          </h3>

          {/* Hands Drawing Closer Animation Canvas/Graphic */}
          <div className="relative py-6 max-w-md mx-auto flex items-center justify-center">
            <motion.div
              className="flex items-center justify-between w-full px-4 relative"
              animate={handClasped ? { gap: '0px' } : { gap: '48px' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            >
              {/* Tarun's Hand (Left) */}
              <motion.div
                className="flex items-center gap-2 cursor-pointer"
                animate={handClasped ? { x: 40 } : { x: 0 }}
                transition={{ duration: 1.5 }}
                onClick={() => setHandClasped(!handClasped)}
              >
                <div className="w-24 h-11 rounded-full bg-gradient-to-r from-[#5a3a24] to-[#a37955] shadow-lg flex items-center justify-end pr-3 text-sm font-handwriting text-[#fbf5b7] font-bold">
                  Tarun
                </div>
              </motion.div>

              {/* Center Touch Glow Point */}
              <div
                onClick={() => setHandClasped(!handClasped)}
                className="cursor-pointer relative z-10 p-2"
                title="Tap to hold hands"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-700 ${
                    handClasped
                      ? 'bg-[#8e2034] text-[#ffd700] shadow-[0_0_30px_#ff8800] scale-125'
                      : 'bg-[#ebd9bd] text-[#8e2034] border border-[#c59b27] shadow-lg hover:scale-105'
                  }`}
                >
                  <Heart className={`w-7 h-7 ${handClasped ? 'fill-current' : ''}`} />
                </div>
              </div>

              {/* Teju's Hand (Right) */}
              <motion.div
                className="flex items-center gap-2 cursor-pointer"
                animate={handClasped ? { x: -40 } : { x: 0 }}
                transition={{ duration: 1.5 }}
                onClick={() => setHandClasped(!handClasped)}
              >
                <div className="w-24 h-11 rounded-full bg-gradient-to-l from-[#5a3a24] to-[#c49870] shadow-lg flex items-center justify-start pl-3 text-sm font-handwriting text-[#fbf5b7] font-bold">
                  Teju
                </div>
              </motion.div>
            </motion.div>
          </div>

          <p className="text-xs font-body text-[#785942] font-semibold">
            {handClasped ? '❤️ Hands held tightly — never letting go ❤️' : '✨ (Tap the heart to hold her hand) ✨'}
          </p>

          {/* Emotional Dialogue & Thoughts */}
          <div className="space-y-4 max-w-lg mx-auto pt-4 border-t border-[#c59b27]/30">
            <p className="font-cormorant text-xl sm:text-2xl text-[#2a170d] leading-relaxed">
              {chapter.climaxScene.line1}
            </p>
            <p className="font-cormorant italic text-lg sm:text-xl text-[#785942]">
              {chapter.climaxScene.line2}
            </p>
            <p className="font-cormorant text-xl sm:text-2xl text-[#8e2034] font-semibold">
              {chapter.climaxScene.line3}
            </p>
            <div className="pt-2 space-y-1">
              <p className="font-cormorant text-base sm:text-lg text-[#4a3424]">
                {chapter.climaxScene.line4}
              </p>
              <p className="font-cormorant italic text-base sm:text-lg text-[#785942]">
                {chapter.climaxScene.line5}
              </p>
              <p className="font-cormorant italic text-lg sm:text-2xl text-[#2a170d] font-bold pt-1">
                “{chapter.climaxScene.line6}”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
