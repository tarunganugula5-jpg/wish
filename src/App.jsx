import React, { useState, useEffect } from 'react';
import SecretGate from './components/SecretGate';
import OpeningScene from './components/OpeningScene';
import ChapterSection from './components/ChapterSection';
import SimhachalamScene from './components/SimhachalamScene';
import ConfessionScene from './components/ConfessionScene';
import WhyILoveYou from './components/WhyILoveYou';
import MemoryTimeline from './components/MemoryTimeline';
import PhotoScrapbook from './components/PhotoScrapbook';
import BirthdayReveal from './components/BirthdayReveal';
import LoveLetter from './components/LoveLetter';
import FuturePage from './components/FuturePage';
import FinalScene from './components/FinalScene';
import AudioPlayer from './components/AudioPlayer';
import ChapterNavigation from './components/ChapterNavigation';
import LightboxModal from './components/LightboxModal';
import { SurpriseModal } from './components/HiddenSurprises';
import { storyData } from './data/storyChapters';

export default function App() {
  // App States: 'gate' | 'opening' | 'story'
  const [appState, setAppState] = useState('gate');
  const [showMusicConsent, setShowMusicConsent] = useState(false);
  const [activeChapterForAudio, setActiveChapterForAudio] = useState('gate');

  // Modals
  const [activeLightboxMemory, setActiveLightboxMemory] = useState(null);
  const [activeSurprise, setActiveSurprise] = useState(null);

  // When SecretGate unlocks with PIN 2620
  const handleUnlock = () => {
    setShowMusicConsent(true);
    setAppState('opening');
    setActiveChapterForAudio('opening');
  };

  // Music Consent Choice
  const handleMusicConsentChoice = (agreed) => {
    setShowMusicConsent(false);
  };

  // Proceed from Opening Scene into the Story Chapters
  const handleProceedToStory = () => {
    setAppState('story');
    setActiveChapterForAudio('chapter-1');
    setTimeout(() => {
      const chapter1El = document.getElementById('chapter-1');
      if (chapter1El) chapter1El.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Smooth navigation to a specific section ID
  const handleNavigateSection = (sectionId) => {
    if (appState !== 'story') {
      setAppState('story');
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // Track active section as user scrolls
  useEffect(() => {
    if (appState !== 'story') return;

    const sections = [
      'chapter-1',
      'chapter-2',
      'chapter-3',
      'chapter-4',
      'chapter-5',
      'chapter-6',
      'chapter-7',
      'chapter-8',
      'why-i-love-you',
      'timeline',
      'birthday-reveal',
      'love-letter',
      'future',
      'final',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapterForAudio(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [appState]);

  return (
    <div className="relative min-h-screen bg-[#140d09] text-[#2c1d11] font-body selection:bg-[#8b263e] selection:text-[#fff8f0]">
      {/* Subtle Vintage Overlays */}
      <div className="film-grain" />
      <div className="cinematic-vignette" />

      {/* Background Audio Player with Web Audio API Fallback */}
      <AudioPlayer
        activeChapter={activeChapterForAudio}
        hasUnlocked={appState !== 'gate'}
        showConsentModal={showMusicConsent}
        onConsentChoice={handleMusicConsentChoice}
      />

      {/* PIN Lock Entry Experience */}
      {appState === 'gate' && <SecretGate onUnlock={handleUnlock} />}

      {/* Cinematic Opening Narrative */}
      {appState === 'opening' && (
        <OpeningScene onProceed={handleProceedToStory} />
      )}

      {/* The Story Chapters Experience */}
      {appState === 'story' && (
        <>
          {/* Chapter Navigation & Reading Progress */}
          <ChapterNavigation onNavigate={handleNavigateSection} />

          <main className="relative z-10 space-y-4">
            {/* CHAPTER I — BEFORE WE KNEW */}
            <div id="chapter-1">
              <ChapterSection
                chapterKey="chapter1"
                data={storyData.chapter1}
                onOpenLightbox={setActiveLightboxMemory}
                onTriggerSurprise={setActiveSurprise}
              />
            </div>

            {/* CHAPTER II — JUST FRIENDS */}
            <div id="chapter-2">
              <ChapterSection
                chapterKey="chapter2"
                data={storyData.chapter2}
                onOpenLightbox={setActiveLightboxMemory}
                onTriggerSurprise={setActiveSurprise}
              />
            </div>

            {/* CHAPTER III — WHEN EVERYONE LEFT */}
            <div id="chapter-3">
              <ChapterSection
                chapterKey="chapter3"
                data={storyData.chapter3}
                onOpenLightbox={setActiveLightboxMemory}
                onTriggerSurprise={setActiveSurprise}
              />
            </div>

            {/* CHAPTER IV — THE HAND I DIDN'T WANT TO LET GO (Simhachalam) */}
            <div id="chapter-4">
              <SimhachalamScene
                onOpenLightbox={setActiveLightboxMemory}
                onTriggerSurprise={setActiveSurprise}
              />
            </div>

            {/* CHAPTER V — DISTANCE */}
            <div id="chapter-5">
              <ChapterSection
                chapterKey="chapter5"
                data={storyData.chapter5}
                onOpenLightbox={setActiveLightboxMemory}
                onTriggerSurprise={setActiveSurprise}
              />
            </div>

            {/* CHAPTER VI — 15 MARCH 2025 (The Confession) */}
            <div id="chapter-6">
              <ConfessionScene onOpenLightbox={setActiveLightboxMemory} />
            </div>

            {/* CHAPTER VII — APRIL 24 (Temple & Reunion) */}
            <div id="chapter-7">
              <ChapterSection
                chapterKey="chapter7"
                data={storyData.chapter7}
                onOpenLightbox={setActiveLightboxMemory}
                onTriggerSurprise={setActiveSurprise}
              />
            </div>

            {/* CHAPTER VIII — OUR JOURNEY */}
            <div id="chapter-8">
              <ChapterSection
                chapterKey="chapter8"
                data={storyData.chapter8}
                onOpenLightbox={setActiveLightboxMemory}
                onTriggerSurprise={setActiveSurprise}
              />
            </div>

            {/* WHY I LOVE YOU */}
            <div id="why-i-love-you">
              <WhyILoveYou onTriggerSurprise={setActiveSurprise} />
            </div>

            {/* MEMORIES TIMELINE & SCRAPBOOK */}
            <div id="timeline">
              <MemoryTimeline onOpenLightbox={setActiveLightboxMemory} />
              <PhotoScrapbook onOpenLightbox={setActiveLightboxMemory} />
            </div>

            {/* BIRTHDAY REVEAL */}
            <div id="birthday-reveal">
              <BirthdayReveal
                onProceedToLetter={() => handleNavigateSection('love-letter')}
              />
            </div>

            {/* FINAL LOVE LETTER */}
            <div id="love-letter">
              <LoveLetter
                onProceedToFuture={() => handleNavigateSection('future')}
              />
            </div>

            {/* OUR TOMORROW / FUTURE */}
            <div id="future">
              <FuturePage
                onProceedToFinal={() => handleNavigateSection('final')}
              />
            </div>

            {/* FINAL SCENE & DIARY CLOSURE */}
            <div id="final">
              <FinalScene
                onReopenDiary={() => handleNavigateSection('chapter-1')}
                onOpenLightbox={setActiveLightboxMemory}
              />
            </div>
          </main>
        </>
      )}

      {/* Lightbox Modal for Full Photograph & Memory Inspection */}
      <LightboxModal
        memory={activeLightboxMemory}
        onClose={() => setActiveLightboxMemory(null)}
      />

      {/* Hidden Surprise Modal when Easter Egg is Clicked */}
      <SurpriseModal
        surprise={activeSurprise}
        onClose={() => setActiveSurprise(null)}
      />
    </div>
  );
}
