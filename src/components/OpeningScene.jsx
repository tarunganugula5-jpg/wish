import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronDown, Sparkles, Feather } from 'lucide-react';
import VintageImage from './VintageImage';
import { storyData } from '../data/storyChapters';

export default function OpeningScene({ onProceed }) {
  const [step, setStep] = useState(0);

  // Progressive cinematic reveal
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),   // "Once upon a time..."
      setTimeout(() => setStep(2), 2000),  // "Not in a movie."
      setTimeout(() => setStep(3), 3400),  // "Not in a storybook."
      setTimeout(() => setStep(4), 4800),  // "But somewhere inside our ordinary diploma life..."
      setTimeout(() => setStep(5), 6800),  // "There was a girl." -> Tejaswini frame
      setTimeout(() => setStep(6), 9600),  // "And somewhere in her story... Tarun -> Nanna ❤️"
      setTimeout(() => setStep(7), 12500), // "Our Story — Still being written..."
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#100906] text-[#e8dac7] px-4 py-12 relative overflow-hidden select-none">
      {/* Soft Vignette & Old Film Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2a180e_0%,_#0a0503_85%)] pointer-events-none" />

      {/* Floating Dust Particles Canvas/Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="w-full max-w-2xl z-10 flex flex-col items-center text-center space-y-6">
        {/* Step 1 to 4: Prologue */}
        <div className="min-h-[130px] flex flex-col items-center justify-center space-y-2">
          <AnimatePresence>
            {step >= 1 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="font-cormorant italic text-2xl sm:text-4xl text-[#d4af37]"
              >
                “Once upon a time...”
              </motion.p>
            )}

            {step >= 2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                transition={{ duration: 0.9 }}
                className="font-cormorant text-lg sm:text-2xl text-[#bca285]"
              >
                Not in a movie.
              </motion.p>
            )}

            {step >= 3 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                transition={{ duration: 0.9 }}
                className="font-cormorant text-lg sm:text-2xl text-[#bca285]"
              >
                Not in a storybook.
              </motion.p>
            )}

            {step >= 4 && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1 }}
                className="font-cormorant italic text-xl sm:text-3xl text-[#e8dac7] pt-2"
              >
                But somewhere inside our ordinary diploma life...
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Step 5: There was a girl -> Tejaswini / Kanna Amma with REAL PHOTO */}
        <AnimatePresence>
          {step >= 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="flex flex-col items-center space-y-4 pt-2"
            >
              <p className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.3em] text-[#d4af37]">
                There was a girl.
              </p>

              {/* Photo Frame using real user photo: meet-saree.jpg */}
              <div className="w-72 sm:w-84 max-w-full drop-shadow-2xl">
                <VintageImage
                  src="./memories/meet-saree.jpg"
                  alt="Tejaswini"
                  caption="Tejaswini (Kanna Amma) ❤️"
                  memoryId={13}
                  aspectRatio="min-h-[340px] sm:min-h-[420px] max-h-[500px]"
                  showTape={true}
                />
              </div>

              <div className="space-y-1">
                <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#f5ebd9] tracking-wider">
                  Tejaswini.
                </h2>
                <p className="font-cormorant italic text-lg sm:text-2xl text-[#c5a687]">
                  To the world, Tejaswini.
                  <br />
                  <span className="text-[#ffd700] font-semibold not-italic font-handwriting text-3xl">
                    Kanna Amma, to me.
                  </span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 6: And somewhere in her story -> Tarun / Nanna */}
        <AnimatePresence>
          {step >= 6 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1 }}
              className="space-y-2 pt-2"
            >
              <p className="font-cormorant text-base sm:text-lg text-[#bca285]">
                And somewhere in her story...
              </p>
              <p className="font-cormorant text-lg sm:text-xl text-[#e8dac7]">
                there was a boy named Tarun.
              </p>
              <p className="font-cormorant italic text-base sm:text-lg text-[#c5a687]">
                But she calls him...
              </p>
              <p className="font-handwriting text-4xl sm:text-5xl text-[#ffd700] font-bold">
                Nanna. ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 7: Title Card & Enter Chapter I */}
        <AnimatePresence>
          {step >= 7 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="pt-6 space-y-4"
            >
              <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#c59b27] to-transparent" />
              <div>
                <h1 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-widest text-[#f5ebd9] drop-shadow-lg">
                  Our Story
                </h1>
                <p className="font-cormorant italic text-lg sm:text-xl text-[#c59b27] mt-1">
                  Still being written...
                </p>
              </div>

              <motion.button
                type="button"
                onClick={onProceed}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="mt-6 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#381a10] via-[#5c2d1b] to-[#381a10] border-2 border-[#ffd700] text-[#fbf5b7] font-cinzel font-semibold tracking-wider shadow-2xl hover:shadow-[0_0_24px_rgba(255,215,0,0.5)] flex items-center gap-2.5 mx-auto cursor-pointer"
              >
                <span>Turn to Chapter I</span>
                <ChevronDown className="w-4 h-4 text-[#ffd700] animate-bounce" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip button for quick reading if already seen */}
        {step < 7 && (
          <button
            type="button"
            onClick={() => setStep(7)}
            className="text-xs font-cormorant text-[#785942] hover:text-[#c59b27] transition-colors mt-6 cursor-pointer"
          >
            [Skip to chapters]
          </button>
        )}
      </div>
    </div>
  );
}
