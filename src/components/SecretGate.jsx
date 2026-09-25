import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, KeyRound, Sparkles, Heart } from 'lucide-react';

export default function SecretGate({ onUnlock }) {
  const [pin, setPin] = useState(['', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [shake, setShake] = useState(false);

  const CORRECT_PIN = '2620';

  const handleDigitChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    setErrorMsg('');

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-dial-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Auto-check when all 4 filled
    const fullPin = newPin.join('');
    if (fullPin.length === 4) {
      validatePin(fullPin);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-dial-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const validatePin = (inputPin) => {
    if (inputPin === CORRECT_PIN) {
      setIsUnlocking(true);
      setErrorMsg('');
      setTimeout(() => {
        if (onUnlock) onUnlock();
      }, 1600);
    } else {
      setShake(true);
      setErrorMsg('The diary doesn’t recognize you yet...');
      setTimeout(() => setShake(false), 600);
      setPin(['', '', '', '']);
      const firstInput = document.getElementById('pin-dial-0');
      if (firstInput) firstInput.focus();
    }
  };

  // Quick unlock for effortless entry
  const quickUnlock = () => {
    setPin(['2', '6', '2', '0']);
    validatePin('2620');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0d0704] text-[#e8dac7] p-4 relative overflow-hidden select-none">
      {/* Dark Wooden Desk Surface Texture */}
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_center,_#2b180e_0%,_#0d0704_80%)] pointer-events-none" />

      {/* Candlelight Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#ffaa3b]/12 blur-3xl pointer-events-none candle-flame" />

      {/* Atmospheric Floating Dust Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:24px_24px]" />

      <motion.div
        className="w-full max-w-lg z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      >
        {/* Poetic Opening Lines */}
        <motion.div
          className="mb-6 space-y-2 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <p className="font-cormorant italic text-lg sm:text-2xl text-[#d4af37] tracking-wide">
            “Some stories aren’t meant for everyone...”
          </p>
          <p className="font-cinzel text-xl sm:text-3xl text-[#f3e3ce] font-semibold tracking-wider">
            This one belongs to us.
          </p>
          <div className="w-20 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#ffd700] to-transparent mt-3" />
        </motion.div>

        {/* Antique Book Perspective Container */}
        <div className="relative w-72 sm:w-84 md:w-96 aspect-[3/4] perspective-1000">
          <motion.div
            className={`w-full h-full rounded-r-xl rounded-l-sm diary-cover-texture relative p-6 sm:p-8 flex flex-col items-center justify-between text-center border-l-8 border-[#3b2011] shadow-2xl ${
              shake ? 'animate-shake' : ''
            }`}
            animate={
              isUnlocking
                ? {
                    rotateY: -85,
                    x: -60,
                    opacity: 0.8,
                    filter: 'drop-shadow(20px 10px 40px rgba(255,170,59,0.4))',
                  }
                : { rotateY: 0, x: 0 }
            }
            transition={{ duration: 1.3, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* Book Spine Stitch Detail */}
            <div className="absolute left-2 top-0 bottom-0 w-1 border-r border-[#693f25]/40" />

            {/* Embossed Corner Brass Ornaments */}
            <div className="absolute top-3 left-4 text-[#ffd700]/80 font-cinzel text-sm">❧</div>
            <div className="absolute top-3 right-4 text-[#ffd700]/80 font-cinzel text-sm">❧</div>
            <div className="absolute bottom-3 left-4 text-[#ffd700]/80 font-cinzel text-sm">❧</div>
            <div className="absolute bottom-3 right-4 text-[#ffd700]/80 font-cinzel text-sm">❧</div>

            {/* Diary Header Monogram */}
            <div className="pt-2">
              <span className="font-cinzel-decorative text-4xl sm:text-5xl text-[#ffd700] drop-shadow-[0_2px_10px_rgba(255,215,0,0.4)] tracking-widest font-bold">
                T & T
              </span>
              <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#d4c2a0] mt-1 font-semibold">
                Our Story
              </p>
            </div>

            {/* Antique Lock & Dial Mechanism */}
            <div className="w-full max-w-[260px] py-4 px-3 rounded-lg bg-[#140b07]/90 border border-[#8c5e34]/70 shadow-inner flex flex-col items-center my-auto">
              <div className="flex items-center gap-1.5 text-xs font-cinzel text-[#ffd700] mb-3 font-semibold">
                {isUnlocking ? (
                  <Unlock className="w-4 h-4 text-[#ffd700] animate-bounce" />
                ) : (
                  <Lock className="w-4 h-4 text-[#ffd700]" />
                )}
                <span>Enter Our Secret ❤️</span>
              </div>

              {/* 4-Digit Combination Dials */}
              <div className="flex justify-center gap-2 sm:gap-3">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="relative">
                    <input
                      id={`pin-dial-${index}`}
                      type="password"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={pin[index]}
                      onChange={(e) => handleDigitChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      disabled={isUnlocking}
                      className="w-11 sm:w-13 h-14 sm:h-16 text-center font-cinzel text-2xl sm:text-3xl font-bold bg-gradient-to-b from-[#2a170d] to-[#140b07] border-2 border-[#8c5e34] rounded-md text-[#ffd700] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] focus:border-[#ffd700] focus:shadow-[0_0_15px_rgba(255,215,0,0.5)] focus:outline-none transition-all cursor-text disabled:opacity-60"
                      placeholder="•"
                    />
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-[#4a2e18] rounded-full" />
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-[#4a2e18] rounded-full" />
                  </div>
                ))}
              </div>

              {/* Error or Unlocking State Text */}
              <div className="h-6 mt-3">
                <AnimatePresence>
                  {errorMsg && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-cormorant italic text-sm text-[#ff8080] font-semibold"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                  {isUnlocking && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center gap-1.5 font-cinzel text-xs text-[#ffd700] font-bold"
                    >
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>The lock unlatches...</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Diary Date Stamp on Leather Cover */}
            <div className="pb-1">
              <p className="font-cinzel text-xs text-[#ffd700]/70 tracking-widest font-semibold">
                15 • 03 • 2025
              </p>
            </div>
          </motion.div>

          {/* Underneath Paper Page that peeks when diary opens */}
          <div className="absolute inset-0 bg-[#ebe0cb] rounded-r-xl rounded-l-sm -z-10 shadow-2xl border border-[#d2be97] flex items-center justify-center p-6 text-[#3a2517]">
            <div className="text-center">
              <span className="font-cinzel text-sm text-[#735740] tracking-widest font-bold">
                Opening Our Journey...
              </span>
            </div>
          </div>
        </div>

        {/* Quick One-Touch Unlock Button for Instant Attraction & Ease */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={quickUnlock}
            className="px-6 py-2 rounded-full bg-[#1e130c] border border-[#ffd700]/60 text-[#ffd700] hover:text-white hover:bg-[#8e2034] font-cinzel text-xs tracking-wider transition-all duration-300 shadow-lg cursor-pointer flex items-center gap-2 hover:scale-105"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Open With Our Secret (PIN: 2620)</span>
          </button>
          <p className="text-[11px] font-body text-[#8c6b4e] italic">
            (Teju’s special birthday & year — 26th September)
          </p>
        </div>
      </motion.div>
    </div>
  );
}
