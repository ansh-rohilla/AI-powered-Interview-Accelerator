import React from 'react';
import { 
  X, 
  History, 
  Trash2, 
  Calendar, 
  Award, 
  ChevronRight, 
  ExternalLink 
} from 'lucide-react';

export default function HistoryModal({
  isOpen,
  onClose,
  historySessions,
  onLoadSession,
  onClearHistory
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Interview History & Tracking</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of Sessions */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1 text-xs">
          {historySessions.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              <History className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="font-medium">No recorded interview sessions yet.</p>
              <p className="text-[11px] text-slate-600 mt-1">
                Complete an interview simulation to track your readiness trajectory over time.
              </p>
            </div>
          ) : (
            historySessions.map((session, idx) => (
              <div
                key={session.id || idx}
                className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-200 text-sm">{session.roleTitle || 'AI Engineer Intern'}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Score: {session.overallScore}/100
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-[11px] text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{session.date}</span>
                    </span>
                    <span>•</span>
                    <span className="text-slate-300 font-medium">{session.readinessStatus}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onLoadSession(session);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center space-x-1 transition-colors cursor-pointer flex-shrink-0"
                >
                  <span>View Report</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {historySessions.length > 0 && (
          <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              {historySessions.length} total session{historySessions.length > 1 ? 's' : ''} stored
            </span>

            <button
              onClick={onClearHistory}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
