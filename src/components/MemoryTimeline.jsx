import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Sparkles, Filter, Eye, Heart } from 'lucide-react';
import { memoriesData } from '../data/memories';
import VintageImage from './VintageImage';

export default function MemoryTimeline({ onOpenLightbox }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Chapters', telugu: 'అన్ని జ్ఞాపకాలు' },
    { id: 'early-days', label: 'Diploma Days', telugu: 'తొలి రోజులు' },
    { id: 'turning-point', label: 'Simhachalam', telugu: 'సింహాచలం' },
    { id: 'distance', label: 'Distance', telugu: 'దూరం' },
    { id: 'love-story', label: '15 March & Beyond', telugu: 'ప్రేమ ప్రయాణం' },
  ];

  const filteredMemories =
    selectedCategory === 'all'
      ? memoriesData
      : memoriesData.filter((m) => m.category === selectedCategory);

  return (
    <section className="py-20 sm:py-28 px-4 bg-[#100906] text-[#f5ebd9] relative overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#d4af37]">
            Chronicles of Us
          </span>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#f5ebd9] tracking-wide">
            Our Memories Timeline
          </h2>

          <p className="font-cormorant italic text-base sm:text-xl text-[#c5a687]">
            “Photographs fade, but the feeling of those moments stays eternal.”
          </p>

          <div className="w-20 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#c59b27] to-transparent mt-2" />
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-cinzel tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#8e2034] text-[#ffd700] border border-[#ffd700]/50 shadow-md scale-105'
                  : 'bg-[#1e130c] text-[#bca280] border border-[#c59b27]/30 hover:border-[#ffd700]/40'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Timeline Container */}
        <div className="relative pt-6">
          {/* Central Vertical Golden Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-[#c59b27]/50 to-transparent" />

          {/* Timeline Nodes */}
          <div className="space-y-12 md:space-y-16">
            {filteredMemories.map((memory, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={memory.id}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Photo Side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 max-w-sm mx-auto"
                  >
                    <VintageImage
                      src={memory.images?.[0]}
                      alt={memory.title}
                      caption={memory.title}
                      memoryId={memory.id}
                      aspectRatio="aspect-[4/3]"
                      onClick={() => onOpenLightbox && onOpenLightbox(memory)}
                    />
                  </motion.div>

                  {/* Central Node Dot on Desktop */}
                  <div className="hidden md:flex w-8 h-8 rounded-full bg-[#1e130c] border-2 border-[#ffd700] items-center justify-center text-[#ffd700] shadow-md z-10 shrink-0">
                    <Heart className="w-3.5 h-3.5 fill-[#8e2034]" />
                  </div>

                  {/* Content / Narrative Side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2"
                  >
                    <div className="parchment-card p-6 sm:p-7 rounded-lg border border-[#c59b27]/40 shadow-xl space-y-3">
                      {/* Date & Location Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#c59b27]/30 pb-2">
                        <span className="flex items-center gap-1 text-xs font-cinzel font-semibold text-[#8e2034]">
                          <Calendar className="w-3 h-3" />
                          {memory.displayDate}
                        </span>
                        {memory.location && (
                          <span className="flex items-center gap-1 text-xs font-body text-[#785942]">
                            <MapPin className="w-3 h-3 text-[#c59b27]" />
                            {memory.location}
                          </span>
                        )}
                      </div>

                      {/* Titles */}
                      <div>
                        <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#2a170d]">
                          {memory.title}
                        </h3>
                        {memory.teluguTitle && (
                          <p className="font-cormorant text-sm sm:text-base text-[#651726] font-medium mt-0.5">
                            {memory.teluguTitle}
                          </p>
                        )}
                      </div>

                      {/* Description */}
                      <p className="font-cormorant text-base sm:text-lg text-[#382417] leading-relaxed">
                        {memory.description}
                      </p>

                      {/* Quote */}
                      {memory.quote && (
                        <p className="font-cormorant italic text-sm text-[#785942] pt-2 border-t border-[#c59b27]/20">
                          “{memory.quote}”
                        </p>
                      )}

                      {/* Open Full Button */}
                      <div className="pt-2 text-right">
                        <button
                          type="button"
                          onClick={() => onOpenLightbox && onOpenLightbox(memory)}
                          className="inline-flex items-center gap-1.5 text-xs font-cinzel text-[#8e2034] hover:text-[#2a170d] font-semibold cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Full Memory</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
