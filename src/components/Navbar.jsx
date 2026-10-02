import React from 'react';
import { 
  Sparkles, 
  Settings, 
  History, 
  RotateCcw, 
  Cpu,
  FileText,
  Compass,
  UserCheck,
  BarChart3,
  BookOpen,
  ChevronRight
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
    { id: 'input', label: 'Input', icon: FileText, num: '1', enabled: true },
    { id: 'role', label: 'Role Intel', icon: Compass, num: '2', enabled: hasAnalysis },
    { id: 'candidate', label: 'Candidate Fit', icon: UserCheck, num: '3', enabled: hasAnalysis },
    { id: 'interview', label: 'AI Simulator', icon: Sparkles, num: '4', enabled: hasAnalysis },
    { id: 'report', label: 'Report', icon: BarChart3, num: '5', enabled: hasInterviewResults },
    { id: 'plan', label: 'Prep Plan', icon: BookOpen, num: '6', enabled: hasInterviewResults }
  ];

  const currentStepObj = steps.find(s => s.id === currentStep) || steps[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl transition-all">
      {/* Subtle top ambient glow line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand & Platform Badge */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="relative group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25 border border-blue-400/30">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -inset-0.5 rounded-xl bg-blue-500/20 blur opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />
            </div>

            <div className="flex items-center space-x-2.5">
              <div className="flex flex-col">
                <span className="font-extrabold text-sm sm:text-base text-white tracking-tight leading-tight">
                  Interview Accelerator
                </span>
                <span className="text-[10px] text-slate-400 font-medium hidden sm:block">
                  AI-Powered Career Intelligence
                </span>
              </div>

              <div className="h-4 w-px bg-slate-800 hidden sm:block" />

              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-blue-500/10 text-blue-400 border border-blue-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>Student Credibility</span>
              </span>
            </div>
          </div>

          {/* Central Floating Stepper Pill Navigation (Desktop & Laptop) */}
          <nav className="hidden lg:flex items-center bg-slate-900/90 border border-slate-800/80 rounded-full p-1 shadow-lg shadow-black/30 backdrop-blur-md">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isEnabled = step.enabled;

              return (
                <React.Fragment key={step.id}>
                  <button
                    disabled={!isEnabled}
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex items-center space-x-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md shadow-blue-600/30'
                        : isEnabled
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800/80 cursor-pointer'
                        : 'text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : isEnabled ? 'text-slate-400' : 'text-slate-600'}`} />
                    <span>{step.label}</span>
                  </button>

                  {idx < steps.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-slate-700/80 flex-shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Mobile / Tablet Compact Step Badge */}
          <div className="lg:hidden flex items-center bg-slate-900 border border-slate-800 rounded-full px-3 py-1 text-xs">
            <span className="text-slate-400 mr-1.5 font-medium">Step {currentStepObj.num}/6:</span>
            <span className="font-semibold text-blue-400">{currentStepObj.label}</span>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-2 flex-shrink-0">

            {/* History Button */}
            <button
              onClick={onOpenHistory}
              title="Interview History"
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all shadow-sm cursor-pointer"
            >
              <History className="w-4 h-4" />
            </button>

            {/* Settings Button */}
            <button
              onClick={onOpenSettings}
              title="AI Engine & Voice Settings"
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all shadow-sm cursor-pointer"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Reset / New Session */}
            {hasAnalysis && (
              <button
                onClick={onReset}
                title="Start a new interview analysis"
                className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all shadow-sm cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">New Session</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
