import React from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig, spring, Audio, staticFile } from 'remotion';

// --- Components ---

const LandingPage: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
    const scale = spring({ frame, fps, config: { damping: 12 } });

    return (
        <AbsoluteFill className="bg-black flex flex-col items-center justify-center text-white font-sans overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 opacity-40 shadow-[inset_0_0_100px_#FF007A]" />

            <div style={{ opacity, transform: `scale(${scale})` }} className="text-center z-10">
                <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 mb-8">Protocol 001: Genesis</p>
                <h1 className="text-[12rem] font-black tracking-tighter leading-none mb-12">UI GARDEN</h1>
                <p className="max-w-md mx-auto text-zinc-400 text-lg mb-16 leading-relaxed">
                    You are the Architect. The Void is silent, colorless, and waiting for your aesthetic frequency.
                </p>
                <div className="inline-block px-12 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    Enter the Void
                </div>
            </div>

            {/* Bottom bar */}
            <div className="absolute bottom-8 w-full px-20 flex justify-between text-[8px] uppercase tracking-[0.3em] text-zinc-600 font-bold">
                <span>Sentient Design Engine</span>
                <span>Gemini Core Active</span>
                <span>CSS Tokenized</span>
            </div>
        </AbsoluteFill>
    );
};

const SectorBloom: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    const bgOpacity = interpolate(frame, [0, 20], [0, 1]);
    const hudSlide = interpolate(frame, [0, 30], [-100, 0], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="bg-black text-white font-sans overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(#FF007A 1px, transparent 1px), linear-gradient(90deg, #FF007A 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                }}
            />

            {/* HUD Header */}
            <div style={{ transform: `translateY(${hudSlide}px)` }} className="h-24 border-b border-[#FF007A]/20 flex items-center justify-between px-10 bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg border-2 border-[#FF007A] flex items-center justify-center">
                        <div className="w-6 h-6 bg-[#FF007A]/40 rounded-full" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-black uppercase tracking-tighter text-[#FF007A]">KIRAN</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[8px] bg-[#FF007A]/20 border border-[#FF007A]/40 px-1.5 py-0.5 rounded text-[#FF007A] font-bold">LVL 2</span>
                            <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-bold">NEON GLITCH-WEAVER</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-12 flex-1 justify-center max-w-xl">
                    <div className="w-full">
                        <div className="flex justify-between text-[8px] uppercase font-bold tracking-widest text-[#FF007A]/60 mb-1">
                            <span>UI Power</span>
                            <span>95%</span>
                        </div>
                        <div className="h-1.5 bg-black rounded-full overflow-hidden border border-[#FF007A]/20">
                            <div className="h-full bg-[#FF007A] shadow-[0_0_10px_#FF007A]" style={{ width: '95%' }} />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="flex justify-between text-[8px] uppercase font-bold tracking-widest text-cyan-400/60 mb-1">
                            <span>Creativity</span>
                            <span>88%</span>
                        </div>
                        <div className="h-1.5 bg-black rounded-full overflow-hidden border border-cyan-400/20">
                            <div className="h-full bg-cyan-400 shadow-[0_0_10px_#00F0FF]" style={{ width: '88%' }} />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-[8px] uppercase tracking-widest text-zinc-500 font-bold">Sector Status</div>
                        <div className="text-[10px] text-pink-500 font-black animate-pulse">ACTIVE</div>
                    </div>
                    <div className="px-4 py-2 border border-[#FF007A] text-[#FF007A] text-[9px] font-black uppercase tracking-widest">Map</div>
                </div>
            </div>

            {/* Main Stage */}
            <div className="p-10">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-5xl font-black uppercase tracking-tight flex items-center gap-4">
                        <span className="w-2 h-12 bg-[#FF007A] shadow-[0_0_20px_#FF007A]" />
                        Sector 02: Bloom
                    </h2>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Capacity: 1/12</span>
                </div>

                <div className="grid grid-cols-4 gap-8">
                    {/* Active Card */}
                    <div className="aspect-square border-2 border-[#FF007A] bg-[#FF007A]/10 rounded-lg p-6 flex flex-col justify-between relative overflow-hidden group">
                        <div className="flex justify-between">
                            <div className="w-4 h-4 rounded-full bg-zinc-400" />
                            <span className="text-[8px] border border-white/20 px-1.5 py-0.5 rounded text-white/60">COMMON</span>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <div className="w-32 h-32 border-2 border-[#FF007A] rotate-12 animate-spin-slow" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black uppercase">SL</h3>
                            <div className="h-1.5 w-full bg-black mt-2 rounded-full overflow-hidden border border-white/10">
                                <div className="h-full bg-cyan-400" style={{ width: '40%' }} />
                            </div>
                        </div>
                    </div>

                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="aspect-square border-2 border-dashed border-[#FF007A]/20 rounded-lg flex flex-col items-center justify-center text-zinc-600">
                            <div className="text-3xl font-light mb-2">+</div>
                            <span className="text-[8px] uppercase font-bold tracking-widest">Deploy Seed</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Narrative / Log */}
            <div className="absolute bottom-0 w-full h-40 border-t border-[#FF007A]/20 grid grid-cols-3 bg-black/60 backdrop-blur-md">
                <div className="col-span-2 p-6 border-r border-[#FF007A]/20">
                    <p className="text-[#FF007A] text-[10px] font-bold mb-4">[12:10:14 AM] Level 02 sequence engaged.</p>
                    <p className="text-cyan-400/80 text-sm italic leading-relaxed">
                        System Initialized. Welcome, kiran, to the zero-point of creation. The Black & White Void usually swallows light, but your arrival triggers a critical system override...
                    </p>
                </div>
                <div className="p-6 flex flex-col justify-between">
                    <div>
                        <p className="text-[8px] uppercase tracking-widest text-cyan-400 font-bold mb-2">Ghibli Avatar Prompt</p>
                        <p className="text-[10px] text-zinc-400 italic">"A highly detailed Studio Ghibli style anime portrait..."</p>
                    </div>
                    <div className="w-full py-3 bg-[#FF007A] text-black text-[10px] font-black uppercase tracking-widest text-center rounded-lg">
                        Execute Full Data Export
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};

// --- Composition Root ---

export const UIGardenDemo: React.FC = () => {
    return (
        <AbsoluteFill className="bg-black">
            <Audio src={staticFile('audio.mp3')} />

            {/* Intro / Landing */}
            <Sequence durationInFrames={120}>
                <LandingPage />
            </Sequence>

            {/* Transition to Bloom */}
            <Sequence from={120} durationInFrames={330}>
                <SectorBloom />
            </Sequence>
        </AbsoluteFill>
    );
};
