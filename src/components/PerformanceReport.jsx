import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  HelpCircle, 
  Printer, 
  Share2, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  Target, 
  BarChart3, 
  MessageSquare,
  Sparkles,
  Gauge
} from 'lucide-react';

export default function PerformanceReport({
  reportData,
  roleData,
  onProceedToPlan,
  onRetakeInterview
}) {
  if (!reportData) return null;

  const {
    overallScore,
    readinessStatus,
    readinessBadgeColor,
    readinessDescription,
    competencyScores,
    questionFeedback,
    strengths,
    weaknesses,
    speechAnalytics
  } = reportData;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Report link copied to clipboard.');
    }
  };

  // Readiness badge indicator color
  const getReadinessBadge = () => {
    switch (readinessBadgeColor) {
      case 'emerald':
        return {
          icon: '🟢',
          bg: 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300',
          dot: 'bg-emerald-400'
        };
      case 'amber':
        return {
          icon: '🟡',
          bg: 'bg-amber-950/40 border-amber-500/40 text-amber-300',
          dot: 'bg-amber-400'
        };
      case 'orange':
        return {
          icon: '🟠',
          bg: 'bg-orange-950/40 border-orange-500/40 text-orange-300',
          dot: 'bg-orange-400'
        };
      default:
        return {
          icon: '🔴',
          bg: 'bg-rose-950/40 border-rose-500/40 text-rose-300',
          dot: 'bg-rose-400'
        };
    }
  };

  const badgeStyle = getReadinessBadge();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Action Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 no-print">
        <div>
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Step 4: Comprehensive Interview Evaluation
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Interview Performance Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Evaluated against: <strong className="text-slate-200">{roleData?.roleTitle || 'AI Product Engineer Intern'}</strong>
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Export / Print PDF</span>
          </button>
          <button
            onClick={handleShare}
            className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Share</span>
          </button>
          <button
            onClick={onProceedToPlan}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            <span>Preparation Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Top Overview Cards: Overall Score & Interview Readiness */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Overall Score Dial */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Overall Interview Score
          </span>
          <div className="relative w-32 h-32 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#3b82f6"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - overallScore / 100)}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">{overallScore}</span>
              <span className="text-[11px] text-slate-400 font-semibold">/ 100</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Calculated across technical depth, problem-solving, communication & accuracy.
          </p>
        </div>

        {/* Section 15: Interview Readiness Assessment */}
        <div className="md:col-span-2 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  Interview Readiness Assessment
                </h3>
              </div>
              {/* Readiness Badge */}
              <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center space-x-1.5 ${badgeStyle.bg}`}>
                <span className={`w-2 h-2 rounded-full ${badgeStyle.dot}`} />
                <span>{readinessStatus}</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mt-2">
              {readinessDescription}
            </p>

            {/* 4-Tier Scale Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5 text-[11px]">
              <div className={`p-2 rounded border ${readinessStatus === 'Not Ready' ? 'bg-rose-950/30 border-rose-500/40 text-rose-300 font-bold' : 'bg-slate-950/50 border-slate-800 text-slate-500'}`}>
                <span className="block text-[10px] uppercase font-semibold">Score &lt; 60</span>
                <span>Not Ready</span>
              </div>
              <div className={`p-2 rounded border ${readinessStatus === 'Needs Preparation' ? 'bg-orange-950/30 border-orange-500/40 text-orange-300 font-bold' : 'bg-slate-950/50 border-slate-800 text-slate-500'}`}>
                <span className="block text-[10px] uppercase font-semibold">Score 60 - 74</span>
                <span>Needs Preparation</span>
              </div>
              <div className={`p-2 rounded border ${readinessStatus === 'Interview Ready' ? 'bg-amber-950/30 border-amber-500/40 text-amber-300 font-bold' : 'bg-slate-950/50 border-slate-800 text-slate-500'}`}>
                <span className="block text-[10px] uppercase font-semibold">Score 75 - 87</span>
                <span>Interview Ready</span>
              </div>
              <div className={`p-2 rounded border ${readinessStatus === 'Strong Candidate' ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 font-bold' : 'bg-slate-950/50 border-slate-800 text-slate-500'}`}>
                <span className="block text-[10px] uppercase font-semibold">Score 88+</span>
                <span>Strong Candidate</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Readiness formula incorporates JD alignment & deep-dive technical reasoning</span>
            <span className="font-semibold text-blue-400">Student Credibility Standard</span>
          </div>
        </div>
      </div>

      {/* Competency Scores Breakdown */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex items-center space-x-2 mb-5">
          <BarChart3 className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-bold text-slate-100">
            Competency Scores Breakdown
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Role Fit', score: competencyScores.roleFit, desc: 'Alignment with target JD' },
            { label: 'Technical Knowledge', score: competencyScores.technicalKnowledge, desc: 'Frameworks & algorithms' },
            { label: 'Problem Solving', score: competencyScores.problemSolving, desc: 'Debugging & scalability' },
            { label: 'Communication', score: competencyScores.communication, desc: 'Clarity, pace & structure' },
            { label: 'Confidence', score: competencyScores.confidence, desc: 'Composure & filler ratio' },
            { label: 'Depth of Understanding', score: competencyScores.depthOfUnderstanding, desc: 'First principles mastery' },
            { label: 'Behavioural Fit', score: competencyScores.behaviouralFit, desc: 'STAR structure & collaboration' },
            { label: 'Speech Clarity', score: speechAnalytics?.clarityScore || 88, desc: 'Speech pace & delivery' }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-300">{item.label}</span>
                <span className="text-xs font-mono font-bold text-blue-400">{item.score}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${item.score}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses (Section 12 & 13) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Strengths */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-100">Key Strengths Demonstrated</h3>
          </div>
          <ul className="space-y-2.5">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-2" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm font-bold text-slate-100">Specific Weaknesses & Blind Spots</h3>
          </div>
          <ul className="space-y-2.5">
            {weaknesses.map((weak, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0 mt-2" />
                <span>{weak}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section 11: Question-Level Feedback */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-slate-100">
              Question-by-Question Deep Dive Feedback
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {questionFeedback.length} questions evaluated
          </span>
        </div>

        <div className="space-y-6">
          {questionFeedback.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 text-xs sm:text-sm leading-relaxed"
            >
              {/* Question Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold">
                    Q{item.questionNumber} (Level {item.level})
                  </span>
                  <span className="text-xs font-semibold text-slate-300">
                    {item.targetCompetency}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400">Score:</span>
                  <span className="font-mono font-bold text-blue-400">{item.score}/100</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    item.score >= 80 
                      ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800' 
                      : 'bg-amber-950/40 text-amber-300 border border-amber-800'
                  }`}>
                    {item.assessment}
                  </span>
                </div>
              </div>

              {/* What AI Asked */}
              <div className="mb-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                  Interviewer Question:
                </span>
                <p className="text-slate-200 font-medium bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                  {item.question}
                </p>
              </div>

              {/* Candidate Answer */}
              <div className="mb-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                  Candidate Recorded Answer:
                </span>
                <p className="text-slate-300 bg-slate-900/40 p-3 rounded-lg border border-slate-800/60 italic">
                  "{item.candidateAnswer}"
                </p>
              </div>

              {/* Feedback Triad: What Was Good, What Could Be Better, Ideal Direction */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {/* What Was Good */}
                <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-lg p-3">
                  <span className="font-bold text-emerald-400 block mb-1">What Was Good</span>
                  <p className="text-slate-300">{item.whatWasGood}</p>
                </div>

                {/* What Could Be Better */}
                <div className="bg-rose-950/20 border border-rose-900/40 rounded-lg p-3">
                  <span className="font-bold text-rose-400 block mb-1">What Could Be Better</span>
                  <p className="text-slate-300">{item.whatCouldBeBetter}</p>
                </div>

                {/* Ideal Direction */}
                <div className="bg-blue-950/20 border border-blue-900/40 rounded-lg p-3">
                  <span className="font-bold text-blue-400 block mb-1">Ideal Direction</span>
                  <p className="text-slate-300">{item.idealDirection}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg gap-4 no-print">
        <button
          onClick={onRetakeInterview}
          className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake Interview Simulation</span>
        </button>

        <button
          onClick={onProceedToPlan}
          className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
        >
          <span>View Tailored Preparation Plan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
