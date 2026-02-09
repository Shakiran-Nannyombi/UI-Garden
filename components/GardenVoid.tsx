
import React, { useState } from 'react';
import { VibeType, GardenConfig } from '../types';

interface Props {
  onBloom: (config: GardenConfig) => void;
  onBack: () => void;
  initialConfig?: GardenConfig | null;
}

export const GardenVoid: React.FC<Props> = ({ onBloom, onBack, initialConfig }) => {
  const [formData, setFormData] = useState<Partial<GardenConfig>>(initialConfig || {
    vibe: VibeType.DREAMY,
    colors: ['#FF007A', '#00F0FF', '#7000FF']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.hairType) {
      onBloom(formData as GardenConfig);
    }
  };

  const updateColor = (index: number, value: string) => {
    const newColors = [...(formData.colors || [])];
    newColors[index] = value;
    setFormData({ ...formData, colors: newColors as [string, string, string] });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white font-mono relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      {/* Vertical Abort Button (Far Left) */}
      <button 
        onClick={onBack}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 group -rotate-90 origin-left translate-x-12 hover:translate-x-14 transition-all"
      >
        <div className="bg-zinc-900 border border-zinc-700 px-4 py-2 flex items-center gap-3 hover:bg-white hover:text-black hover:border-white transition-colors">
          <span className="text-[10px] uppercase tracking-[0.3em] font-black whitespace-nowrap">Return to Map</span>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </div>
      </button>

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left: Preview/Visuals */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-8">
           <div className="relative w-64 h-64 border-4 border-white/10 rounded-full flex items-center justify-center bg-zinc-900/50 backdrop-blur">
              <div className="absolute inset-0 rounded-full border border-white/20 animate-spin-slow" style={{ animationDuration: '10s' }} />
              <div className="text-6xl animate-pulse">?</div>
              <div className="absolute -bottom-12 text-center space-y-2">
                <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Avatar Construct</div>
                <div className="text-xs font-mono text-zinc-300">Awaiting Input...</div>
              </div>
           </div>
        </div>

        {/* Right: The Form */}
        <div className="space-y-8 animate-in slide-in-from-right-8 duration-700">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter uppercase font-['Archivo_Black'] leading-none">
              Level 01 <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">Architect</span>
            </h1>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">/// System Ready for Parameter Injection</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/80 p-8 rounded-sm border-l-4 border-white/20 backdrop-blur-xl shadow-2xl relative">
            <div className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white to-transparent opacity-50" />
            
            <div className="space-y-2">
              <label className="flex justify-between text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                <span>Identity_String</span>
                <span>[REQUIRED]</span>
              </label>
              <input 
                required
                value={formData.name || ''}
                className="w-full bg-black border border-zinc-700 p-4 outline-none focus:border-white focus:bg-zinc-900 transition-all text-white font-mono text-sm tracking-wider placeholder:text-zinc-700"
                placeholder="ENTER USERNAME..."
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="flex justify-between text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                <span>Texture_Map (Hair)</span>
                <span>[VISUAL]</span>
              </label>
              <input 
                required
                value={formData.hairType || ''}
                className="w-full bg-black border border-zinc-700 p-4 outline-none focus:border-white focus:bg-zinc-900 transition-all text-white font-mono text-sm tracking-wider placeholder:text-zinc-700"
                placeholder="DEFINE ATTRIBUTE..."
                onChange={e => setFormData({...formData, hairType: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="flex justify-between text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                <span>Core_Frequency (Vibe)</span>
                <span>[CLASS]</span>
              </label>
              <div className="relative">
                <select 
                  className="w-full bg-black border border-zinc-700 p-4 outline-none focus:border-white focus:bg-zinc-900 transition-all appearance-none text-white font-mono text-sm tracking-wider cursor-pointer uppercase"
                  onChange={e => setFormData({...formData, vibe: e.target.value as VibeType})}
                  value={formData.vibe}
                >
                  {Object.values(VibeType).map(v => (
                    <option key={v} value={v}>{v.replace('_', ' ')}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">▼</div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold block">Palette Data</label>
              <div className="grid grid-cols-3 gap-4">
                {formData.colors?.map((c, i) => (
                  <div key={i} className="space-y-2 group">
                    <div className="relative h-10 w-full bg-zinc-800 border border-zinc-600 group-hover:border-white transition-colors overflow-hidden">
                      <input 
                        type="color"
                        value={c}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={e => updateColor(i, e.target.value)}
                      />
                      <div className="w-full h-full" style={{ backgroundColor: c }} />
                    </div>
                    <input 
                      type="text"
                      value={c.toUpperCase()}
                      className="w-full bg-transparent text-[10px] font-mono text-center text-zinc-500 focus:text-white outline-none"
                      onChange={e => updateColor(i, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] hover:bg-[#00F0FF] hover:text-black transition-all active:translate-y-1 relative overflow-hidden group"
            >
              <span className="relative z-10">Deploy Configuration</span>
              <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
