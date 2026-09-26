import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, MapPin, Calendar, Bookmark, Eye } from 'lucide-react';
import VintageImage from './VintageImage';
import { DriedRose, MarginHeart, StarDoodle, UnderlinedWord, PageFoldSurprise } from './HiddenSurprises';

export default function ChapterSection({
  chapterKey,
  data,
  onOpenLightbox,
  onTriggerSurprise,
}) {
  if (!data) return null;

  return (
    <section className="py-14 sm:py-20 px-4 relative overflow-hidden">
      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        {/* Chapter Top Marker */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-px bg-[#c59b27]/60" />
            <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#d4af37]">
              {data.number}
            </span>
            <div className="w-8 h-px bg-[#c59b27]/60" />
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#f5ebd9] tracking-wide">
            {data.title}
          </h2>

          {data.subtitle && (
            <p className="font-cormorant italic text-base sm:text-xl text-[#c5a687]">
              {data.subtitle}
            </p>
          )}

          {data.era && (
            <span className="inline-block mt-1 text-xs font-cinzel text-[#ffd700] uppercase tracking-widest px-3 py-0.5 rounded-full border border-[#c59b27]/30 bg-[#25150c]/60">
              {data.era}
            </span>
          )}
        </div>

        {/* Parchment Book Page Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="parchment-card p-6 sm:p-10 rounded-lg border border-[#c59b27]/40 shadow-2xl relative"
        >
          {/* Subtle Organic Hidden Surprise (Folded corner or rose in margin) */}
          {chapterKey === 'chapter1' && (
            <div className="absolute top-4 right-4">
              <DriedRose onTrigger={onTriggerSurprise} />
            </div>
          )}
          {chapterKey === 'chapter2' && (
            <PageFoldSurprise onTrigger={onTriggerSurprise} />
          )}
          {chapterKey === 'chapter3' && (
            <div className="absolute bottom-4 right-4">
              <MarginHeart onTrigger={onTriggerSurprise} />
            </div>
          )}
          {chapterKey === 'chapter5' && (
            <div className="absolute top-4 right-4">
              <StarDoodle onTrigger={onTriggerSurprise} />
            </div>
          )}

          {/* Narrative Paragraphs */}
          <div className="space-y-4 text-[#382417] text-base sm:text-lg font-cormorant leading-relaxed">
            {data.content &&
              data.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
          </div>

          {/* Chapter 1 Specific: Masked Girl Humor Note */}
          {data.humorNote && (
            <div className="my-6 p-4 rounded bg-[#dfd0b5]/60 border-l-4 border-[#c59b27] space-y-1 font-cormorant text-center sm:text-left">
              {data.humorNote.map((line, i) => (
                <p
                  key={i}
                  className={
                    i === data.humorNote.length - 1
                      ? 'font-handwriting text-2xl text-[#8e2034] font-bold pt-1'
                      : 'italic text-[#5a3e2a]'
                  }
                >
                  {line}
                </p>
              ))}
            </div>
          )}

          {/* Chapter 2 Specific: Key Insight & Chocolate Memory */}
          {data.keyInsight && (
            <div className="my-6 p-5 rounded-lg bg-[#dfd0b5]/70 border border-[#c59b27]/50 shadow-inner text-center">
              <p className="font-cormorant italic text-lg sm:text-2xl text-[#2a170d] font-semibold">
                “{data.keyInsight}”
              </p>
              {data.chocolateMemory && (
                <p className="mt-3 text-sm sm:text-base font-cormorant text-[#694e35] pt-2 border-t border-[#c59b27]/20">
                  {data.chocolateMemory}
                </p>
              )}
            </div>
          )}

          {/* Chapter 3 Specific: When Everyone Left Quote & Person Reveal */}
          {data.highlightQuote && (
            <div className="my-8 text-center space-y-3 py-4 border-y border-[#c59b27]/30">
              <p className="font-cormorant italic text-xl sm:text-2xl text-[#2a170d] leading-relaxed">
                “{data.highlightQuote}”
              </p>
              <h3 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#8e2034] tracking-widest">
                {data.revealPerson}
              </h3>
              {data.deepMeaning && (
                <p className="font-cormorant text-base sm:text-lg text-[#5a3e2a] max-w-lg mx-auto pt-2">
                  {data.deepMeaning}
                </p>
              )}
            </div>
          )}

          {/* Chapter 5 Specific: Golden Thread connecting distance letters with REAL TRAVEL PHOTO */}
          {chapterKey === 'chapter5' && (
            <div className="my-8 py-6 px-4 bg-[#dfd0b5]/40 rounded-xl border border-[#c59b27]/40 relative overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center text-center">
                {/* Left Letter: Visakhapatnam */}
                <div className="p-4 rounded bg-[#fdfbf7] border border-[#d4c2a0] shadow-sm">
                  <span className="font-cinzel text-xs text-[#8e2034] font-semibold uppercase tracking-wider">
                    Visakhapatnam
                  </span>
                  <p className="font-handwriting text-xl text-[#382417] mt-1">
                    “Missing you every second, Nanna...”
                  </p>
                  <span className="text-xs font-cormorant italic text-[#785942]">— Teju</span>
                </div>

                {/* Right Letter: Hyderabad */}
                <div className="p-4 rounded bg-[#fdfbf7] border border-[#d4c2a0] shadow-sm">
                  <span className="font-cinzel text-xs text-[#8e2034] font-semibold uppercase tracking-wider">
                    Hyderabad
                  </span>
                  <p className="font-handwriting text-xl text-[#382417] mt-1">
                    “Waiting for the day I come back home to you...”
                  </p>
                  <span className="text-xs font-cormorant italic text-[#785942]">— Tarun</span>
                </div>
              </div>

              {/* Connecting animated golden thread */}
              <div className="mt-4 flex items-center justify-center gap-3 text-xs font-cinzel text-[#9f7831]">
                <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-[#ffd700] to-[#c59b27]" />
                <span className="flex items-center gap-1 font-semibold text-[#8e2034]">
                  <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" /> Connected Across Distance
                </span>
                <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent via-[#ffd700] to-[#c59b27]" />
              </div>

              {data.quote && (
                <p className="mt-4 font-cormorant italic text-base sm:text-lg text-center text-[#2a170d]">
                  {data.quote}
                </p>
              )}
            </div>
          )}

          {/* Chapter 8 Specific: The Relationship Fluctuating Line */}
          {chapterKey === 'chapter8' && (
            <div className="my-8 py-6 px-4 bg-[#dfd0b5]/50 rounded-xl border border-[#c59b27]/40 text-center">
              <span className="font-cinzel text-xs uppercase tracking-widest text-[#8e2034] font-semibold">
                Our Non-Linear, Unbreakable Path
              </span>

              {/* Animated Fluctuating SVG Path */}
              <div className="py-4 max-w-lg mx-auto">
                <svg viewBox="0 0 500 120" className="w-full h-auto">
                  <path
                    d="M10 60 Q 60 10, 110 70 T 210 50 T 310 90 T 410 30 T 490 60"
                    fill="none"
                    stroke="#c59b27"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                  />
                  <circle cx="10" cy="60" r="5" fill="#8e2034" />
                  <circle cx="110" cy="70" r="4" fill="#382417" />
                  <circle cx="210" cy="50" r="4" fill="#382417" />
                  <circle cx="310" cy="90" r="4" fill="#8e2034" />
                  <circle cx="410" cy="30" r="5" fill="#ffd700" />
                  <circle cx="490" cy="60" r="6" fill="#8e2034" className="animate-ping" />
                  <circle cx="490" cy="60" r="6" fill="#8e2034" />
                </svg>

                <div className="flex justify-between text-[11px] font-cinzel text-[#8c6b4e] px-2 mt-1">
                  <span>First Hello</span>
                  <span>
                    <UnderlinedWord word="Alaka" onTrigger={onTriggerSurprise} /> & Fights
                  </span>
                  <span>Forever Us</span>
                </div>
              </div>

              {data.finalThought && (
                <p className="mt-2 font-cormorant italic text-lg sm:text-2xl text-[#2a170d] font-semibold">
                  “{data.finalThought}”
                </p>
              )}
            </div>
          )}

          {/* REAL USER PHOTOGRAPHS EMBEDDED IN CHAPTERS */}
          <div className="mt-6 max-w-md mx-auto drop-shadow-xl">
            {chapterKey === 'chapter1' && (
              <VintageImage
                src="./memories/meet.jpg"
                alt="Tejaswini Diploma 1st Year"
                caption="Diploma First Year — Quiet and Innocent"
                memoryId={1}
                aspectRatio="aspect-[4/3]"
                onClick={() =>
                  onOpenLightbox &&
                  onOpenLightbox({
                    id: 1,
                    title: 'The Masked Girl',
                    teluguTitle: 'ఆ మాస్క్ వెనుక అమాయకత్వం',
                    displayDate: 'Diploma 1st Year (2022)',
                    description:
                      'Behind that mask was a girl who looked innocent, calm, and a little afraid of everything. Some things changed with time, but that little fear is still there! ❤️',
                    images: ['./memories/meet.jpg'],
                  })
                }
              />
            )}

            {chapterKey === 'chapter2' && (
              <VintageImage
                src="./memories/meet8.jpg"
                alt="College Days and Chocolates"
                caption="Just Friends & Chocolates"
                memoryId={2}
                aspectRatio="aspect-[4/3]"
                onClick={() =>
                  onOpenLightbox &&
                  onOpenLightbox({
                    id: 2,
                    title: 'Just Friends & Chocolates',
                    teluguTitle: 'స్నేహం మరియు నవ్వులు',
                    displayDate: 'First Year Celebrations',
                    description:
                      'Sometimes the person who eventually becomes your entire world begins simply as a friend standing beside you.',
                    images: ['./memories/meet8.jpg'],
                  })
                }
              />
            )}

            {chapterKey === 'chapter3' && (
              <VintageImage
                src="./memories/meet3.jpg"
                alt="Teju Standing Beside Me"
                caption="When the noise faded, she remained."
                memoryId={3}
                aspectRatio="aspect-[4/3]"
                onClick={() =>
                  onOpenLightbox &&
                  onOpenLightbox({
                    id: 3,
                    title: 'When Everyone Left',
                    teluguTitle: 'చీకటిలో నిలిచిన దీపం — తేజు',
                    displayDate: 'Diploma 2nd Year',
                    description:
                      'When conflicts arose and others distanced themselves, Teju stayed. Her quiet steadfast support became my anchor.',
                    images: ['./memories/meet3.jpg', './memories/meet2.jpg'],
                  })
                }
              />
            )}

            {chapterKey === 'chapter5' && (
              <VintageImage
                src="./memories/travel.jpg"
                alt="Travel & Hyderabad Distance"
                caption="Journey to Hyderabad • Miles Between, Hearts Together"
                memoryId={6}
                aspectRatio="aspect-[4/3]"
                onClick={() =>
                  onOpenLightbox &&
                  onOpenLightbox({
                    id: 6,
                    title: 'Distance Revealed What Closeness Hid',
                    teluguTitle: 'దూరం నేర్పిన ప్రేమ',
                    displayDate: 'February - March 2025',
                    location: 'Hyderabad ↔ Visakhapatnam',
                    description:
                      'In Hyderabad, days were busy, but every night belonged to her messages and calls. Distance made us realize how deeply rooted we had become in each other’s hearts.',
                    images: ['./memories/travel.jpg'],
                  })
                }
              />
            )}

            {chapterKey === 'chapter7' && (
              <VintageImage
                src="./memories/first-trip-temple.jpg"
                alt="First Trip After Love to Temple"
                caption="April 24 — Our First Temple Visit After Falling in Love"
                memoryId={8}
                aspectRatio="aspect-[4/3]"
                onClick={() =>
                  onOpenLightbox &&
                  onOpenLightbox({
                    id: 8,
                    title: 'First Temple Trip After Love',
                    teluguTitle: 'ప్రేమించిన తర్వాత మొదటి ఆలయ యాత్ర',
                    displayDate: '24 April 2025',
                    location: 'Temple',
                    description:
                      'Returning from Hyderabad and meeting Teju was pure magic. Our first trip together after officially falling in love, seeking God’s grace together with pure hearts.',
                    images: ['./memories/first-trip-temple.jpg'],
                  })
                }
              />
            )}

            {chapterKey === 'chapter8' && (
              <div className="space-y-6">
                <VintageImage
                  src="./memories/second-trip-love.jpg"
                  alt="Second Trip After Love"
                  caption="Our Second Sweet Trip Together"
                  memoryId={9}
                  aspectRatio="aspect-[4/3]"
                  onClick={() =>
                    onOpenLightbox &&
                    onOpenLightbox({
                      id: 9,
                      title: 'Second Trip After Love',
                      teluguTitle: 'మన రెండవ తీపి ప్రయాణం',
                      displayDate: 'Mid 2025',
                      description:
                        'We had happiness, arguments, alaka, laughter, and days when nothing went right. But somehow, we kept coming back to us.',
                      images: ['./memories/second-trip-love.jpg'],
                    })
                  }
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
