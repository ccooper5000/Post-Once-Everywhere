import React, { useState } from 'react';
import { Users } from 'lucide-react';
import CreatePostModal from './CreatePostModal';

interface CommunityOutreachProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function CommunityOutreach({ isExpanded, onToggle }: CommunityOutreachProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreatePost = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-purple-50">
        <div className="flex items-center gap-3">
          <Users className="text-purple-600" />
          <div>
            <h3 className="font-semibold">Community Outreach</h3>
            <p className="text-sm text-gray-600">Promote upcoming food drive this Saturday</p>
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
        category="Community Outreach"
      />
    </>
  );
}