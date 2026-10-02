// Metrics Service for real-time speech and communication analysis

const FILLER_WORDS = [
  'um', 'uh', 'er', 'ah', 'like', 'basically', 'actually', 
  'literally', 'you know', 'sort of', 'kind of', 'i mean', 'right'
];

export class MetricsService {
  static analyzeText(text, durationSeconds = 0) {
    if (!text || text.trim().length === 0) {
      return {
        wordCount: 0,
        wpm: 0,
        wpmStatus: 'idle',
        fillerCount: 0,
        fillerBreakdown: {},
        fillerPercentage: 0,
        clarityScore: 100,
        confidenceIndicator: 'Neutral'
      };
    }

    const words = text.toLowerCase().match(/\b[a-z']+\b/g) || [];
    const totalWords = words.length;

    // Calculate WPM
    const minutes = Math.max(durationSeconds / 60, 0.08); // avoid division by near zero
    const wpm = Math.round(totalWords / minutes);

    let wpmStatus = 'optimal'; // 130 - 165
    if (wpm < 120 && totalWords > 10) wpmStatus = 'slow';
    else if (wpm > 175) wpmStatus = 'fast';

    // Count filler words
    const fillerBreakdown = {};
    let totalFillers = 0;

    FILLER_WORDS.forEach(filler => {
      // Check multi-word or single-word
      const regex = new RegExp(`\\b${filler}\\b`, 'gi');
      const matches = text.match(regex);
      if (matches && matches.length > 0) {
        fillerBreakdown[filler] = matches.length;
        totalFillers += matches.length;
      }
    });

    const fillerPercentage = totalWords > 0 
      ? Math.round((totalFillers / totalWords) * 100) 
      : 0;

    // Clarity score starts at 100, penalized by high filler ratio or extreme pace
    let clarityPenalty = fillerPercentage * 4;
    if (wpmStatus === 'fast') clarityPenalty += 10;
    if (wpmStatus === 'slow') clarityPenalty += 5;
    const clarityScore = Math.max(35, Math.min(100, 100 - clarityPenalty));

    // Confidence indicator
    let confidenceIndicator = 'High Confidence';
    if (fillerPercentage > 12 || wpm < 100) {
      confidenceIndicator = 'Needs Focus & Composure';
    } else if (fillerPercentage > 6 || wpm > 180) {
      confidenceIndicator = 'Moderate (Rushed / Hesitant)';
    }

    return {
      wordCount: totalWords,
      wpm: Math.min(wpm, 300),
      wpmStatus,
      fillerCount: totalFillers,
      fillerBreakdown,
      fillerPercentage,
      clarityScore,
      confidenceIndicator
    };
  }

  // Audio decibel and waveform analyzer using Web Audio API
  static createAudioAnalyser(stream) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      return { audioContext, analyser };
    } catch (e) {
      console.warn('AudioContext not supported or permission denied', e);
      return null;
    }
  }
}
