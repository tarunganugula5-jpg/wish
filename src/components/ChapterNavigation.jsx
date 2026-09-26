import React, { useState, useEffect } from 'react';
import { Bookmark, Menu, X, Heart, Sparkles } from 'lucide-react';

export default function ChapterNavigation({ activeSection, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections = [
    { id: 'chapter-1', label: 'I. Before We Knew', telugu: 'మొదటి చూపు' },
    { id: 'chapter-2', label: 'II. Just Friends', telugu: 'స్నేహం' },
    { id: 'chapter-3', label: 'III. When Everyone Left', telugu: 'నీ తోడు' },
    { id: 'chapter-4', label: 'IV. Simhachalam Steps', telugu: 'ఆ చెయ్యి' },
    { id: 'chapter-5', label: 'V. Distance', telugu: 'దూరం' },
    { id: 'chapter-6', label: 'VI. 15 March 2025', telugu: 'ప్రేమ ప్రయాణం' },
    { id: 'chapter-7', label: 'VII. April 24', telugu: 'ఆలయ స్మృతులు' },
    { id: 'chapter-8', label: 'VIII. Our Journey', telugu: 'మన ప్రయాణం' },
    { id: 'why-i-love-you', label: 'Why I Love You', telugu: 'నా మనసులోని మాట' },
    { id: 'timeline', label: 'Timeline & Scrapbook', telugu: 'మధుర స్మృతులు' },
    { id: 'birthday-reveal', label: 'Birthday Reveal', telugu: 'పుట్టినరోజు శుభాకాంక్షలు' },
    { id: 'love-letter', label: 'My Letter to You', telugu: 'తరన్ ప్రేమలేఖ' },
    { id: 'future', label: 'Our Tomorrow', telugu: 'మన భవిష్యత్తు' },
    { id: 'final', label: 'Final Chapter', telugu: 'ముగింపు' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelect = (id) => {
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Floating Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#25150c]/80 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#8e2034] via-[#c59b27] to-[#ffd700] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Vintage Bookmark / Chapter Index Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="parchment-card px-3.5 py-2 rounded-full border border-[#c59b27]/60 shadow-xl flex items-center gap-2 text-xs font-cinzel text-[#2a170d] font-bold hover:scale-105 transition-transform cursor-pointer"
          title="Chapters Index"
        >
          <Bookmark className="w-4 h-4 text-[#8e2034]" />
          <span className="hidden sm:inline">Chapters</span>
        </button>
      </div>

      {/* Slide-out Vintage Index Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-72 sm:w-84 max-w-full h-full parchment-card p-6 border-r-2 border-[#c59b27] shadow-2xl flex flex-col justify-between overflow-y-auto z-10">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#c59b27]/40 pb-3 mb-4">
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-[#2a170d]">
                    Our Story Index
                  </h3>
                  <p className="font-cormorant italic text-xs text-[#785942]">
                    Tarun & Tejaswini
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-[#785942] hover:text-[#2a170d] p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="space-y-1">
                {sections.map((sec, idx) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => handleSelect(sec.id)}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-[#dfd0b5]/60 transition-colors flex items-center justify-between text-xs font-cinzel text-[#382417] group cursor-pointer"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-semibold truncate group-hover:text-[#8e2034]">
                        {sec.label}
                      </p>
                      <p className="font-cormorant text-[11px] italic text-[#785942]">
                        {sec.telugu}
                      </p>
                    </div>
                    <Heart className="w-3 h-3 text-[#c59b27]/50 group-hover:text-[#8e2034] shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="pt-4 border-t border-[#c59b27]/30 text-center">
              <span className="font-cinzel text-[10px] text-[#8c6b4e] uppercase tracking-widest block">
                15 March 2025 → Forever
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
