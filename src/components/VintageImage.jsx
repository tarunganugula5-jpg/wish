import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Eye, ZoomIn } from 'lucide-react';

// Illustrated artistic fallbacks matching each chapter's exact emotional story
const artworkThemes = {
  1: {
    title: 'The Masked Girl',
    bg: 'linear-gradient(135deg, #3d2a1d 0%, #5c3c26 50%, #2e1d13 100%)',
    iconColor: '#e0caa7',
    badge: 'Diploma 1st Year',
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-80">
        <circle cx="100" cy="85" r="45" fill="#d9be9b" />
        <path d="M50 80 Q100 25 150 80 Q155 120 145 140 Q130 90 100 90 Q70 90 55 140 Z" fill="#2d1c14" />
        <rect x="70" y="88" width="60" height="35" rx="10" fill="#f5ede0" stroke="#c4ad90" strokeWidth="2" />
        <ellipse cx="85" cy="76" rx="5" ry="4" fill="#2d1c14" />
        <ellipse cx="115" cy="76" rx="5" ry="4" fill="#2d1c14" />
      </svg>
    ),
  },
  2: {
    title: 'Just Friends & Chocolates',
    bg: 'linear-gradient(135deg, #42251a 0%, #633928 50%, #30170e 100%)',
    iconColor: '#e8c99e',
    badge: 'Friendship Days',
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-80">
        <rect x="55" y="65" width="90" height="70" rx="6" fill="#4a2113" stroke="#d4af37" strokeWidth="2" />
        <line x1="100" y1="65" x2="100" y2="135" stroke="#33140a" strokeWidth="2" />
        <line x1="55" y1="100" x2="145" y2="100" stroke="#33140a" strokeWidth="2" />
      </svg>
    ),
  },
  3: {
    title: 'When Everyone Left',
    bg: 'linear-gradient(135deg, #251813 0%, #402920 50%, #1a100b 100%)',
    iconColor: '#d6b88d',
    badge: 'Standing Beside',
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-80">
        <circle cx="100" cy="100" r="14" fill="#ffb347" filter="drop-shadow(0 0 10px #ffa022)" />
        <path d="M70 160 Q70 125 82 125 Q94 125 94 160 Z" fill="#140b07" />
        <path d="M106 160 Q106 128 118 128 Q130 128 130 160 Z" fill="#140b07" />
      </svg>
    ),
  },
  4: {
    title: 'Simhachalam Steps',
    bg: 'linear-gradient(135deg, #3d2417 0%, #693f25 50%, #2c160c 100%)',
    iconColor: '#e7c68e',
    badge: 'Sacred Temple',
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-80">
        <path d="M100 25 L85 60 L115 60 Z" fill="#9f7831" />
        <rect x="75" y="60" width="50" height="35" fill="#754e19" />
      </svg>
    ),
  },
  5: {
    title: "The Hand I Didn't Want to Let Go",
    bg: 'linear-gradient(135deg, #421820 0%, #6e2735 50%, #2f0e15 100%)',
    iconColor: '#f3c4c9',
    badge: 'Simhachalam • That Touch',
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-85">
        <circle cx="100" cy="100" r="60" fill="rgba(255, 170, 59, 0.2)" />
        <circle cx="102" cy="101" r="6" fill="#ffaa3b" filter="drop-shadow(0 0 8px #ff7b00)" />
      </svg>
    ),
  },
};

export default function VintageImage({
  src,
  alt = 'Vintage Memory',
  caption,
  memoryId = 1,
  className = '',
  aspectRatio = 'min-h-[260px] sm:min-h-[320px] max-h-[420px]',
  onClick,
  showTape = true,
  tapeRotation = -3,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const theme = artworkThemes[memoryId] || artworkThemes[1];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 6, y: -y * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={`polaroid-frame cursor-pointer select-none group ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Scotch Tape */}
      {showTape && (
        <div
          className="scotch-tape -top-3 left-1/2 -translate-x-1/2"
          style={{ transform: `translateX(-50%) rotate(${tapeRotation}deg)` }}
        />
      )}

      {/* Photo Mount Container: Uses object-contain so full photo and all faces are 100% visible */}
      <div
        className={`relative overflow-hidden rounded-[2px] bg-gradient-to-b from-[#140b06] via-[#1c1109] to-[#120a06] p-1.5 flex items-center justify-center ${aspectRatio} shadow-inner border border-[#4a2e18]/40`}
      >
        {/* Real Image: Full uncropped view with object-contain */}
        {!imageError && src && (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`max-h-full max-w-full w-auto h-auto object-contain rounded-xs transition-all duration-500 group-hover:scale-[1.02] ${
              imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
            }`}
          />
        )}

        {/* Artistic Vintage Fallback Artwork if image is not yet loaded */}
        {(!src || imageError || !imageLoaded) && (
          <div
            className="w-full h-full flex flex-col items-center justify-center p-4 relative text-center min-h-[220px]"
            style={{ background: theme.bg }}
          >
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="w-24 h-24 relative z-10 drop-shadow-md">
              {theme.svg}
            </div>
            <span
              className="mt-1 text-[11px] uppercase tracking-widest px-2 py-0.5 rounded border border-[#c59b27]/30 font-cinzel relative z-10"
              style={{ color: theme.iconColor }}
            >
              {theme.badge}
            </span>
            <p className="mt-1 text-xs font-cormorant italic text-[#eedcc5] px-2 relative z-10 line-clamp-1">
              {theme.title}
            </p>
          </div>
        )}

        {/* Hover Hint Badge */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="flex items-center gap-1.5 text-xs font-cinzel text-[#ffd700] bg-black/75 px-3 py-1.5 rounded-full border border-[#ffd700]/50 shadow-xl backdrop-blur-xs font-semibold">
            <ZoomIn className="w-3.5 h-3.5" /> Tap for Full Uncropped Photo
          </span>
        </div>
      </div>

      {/* Polaroid Handwritten Caption Area */}
      {caption && (
        <div className="mt-3 text-center px-1">
          <p className="font-handwriting text-base sm:text-lg text-[#2a170d] leading-tight line-clamp-2 font-semibold">
            {caption}
          </p>
        </div>
      )}
    </motion.div>
  );
}
