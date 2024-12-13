import { PlatformConfig } from '../types/social';

export const platformConfigs: Record<string, PlatformConfig> = {
  instagram: {
    name: 'instagram',
    supportsImages: true,
    supportsVideo: true,
    maxImages: 10,
    maxVideoLength: 60,
  },
  facebook: {
    name: 'facebook',
    supportsImages: true,
    supportsVideo: true,
    maxCharacters: 63206,
  },
  tiktok: {
    name: 'tiktok',
    supportsImages: false,
    supportsVideo: true,
    maxVideoLength: 180,
  },
  twitter: {
    name: 'twitter',
    maxCharacters: 280,
    supportsImages: true,
    supportsVideo: true,
    maxImages: 4,
  },
  bluesky: {
    name: 'bluesky',
    maxCharacters: 300,
    supportsImages: true,
    supportsVideo: false,
    maxImages: 4,
  },
};