import React from 'react';
import { Facebook, Instagram, Video, Twitter, Share2 } from 'lucide-react';
import { SocialPlatform } from '../../types/social';
import { platformConfigs } from '../../config/platformConfigs';

interface PlatformSelectorProps {
  selectedPlatforms: SocialPlatform[];
  onPlatformToggle: (platform: SocialPlatform) => void;
}

const platformIcons = {
  facebook: Facebook,
  instagram: Instagram,
  tiktok: Video,
  twitter: Twitter,
  bluesky: Share2,
};

export default function PlatformSelector({ selectedPlatforms, onPlatformToggle }: PlatformSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {Object.keys(platformConfigs).map((platform) => {
        const Icon = platformIcons[platform as SocialPlatform];
        const isSelected = selectedPlatforms.includes(platform as SocialPlatform);

        return (
          <button
            key={platform}
            onClick={() => onPlatformToggle(platform as SocialPlatform)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              isSelected
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-purple-600'
            }`}
          >
            <Icon size={20} />
            <span className="capitalize">{platform}</span>
          </button>
        );
      })}
    </div>
  );
}