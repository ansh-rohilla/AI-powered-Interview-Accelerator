import React from 'react';
import { 
  Sparkles, 
  Settings, 
  History, 
  RotateCcw, 
  ShieldCheck,
  Cpu
} from 'lucide-react';

export default function Navbar({
  currentStep,
  setCurrentStep,
  hasAnalysis,
  hasInterviewResults,
  onOpenSettings,
  onOpenHistory,
  onReset
}) {
  const steps = [
    { id: 'input', label: '1. Input Documents', enabled: true },
    { id: 'role', label: '2. Role Intelligence', enabled: hasAnalysis },
    { id: 'candidate', label: '3. Candidate Fit', enabled: hasAnalysis },
    { id: 'interview', label: '4. AI Simulator', enabled: hasAnalysis },
    { id: 'report', label: '5. Evaluation Report', enabled: hasInterviewResults },
    { id: 'plan', label: '6. Preparation Plan', enabled: hasInterviewResults }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Badge */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base text-slate-100 tracking-tight">Interview Accelerator</span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Student Credibility
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">AI-Powered Job Interview Preparation Platform</p>
            </div>
          </div>

          {/* Stepper Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {steps.map(step => {
              const isActive = currentStep === step.id;
              const isEnabled = step.enabled;

              return (
                <button
                  key={step.id}
                  disabled={!isEnabled}
                  onClick={() => setCurrentStep(step.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm'
                      : isEnabled
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                      : 'text-slate-600 cursor-not-allowed'
                  }`}
                >
                  {step.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenHistory}
              title="Interview History"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-700"
            >
              <History className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenSettings}
              title="AI Engine Settings"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-700"
            >
              <Settings className="w-4 h-4" />
            </button>

            {hasAnalysis && (
              <button
                onClick={onReset}
                title="Start New Session"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Session</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
