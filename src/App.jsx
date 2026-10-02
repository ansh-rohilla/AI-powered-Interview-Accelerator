import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import RoleAnalysis from './components/RoleAnalysis';
import CandidateAnalysis from './components/CandidateAnalysis';
import InterviewScreen from './components/InterviewScreen';
import PerformanceReport from './components/PerformanceReport';
import PreparationPlanView from './components/PreparationPlanView';
import SettingsModal from './components/SettingsModal';
import HistoryModal from './components/HistoryModal';
import { SAMPLE_PRESETS } from './data/sampleData';
import { aiEngine } from './services/aiEngine';

export default function App() {
  // Navigation Step: 'input' | 'role' | 'candidate' | 'interview' | 'report' | 'plan'
  const [currentStep, setCurrentStep] = useState('input');

  // Core Data
  const [jobDescription, setJobDescription] = useState(SAMPLE_PRESETS[0].jobDescription);
  const [resume, setResume] = useState(SAMPLE_PRESETS[0].resume);
  const [roleData, setRoleData] = useState(null);
  const [candidateData, setCandidateData] = useState(null);
  const [reportData, setReportData] = useState(null);

  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historySessions, setHistorySessions] = useState([]);

  // Load session history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('interview_accelerator_history');
      if (stored) {
        setHistorySessions(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not read session history from localStorage', e);
    }
  }, []);

  // Save session history helper
  const saveSessionToHistory = (newSession) => {
    const updated = [newSession, ...historySessions].slice(0, 20); // retain last 20
    setHistorySessions(updated);
    try {
      localStorage.setItem('interview_accelerator_history', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save history to localStorage', e);
    }
  };

  const handleClearHistory = () => {
    setHistorySessions([]);
    try {
      localStorage.removeItem('interview_accelerator_history');
    } catch (e) {
      console.warn('Could not clear history from localStorage', e);
    }
  };

  // Step 1 & 2 Execution: Analyze Role and Candidate
  const handleStartAnalysis = async () => {
    setIsLoading(true);
    try {
      // 1. Analyze Job Description
      const analyzedRole = await aiEngine.analyzeJobDescription(jobDescription);
      setRoleData(analyzedRole);

      // 2. Analyze Candidate Resume against Role
      const analyzedCandidate = await aiEngine.analyzeCandidateAndJobFit(analyzedRole, resume);
      setCandidateData(analyzedCandidate);

      // Transition to Step 1 Screen: Role Intelligence
      setCurrentStep('role');
    } catch (err) {
      console.error('Error during profile analysis:', err);
      alert('An error occurred during analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3 Execution: Finish Interview & Generate Comprehensive Report
  const handleFinishInterview = async (completedQuestions) => {
    setIsLoading(true);
    try {
      // Calculate overall speech metrics across all answers
      let totalWords = 0;
      let totalFillers = 0;
      let weightedWpmSum = 0;
      let totalAnswersWithWpm = 0;

      completedQuestions.forEach(q => {
        if (q.metrics) {
          totalWords += q.metrics.wordCount || 0;
          totalFillers += q.metrics.fillerCount || 0;
          if (q.metrics.wpm > 0) {
            weightedWpmSum += q.metrics.wpm;
            totalAnswersWithWpm++;
          }
        }
      });

      const averageWpm = totalAnswersWithWpm > 0 
        ? Math.round(weightedWpmSum / totalAnswersWithWpm) 
        : 140;

      const fillerRatio = totalWords > 0 
        ? `${Math.round((totalFillers / totalWords) * 100)}%` 
        : '0%';

      const clarityScore = Math.max(40, Math.min(98, 100 - (totalFillers * 4)));

      const overallMetrics = {
        totalWords,
        totalFillers,
        averageWpm,
        fillerRatio,
        clarityScore,
        wpmStatus: averageWpm >= 125 && averageWpm <= 165 ? 'optimal' : (averageWpm < 125 ? 'slow' : 'fast')
      };

      const generatedReport = await aiEngine.generateInterviewReport({
        jdAnalysis: roleData,
        candidateAnalysis: candidateData,
        interviewHistory: completedQuestions,
        overallMetrics
      });

      setReportData(generatedReport);

      // Save to session history
      saveSessionToHistory({
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        roleTitle: roleData?.roleTitle || 'AI Engineer Intern',
        overallScore: generatedReport.overallScore,
        readinessStatus: generatedReport.readinessStatus,
        reportData: generatedReport,
        roleData,
        candidateData
      });

      // Celebratory confetti if score >= 75
      if (generatedReport.overallScore >= 75) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore if canvas not supported
        }
      }

      setCurrentStep('report');
    } catch (err) {
      console.error('Error generating report:', err);
      alert('Error compiling interview report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (confirm('Start a new session? Current progress will remain saved in your history.')) {
      setRoleData(null);
      setCandidateData(null);
      setReportData(null);
      setCurrentStep('input');
    }
  };

  const handleLoadSession = (session) => {
    setRoleData(session.roleData);
    setCandidateData(session.candidateData);
    setReportData(session.reportData);
    setCurrentStep('report');
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Persistent Navbar */}
      <Navbar
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        hasAnalysis={!!roleData && !!candidateData}
        hasInterviewResults={!!reportData}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onReset={handleReset}
      />

      {/* Main Viewport */}
      <main className="flex-1 pb-16">
        {currentStep === 'input' && (
          <Dashboard
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            resume={resume}
            setResume={setResume}
            onStartAnalysis={handleStartAnalysis}
            isLoading={isLoading}
          />
        )}

        {currentStep === 'role' && roleData && (
          <RoleAnalysis
            roleData={roleData}
            onProceedToCandidate={() => setCurrentStep('candidate')}
          />
        )}

        {currentStep === 'candidate' && candidateData && (
          <CandidateAnalysis
            candidateData={candidateData}
            roleData={roleData}
            onStartInterview={() => setCurrentStep('interview')}
          />
        )}

        {currentStep === 'interview' && (
          <InterviewScreen
            jdAnalysis={roleData}
            candidateAnalysis={candidateData}
            onFinishInterview={handleFinishInterview}
          />
        )}

        {currentStep === 'report' && reportData && (
          <PerformanceReport
            reportData={reportData}
            roleData={roleData}
            onProceedToPlan={() => setCurrentStep('plan')}
            onRetakeInterview={() => setCurrentStep('interview')}
          />
        )}

        {currentStep === 'plan' && reportData && (
          <PreparationPlanView
            reportData={reportData}
            roleData={roleData}
            onRetakeInterview={() => setCurrentStep('interview')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AI Product Engineer Challenge — Assignment 3 (edxso / Student Credibility)</span>
          <span>Designed & Built by Ansh Rohilla • Ready for Production Deployment</span>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        historySessions={historySessions}
        onLoadSession={handleLoadSession}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}
