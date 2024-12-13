import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import CreatePostModal from './CreatePostModal';

interface MemberSpotlightProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function MemberSpotlight({ isExpanded, onToggle }: MemberSpotlightProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreatePost = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-purple-50">
        <div className="flex items-center gap-3">
          <Heart className="text-purple-600" />
          <div>
            <h3 className="font-semibold">Member Spotlight</h3>
            <p className="text-sm text-gray-600">Feature Sister Mary's 25 years of service</p>
          </div>
        </div>
        <button 
          onClick={handleCreatePost}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Create Post
        </button>
      </div>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category="Member Spotlight"
      />
    </>
  );
}