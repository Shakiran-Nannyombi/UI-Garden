
import React from 'react';
import { VibeType } from './types';

export const VIBE_METADATA = {
  [VibeType.DREAMY]: {
    radius: '24px',
    shadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
    font: "'Inter', sans-serif",
    animation: 'float',
    border: '0px',
    description: 'Floating on clouds of soft-focus gradients.'
  },
  [VibeType.NEON_CYBER]: {
    radius: '2px',
    shadow: '0 0 15px currentColor',
    font: "'JetBrains Mono', monospace",
    animation: 'pulse',
    border: '1px solid currentColor',
    description: 'Chrome-plated reality with a glitch in the system.'
  },
  [VibeType.BRUTALIST]: {
    radius: '0px',
    shadow: '8px 8px 0px #000',
    font: "'Archivo Black', sans-serif",
    animation: 'none',
    border: '3px solid #000',
    description: 'Raw materials, hard edges, uncompromising function.'
  },
  [VibeType.MINIMAL]: {
    radius: '8px',
    shadow: '0 2px 10px rgba(0,0,0,0.05)',
    font: "'Outfit', sans-serif",
    animation: 'none',
    border: '1px solid rgba(0,0,0,0.1)',
    description: 'The beauty of empty space and precise typography.'
  },
  [VibeType.RETRO_FUTURE]: {
    radius: '4px',
    shadow: '0 0 20px rgba(255, 120, 0, 0.3)',
    font: "'JetBrains Mono', monospace",
    animation: 'scanline',
    border: '2px solid rgba(255,255,255,0.1)',
    description: 'Nostalgic chrome and scanline-drenched dreams.'
  },
  [VibeType.ETHYREAL]: {
    radius: '40px',
    shadow: '0 8px 32px 0 rgba(255, 255, 255, 0.1)',
    font: "'Inter', sans-serif",
    animation: 'shimmer',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    description: 'Glassmorphism and light-leaks from another dimension.'
  },
  [VibeType.BIO_ORGANIC]: {
    radius: '60px 20px 60px 20px',
    shadow: '20px 20px 60px #0a0a0a, -20px -20px 60px #141414',
    font: "'Outfit', sans-serif",
    animation: 'breathe',
    border: '0px',
    description: 'Curvature inspired by nature and soft earth shadows.'
  }
};

export const PetalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12 2C7 2 3 7 3 12s4 10 9 10 9-5 9-10-4-10-9-10z" />
    <path d="M12 8c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4z" />
  </svg>
);
