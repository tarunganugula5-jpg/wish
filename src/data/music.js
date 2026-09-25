// Music configuration for the romantic journey
// Tarun can place legally obtained/authorized audio files in public/music/
// If audio files are not yet placed, the web audio ambient synthesizer provides a soulful warm melody.

export const musicTracks = [
  {
    id: 'intro',
    title: 'The Secret Diary',
    teluguTitle: 'మన రహస్య కథ',
    src: './music/intro.mp3',
    chapters: ['gate', 'opening'],
    mood: 'nostalgic',
    bpm: 60,
  },
  {
    id: 'friendship',
    title: 'Days of Diploma',
    teluguTitle: 'స్నేహపు తొలి రోజులు',
    src: './music/friendship.mp3',
    chapters: ['chapter-1', 'chapter-2', 'chapter-3'],
    mood: 'innocent',
    bpm: 64,
  },
  {
    id: 'simhachalam',
    title: 'Simhachalam Steps',
    teluguTitle: 'ఆ చెయ్యి... ఆ క్షణం',
    src: './music/simhachalam.mp3',
    chapters: ['chapter-4'],
    mood: 'intimate-heartbeat',
    bpm: 56,
  },
  {
    id: 'distance',
    title: 'Letters to Hyderabad',
    teluguTitle: 'దూరం చెప్పిన నిజం',
    src: './music/distance.mp3',
    chapters: ['chapter-5'],
    mood: 'yearning',
    bpm: 58,
  },
  {
    id: 'confession',
    title: '15 March 2025',
    teluguTitle: '15 మార్చి 2025 — ప్రేమ ప్రయాణం',
    src: './music/confession.mp3',
    chapters: ['chapter-6'],
    mood: 'emotional-climax',
    bpm: 62,
  },
  {
    id: 'memories',
    title: 'Our Journey & Scrapbook',
    teluguTitle: 'మధుర స్మృతులు',
    src: './music/memories.mp3',
    chapters: ['chapter-7', 'chapter-8', 'timeline'],
    mood: 'joyful-warm',
    bpm: 66,
  },
  {
    id: 'birthday',
    title: 'Birthday Celebration & Final Letter',
    teluguTitle: 'పుట్టినరోజు శుభాకాంక్షలు కన్నా అమ్మా ❤️',
    src: './music/final-letter.mp3',
    chapters: ['birthday', 'letter', 'future', 'ending'],
    mood: 'celebration-transcendent',
    bpm: 60,
  },
];
