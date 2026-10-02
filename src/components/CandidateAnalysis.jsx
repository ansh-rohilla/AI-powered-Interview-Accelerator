import React, { useState } from 'react';
import { 
  UserCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  FolderGit2, 
  Trophy, 
  TrendingUp,
  Info
} from 'lucide-react';

export default function CandidateAnalysis({
  candidateData,
  roleData,
  onStartInterview
}) {
  const [showMethodology, setShowMethodology] = useState(false);

  if (!candidateData) return null;

  const score = candidateData.jobFitScore || 78;

  // Visual color for the job fit score
  let scoreColorClass = 'text-blue-400';
  let strokeColor = '#3b82f6';
  if (score >= 85) {
    scoreColorClass = 'text-emerald-400';
    strokeColor = '#10b981';
  } else if (score < 70) {
    scoreColorClass = 'text-amber-400';
    strokeColor = '#f59e0b';
  }

  // Circular gauge calculations
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Header Card with Job Fit Score Gauge */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Step 2: Candidate Verification & Alignment</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Candidate Job Fit & Gap Assessment
            </h1>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Evaluating candidate's demonstrated project work, verified skills, and quantifiable achievements directly against {roleData?.roleTitle || 'the target role'}.
            </p>
          </div>

          {/* Job Fit Gauge Widget */}
          <div className="flex items-center space-x-6 bg-slate-950/70 p-4 rounded-xl border border-slate-800 self-start lg:self-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-800"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke={strokeColor}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-2xl font-black ${scoreColorClass}`}>{score}%</span>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Job Fit</span>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-bold text-slate-200">Alignment Rating</span>
                <button
                  onClick={() => setShowMethodology(!showMethodology)}
                  title="View scoring methodology"
                  className="text-slate-500 hover:text-slate-300"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-[170px]">
                {score >= 80 ? 'High alignment with core technical requirements.' : 'Moderate alignment with preparation gaps.'}
              </p>
              <button
                onClick={() => setShowMethodology(!showMethodology)}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold underline mt-1.5 block cursor-pointer"
              >
                {showMethodology ? 'Hide methodology' : 'Scoring methodology'}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Scoring Methodology */}
        {showMethodology && (
          <div className="mt-6 pt-5 border-t border-slate-800 text-xs text-slate-300 bg-slate-950/60 p-4 rounded-lg">
            <h4 className="font-bold text-slate-200 mb-1 flex items-center space-x-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
              <span>Scoring Methodology Formula</span>
            </h4>
            <p className="text-slate-400 leading-relaxed mb-2">
              {candidateData.scoringMethodology}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <span className="text-slate-400 block">Required Skills</span>
                <span className="font-bold text-slate-200">50% Weight</span>
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <span className="text-slate-400 block">Practical Projects</span>
                <span className="font-bold text-slate-200">25% Weight</span>
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <span className="text-slate-400 block">Domain Alignment</span>
                <span className="font-bold text-slate-200">15% Weight</span>
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <span className="text-slate-400 block">Preferred Skills</span>
                <span className="font-bold text-slate-200">10% Weight</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3-Tier Match Breakdown: Strong Match / Partial Match / Missing & Weak */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Strong Match */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-100">Strong Match</h2>
          </div>
          <p className="text-[11px] text-slate-400 mb-3">Verified evidence in resume and project history</p>
          <div className="space-y-1.5">
            {candidateData.strongMatch.map((skill, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-xs text-emerald-300 bg-emerald-950/20 border border-emerald-800/30 px-3 py-1.5 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Partial Match */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 rounded-md bg-amber-500/10 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-100">Partial Match</h2>
          </div>
          <p className="text-[11px] text-slate-400 mb-3">Foundational familiarity, needs depth or recency</p>
          <div className="space-y-1.5">
            {candidateData.partialMatch.length > 0 ? (
              candidateData.partialMatch.map((skill, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-amber-300 bg-amber-950/20 border border-amber-800/30 px-3 py-1.5 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{skill}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">No partial matches flagged</p>
            )}
          </div>
        </div>

        {/* Missing / Weak */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 rounded-md bg-rose-500/10 flex items-center justify-center text-rose-400">
              <XCircle className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-100">Missing / Weak</h2>
          </div>
          <p className="text-[11px] text-slate-400 mb-3">Unverified or absent against JD expectations</p>
          <div className="space-y-1.5">
            {candidateData.missingSkills.map((skill, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-xs text-rose-300 bg-rose-950/20 border border-rose-800/30 px-3 py-1.5 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Potential Resume Claims Requiring Further Questioning (Audit Callout) */}
      <div className="bg-slate-900/80 border border-amber-500/30 rounded-xl p-5 mb-8 shadow-sm">
        <div className="flex items-center space-x-2.5 mb-2">
          <div className="w-7 h-7 rounded-md bg-amber-500/10 flex items-center justify-center text-amber-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100">Potential Resume Claims That Require Probing</h2>
            <p className="text-[11px] text-slate-400">Flagged claims where interviewers should rigorously verify authenticity and depth</p>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          {candidateData.probingClaims.map((item, idx) => (
            <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-lg p-3.5 text-xs">
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-slate-200">
                  <span className="text-amber-400 mr-1.5 font-bold">Claim #{idx + 1}:</span>
                  "{item.claim}"
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex-shrink-0">
                  Probe Target
                </span>
              </div>
              <p className="text-slate-400 mt-2">
                <strong className="text-slate-300">Recruiter Concern:</strong> {item.concern}
              </p>
              <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-blue-300 bg-blue-950/20 px-3 py-2 rounded border border-blue-800/30 font-mono text-[11px]">
                <strong className="text-blue-400">AI Interviewer Probe:</strong> "{item.probeQuestion}"
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Relevant Projects & Strengths */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Projects */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <FolderGit2 className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-bold text-slate-100">Demonstrated Relevant Projects</h2>
          </div>
          <div className="space-y-3">
            {candidateData.relevantProjects.map((proj, idx) => (
              <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3.5 text-xs">
                <h4 className="font-bold text-slate-200 mb-1">{proj.title}</h4>
                <p className="text-slate-400 mb-2 leading-relaxed">{proj.details}</p>
                <div className="text-[11px] text-blue-400 font-medium bg-blue-500/10 px-2.5 py-1 rounded inline-block">
                  {proj.relevance}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Weaknesses Summary */}
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-slate-100">Demonstrated Strengths Against JD</h2>
            </div>
            <ul className="space-y-2">
              {candidateData.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <h2 className="text-sm font-bold text-slate-100">Weaknesses & Insufficient Areas</h2>
            </div>
            <ul className="space-y-2">
              {candidateData.weaknesses.map((weak, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0 mt-1.5" />
                  <span>{weak}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Start Interview CTA Box */}
      <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-blue-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Step 3: Core Simulation</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Ready to Begin the AI Interview Simulation?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            The simulator features 3 progressive levels: Screening, Competency, and Deep-Dive questioning with voice synthesis, live microphone transcription, and webcam analytics.
          </p>
        </div>

        <button
          onClick={onStartInterview}
          className="w-full md:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all cursor-pointer flex-shrink-0"
        >
          <span>Launch AI Interview Simulator</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
