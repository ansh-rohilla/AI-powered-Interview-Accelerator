import React, { useState, useEffect } from 'react';
import { 
  X, 
  Settings, 
  Key, 
  Cpu, 
  User, 
  Volume2, 
  Check, 
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { aiEngine } from '../services/aiEngine';
import { speechService } from '../services/speechService';

export default function SettingsModal({ isOpen, onClose }) {
  const [config, setConfig] = useState(aiEngine.config);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoiceUri, setSelectedVoiceUri] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setConfig(aiEngine.loadConfig());
      const voices = speechService.getVoices();
      setAvailableVoices(voices);
      if (speechService.selectedVoice) {
        setSelectedVoiceUri(speechService.selectedVoice.voiceURI);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    aiEngine.saveConfig(config);
    if (selectedVoiceUri) {
      speechService.setVoice(selectedVoiceUri);
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center space-x-2">
            <Settings className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Interview Engine Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs sm:text-sm">
          {/* AI Engine Provider Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              AI Engine Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setConfig({ ...config, provider: 'local' })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  config.provider === 'local'
                    ? 'bg-blue-600/20 border-blue-500 text-white font-semibold shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-1.5 text-xs mb-1">
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  <span>Local Heuristic NLP</span>
                </div>
                <p className="text-[11px] text-slate-400 font-normal">
                  Zero config, offline-ready, evaluated against edxso criteria.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setConfig({ ...config, provider: 'openai' })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  config.provider !== 'local'
                    ? 'bg-blue-600/20 border-blue-500 text-white font-semibold shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-1.5 text-xs mb-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Live Cloud LLM</span>
                </div>
                <p className="text-[11px] text-slate-400 font-normal">
                  Connect OpenAI, Google Gemini, or Groq API key.
                </p>
              </button>
            </div>
          </div>

          {/* Cloud API Key & Provider (shown if cloud selected) */}
          {config.provider !== 'local' && (
            <div className="space-y-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  LLM Provider
                </label>
                <select
                  value={config.provider}
                  onChange={(e) => setConfig({ ...config, provider: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="openai">OpenAI (GPT-4o / GPT-4o-mini)</option>
                  <option value="gemini">Google Gemini (Gemini 1.5 Flash)</option>
                  <option value="groq">Groq (Llama 3.3 70B)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  value={config.apiKey}
                  onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                  placeholder={`Enter your ${config.provider} API key...`}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            </div>
          )}

          {/* AI Interviewer Persona Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              AI Interviewer Persona
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'alex', name: 'Alex Reed', role: 'Staff AI Engineer', style: 'Rigorous & Technical' },
                { id: 'elena', name: 'Elena Vance', role: 'VP of Engineering', style: 'Systems & Vision' },
                { id: 'jordan', name: 'Jordan Chen', role: 'Talent Partner', style: 'STAR & Culture' }
              ].map((persona) => (
                <button
                  key={persona.id}
                  type="button"
                  onClick={() => setConfig({ ...config, interviewerPersona: persona.id })}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    config.interviewerPersona === persona.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold text-xs">{persona.name}</div>
                  <div className="text-[10px] text-indigo-400">{persona.role}</div>
                  <div className="text-[9px] text-slate-500 mt-1">{persona.style}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Voice Output Selection */}
          {availableVoices.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                Interviewer Speech Synthesis Voice
              </label>
              <select
                value={selectedVoiceUri}
                onChange={(e) => setSelectedVoiceUri(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                {availableVoices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Settings stored locally in your browser</span>
          </div>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save & Apply</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
