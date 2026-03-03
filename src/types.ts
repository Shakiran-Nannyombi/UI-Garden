
export enum VibeType {
  DREAMY = 'DREAMY',
  NEON_CYBER = 'NEON_CYBER',
  BRUTALIST = 'BRUTALIST',
  MINIMAL = 'MINIMAL',
  RETRO_FUTURE = 'RETRO_FUTURE',
  ETHYREAL = 'ETHYREAL',
  BIO_ORGANIC = 'BIO_ORGANIC'
}

export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export interface Product {
  id: string;
  name: string;
  rarity: Rarity;
  evaluation: string;
  vibeScore: number; // 0-100
}

export interface DesignTokens {
  borderRadius: string;
  boxShadow: string;
  fontFamily: string;
  borderWidth: string;
  animation: string;
}

export interface GardenConfig {
  name: string;
  vibe: VibeType;
  colors: [string, string, string];
  hairType: string;
}

export interface GardenStats {
  uiPower: number;
  vibeConsistency: number;
  creativity: number;
}

export interface BloomResponse {
  narrative: string;
  avatarDescription: string;
  designAnalysis: string;
  styleTitle: string;
  stats: GardenStats;
  avatarEvolution: string;
  inviteMessage: string;
}

export interface ProductEvaluation {
  rarity: Rarity;
  evaluation: string;
  vibeScore: number;
}
