import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Disc3, SkipForward, Sparkles } from 'lucide-react';
import { musicTracks } from '../data/music';

// Romantic Web Audio Piano / Music Box Synthesizer
// Provides a warm, nostalgic ambient background melody when local MP3s are not yet added.
class RomanticSoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.interval = null;
    this.volume = 0.35;
    this.notes = [
      293.66, // D4
      329.63, // E4
      369.99, // F#4
      440.00, // A4
      493.88, // B4
      587.33, // D5
      659.25, // E5
      739.99, // F#5
    ];
    this.step = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playNote(freq, duration = 2.2, gainFactor = 0.15) {
    if (!this.ctx || this.ctx.state !== 'running') return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Warm harmonics
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq / 2, this.ctx.currentTime);

    const gain2 = this.ctx.createGain();
    gain2.gain.setValueAtTime(gainFactor * 0.4 * this.volume, this.ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration * 1.5);

    gain.gain.setValueAtTime(gainFactor * this.volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);

    osc.start();
    osc2.start();
    osc.stop(this.ctx.currentTime + duration);
    osc2.stop(this.ctx.currentTime + duration * 1.5);
  }

  start() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    if (this.interval) clearInterval(this.interval);

    // Nostalgic cadence chord progression
    const sequence = [
      [293.66, 440.00, 739.99], // D maj
      [369.99, 587.33],
      [440.00, 659.25],
      [329.63, 493.88], // B min / Em feel
      [369.99, 587.33],
      [440.00, 739.99],
      [493.88, 659.25],
      [440.00, 587.33],
    ];

    let seqIdx = 0;
    this.interval = setInterval(() => {
      if (!this.isPlaying) return;
      const chords = sequence[seqIdx % sequence.length];
      chords.forEach((note, i) => {
        setTimeout(() => {
          if (this.isPlaying) {
            this.playNote(note, 3.5, 0.12);
          }
        }, i * 280);
      });
      seqIdx++;
    }, 2800);
  }

  stop() {
    this.isPlaying = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  setVolume(val) {
    this.volume = val;
  }
}

// Singleton synth instance
const synth = new RomanticSoundSynthesizer();

export default function AudioPlayer({
  activeChapter = 'gate',
  hasUnlocked = false,
  showConsentModal = false,
  onConsentChoice,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [usingFallbackSynth, setUsingFallbackSynth] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const audioRef = useRef(null);
  const currentTrack = musicTracks[currentTrackIndex] || musicTracks[0];

  // Update track when chapter changes
  useEffect(() => {
    if (!activeChapter) return;
    const matchingTrackIndex = musicTracks.findIndex((t) =>
      t.chapters.includes(activeChapter)
    );
    if (matchingTrackIndex !== -1 && matchingTrackIndex !== currentTrackIndex) {
      setCurrentTrackIndex(matchingTrackIndex);
    }
  }, [activeChapter]);

  // Handle Play / Pause logic
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setUsingFallbackSynth(false);
            synth.stop();
          })
          .catch(() => {
            // If local MP3 is not found or fails to load, gracefully switch to romantic synth
            setUsingFallbackSynth(true);
            synth.setVolume(isMuted ? 0 : volume);
            synth.start();
          });
      }
    } else {
      audioRef.current.pause();
      synth.stop();
    }
  }, [isPlaying, currentTrackIndex, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    synth.setVolume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % musicTracks.length);
  };

  const handleConsent = (agree) => {
    if (agree) {
      setIsPlaying(true);
    }
    if (onConsentChoice) {
      onConsentChoice(agree);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        loop
        preload="auto"
        onError={() => {
          if (isPlaying) {
            setUsingFallbackSynth(true);
            synth.start();
          }
        }}
      />

      {/* Music Consent Modal (appears right after PIN unlock) */}
      {showConsentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="parchment-card max-w-md w-full p-6 sm:p-8 rounded-lg shadow-2xl border-2 border-[#d4af37]/60 text-center relative overflow-hidden">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 text-[#9f7831] font-cinzel text-xs">❦</div>
            <div className="absolute top-2 right-2 text-[#9f7831] font-cinzel text-xs">❦</div>
            <div className="absolute bottom-2 left-2 text-[#9f7831] font-cinzel text-xs">❦</div>
            <div className="absolute bottom-2 right-2 text-[#9f7831] font-cinzel text-xs">❦</div>

            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#8e2034]/15 border border-[#8e2034]/40 flex items-center justify-center text-[#8e2034] shadow-inner">
              <Music className="w-7 h-7" />
            </div>

            <h3 className="font-cinzel text-xl sm:text-2xl text-[#2a1a10] font-bold tracking-wide">
              ఈ కథను సంగీతంతో చదవాలా? 🎵
            </h3>

            <p className="mt-2 font-cormorant italic text-base sm:text-lg text-[#5a3e2a] leading-relaxed">
              “Every love story has its own heartbeat, and ours has a melody.”
            </p>

            <p className="mt-2 text-xs font-body text-[#785942]">
              (Nostalgic Telugu romantic ambient music crafted for this diary)
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                type="button"
                onClick={() => handleConsent(true)}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#8e2034] to-[#601220] text-[#fbf5b7] font-cinzel font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 border border-[#d4af37]/40 cursor-pointer"
              >
                <span>Yes ❤️</span>
                <Sparkles className="w-4 h-4 text-[#ffd700]" />
              </button>

              <button
                type="button"
                onClick={() => handleConsent(false)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-transparent text-[#6e5038] hover:text-[#2a1a10] font-cormorant text-base border border-[#c59b27]/30 hover:border-[#8e2034]/50 transition-colors cursor-pointer"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Floating Vintage Music Player Widget */}
      {hasUnlocked && (
        <div className="fixed bottom-4 right-4 z-50">
          <div
            className={`parchment-card rounded-full border border-[#c59b27]/50 shadow-2xl transition-all duration-300 backdrop-blur-sm ${
              isCollapsed ? 'p-2' : 'p-3 sm:p-4 rounded-2xl w-72 sm:w-80'
            }`}
          >
            {isCollapsed ? (
              <button
                type="button"
                onClick={() => setIsCollapsed(false)}
                className="w-11 h-11 rounded-full bg-[#2a1910] text-[#d4af37] border border-[#d4af37]/40 flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer relative"
                title="Music Controller"
              >
                <Disc3 className={`w-6 h-6 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                {isPlaying && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#8e2034] rounded-full border border-[#fbf5b7] animate-ping" />
                )}
              </button>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-[#c59b27]/30 pb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Disc3 className={`w-5 h-5 text-[#8e2034] shrink-0 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '5s' }} />
                    <div className="min-w-0">
                      <p className="font-cinzel text-xs font-bold text-[#2a1a10] truncate">
                        {currentTrack.teluguTitle}
                      </p>
                      <p className="font-cormorant text-xs italic text-[#785942] truncate">
                        {currentTrack.title} {usingFallbackSynth && '• Ambient Piano'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCollapsed(true)}
                    className="text-[#785942] hover:text-[#2a1a10] text-xs px-2 py-0.5 rounded cursor-pointer font-body"
                  >
                    ✕
                  </button>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="w-8 h-8 rounded-full bg-[#8e2034] text-[#fbf5b7] flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={nextTrack}
                      className="w-7 h-7 rounded-full bg-[#ebe0cb] text-[#4d3829] hover:text-[#1a100a] flex items-center justify-center hover:bg-[#dfd0b5] transition-colors cursor-pointer"
                      title="Next Chapter Melody"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-[#5c402d] hover:text-[#1a100a] transition-colors cursor-pointer p-1"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Volume Slider */}
                  <div className="flex items-center gap-1.5 w-24">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(parseFloat(e.target.value));
                        if (isMuted) setIsMuted(false);
                      }}
                      className="w-full accent-[#8e2034] cursor-pointer h-1.5 bg-[#dfd0b5] rounded-lg"
                      title="Volume"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
