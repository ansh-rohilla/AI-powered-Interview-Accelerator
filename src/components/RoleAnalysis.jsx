import React from 'react';
import { 
  Briefcase, 
  CheckCircle, 
  Star, 
  Code2, 
  Users, 
  GraduationCap, 
  Key, 
  Lightbulb, 
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';

export default function RoleAnalysis({
  roleData,
  onProceedToCandidate
}) {
  if (!roleData) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Step 1: Role Intelligence Deconstruction</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {roleData.roleTitle}
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
              Comprehensive breakdown of expectations, technical stack, core competencies, and critical concepts required by the hiring team.
            </p>
          </div>

          <button
            onClick={onProceedToCandidate}
            className="self-start md:self-center px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            <span>Proceed to Candidate Match</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid: Required Skills vs Preferred Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Required Skills */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-7 h-7 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">Required Skills</h2>
              <p className="text-[11px] text-slate-400">Non-negotiable core competencies</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {roleData.requiredSkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-blue-950/40 border border-blue-800/40 text-blue-300 text-xs font-medium flex items-center space-x-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Preferred Skills */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-7 h-7 rounded-md bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Star className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">Preferred Skills</h2>
              <p className="text-[11px] text-slate-400">Bonus qualifications that elevate the profile</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {roleData.preferredSkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-indigo-300 text-xs font-medium flex items-center space-x-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Key Responsibilities */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 mb-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-7 h-7 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100">Key Responsibilities</h2>
            <p className="text-[11px] text-slate-400">Expected day-to-day deliverables and ownership</p>
          </div>
        </div>
        <ul className="space-y-2.5">
          {roleData.responsibilities.map((resp, idx) => (
            <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-300">
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{resp}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Technical Competencies vs Behavioural Competencies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Technical Competencies */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-7 h-7 rounded-md bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">Technical Competencies</h2>
              <p className="text-[11px] text-slate-400">Engineering depth evaluated in technical rounds</p>
            </div>
          </div>
          <ul className="space-y-2">
            {roleData.technicalCompetencies.map((comp, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-center space-x-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>{comp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Behavioural Competencies */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-7 h-7 rounded-md bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">Behavioural Competencies</h2>
              <p className="text-[11px] text-slate-400">Interpersonal dynamics and cultural expectations</p>
            </div>
          </div>
          <ul className="space-y-2">
            {roleData.behaviouralCompetencies.map((comp, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-center space-x-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{comp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Experience Expectations & Key Qualifications */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 mb-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-7 h-7 rounded-md bg-cyan-500/10 flex items-center justify-center text-cyan-400">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100">Experience Expectations & Qualifications</h2>
            <p className="text-[11px] text-slate-400">Academic background and project experience criteria</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {roleData.experienceExpectations.map((exp, idx) => (
            <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3 text-xs text-slate-300">
              {exp}
            </div>
          ))}
        </div>
      </div>

      {/* Important Keywords & Important Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center space-x-2 mb-3">
            <Key className="w-4 h-4 text-rose-400" />
            <h2 className="text-sm font-bold text-slate-100">Important Keywords</h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {roleData.importantKeywords.map((kw, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded bg-slate-950 text-slate-300 border border-slate-800 text-xs font-mono">
                {kw}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <h2 className="text-sm font-bold text-slate-100">Critical Domain Concepts</h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {roleData.importantConcepts.map((concept, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded bg-slate-950 text-slate-300 border border-slate-800 text-xs">
                {concept}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Navigation CTA */}
      <div className="flex justify-end">
        <button
          onClick={onProceedToCandidate}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold flex items-center space-x-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
        >
          <span>Evaluate Candidate Resume Against Role</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
