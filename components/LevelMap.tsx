import React from 'react';
import { GardenConfig, BloomResponse } from '../types';
import { User, Flower, Lock, Edit3, LogOut } from 'lucide-react';

interface Props {
  config: GardenConfig | null;
  unlockedLevels: number[];
  onSelectLevel: (level: number) => void;
  onBack: () => void;
  avatarSrc?: string;
  bloomData?: BloomResponse | null;
  onAvatarUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LevelMap: React.FC<Props> = ({ config, unlockedLevels, onSelectLevel, onBack, avatarSrc, bloomData, onAvatarUpload }) => {
  const isLocked = (level: number) => !unlockedLevels.includes(level);

  // Dynamic colors based on config, or defaults if no config yet
  const primary = config?.colors[0] || '#ffffff';
  const secondary = config?.colors[1] || '#888888';
  const accent = config?.colors[2] || '#444444';

  return (
    <div 
      className="min-h-screen font-['Outfit'] overflow-hidden relative flex flex-col"
      style={{
        backgroundColor: 'black', // Void foundation
        // @ts-ignore
        '--primary': primary,
        '--secondary': secondary,
        '--accent': accent,
      }}
    >
      {/* STRICT COLOR PALETTE AMBIENCE - NO ZINC/GRAY */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--accent)_0%,_transparent_70%)] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)`, 
             backgroundSize: '40px 40px',
             maskImage: 'radial-gradient(circle, black 40%, transparent 100%)'
           }} 
      />

      {/* HUD Overlay - TOP BAR */}
      <div className="w-full p-6 flex justify-between items-start z-50 relative animate-in slide-in-from-top-10 duration-500">
        {/* Profile Card - Color Strict */}
        <div className="flex items-center gap-4 bg-black/90 backdrop-blur-md p-4 pr-8 rounded-xl border border-[var(--primary)]/30 shadow-[0_0_20px_-5px_var(--primary)]">
           <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-[var(--primary)] relative group bg-black">
              {avatarSrc ? (
                 <img src={avatarSrc} className="w-full h-full object-cover" />
              ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center text-center p-1 cursor-pointer">
                    <span className="text-[6px] uppercase font-black tracking-widest" style={{ color: 'var(--primary)' }}>No Signal</span>
                    <User className="w-6 h-6 animate-pulse" style={{ color: 'var(--secondary)' }} />
                 </div>
              )}
              
              {/* Upload Prompt on Hover */}
              <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-center">
                 <span className="text-[6px] font-black uppercase tracking-widest text-[var(--primary)]">Upload</span>
                 <input type="file" accept="image/*" hidden onChange={onAvatarUpload} />
              </label>
           </div>
           
           <div>
              <h2 className="text-xl font-black uppercase tracking-tight leading-none" style={{ color: 'var(--primary)' }}>
                {config?.name || 'Unknown Architect'}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                 <div className="w-2 h-2 rounded-full bg-[var(--secondary)] animate-pulse" />
                 <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'var(--secondary)' }}>
                   {bloomData?.styleTitle || 'Level 1 Initiate'}
                 </span>
              </div>
           </div>
        </div>

        <button 
          onClick={onBack} 
          className="group px-6 py-3 border bg-black hover:bg-[var(--primary)] hover:text-black transition-colors uppercase text-[10px] font-bold tracking-widest rounded shadow-lg flex items-center gap-2"
          style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
        >
          <LogOut size={14} className="group-hover:stroke-black" />
          Logout
        </button>
      </div>

      {/* 2D Map Container */}
      <div className="flex-1 flex items-center justify-center relative z-10 animate-in fade-in zoom-in-95 duration-700">
        
        {/* Connector Line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[300px] h-[2px] bg-black border-y border-[var(--primary)]/10">
          <div 
            className={`h-full bg-[var(--primary)] transition-all duration-1000 ease-out ${!isLocked(2) ? 'w-full' : 'w-0'}`}
            style={{ boxShadow: '0 0 15px var(--primary)' }}
          />
        </div>

        <div className="flex items-center gap-16 md:gap-32">
          
          {/* LEVEL 1 NODE */}
          <div 
            onClick={() => onSelectLevel(1)}
            className="relative group cursor-pointer"
          >
             <div className="w-32 h-32 rounded-full border-4 bg-black relative flex items-center justify-center shadow-[0_0_30px_var(--primary)] group-hover:scale-110 transition-transform z-20" style={{ borderColor: 'var(--primary)' }}>
                <User size={48} style={{ color: 'var(--primary)' }} strokeWidth={1.5} />
             </div>
             {/* Pulse Effect */}
             <div className="absolute -inset-4 border rounded-full animate-ping opacity-20 pointer-events-none" style={{ borderColor: 'var(--primary)' }} />
             
             {/* Label */}
             <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 text-center w-48">
                <div className="text-lg font-black uppercase tracking-widest" style={{ color: 'var(--primary)' }}>Identity</div>
                <div className="flex items-center justify-center gap-2 mt-2 opacity-70 group-hover:opacity-100 transition-opacity">
                    <Edit3 size={10} style={{ color: 'var(--secondary)' }} />
                    <span className="text-[10px] font-mono bg-black/80 px-2 py-1 rounded inline-block border" style={{ color: 'var(--secondary)', borderColor: 'var(--secondary)' }}>
                        EDIT CONFIG
                    </span>
                </div>
             </div>
          </div>

          {/* LEVEL 2 NODE */}
          <div 
            onClick={() => !isLocked(2) && onSelectLevel(2)}
            className={`relative group ${isLocked(2) ? 'cursor-not-allowed opacity-50 grayscale' : 'cursor-pointer'}`}
          >
             <div 
               className="w-40 h-40 rounded-2xl border-4 bg-black relative flex flex-col items-center justify-center transition-transform group-hover:scale-105 z-20"
               style={{ 
                 borderColor: isLocked(2) ? '#333' : 'var(--secondary)',
                 boxShadow: isLocked(2) ? 'none' : `0 0 40px var(--secondary)`
               }}
             >
                <Flower size={64} strokeWidth={1} style={{ color: isLocked(2) ? '#555' : 'var(--secondary)' }} />
                
                {isLocked(2) && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl backdrop-blur-sm">
                        <Lock size={32} className="text-zinc-500" />
                    </div>
                )}
             </div>

             {/* Label */}
             <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 text-center w-48">
                <div className="text-lg font-black uppercase tracking-widest" style={{ color: 'var(--primary)' }}>The Garden</div>
                <div className="text-[10px] font-mono mt-1 px-2 py-1 rounded inline-block border bg-black/50" 
                     style={{ 
                       color: isLocked(2) ? '#555' : 'var(--secondary)', 
                       borderColor: isLocked(2) ? '#333' : 'var(--secondary)' 
                     }}>
                   {isLocked(2) ? 'LOCKED' : 'ENTER SIMULATION'}
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};