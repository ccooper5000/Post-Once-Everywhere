import React from 'react';
import { FileText, Edit } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

interface SaveDraftDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onViewDrafts: () => void;
  onEditDraft: () => void;
}

export default function SaveDraftDialog({
  isOpen,
  onClose,
  onViewDrafts,
  onEditDraft
}: SaveDraftDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Draft Saved Successfully"
    >
      <div className="text-center py-6">
        <div className="flex justify-center mb-4">
          <FileText size={48} className="text-purple-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Your draft has been saved!</h3>
        <p className="text-gray-600 mb-6">
          You can access it anytime from your drafts section.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            variant="secondary"
            icon={FileText}
            onClick={onViewDrafts}
          >
            View Drafts Section
          </Button>
          <Button
            variant="primary"
            icon={Edit}
            onClick={onEditDraft}
          >
            Continue Editing
          </Button>
        </div>
      </div>
    </Modal>
  );
}