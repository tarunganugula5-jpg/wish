import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, ChevronLeft, ChevronRight, Eye, Heart, Sparkles } from 'lucide-react';

export default function LightboxModal({ memory, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [memory]);

  if (!memory) return null;

  const images = memory.images && memory.images.length > 0 ? memory.images : [];
  const currentImg = images[currentImageIndex] || images[0];

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-2 sm:p-4 bg-black/92 backdrop-blur-md">
        {/* Backdrop click to close */}
        <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25 }}
          className="parchment-card relative z-10 max-w-4xl w-full max-h-[96vh] flex flex-col rounded-xl p-4 sm:p-6 shadow-2xl border-2 border-[#ffd700]/70 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 rounded-full bg-[#140b07] text-[#ffd700] border-2 border-[#ffd700]/60 flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-xl z-20"
            title="Close View"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="pr-12 border-b border-[#c59b27]/30 pb-2 mb-2 shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-[11px] uppercase tracking-widest text-[#8e2034] font-bold px-2 py-0.5 rounded bg-[#dfd0b5]/60">
                {memory.category ? memory.category.replace('-', ' ') : 'Love Memory'}
              </span>
              {images.length > 1 && (
                <span className="text-xs font-cinzel text-[#785942]">
                  Photo {currentImageIndex + 1} of {images.length}
                </span>
              )}
            </div>

            <h3 className="font-cinzel text-lg sm:text-2xl font-bold text-[#2a170d] mt-1">
              {memory.title}
            </h3>

            {memory.teluguTitle && (
              <p className="font-cormorant text-sm sm:text-base text-[#651726] font-semibold">
                {memory.teluguTitle}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 text-xs font-body text-[#785942] mt-1">
              {memory.displayDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#c59b27]" />
                  {memory.displayDate}
                </span>
              )}
              {memory.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#c59b27]" />
                  {memory.location}
                </span>
              )}
            </div>
          </div>

          {/* FULL UNCOVERED PHOTOGRAPH THEATER */}
          <div className="relative flex-1 min-h-[300px] max-h-[62vh] sm:max-h-[66vh] bg-[#0d0704] rounded-lg p-2 flex items-center justify-center border border-[#8c5e34]/50 shadow-inner overflow-hidden">
            {currentImg ? (
              <img
                src={currentImg}
                alt={memory.title}
                className="max-h-full max-w-full w-auto h-auto object-contain rounded shadow-2xl mx-auto transition-transform duration-300"
              />
            ) : (
              <div className="text-center p-6 text-[#eedcc5] font-cormorant italic">
                Photo is being preserved in our diary...
              </div>
            )}

            {/* Navigation Arrows for Multiple Photos */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 text-[#ffd700] border border-[#ffd700]/50 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl cursor-pointer"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 text-[#ffd700] border border-[#ffd700]/50 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl cursor-pointer"
                  title="Next Photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails if memory has multiple images */}
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2 shrink-0 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-12 h-12 rounded border-2 overflow-hidden transition-all cursor-pointer ${
                    currentImageIndex === idx
                      ? 'border-[#ffd700] scale-110 shadow-md'
                      : 'border-[#8c5e34]/40 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Narrative & Quote */}
          <div className="mt-2 pt-2 border-t border-[#c59b27]/25 shrink-0 overflow-y-auto max-h-[14vh] text-[#382417] text-sm sm:text-base font-cormorant leading-relaxed">
            <p>{memory.description}</p>
            {memory.quote && (
              <p className="mt-1 italic text-[#651726] font-semibold">
                “{memory.quote}”
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
