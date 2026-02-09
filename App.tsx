
import React, { useState, useMemo, useEffect } from 'react';
import { GardenConfig, BloomResponse, Product, VibeType } from './types';
import { GardenVoid } from './components/GardenVoid';
import { LandingPage } from './components/LandingPage';
import { LevelMap } from './components/LevelMap';
import { GardenLifeForce } from './services/geminiService';
import { VIBE_METADATA } from './constants';
import { Map as MapIcon, Upload, Plus, Cpu, PenTool, Database, FileJson, Copy, X, ArrowRight, User as UserIcon, Wand2 } from 'lucide-react';

type AppStep = 'landing' | 'map' | 'void' | 'bloom';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('landing');
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1]);
  
  const [config, setConfig] = useState<GardenConfig | null>(null);
  const [bloom, setBloom] = useState<BloomResponse | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [planting, setPlanting] = useState(false);
  const [seedModalOpen, setSeedModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null);
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);
  
  // Avatar Editing State
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [avatarPrompt, setAvatarPrompt] = useState('');
  const [generatingAvatar, setGeneratingAvatar] = useState(false);

  const lifeForce = useMemo(() => new GardenLifeForce(), []);

  // Game Logic: Max Slots
  const MAX_SLOTS = 12;
  const slots = Array(MAX_SLOTS).fill(null).map((_, i) => products[i] || null);

  const handleStart = () => {
    // If we already have a profile, go to map, otherwise go to void to create one
    if (config) {
      setStep('map');
    } else {
      setStep('void');
    }
  };
  
  const handleSelectLevel = (level: number) => {
    if (level === 1) setStep('void'); // Edit Profile
    if (level === 2 && unlockedLevels.includes(2)) setStep('bloom'); // Play Game
  };

  const handleBloom = async (newConfig: GardenConfig) => {
    setLoading(true);
    setConfig(newConfig);
    
    // If it's the first time creating a profile (Level 1 complete), unlock Level 2
    if (!unlockedLevels.includes(2)) {
      setUnlockedLevels([...unlockedLevels, 2]);
    }

    // Generate content if we don't have it or if it's a new run
    try {
        const result = await lifeForce.generateBloom(newConfig);
        setBloom(result);
    } catch (e) {
        console.error("Failed to generate bloom data", e);
    }
    
    setLoading(false);
    setStep('map'); // Go to Map after creation
  };

  const handleOpenPlanting = () => {
    if (products.length >= MAX_SLOTS) return; // Grid full
    setSeedModalOpen(true);
  };

  const handlePlantProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim() || !config) return;

    setPlanting(true);
    const evalResult = await lifeForce.evaluateProduct(newProductName, config.vibe);
    
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProductName,
      ...evalResult
    };

    setProducts([...products, newProduct]);
    setNewProductName('');
    setPlanting(false);
    setSeedModalOpen(false);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAvatar || !avatarPrompt.trim()) return;

    setGeneratingAvatar(true);
    try {
      const newAvatarData = await lifeForce.editAvatar(customAvatar, avatarPrompt);
      setCustomAvatar(newAvatarData);
      setEditingAvatar(false);
      setAvatarPrompt('');
    } catch (error) {
      console.error("Avatar edit failed", error);
      alert("Failed to edit avatar. Try again.");
    } finally {
      setGeneratingAvatar(false);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'Legendary': return '#F59E0B';
      case 'Epic': return '#A855F7';
      case 'Rare': return '#3B82F6';
      default: return '#94A3B8';
    }
  };

  // --------------------------------------------------------------------------
  // RENDER STATES
  // --------------------------------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white font-mono space-y-8 p-6 overflow-hidden">
        <div className="relative w-32 h-32 animate-pulse">
           <div className="absolute inset-0 bg-white/5 blur-xl rounded-full" />
           <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
             <path d="M50 10 L90 90 L10 90 Z" fill="none" stroke="white" strokeWidth="1" />
             <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
           </svg>
        </div>
        <div className="text-center space-y-2">
          <p className="uppercase tracking-[0.4em] font-black text-xs text-white blink">Synthesizing Profile</p>
          <div className="text-[10px] text-zinc-500 animate-pulse">Using Thinking Mode (32k Tokens)</div>
          <div className="w-48 h-1 bg-zinc-800 mx-auto overflow-hidden rounded-full">
            <div className="h-full bg-white w-full animate-progress-loading" />
          </div>
        </div>
      </div>
    );
  }

  if (step === 'landing') return <LandingPage onStart={handleStart} />;
  
  if (step === 'map') return (
    <LevelMap 
      config={config} 
      unlockedLevels={unlockedLevels} 
      onSelectLevel={handleSelectLevel} 
      onBack={() => setStep('landing')}
      avatarSrc={customAvatar || undefined}
      bloomData={bloom}
      onAvatarUpload={handleAvatarUpload}
    />
  );

  if (step === 'void') return (
    <GardenVoid 
      initialConfig={config}
      onBloom={handleBloom} 
      onBack={() => config ? setStep('map') : setStep('landing')} 
    />
  );

  // If step is bloom but data missing, fallback
  if (!config || !bloom) {
    setStep('void');
    return null;
  }

  const vibeStyle = VIBE_METADATA[config.vibe];
  const dynamicStyles: React.CSSProperties = {
    // @ts-ignore
    '--primary': config.colors[0],
    '--secondary': config.colors[1],
    '--accent': config.colors[2],
    '--radius': vibeStyle.radius,
    '--font': vibeStyle.font,
    '--bg-tint': `${config.colors[0]}15`, // 15 = low opacity hex
    '--border-tint': `${config.colors[0]}40`, // 40 = medium opacity hex
    '--text-dim': `${config.colors[1]}AA`,
  };

  const avatarSrc = customAvatar;

  // --------------------------------------------------------------------------
  // GAME HUD RENDER (LEVEL 2)
  // --------------------------------------------------------------------------

  return (
    <div 
      style={dynamicStyles}
      className="fixed inset-0 bg-black text-white font-['Outfit'] overflow-hidden flex flex-col animate-in fade-in duration-1000"
    >
      {/* GLOBAL AMBIENCE & GRID (Themed) */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--bg-tint)' }} />
      <div className="absolute inset-0 pointer-events-none opacity-30"
           style={{ 
             backgroundImage: `linear-gradient(var(--border-tint) 1px, transparent 1px), linear-gradient(90deg, var(--border-tint) 1px, transparent 1px)`, 
             backgroundSize: '50px 50px',
             maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
           }} 
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,_var(--bg-tint),_transparent_70%)]" />

      {/* ----------------- TOP HUD (STATUS BAR) ----------------- */}
      <header 
        className="h-24 backdrop-blur-xl border-b flex items-center justify-between px-6 z-50 shrink-0 transition-colors duration-500"
        style={{ borderColor: 'var(--border-tint)', backgroundColor: 'rgba(0,0,0,0.4)' }}
      >
        
        {/* PLAYER INFO & AVATAR UPLOAD */}
        <div className="flex items-center gap-6">
          <div className="relative group">
            {/* Avatar Container */}
            <div 
              className="w-16 h-16 rounded-xl border-2 overflow-hidden relative cursor-pointer shadow-[0_0_15px_var(--bg-tint)] transition-all group-hover:scale-105 group-hover:shadow-[0_0_25px_var(--primary)] bg-black" 
              style={{ borderColor: 'var(--primary)' }}
            >
              {avatarSrc ? (
                 <img src={avatarSrc} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center p-1 text-center animate-pulse">
                   <UserIcon size={24} style={{ color: 'var(--primary)' }} />
                 </div>
              )}
              
              {/* Upload Overlay */}
              <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-center z-10">
                 <Upload size={16} style={{ color: 'var(--primary)' }} className="mb-1" />
                 <span className="text-[6px] font-black uppercase tracking-widest text-white">Upload</span>
                 <input type="file" accept="image/*" hidden onChange={handleAvatarUpload} />
              </label>
            </div>

            {/* AI Edit Button (Only shows if avatar exists) */}
            {avatarSrc && (
              <button 
                onClick={(e) => { e.stopPropagation(); setEditingAvatar(true); }}
                className="absolute -right-2 -bottom-2 z-20 bg-[var(--primary)] text-black p-1.5 rounded-full hover:scale-110 transition-transform shadow-[0_0_10px_var(--primary)]"
                title="AI Edit"
              >
                <Wand2 size={10} strokeWidth={3} />
              </button>
            )}

            {/* Decoration */}
            {!avatarSrc && <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[var(--primary)] rotate-45 animate-pulse" />}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black uppercase tracking-tight leading-none drop-shadow-[0_2px_10px_var(--primary)]" style={{ color: 'var(--primary)' }}>{config.name}</h1>
              <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] bg-[var(--bg-tint)] border border-[var(--border-tint)] px-2 py-0.5 rounded text-[var(--primary)] font-mono font-bold">LVL 2</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--secondary)' }}>{bloom.styleTitle}</span>
            </div>
          </div>
        </div>

        {/* STATS BARS */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center max-w-2xl px-12">
           <div className="w-full space-y-2">
             <div className="flex justify-between text-[9px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-dim)' }}>
               <span className="flex items-center gap-2"><Cpu size={10} /> UI Power</span>
               <span>{bloom.stats.uiPower}%</span>
             </div>
             <div className="h-2 rounded-full overflow-hidden bg-black/40 border border-[var(--border-tint)]">
               <div className="h-full bg-[var(--primary)] shadow-[0_0_15px_var(--primary)] relative overflow-hidden" style={{ width: `${bloom.stats.uiPower}%` }}>
                 <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
               </div>
             </div>
           </div>
           <div className="w-full space-y-2">
             <div className="flex justify-between text-[9px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-dim)' }}>
               <span className="flex items-center gap-2"><PenTool size={10} /> Creativity</span>
               <span>{bloom.stats.creativity}%</span>
             </div>
             <div className="h-2 rounded-full overflow-hidden bg-black/40 border border-[var(--border-tint)]">
               <div className="h-full bg-[var(--secondary)] shadow-[0_0_15px_var(--secondary)] relative overflow-hidden" style={{ width: `${bloom.stats.creativity}%` }}>
                  <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
               </div>
             </div>
           </div>
        </div>

        {/* SYSTEM MENU */}
        <div className="flex items-center gap-4">
           <div className="text-right hidden sm:block">
             <div className="text-[9px] uppercase font-bold tracking-widest" style={{ color: 'var(--text-dim)' }}>Sector Status</div>
             <div className="text-xs font-mono font-bold animate-pulse" style={{ color: 'var(--accent)' }}>ACTIVE</div>
           </div>
           
           {/* WORLD MAP BUTTON */}
           <button 
             onClick={() => setStep('map')}
             className="group px-4 py-2 border flex items-center gap-2 hover:bg-[var(--bg-tint)] transition-all bg-black/50"
             style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
           >
             <MapIcon size={16} />
             <span className="text-[10px] font-black uppercase tracking-widest">Map</span>
           </button>
        </div>
      </header>

      {/* ----------------- MAIN STAGE (GARDEN GRID) ----------------- */}
      <main className="flex-1 relative overflow-y-auto custom-scrollbar p-8 flex items-center justify-center">
        <div className="max-w-6xl w-full">
           <div className="flex justify-between items-end mb-8 border-b pb-4" style={{ borderColor: 'var(--border-tint)' }}>
              <h2 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4 text-white">
                <span className="w-3 h-10 bg-[var(--primary)] block shadow-[0_0_20px_var(--primary)]" />
                Sector 02: Bloom
              </h2>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-2" style={{ color: 'var(--text-dim)' }}>
                <Database size={12} />
                Capacity: {products.length}/{MAX_SLOTS}
              </div>
           </div>

           {/* THE GRID */}
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 perspective-1000">
             {slots.map((product, index) => (
               <div 
                 key={index}
                 onClick={() => !product ? handleOpenPlanting() : setInspectedProduct(product)}
                 className={`
                   aspect-square relative rounded-xl border-2 transition-all duration-300 group cursor-pointer overflow-hidden
                   ${product 
                     ? 'bg-black/40 hover:scale-[1.02] shadow-2xl' 
                     : 'bg-transparent border-dashed hover:bg-[var(--bg-tint)]'
                   }
                 `}
                 style={{ 
                   borderRadius: 'var(--radius)',
                   borderColor: product ? 'var(--primary)' : 'var(--border-tint)'
                 }}
               >
                 {/* EMPTY SLOT VISUALS */}
                 {!product && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center transition-colors" style={{ color: 'var(--text-dim)' }}>
                     <Plus size={40} strokeWidth={1} className="mb-2 opacity-30 group-hover:opacity-100 group-hover:text-[var(--primary)] transition-all" />
                     <span className="text-[9px] uppercase tracking-widest font-bold group-hover:text-[var(--primary)]">Deploy Seed</span>
                   </div>
                 )}

                 {/* PRODUCT VISUALS */}
                 {product && (
                   <div className="absolute inset-0 p-5 flex flex-col justify-between overflow-hidden">
                     {/* Dynamic Background Shine */}
                     <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-tint)] to-transparent opacity-50" />
                     
                     <div className="flex justify-between items-start relative z-10">
                        <div className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: getRarityColor(product.rarity), color: getRarityColor(product.rarity) }} />
                        <span 
                          className="text-[8px] uppercase font-black tracking-widest px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10"
                          style={{ color: getRarityColor(product.rarity) }}
                        >
                          {product.rarity}
                        </span>
                     </div>

                     <div className="relative z-10">
                        <h3 className="text-xl font-black uppercase leading-none mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2 drop-shadow-md">
                          {product.name}
                        </h3>
                        <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden border border-white/5">
                          <div className="h-full bg-[var(--secondary)] shadow-[0_0_10px_var(--secondary)]" style={{ width: `${product.vibeScore}%` }} />
                        </div>
                     </div>

                     {/* VIBE SPECIFIC OVERLAYS */}
                     {config.vibe === VibeType.NEON_CYBER && <div className="absolute inset-0 border-2 border-[var(--primary)] opacity-0 group-hover:opacity-100 animate-pulse transition-opacity" style={{ borderRadius: 'var(--radius)' }} />}
                     {config.vibe === VibeType.RETRO_FUTURE && <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--primary)] opacity-0 group-hover:opacity-50 animate-scanline pointer-events-none" />}
                   </div>
                 )}
               </div>
             ))}
           </div>
        </div>
      </main>

      {/* ----------------- BOTTOM DECK (LOG & CONTROLS) ----------------- */}
      <footer 
        className="h-56 border-t grid grid-cols-1 md:grid-cols-3 shrink-0 relative z-40 backdrop-blur-md"
        style={{ borderColor: 'var(--border-tint)', backgroundColor: 'rgba(0,0,0,0.6)' }}
      >
        
        {/* NARRATIVE LOG */}
        <div className="md:col-span-2 border-r p-6 overflow-y-auto custom-scrollbar relative font-mono text-sm" style={{ borderColor: 'var(--border-tint)' }}>
           <div className="absolute top-3 right-3 text-[9px] uppercase font-bold tracking-widest opacity-50" style={{ color: 'var(--primary)' }}>/// Event Log</div>
           <div className="space-y-4 pt-2">
             <div style={{ color: 'var(--text-dim)' }}>
               <span style={{ color: 'var(--primary)' }}>[{new Date().toLocaleTimeString()}]</span> Level 02 sequence engaged.
             </div>
             <div className="border-l-2 pl-4 py-1 italic" style={{ borderColor: 'var(--accent)', color: 'var(--secondary)' }}>
               {bloom.narrative}
             </div>
             {products.map(p => (
               <div key={p.id} className="text-xs" style={{ color: 'var(--text-dim)' }}>
                 <ArrowRight size={10} className="inline mr-2" style={{ color: 'var(--secondary)' }} />
                 Planted <span className="font-bold" style={{ color: 'var(--primary)' }}>{p.name}</span>. Evaluation: {p.evaluation}
               </div>
             ))}
           </div>
        </div>

        {/* ACTION PANEL */}
        <div className="p-6 flex flex-col justify-between">
           <div>
             <div className="flex justify-between items-center mb-2">
                <div className="text-[9px] uppercase font-bold tracking-widest" style={{ color: 'var(--text-dim)' }}>Ghibli Avatar Prompt</div>
                <button 
                  onClick={() => navigator.clipboard.writeText(bloom.avatarDescription)}
                  className="flex items-center gap-1 text-[8px] uppercase font-bold border px-2 py-0.5 rounded hover:bg-[var(--primary)] hover:text-black transition-colors"
                  style={{ borderColor: 'var(--text-dim)', color: 'var(--text-dim)' }}
                >
                  <Copy size={10} />
                  Copy
                </button>
             </div>
             <p className="text-xs italic leading-relaxed line-clamp-3" style={{ color: 'var(--secondary)' }}>
                "{bloom.avatarDescription}"
             </p>
           </div>
           
           <div className="flex gap-3 mt-4">
              <div className="flex-1 bg-black/40 border p-3 rounded flex flex-col justify-center items-center" style={{ borderColor: 'var(--border-tint)' }}>
                <span className="text-3xl font-black" style={{ color: 'var(--primary)' }}>{products.length}</span>
                <span className="text-[8px] uppercase tracking-wider opacity-60" style={{ color: 'var(--primary)' }}>Assets</span>
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(JSON.stringify(products))}
                className="flex-1 bg-black/40 border p-3 rounded flex flex-col justify-center items-center cursor-pointer hover:bg-[var(--bg-tint)] transition-colors group"
                style={{ borderColor: 'var(--border-tint)' }}
              >
                <div className="mb-1 text-[var(--text-dim)] group-hover:text-[var(--primary)] transition-colors"><FileJson size={24} /></div>
                <span className="text-[8px] uppercase tracking-wider opacity-60" style={{ color: 'var(--text-dim)' }}>Harvest</span>
              </button>
           </div>
        </div>
      </footer>
      
      {/* Modals */}
       {seedModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-200">
           <div className="border p-1 rounded-2xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.5)]" style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--bg-tint)' }}>
             <div className="bg-black rounded-xl p-8 border relative overflow-hidden" style={{ borderColor: 'var(--border-tint)' }}>
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]" />
               <h3 className="text-xl font-black uppercase tracking-tight mb-6" style={{ color: 'var(--primary)' }}>Initialize New Seed</h3>
               
               <form onSubmit={handlePlantProduct} className="space-y-6">
                 <div className="space-y-2">
                   <label className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--text-dim)' }}>Product Designation</label>
                   <input 
                      autoFocus
                      value={newProductName}
                      onChange={(e) => setNewProductName(e.target.value)}
                      placeholder="e.g. Hyper-Link Button"
                      className="w-full bg-black border p-4 rounded outline-none focus:border-[var(--primary)] transition-colors"
                      style={{ borderColor: 'var(--border-tint)', color: 'var(--primary)' }}
                   />
                 </div>
                 <div className="flex gap-3">
                   <button type="button" onClick={() => setSeedModalOpen(false)} className="flex-1 py-3 text-xs font-black uppercase bg-transparent border rounded hover:bg-[var(--bg-tint)]" style={{ color: 'var(--text-dim)', borderColor: 'var(--border-tint)' }}>Cancel</button>
                   <button type="submit" disabled={planting || !newProductName.trim()} className="flex-1 py-3 text-xs font-black uppercase bg-[var(--primary)] text-black rounded hover:brightness-110 disabled:opacity-50 shadow-[0_0_15px_var(--bg-tint)]">
                     {planting ? 'Analyzing...' : 'Plant Seed'}
                   </button>
                 </div>
               </form>
             </div>
           </div>
        </div>
      )}

      {/* AVATAR EDIT MODAL */}
      {editingAvatar && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-200">
           <div className="border p-1 rounded-2xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.5)]" style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--bg-tint)' }}>
             <div className="bg-black rounded-xl p-8 border relative overflow-hidden" style={{ borderColor: 'var(--border-tint)' }}>
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]" />
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-black uppercase tracking-tight" style={{ color: 'var(--primary)' }}>Construct Avatar</h3>
                 <button onClick={() => setEditingAvatar(false)} style={{ color: 'var(--text-dim)' }}><X size={16}/></button>
               </div>
               
               <form onSubmit={handleAvatarEditSubmit} className="space-y-6">
                 <div className="aspect-square w-32 mx-auto rounded-lg overflow-hidden border-2 mb-4" style={{ borderColor: 'var(--primary)' }}>
                   <img src={customAvatar || ''} className="w-full h-full object-cover" />
                 </div>

                 <div className="space-y-2">
                   <label className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--text-dim)' }}>Modification Prompt</label>
                   <input 
                      autoFocus
                      value={avatarPrompt}
                      onChange={(e) => setAvatarPrompt(e.target.value)}
                      placeholder="e.g. Add cyberpunk glasses"
                      className="w-full bg-black border p-4 rounded outline-none focus:border-[var(--primary)] transition-colors"
                      style={{ borderColor: 'var(--border-tint)', color: 'var(--primary)' }}
                   />
                 </div>
                 <div className="flex gap-3">
                   <button type="button" onClick={() => setEditingAvatar(false)} className="flex-1 py-3 text-xs font-black uppercase bg-transparent border rounded hover:bg-[var(--bg-tint)]" style={{ color: 'var(--text-dim)', borderColor: 'var(--border-tint)' }}>Cancel</button>
                   <button type="submit" disabled={generatingAvatar || !avatarPrompt.trim()} className="flex-1 py-3 text-xs font-black uppercase bg-[var(--primary)] text-black rounded hover:brightness-110 disabled:opacity-50 shadow-[0_0_15px_var(--bg-tint)]">
                     {generatingAvatar ? 'Processing...' : 'Execute Edit'}
                   </button>
                 </div>
               </form>
             </div>
           </div>
        </div>
      )}

      {inspectedProduct && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="max-w-2xl w-full bg-black border rounded-lg overflow-hidden shadow-2xl flex flex-col" style={{ borderColor: 'var(--primary)' }}>
            <div className="p-3 border-b flex justify-between items-center bg-[var(--bg-tint)]" style={{ borderColor: 'var(--border-tint)' }}>
              <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--secondary)' }}>Diagnostic: {inspectedProduct.id.toUpperCase()}</span>
              <button onClick={() => setInspectedProduct(null)} className="hover:text-[var(--primary)] px-2" style={{ color: 'var(--text-dim)' }}>
                <X size={16} />
              </button>
            </div>
            <div className="p-6 overflow-auto max-h-[60vh] bg-black/50">
              <pre className="text-xs font-mono leading-relaxed" style={{ color: 'var(--primary)' }}>
                {JSON.stringify(inspectedProduct, null, 2)}
              </pre>
            </div>
            <div className="p-4 bg-[var(--bg-tint)] flex justify-end gap-3">
               <button 
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(inspectedProduct, null, 2));
                    setInspectedProduct(null);
                  }}
                  className="px-6 py-2 bg-[var(--primary)] text-black text-[10px] font-black uppercase tracking-widest rounded hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <Copy size={12} />
                  Copy & Close
                </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
