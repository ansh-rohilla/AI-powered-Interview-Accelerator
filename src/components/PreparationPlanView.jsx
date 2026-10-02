import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Clock, 
  Award,
  Layers,
  CheckSquare,
  Square
} from 'lucide-react';

export default function PreparationPlanView({
  reportData,
  roleData,
  onRetakeInterview
}) {
  const [checkedItems, setCheckedItems] = useState({});

  if (!reportData) return null;

  const preparationPlan = reportData.preparationPlan || [];

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Recommended curated technical study resources
  const STUDY_RESOURCES = [
    {
      title: 'Pinecone Learning Center: RAG & Vector Indexing',
      url: 'https://www.pinecone.io/learn/retrieval-augmented-generation/',
      type: 'Documentation & Architecture',
      description: 'Comprehensive guides on chunking, HNSW indexing, and hybrid dense-sparse search.'
    },
    {
      title: 'RAGAS Documentation: Evaluation Metrics for LLM & RAG',
      url: 'https://docs.ragas.io/en/latest/',
      type: 'Framework Guide',
      description: 'Understanding Faithfulness, Answer Relevance, Context Precision, and MRR metrics.'
    },
    {
      title: 'FastAPI Advanced Asynchronous Mechanics',
      url: 'https://fastapi.tiangolo.com/async/',
      type: 'Official Documentation',
      description: 'Master async def vs def, concurrency, background tasks, and streaming SSE responses.'
    },
    {
      title: 'Harvard CS50 / MIT OpenCourseWare: STAR Interview Technique',
      url: 'https://careerservices.fas.harvard.edu/',
      type: 'Behavioural Framework',
      description: 'How to structure Situation, Task, Action, and quantified Result under 90 seconds.'
    }
  ];

  const totalTopics = preparationPlan.reduce((acc, p) => acc + (p.topics?.length || 0), 0);
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Step 5: Targeted Preparation Plan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Personalized Gap-Closing Roadmap
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
              Targeted revision priorities based on gaps detected during your technical deep-dive. Check off topics as you review them before your real interview.
            </p>
          </div>

          {/* Progress Widget */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 self-start sm:self-center min-w-[200px]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-300">Study Progress</span>
              <span className="font-mono font-bold text-emerald-400">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              {completedCount} of {totalTopics} topics reviewed
            </span>
          </div>
        </div>
      </div>

      {/* Prioritized Preparation Cards (Priority 1, 2, 3) */}
      <div className="space-y-6 mb-8">
        {preparationPlan.map((planItem, planIdx) => {
          const priorityColor = planIdx === 0 
            ? 'text-rose-400 border-rose-500/30 bg-rose-500/10' 
            : planIdx === 1 
            ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' 
            : 'text-blue-400 border-blue-500/30 bg-blue-500/10';

          return (
            <div
              key={planIdx}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-800/80">
                <div className="flex items-center space-x-3">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${priorityColor}`}>
                    {planItem.priority}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {planItem.title}
                  </h3>
                </div>
                <span className="text-xs text-slate-400">
                  {planItem.description}
                </span>
              </div>

              {/* Review Topics Checklist */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Review & Master:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {planItem.topics?.map((topic, topicIdx) => {
                    const itemId = `${planIdx}-${topicIdx}`;
                    const isChecked = !!checkedItems[itemId];

                    return (
                      <button
                        key={topicIdx}
                        onClick={() => toggleCheck(itemId)}
                        className={`p-3 rounded-xl border text-left flex items-start space-x-3 transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-400 line-through'
                            : 'bg-slate-950/60 border-slate-800 text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <div className="mt-0.5 text-emerald-400 flex-shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-600" />
                          )}
                        </div>
                        <span className="text-xs sm:text-sm leading-relaxed">{topic}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommended Technical Study Resources */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-bold text-slate-100">
            Curated Study Resources & Documentation
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STUDY_RESOURCES.map((res, idx) => (
            <a
              key={idx}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-950/70 border border-slate-800 hover:border-blue-500/50 rounded-xl p-4 transition-all group block"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wide">
                  {res.type}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white transition-colors mb-1">
                {res.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {res.description}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Retake Interview Callout */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950/40 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-white">
            Finished reviewing your preparation roadmap?
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Retake the interview simulator to see your readiness score climb toward Strong Candidate.
          </p>
        </div>

        <button
          onClick={onRetakeInterview}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold flex items-center space-x-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer flex-shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Launch Follow-Up Interview</span>
        </button>
      </div>
    </div>
  );
}
