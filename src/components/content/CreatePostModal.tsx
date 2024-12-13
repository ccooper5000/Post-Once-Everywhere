import React from 'react';
import Modal from '../shared/Modal';
import PostEditor from '../social/PostEditor';
import { PostContent } from '../../types/social';
import { SocialMediaService } from '../../services/socialMedia';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export default function CreatePostModal({ isOpen, onClose, category }: CreatePostModalProps) {
  const handlePost = async (content: PostContent) => {
    const socialMediaService = SocialMediaService.getInstance();
    const results = await socialMediaService.createPost(content);
    
    const successful = Object.values(results).filter(Boolean).length;
    const total = Object.keys(results).length;
    
    alert(`Successfully posted to ${successful} out of ${total} platforms`);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Create ${category} Post`}
    >
      <PostEditor
        category={category}
        onPost={handlePost}
        onCancel={onClose}
      />
    </Modal>
  );
}