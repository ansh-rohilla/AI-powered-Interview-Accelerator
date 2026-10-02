import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Volume2, 
  VolumeX, 
  Play, 
  Square, 
  Send, 
  Sparkles, 
  Clock, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  ChevronRight, 
  MessageSquare, 
  Cpu, 
  RefreshCw,
  Award,
  Zap,
  Radio
} from 'lucide-react';
import { speechService } from '../services/speechService';
import { MetricsService } from '../services/metricsService';
import { aiEngine } from '../services/aiEngine';

export default function InterviewScreen({
  jdAnalysis,
  candidateAnalysis,
  onFinishInterview
}) {
  // Level state: 1 (Screening), 2 (Competency), 3 (Deep-Dive)
  const [currentLevel, setCurrentLevel] = useState(1);
  const [questionIndexInLevel, setQuestionIndexInLevel] = useState(0);
  const [totalQuestionsAsked, setTotalQuestionsAsked] = useState(0);

  // Question & Answer state
  const [currentQuestionData, setCurrentQuestionData] = useState(null);
  const [candidateResponse, setCandidateResponse] = useState('');
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]); // [{ speaker, text, timestamp, targetCompetency, level, metrics }]
  
  // Voice & Video state
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [cameraError, setCameraError] = useState(null);

  // Real-time speech metrics
  const [liveMetrics, setLiveMetrics] = useState({
    wpm: 0,
    wpmStatus: 'idle',
    fillerCount: 0,
    fillerBreakdown: {},
    fillerPercentage: 0,
    clarityScore: 100,
    confidenceIndicator: 'Neutral'
  });

  // Timers
  const [answerDurationSeconds, setAnswerDurationSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // DOM Refs
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const transcriptBottomRef = useRef(null);

  // Initialize camera and first question on mount
  useEffect(() => {
    initCamera();
    loadFirstQuestion();

    return () => {
      stopCamera();
      speechService.stopSpeaking();
      speechService.stopListening();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Answer timer effect
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setAnswerDurationSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  // Real-time metrics calculation on candidate response change
  useEffect(() => {
    if (candidateResponse) {
      const metrics = MetricsService.analyzeText(candidateResponse, answerDurationSeconds);
      setLiveMetrics(metrics);
    }
  }, [candidateResponse, answerDurationSeconds]);

  // Scroll transcript to bottom
  useEffect(() => {
    transcriptBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory, candidateResponse]);

  // Initialize camera
  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: true
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOn(true);
      setCameraError(null);
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError('Camera / mic unavailable or permission denied. You can proceed using text mode.');
      setIsCameraOn(false);
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
  };

  const toggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
      setIsCameraOn(false);
    } else {
      initCamera();
    }
  };

  // Load first question (Level 1: Screening)
  const loadFirstQuestion = async () => {
    setIsProcessingAI(true);
    try {
      const qData = await aiEngine.generateNextQuestion({
        level: 1,
        questionIndex: 0,
        conversationHistory: [],
        jdAnalysis,
        candidateAnalysis,
        persona: aiEngine.config.interviewerPersona
      });

      setCurrentQuestionData(qData);
      setConversationHistory([{
        speaker: 'ai',
        text: qData.question,
        targetCompetency: qData.targetCompetency,
        level: qData.level,
        difficulty: qData.difficulty,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

      // Speak question
      playQuestionAudio(qData.question);
    } catch (err) {
      console.error('Error generating first question', err);
    } finally {
      setIsProcessingAI(false);
    }
  };

  // Play audio of question using speech synthesis
  const playQuestionAudio = (text) => {
    speechService.speak(
      text,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  // Toggle voice recognition for candidate
  const handleToggleVoiceInput = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      setIsTimerRunning(false);
    } else {
      // Clear previous timer and start
      setAnswerDurationSeconds(0);
      setIsTimerRunning(true);

      const started = speechService.startListening(
        (transcript) => {
          setCandidateResponse(transcript);
        },
        (errorMsg) => {
          console.warn('Recognition error:', errorMsg);
          setIsListening(false);
          setIsTimerRunning(false);
        },
        () => {
          setIsListening(false);
          setIsTimerRunning(false);
        }
      );

      if (started) {
        setIsListening(true);
      } else {
        alert('Voice recognition not supported in this browser. Please type your response directly in the text box below.');
      }
    }
  };

  // Submit Answer & Adaptively Generate Next Question
  const handleSubmitAnswer = async () => {
    if (!candidateResponse.trim() || isProcessingAI) return;

    // Stop recording and speech
    speechService.stopListening();
    speechService.stopSpeaking();
    setIsListening(false);
    setIsTimerRunning(false);

    const currentAnswerText = candidateResponse.trim();
    const finalMetrics = MetricsService.analyzeText(currentAnswerText, answerDurationSeconds);

    const updatedHistory = [
      ...conversationHistory,
      {
        speaker: 'candidate',
        text: currentAnswerText,
        metrics: finalMetrics,
        durationSeconds: answerDurationSeconds,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];

    setConversationHistory(updatedHistory);
    setCandidateResponse('');
    setAnswerDurationSeconds(0);
    setIsProcessingAI(true);

    const nextTotalAsked = totalQuestionsAsked + 1;
    setTotalQuestionsAsked(nextTotalAsked);

    // Determine progression across the 3 Levels:
    // Level 1: Questions 1 & 2 (Screening)
    // Level 2: Questions 3 & 4 (Competency)
    // Level 3: Questions 5 & 6 (Deep-Dive)
    let nextLevel = currentLevel;
    let nextIndexInLevel = questionIndexInLevel + 1;

    if (currentLevel === 1 && nextIndexInLevel >= 2) {
      nextLevel = 2;
      nextIndexInLevel = 0;
    } else if (currentLevel === 2 && nextIndexInLevel >= 2) {
      nextLevel = 3;
      nextIndexInLevel = 0;
    }

    setCurrentLevel(nextLevel);
    setQuestionIndexInLevel(nextIndexInLevel);

    // If candidate has completed 6 questions (2 in L1, 2 in L2, 2 in L3), finish interview!
    if (nextTotalAsked >= 6) {
      setIsProcessingAI(false);
      handleFinish(updatedHistory);
      return;
    }

    try {
      const nextQData = await aiEngine.generateNextQuestion({
        level: nextLevel,
        questionIndex: nextIndexInLevel,
        conversationHistory: updatedHistory,
        jdAnalysis,
        candidateAnalysis,
        persona: aiEngine.config.interviewerPersona
      });

      setCurrentQuestionData(nextQData);
      setConversationHistory([
        ...updatedHistory,
        {
          speaker: 'ai',
          text: nextQData.question,
          targetCompetency: nextQData.targetCompetency,
          level: nextQData.level,
          difficulty: nextQData.difficulty,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      playQuestionAudio(nextQData.question);
    } catch (err) {
      console.error('Error generating next question', err);
    } finally {
      setIsProcessingAI(false);
    }
  };

  const handleFinish = (historyToEvaluate = conversationHistory) => {
    speechService.stopSpeaking();
    speechService.stopListening();
    stopCamera();

    // Compile interview records for evaluation
    const questionsWithAnswers = [];
    for (let i = 0; i < historyToEvaluate.length; i++) {
      if (historyToEvaluate[i].speaker === 'ai' && historyToEvaluate[i + 1]?.speaker === 'candidate') {
        questionsWithAnswers.push({
          question: historyToEvaluate[i].text,
          targetCompetency: historyToEvaluate[i].targetCompetency,
          level: historyToEvaluate[i].level,
          difficulty: historyToEvaluate[i].difficulty,
          answer: historyToEvaluate[i + 1].text,
          metrics: historyToEvaluate[i + 1].metrics
        });
      }
    }

    onFinishInterview(questionsWithAnswers);
  };

  // Helper format seconds to mm:ss
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const getLevelLabel = (lvl) => {
    if (lvl === 1) return 'Level 1: Screening Round';
    if (lvl === 2) return 'Level 2: Competency & Systems';
    return 'Level 3: Deep-Dive Technical Probe';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Studio Header HUD */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-white tracking-wide uppercase">AI Interview Studio</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                currentLevel === 1 
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                  : currentLevel === 2 
                  ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                {getLevelLabel(currentLevel)}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Role: <strong className="text-slate-300">{jdAnalysis.roleTitle}</strong> • Question {totalQuestionsAsked + 1} of 6
            </p>
          </div>
        </div>

        {/* Level Progression Dots & Finish Button */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            {[1, 2, 3].map(lvl => (
              <div
                key={lvl}
                className={`flex items-center space-x-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                  currentLevel === lvl
                    ? 'bg-blue-600 text-white'
                    : currentLevel > lvl
                    ? 'text-emerald-400'
                    : 'text-slate-600'
                }`}
              >
                <span>L{lvl}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleFinish()}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors cursor-pointer"
          >
            Finish & Generate Report
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Split Video / Avatar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left Card: AI Interviewer Persona & Waveform */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden min-h-[340px]">
          {/* Subtle background glow when speaking */}
          {isSpeaking && (
            <div className="absolute inset-0 bg-blue-600/5 animate-pulse pointer-events-none" />
          )}

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20">
                  AR
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">Alex Reed</h3>
                  <p className="text-[11px] text-slate-400">Senior Staff AI Engineer • Recruiter Persona</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center space-x-1.5 ${
                isSpeaking
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  : isProcessingAI
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-blue-400 animate-ping' : isProcessingAI ? 'bg-amber-400' : 'bg-slate-500'}`} />
                <span>{isSpeaking ? 'Interviewer Speaking' : isProcessingAI ? 'Analyzing Response...' : 'Listening'}</span>
              </div>
            </div>

            {/* AI Avatar Animation & Audio Visualizer Bars */}
            <div className="my-8 flex flex-col items-center justify-center">
              <div className={`relative w-28 h-28 rounded-full border-2 flex items-center justify-center transition-all ${
                isSpeaking 
                  ? 'border-blue-500 shadow-2xl shadow-blue-500/30 scale-105' 
                  : 'border-slate-800 bg-slate-950/80'
              }`}>
                <Cpu className={`w-12 h-12 transition-colors ${isSpeaking ? 'text-blue-400 animate-pulse' : 'text-slate-600'}`} />
                
                {isSpeaking && (
                  <div className="absolute -inset-2 rounded-full border border-blue-500/40 animate-ping pointer-events-none" />
                )}
              </div>

              {/* Animated Waveform Bars */}
              <div className="flex items-center space-x-1 mt-6 h-8">
                {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((bar, i) => (
                  <div
                    key={i}
                    className={`w-1 bg-blue-500 rounded-full transition-all ${
                      isSpeaking ? `animate-wave-${(i % 5) + 1}` : 'h-1.5 opacity-30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Current Question Focus Box */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>Current Question</span>
              </span>
              <button
                onClick={() => playQuestionAudio(currentQuestionData?.question || '')}
                className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 transition-colors"
                title="Replay Audio"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Replay</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed">
              {currentQuestionData?.question || 'Preparing opening question...'}
            </p>
            {currentQuestionData?.targetCompetency && (
              <div className="mt-2 pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
                <span>Evaluates: <strong className="text-slate-400">{currentQuestionData.targetCompetency}</strong></span>
                <span className="text-slate-500">Difficulty: {currentQuestionData.difficulty}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Card: Candidate Video Stream & HUD */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg relative min-h-[340px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="text-sm font-bold text-slate-100">Candidate Video Stream</h3>
              </div>

              {/* Camera & Mic Hardware Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleCamera}
                  className={`p-2 rounded-lg border text-xs transition-colors ${
                    isCameraOn 
                      ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' 
                      : 'bg-rose-950/40 border-rose-800 text-rose-300'
                  }`}
                  title={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
                >
                  {isCameraOn ? <Video className="w-3.5 h-3.5" /> : <VideoOff className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-2 rounded-lg border text-xs transition-colors ${
                    isMicOn 
                      ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' 
                      : 'bg-rose-950/40 border-rose-800 text-rose-300'
                  }`}
                  title={isMicOn ? 'Microphone Active' : 'Microphone Muted'}
                >
                  {isMicOn ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Video Viewport */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
              {isCameraOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center text-slate-500">
                  <VideoOff className="w-10 h-10 mb-2 opacity-50" />
                  <p className="text-xs">Camera feed disabled</p>
                  <p className="text-[11px] text-slate-600 mt-1">Audio and text evaluation remains fully active</p>
                </div>
              )}

              {/* Live Status HUD Overlay */}
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800 flex items-center space-x-2 text-[11px]">
                <Clock className="w-3 h-3 text-slate-400" />
                <span className="font-mono text-slate-200">{formatTime(answerDurationSeconds)}</span>
              </div>

              {isListening && (
                <div className="absolute top-3 right-3 bg-rose-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center space-x-1 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>REC</span>
                </div>
              )}
            </div>
          </div>

          {/* Real-time Signals HUD */}
          <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
            {/* Speaking Pace (WPM) */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2.5">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Speaking Pace</span>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="font-mono font-bold text-slate-100 text-sm">{liveMetrics.wpm}</span>
                <span className="text-[10px] text-slate-400">WPM</span>
              </div>
              <span className={`text-[10px] font-medium ${
                liveMetrics.wpmStatus === 'optimal' 
                  ? 'text-emerald-400' 
                  : liveMetrics.wpmStatus === 'slow' 
                  ? 'text-amber-400' 
                  : 'text-slate-500'
              }`}>
                {liveMetrics.wpmStatus === 'optimal' ? 'Optimal Pace' : liveMetrics.wpmStatus === 'slow' ? 'Deliberate / Slow' : 'Standard'}
              </span>
            </div>

            {/* Filler Words */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2.5">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Filler Words</span>
              <div className="flex items-center space-x-1 mt-0.5">
                <span className="font-mono font-bold text-slate-100 text-sm">{liveMetrics.fillerCount}</span>
                <span className="text-[10px] text-slate-400">detected</span>
              </div>
              <span className={`text-[10px] font-medium ${
                liveMetrics.fillerCount > 4 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {liveMetrics.fillerCount > 4 ? 'Monitor fillers' : 'Clean articulation'}
              </span>
            </div>

            {/* Communication Confidence */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2.5">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Confidence</span>
              <div className="flex items-center space-x-1 mt-0.5">
                <span className="font-mono font-bold text-blue-400 text-sm">{liveMetrics.clarityScore}%</span>
              </div>
              <span className="text-[10px] font-medium text-slate-300 truncate block">
                {liveMetrics.confidenceIndicator}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Answer & Voice Input Workspace */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-6 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-200">
              Candidate Response (Voice-to-Text or Direct Text Input)
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">
            {candidateResponse.split(/\s+/).filter(Boolean).length} words spoken
          </span>
        </div>

        {/* Live Response Box */}
        <textarea
          value={candidateResponse}
          onChange={(e) => setCandidateResponse(e.target.value)}
          placeholder={isListening ? "Listening to your microphone... speak your answer clearly." : "Click 'Start Speaking' to answer with your voice, or type your response here..."}
          className={`w-full h-28 bg-slate-950 border rounded-xl p-3.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none transition-colors resize-none leading-relaxed ${
            isListening ? 'border-rose-500 ring-1 ring-rose-500/50' : 'border-slate-800 focus:border-blue-500'
          }`}
        />

        {/* Action Controls Toolbar */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Voice Input Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleToggleVoiceInput}
              disabled={isProcessingAI}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700'
              }`}
            >
              {isListening ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stop Speaking</span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5 text-blue-400" />
                  <span>Start Speaking</span>
                </>
              )}
            </button>

            {isListening && (
              <span className="text-xs text-rose-400 font-medium flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>Microphone live • transcribing in real-time</span>
              </span>
            )}
          </div>

          {/* Submit Answer Button */}
          <button
            onClick={handleSubmitAnswer}
            disabled={!candidateResponse.trim() || isProcessingAI}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all ${
              candidateResponse.trim() && !isProcessingAI
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
            }`}
          >
            {isProcessingAI ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Interviewer Evaluating...</span>
              </>
            ) : (
              <>
                <span>Submit Answer</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Real-time Session Transcript Drawer */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Activity className="w-4 h-4 text-slate-400" />
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Live Interview Conversation Transcript ({conversationHistory.length} turns)
          </h4>
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {conversationHistory.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg text-xs leading-relaxed ${
                item.speaker === 'ai'
                  ? 'bg-slate-950/80 border border-slate-800 text-slate-200'
                  : 'bg-blue-950/30 border border-blue-800/40 text-blue-200 ml-4'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 font-semibold">
                <span className={item.speaker === 'ai' ? 'text-blue-400' : 'text-indigo-400'}>
                  {item.speaker === 'ai' ? 'Alex Reed (AI Lead)' : 'Candidate'}
                </span>
                <span>{item.timestamp}</span>
              </div>
              <p>{item.text}</p>
            </div>
          ))}
          <div ref={transcriptBottomRef} />
        </div>
      </div>
    </div>
  );
}
