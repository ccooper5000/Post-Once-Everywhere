import React, { useState, useEffect } from 'react';
import { Post } from '../../types/social';
import { DraftService } from '../../services/draftService';
import DraftList from './DraftList';
import Modal from '../shared/Modal';
import PostEditor from '../social/PostEditor';

export default function DraftManagement() {
  const [drafts, setDrafts] = useState<Post[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<Post | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const draftService = DraftService.getInstance();

  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = async () => {
    const fetchedDrafts = await draftService.getDrafts();
    setDrafts(fetchedDrafts);
  };

  const handleEdit = (draft: Post) => {
    setSelectedDraft(draft);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (draft: Post) => {
    if (window.confirm('Are you sure you want to delete this draft?')) {
      await draftService.deleteDraft(draft.id);
      await loadDrafts();
    }
  };

  const handlePublish = async (draft: Post) => {
    if (window.confirm('Are you ready to publish this draft?')) {
      await draftService.publishDraft(draft.id);
      await loadDrafts();
    }
  };

  const handleUpdate = async (content: PostContent) => {
    if (selectedDraft) {
      await draftService.updateDraft(selectedDraft.id, content);
      setIsEditModalOpen(false);
      setSelectedDraft(null);
      await loadDrafts();
    }
  };

  return (
    <div>
      <DraftList
        drafts={drafts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPublish={handlePublish}
      />

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedDraft(null);
        }}
        title="Edit Draft"
      >
        {selectedDraft && (
          <PostEditor
            category={selectedDraft.category}
            initialContent={selectedDraft}
            onPost={handleUpdate}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedDraft(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}