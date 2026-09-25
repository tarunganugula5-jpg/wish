import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Compass, ChevronDown, Sparkles } from 'lucide-react';
import VintageImage from './VintageImage';
import { storyData } from '../data/storyChapters';

export default function FuturePage({ onProceedToFinal, onOpenLightbox }) {
  const future = storyData.ourFuture;

  return (
    <section className="py-20 sm:py-28 px-4 bg-[#100805] text-[#f5ebd9] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full rounded-full bg-[#c59b27]/8 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-10 relative z-10 text-center">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Compass className="w-4 h-4 text-[#c59b27]" />
            <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#d4af37]">
              Looking Ahead
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#f5ebd9] tracking-wide">
            {future.title}
          </h2>

          <p className="font-cormorant italic text-base sm:text-xl text-[#c5a687]">
            {future.subtitle}
          </p>

          <div className="w-20 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#c59b27] to-transparent mt-2" />
        </div>

        {/* Tarun's Commitment Parchment with REAL FUTURE GOAL PHOTO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="parchment-card p-6 sm:p-12 rounded-xl border-2 border-[#c59b27]/60 shadow-2xl relative space-y-6 text-left"
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 text-[#9f7831] font-cinzel text-sm">✦</div>
          <div className="absolute top-3 right-3 text-[#9f7831] font-cinzel text-sm">✦</div>

          {/* REAL FUTURE GOAL PHOTOGRAPH */}
          <div className="max-w-md mx-auto drop-shadow-2xl">
            <VintageImage
              src="./memories/future-goal.jpg"
              alt="Our Dream Wedding & Future Goal"
              caption="Our Sacred Future Goal Together ❤️"
              memoryId={12}
              aspectRatio="min-h-[300px] sm:min-h-[380px] max-h-[460px]"
              onClick={() =>
                onOpenLightbox &&
                onOpenLightbox({
                  id: 12,
                  title: 'Our Dream Wedding & Future Goal',
                  teluguTitle: 'మన కలల భవిష్యత్తు — పెళ్లి బంధం',
                  displayDate: 'Tomorrow & Forever',
                  description:
                    'Our dream of walking down the wedding aisle together. Not alone, but with both families united, blessing our journey as husband and wife.',
                  images: ['./memories/future-goal.jpg'],
                })
              }
            />
          </div>

          <div className="p-6 rounded-lg bg-[#dfd0b5]/60 border border-[#c59b27]/40 text-center shadow-inner">
            <p className="font-cormorant text-xl sm:text-2xl text-[#2a170d] font-bold leading-relaxed whitespace-pre-line">
              {future.teluguVision}
            </p>
          </div>

          <div className="space-y-2 pt-2 text-center text-[#5a3e2a]">
            <p className="font-cormorant italic text-base sm:text-xl font-medium text-[#2a170d]">
              “{future.translation}”
            </p>
            <p className="text-xs font-body text-[#785942] italic">
              (A commitment rooted in love, respect, and family)
            </p>
          </div>

          {/* Action button to final scene */}
          <div className="pt-6 border-t border-[#c59b27]/30 text-center">
            <button
              type="button"
              onClick={onProceedToFinal}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#20100a] via-[#3b1d12] to-[#20100a] text-[#ffd700] hover:text-[#ffffff] border-2 border-[#ffd700]/70 font-cinzel text-xs sm:text-sm font-semibold tracking-wider hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xl inline-flex items-center gap-2"
            >
              <span>The Final Chapter</span>
              <ChevronDown className="w-4 h-4 text-[#ffd700]" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
