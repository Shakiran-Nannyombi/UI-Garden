
import React from 'react';

interface Props {
  onStart: () => void;
}

export const LandingPage: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.05)_0%,_transparent_70%)]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="relative z-10 max-w-2xl w-full text-center space-y-12 animate-in fade-in zoom-in-95 duration-1000">
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-1 border-b border-white/20" />
            <span className="px-4 text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-bold">Protocol 001: Genesis</span>
            <div className="w-12 h-1 border-b border-white/20" />
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none font-['Archivo_Black']">
            UI GARDEN
          </h1>
          
          <p className="text-zinc-400 text-lg md:text-xl font-light max-w-lg mx-auto leading-relaxed tracking-wide">
            You are the Architect. The Void is silent, colorless, and waiting for your aesthetic frequency.
          </p>
        </div>

        <div className="pt-8">
          <button 
            onClick={onStart}
            className="group relative inline-flex items-center justify-center px-10 py-5 font-black tracking-widest uppercase text-xs text-black transition-all duration-300 ease-in-out bg-white rounded-full hover:bg-zinc-200 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10">Enter the Void</span>
            <div className="absolute inset-0 rounded-full bg-white blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
          </button>
        </div>

        <div className="pt-12 flex justify-center gap-8 text-[9px] uppercase tracking-[0.3em] text-zinc-600 font-bold">
          <span>Sentient Design Engine</span>
          <span className="text-zinc-800">/</span>
          <span>Gemini Core Active</span>
          <span className="text-zinc-800">/</span>
          <span>CSS Tokenized</span>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-12 left-12 animate-float opacity-20">
        <div className="w-16 h-16 border border-white rotate-45" />
      </div>
      <div className="absolute top-12 right-12 animate-float-delayed opacity-20">
        <div className="w-12 h-12 border border-white rounded-full" />
      </div>
    </div>
  );
};
