import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Briefcase, 
  UserCheck, 
  Layers,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { SAMPLE_PRESETS } from '../data/sampleData';
import { extractTextFromFile } from '../utils/fileExtractor';

export default function Dashboard({
  jobDescription,
  setJobDescription,
  resume,
  setResume,
  onStartAnalysis,
  isLoading
}) {
  const [jdFileName, setJdFileName] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState('ai-engineer');
  const [activeTabJd, setActiveTabJd] = useState('paste'); // 'paste' | 'upload'
  const [activeTabResume, setActiveTabResume] = useState('paste');

  const handleLoadPreset = (presetId) => {
    const preset = SAMPLE_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setSelectedPresetId(presetId);
      setJobDescription(preset.jobDescription);
      setResume(preset.resume);
      setJdFileName('');
      setResumeFileName('');
    }
  };

  const handleJdFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setJdFileName(file.name);
      const text = await extractTextFromFile(file);
      setJobDescription(text);
    } catch (err) {
      alert(`Error reading file: ${err.message}`);
    }
  };

  const handleResumeFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setResumeFileName(file.name);
      const text = await extractTextFromFile(file);
      setResume(text);
    } catch (err) {
      alert(`Error reading file: ${err.message}`);
    }
  };

  const isReady = jobDescription.trim().length > 30 && resume.trim().length > 30;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Student Credibility — Interview Accelerator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Prepare for Your Real Job Interview with Adaptive AI Intelligence
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Bridge the preparation gap between your resume and employer expectations. Analyze job requirements, assess role alignment, and simulate high-stakes interviews with voice and video analytics.
        </p>
      </div>

      {/* Preset Selector Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-5 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-semibold text-slate-200">Quick-Load Evaluation Presets</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Click to load verified, realistic JD & resume profiles tested against edxso criteria.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {SAMPLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleLoadPreset(preset.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  selectedPresetId === preset.id
                    ? 'bg-blue-600/20 text-blue-300 border-blue-500/50 shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dual Input Workspace: JD & Resume */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left Column: Job Description */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div className="px-5 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/90">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">1. Job Description (JD)</h3>
                <p className="text-[11px] text-slate-400">Role specifications and employer expectations</p>
              </div>
            </div>

            {/* Input Mode Toggle */}
            <div className="flex items-center bg-slate-950 p-0.5 rounded-md border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTabJd('paste')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  activeTabJd === 'paste' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Paste Text
              </button>
              <button
                onClick={() => setActiveTabJd('upload')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  activeTabJd === 'upload' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Upload File
              </button>
            </div>
          </div>

          <div className="p-5 flex-1 flex flex-col">
            {activeTabJd === 'paste' ? (
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description here (responsibilities, required skills, competencies)..."
                className="w-full flex-1 min-h-[300px] bg-slate-950/70 border border-slate-800 rounded-lg p-3.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors font-mono leading-relaxed resize-none"
              />
            ) : (
              <div className="flex-1 min-h-[300px] border-2 border-dashed border-slate-800 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-slate-950/40 hover:border-slate-700 transition-colors">
                <Upload className="w-9 h-9 text-slate-500 mb-3" />
                <p className="text-xs font-medium text-slate-300 mb-1">
                  Upload Job Description Document
                </p>
                <p className="text-[11px] text-slate-500 mb-4">
                  Supports PDF, TXT, MD, or DOCX files
                </p>
                <label className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors">
                  Select File
                  <input
                    type="file"
                    accept=".pdf,.txt,.md,.docx"
                    onChange={handleJdFileUpload}
                    className="hidden"
                  />
                </label>
                {jdFileName && (
                  <div className="mt-4 flex items-center space-x-1.5 text-xs text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded border border-blue-500/20">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Loaded: {jdFileName}</span>
                  </div>
                )}
              </div>
            )}

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
              <span>{jobDescription.trim().length} characters</span>
              <span>{jobDescription.trim() ? 'Ready for analysis' : 'Required'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Candidate Resume */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div className="px-5 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/90">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-md bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">2. Candidate Resume</h3>
                <p className="text-[11px] text-slate-400">Education, skills, achievements, and project history</p>
              </div>
            </div>

            {/* Input Mode Toggle */}
            <div className="flex items-center bg-slate-950 p-0.5 rounded-md border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTabResume('paste')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  activeTabResume === 'paste' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Paste Text
              </button>
              <button
                onClick={() => setActiveTabResume('upload')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  activeTabResume === 'upload' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Upload File
              </button>
            </div>
          </div>

          <div className="p-5 flex-1 flex flex-col">
            {activeTabResume === 'paste' ? (
              <textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste candidate resume here (work experience, projects, skills, education)..."
                className="w-full flex-1 min-h-[300px] bg-slate-950/70 border border-slate-800 rounded-lg p-3.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono leading-relaxed resize-none"
              />
            ) : (
              <div className="flex-1 min-h-[300px] border-2 border-dashed border-slate-800 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-slate-950/40 hover:border-slate-700 transition-colors">
                <Upload className="w-9 h-9 text-slate-500 mb-3" />
                <p className="text-xs font-medium text-slate-300 mb-1">
                  Upload Candidate Resume
                </p>
                <p className="text-[11px] text-slate-500 mb-4">
                  Supports PDF, TXT, MD, or DOCX files
                </p>
                <label className="cursor-pointer px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors">
                  Select File
                  <input
                    type="file"
                    accept=".pdf,.txt,.md,.docx"
                    onChange={handleResumeFileUpload}
                    className="hidden"
                  />
                </label>
                {resumeFileName && (
                  <div className="mt-4 flex items-center space-x-1.5 text-xs text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded border border-indigo-500/20">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Loaded: {resumeFileName}</span>
                  </div>
                )}
              </div>
            )}

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
              <span>{resume.trim().length} characters</span>
              <span>{resume.trim() ? 'Ready for analysis' : 'Required'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-200">Ready to Analyze Alignment</h4>
            <p className="text-xs text-slate-400">
              Deconstructs the role, matches your resume skills, and generates an adaptive 3-level simulation.
            </p>
          </div>
        </div>

        <button
          onClick={onStartAnalysis}
          disabled={!isReady || isLoading}
          className={`w-full sm:w-auto px-6 py-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 shadow-md transition-all ${
            isReady && !isLoading
              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20 hover:shadow-blue-500/30 cursor-pointer'
              : 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing Profile & Role...</span>
            </>
          ) : (
            <>
              <span>Analyze Role & Match</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
