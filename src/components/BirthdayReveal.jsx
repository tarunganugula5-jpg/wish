import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Flame, Cake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { storyData } from '../data/storyChapters';
import VintageImage from './VintageImage';

export default function BirthdayReveal({ onProceedToLetter, onOpenLightbox }) {
  const [phase, setPhase] = useState(0);
  const data = storyData.birthdayReveal;

  // Trigger elegant gold and burgundy sparks
  const launchElegantSparks = () => {
    confetti({
      particleCount: 65,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ffaa3b', '#c59b27', '#8e2034', '#ffffff'],
      shapes: ['circle'],
      ticks: 240,
      gravity: 0.5,
      scalar: 1,
    });
  };

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),  // Prelude: Kanna Amma...
      setTimeout(() => setPhase(2), 2600), // But today... story belongs to you
      setTimeout(() => setPhase(3), 4800), // 26 • 09
      setTimeout(() => setPhase(4), 7000), // Screen dark, candle appears
      setTimeout(() => {
        setPhase(5); // Happy Birthday Tejeswini Reveal + Golden Sparks
        launchElegantSparks();
      }, 9200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-[#070402] text-[#f5ebd9] px-4 py-16 relative overflow-hidden select-none">
      {/* Falling Rose Petals Canvas / Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {phase >= 4 && (
          <>
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  y: -50,
                  x: `${(i * 4.5) % 100}vw`,
                  rotate: 0,
                  opacity: 0,
                }}
                animate={{
                  y: '105vh',
                  x: `${((i * 4.5 + 8) % 100)}vw`,
                  rotate: 360,
                  opacity: [0, 0.85, 0.85, 0],
                }}
                transition={{
                  duration: 8 + (i % 6) * 1.5,
                  repeat: Infinity,
                  delay: i * 0.35,
                  ease: 'linear',
                }}
                className="absolute w-4 h-4 rounded-full bg-[#8e2034]/70 blur-[0.5px]"
                style={{
                  clipPath:
                    'polygon(50% 0%, 80% 20%, 100% 60%, 50% 100%, 0% 60%, 20% 20%)',
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 z-10">
        {/* Phase 1 & 2: Prelude */}
        <AnimatePresence>
          {phase >= 1 && phase < 4 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1.1 }}
              className="space-y-4"
            >
              <p className="font-handwriting text-3xl sm:text-5xl text-[#ffd700]">
                {data.prelude1}
              </p>
              <p className="font-cormorant text-xl sm:text-3xl text-[#c5a687]">
                {data.prelude2}
              </p>
              {phase >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9 }}
                  className="space-y-2 pt-2"
                >
                  <p className="font-cormorant text-lg sm:text-2xl text-[#bca280]">
                    {data.prelude3}
                  </p>
                  <p className="font-cinzel text-2xl sm:text-4xl text-[#f5ebd9] font-bold tracking-wider">
                    {data.prelude4}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 3: Date 26 • 09 */}
        <AnimatePresence>
          {phase === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.9 }}
              className="py-6"
            >
              <span className="font-cinzel text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ffd700] via-[#c59b27] to-[#785925] tracking-widest drop-shadow-2xl">
                26 • 09
              </span>
              <p className="font-cormorant italic text-xl text-[#c5a687] mt-2">
                26 September 2006 • The Day An Angel Arrived
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 4 & 5: The Candle & Grand Birthday Reveal with REAL BIRTHDAY PHOTOS */}
        <AnimatePresence>
          {phase >= 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="space-y-8"
            >
              {/* Single Flickering Candle */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative candle-flame">
                  <div className="w-7 h-11 rounded-full bg-gradient-to-t from-[#ff7700] via-[#ffd700] to-white blur-xs shadow-[0_0_35px_#ff8800]" />
                  <div className="w-1.5 h-3.5 bg-white rounded-full mx-auto -mt-4 opacity-90" />
                </div>
                <div className="w-5 h-16 bg-gradient-to-b from-[#f8f1e5] to-[#dfcfb4] rounded-sm shadow-md border-t border-[#d4af37]/30" />
              </div>

              {/* Grand Birthday Message */}
              {phase >= 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <p className="font-cinzel text-sm sm:text-base uppercase tracking-[0.4em] text-[#d4af37]">
                      {data.heading}
                    </p>
                    <h1 className="font-cinzel text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-widest text-[#f5ebd9] drop-shadow-[0_4px_30px_rgba(255,215,0,0.5)]">
                      {data.name}
                    </h1>
                  </div>

                  <p className="font-handwriting text-3xl sm:text-5xl text-[#ffd700] font-bold drop-shadow">
                    {data.subheading}
                  </p>

                  <p className="font-cormorant italic text-xl sm:text-3xl text-[#e8dac7]">
                    {data.signoff}
                  </p>

                  {/* REAL BIRTHDAY PHOTOS GALLERY */}
                  <div className="mt-8 pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                      <VintageImage
                        src="./memories/teju-bday.jpg"
                        alt="Teju Birthday Portrait"
                        caption="Birthday Queen Teju ❤️"
                        memoryId={10}
                        aspectRatio="min-h-[280px] sm:min-h-[350px] max-h-[420px]"
                        onClick={() =>
                          onOpenLightbox &&
                          onOpenLightbox({
                            id: 10,
                            title: 'Birthday Queen Teju',
                            teluguTitle: 'పుట్టినరోజు మహారాణి',
                            displayDate: '26 September',
                            description: 'Happy Birthday to my Kanna Amma. May your smile brighten every tomorrow.',
                            images: ['./memories/teju-bday.jpg'],
                          })
                        }
                      />

                      <VintageImage
                        src="./memories/bday-celebration.jpg"
                        alt="Birthday Celebration"
                        caption="Celebrating with smiles"
                        memoryId={10}
                        aspectRatio="min-h-[280px] sm:min-h-[350px] max-h-[420px]"
                        onClick={() =>
                          onOpenLightbox &&
                          onOpenLightbox({
                            id: 10,
                            title: 'Birthday Celebration',
                            teluguTitle: 'పుట్టినరోజు వేడుకలు',
                            displayDate: '26 September',
                            description: 'Moments of laughter and sweet cake shared together.',
                            images: ['./memories/bday-celebration.jpg'],
                          })
                        }
                      />

                      <VintageImage
                        src="./memories/her-bday-happiness.jpg"
                        alt="Her Birthday Happiness"
                        caption="Her purest happiness"
                        memoryId={10}
                        aspectRatio="min-h-[280px] sm:min-h-[350px] max-h-[420px]"
                        onClick={() =>
                          onOpenLightbox &&
                          onOpenLightbox({
                            id: 10,
                            title: 'Her Birthday Happiness',
                            teluguTitle: 'ఆమె మోమున చిరునవ్వుల వేడుక',
                            displayDate: '26 September',
                            description: 'The innocent joy in her eyes is the greatest gift in my world.',
                            images: ['./memories/her-bday-happiness.jpg'],
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={launchElegantSparks}
                      className="px-6 py-2.5 rounded-full bg-[#1e130c] text-[#ffd700] border border-[#ffd700]/50 font-cinzel text-xs flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer shadow-lg"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Burst Golden Sparks</span>
                    </button>

                    <button
                      type="button"
                      onClick={onProceedToLetter}
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-[#8e2034] via-[#651726] to-[#8e2034] text-[#fbf5b7] font-cinzel font-semibold tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all border border-[#ffd700]/50 flex items-center gap-2 cursor-pointer"
                    >
                      <span>Open Final Love Letter</span>
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
