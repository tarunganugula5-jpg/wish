import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Camera, Film, Layers, Eye, RefreshCw } from 'lucide-react';
import VintageImage from './VintageImage';
import { memoriesData } from '../data/memories';

export default function PhotoScrapbook({ onOpenLightbox }) {
  const [activeStackIndex, setActiveStackIndex] = useState(0);

  // Group of photos for the stacked / filmstrip scrapbook
  const scrapbookPhotos = memoriesData.slice(0, 10);

  const nextStack = () => {
    setActiveStackIndex((prev) => (prev + 1) % scrapbookPhotos.length);
  };

  return (
    <section className="py-16 sm:py-24 px-4 bg-[#140b07] text-[#f5ebd9] relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-10 relative z-10">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-2">
            <Camera className="w-4 h-4 text-[#c59b27]" />
            <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#d4af37]">
              Scrapbook Collection
            </span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#f5ebd9] tracking-wide">
            Our Antique Photo Album
          </h2>

          <p className="font-cormorant italic text-base sm:text-lg text-[#c5a687]">
            “Real candid moments, shared laughs, and memories pressed in time.”
          </p>
        </div>

        {/* Vintage Scrapbook Two-Page Spread */}
        <div className="parchment-card p-6 sm:p-10 rounded-xl border-2 border-[#c59b27]/60 shadow-2xl relative">
          {/* Middle Book Spine Seam */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-transparent via-[#8c5e34]/20 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Page: Interactive Stacked Photo Deck */}
            <div className="space-y-4 text-center">
              <span className="font-cinzel text-xs uppercase tracking-widest text-[#8e2034] font-semibold flex items-center justify-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Stacked Memories (Tap to shuffle)
              </span>

              <div
                className="relative h-72 sm:h-84 max-w-xs mx-auto flex items-center justify-center cursor-pointer select-none"
                onClick={nextStack}
                title="Tap to shuffle next photograph"
              >
                {scrapbookPhotos.map((photo, idx) => {
                  const offset =
                    (idx - activeStackIndex + scrapbookPhotos.length) % scrapbookPhotos.length;
                  const isTop = offset === 0;

                  return (
                    <motion.div
                      key={photo.id}
                      className="absolute w-56 sm:w-64"
                      animate={{
                        scale: isTop ? 1 : 0.94 - offset * 0.03,
                        y: isTop ? 0 : offset * 8,
                        rotate: isTop ? (idx % 2 === 0 ? -2 : 2) : (idx % 2 === 0 ? 4 : -4),
                        zIndex: 10 - offset,
                        opacity: offset > 3 ? 0 : 1 - offset * 0.2,
                      }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    >
                      <VintageImage
                        src={photo.images?.[0]}
                        alt={photo.title}
                        caption={photo.title}
                        memoryId={photo.id}
                        aspectRatio="aspect-[4/3]"
                        showTape={true}
                        tapeRotation={idx % 2 === 0 ? -4 : 4}
                      />
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-2 text-xs font-body text-[#785942] italic">
                <span>(Showing {activeStackIndex + 1} of {scrapbookPhotos.length})</span>
                <button
                  type="button"
                  onClick={nextStack}
                  className="px-2 py-0.5 rounded bg-[#dfd0b5] text-[#2a170d] font-cinzel text-[10px] hover:bg-[#c59b27] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className="w-2.5 h-2.5" /> Shuffle
                </button>
              </div>
            </div>

            {/* Right Page: Vintage Filmstrip & Diary Ephemera */}
            <div className="space-y-6">
              {/* Filmstrip Banner */}
              <div className="space-y-2">
                <span className="font-cinzel text-xs uppercase tracking-widest text-[#8e2034] font-semibold flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5" /> 35mm Vintage Film Strip
                </span>

                <div className="bg-[#1a110a] p-3 rounded-lg border border-[#c59b27]/40 shadow-inner">
                  {/* Sprocket holes top */}
                  <div className="flex justify-between px-1 mb-2">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="w-2.5 h-2 bg-[#dfceaa] rounded-xs opacity-60" />
                    ))}
                  </div>

                  {/* Horizontal Scrollable Mini Film strip with REAL USER PHOTOS */}
                  <div className="grid grid-cols-3 gap-2">
                    {scrapbookPhotos.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onOpenLightbox && onOpenLightbox(item)}
                        className="aspect-[4/3] bg-[#2d1b11] rounded-xs overflow-hidden cursor-pointer hover:opacity-85 transition-opacity relative group border border-[#8c5e34]/50"
                      >
                        <img
                          src={item.images?.[0]}
                          alt={item.title}
                          className="w-full h-full object-cover sepia-[0.25]"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-end p-1">
                          <span className="font-cinzel text-[9px] text-[#ffd700] uppercase tracking-wider line-clamp-1">
                            {item.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sprocket holes bottom */}
                  <div className="flex justify-between px-1 mt-2">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="w-2.5 h-2 bg-[#dfceaa] rounded-xs opacity-60" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Taped Postal Ticket Stub */}
              <div className="p-4 rounded bg-[#dfd0b5]/50 border border-[#c59b27]/40 shadow-xs relative">
                <div className="scotch-tape -top-2 left-6" />
                <span className="font-cinzel text-xs text-[#8e2034] font-bold uppercase tracking-wider block">
                  Treasured Moments
                </span>
                <p className="font-cormorant italic text-base text-[#2a170d] mt-1">
                  “A hundred memories tucked away inside our story, each holding the exact warmth of your love.”
                </p>
                <div className="mt-2 flex justify-between items-center text-xs font-cinzel text-[#8c6b4e]">
                  <span>Visakhapatnam ↔ Hyderabad</span>
                  <span>15 March 2025 → ∞</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
