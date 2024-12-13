import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { PostContent, SocialPlatform } from '../../types/social';
import { DraftService } from '../../services/draftService';
import Button from '../shared/Button';
import PlatformSelector from './PlatformSelector';
import MediaUpload from '../shared/MediaUpload';
import SaveDraftDialog from '../shared/SaveDraftDialog';
import { useMediaUpload } from '../../hooks/useMediaUpload';

interface PostEditorProps {
  category: string;
  initialContent?: PostContent;
  onPost: (content: PostContent) => Promise<void>;
  onCancel: () => void;
  onSaveDraft?: (content: PostContent) => Promise<void>;
}

export default function PostEditor({
  category,
  initialContent,
  onPost,
  onCancel,
  onSaveDraft
}: PostEditorProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>(
    initialContent?.platforms || []
  );
  const [title, setTitle] = useState(initialContent?.title || '');
  const [description, setDescription] = useState(initialContent?.description || '');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [savedDraftId, setSavedDraftId] = useState<string | null>(null);
  
  const {
    images,
    video,
    handleImageUpload,
    handleVideoUpload,
    handleImageRemove,
    handleVideoRemove
  } = useMediaUpload();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content: PostContent = {
      title,
      description,
      images,
      video,
      category,
      platforms: selectedPlatforms,
      customizations: {},
    };
    await onPost(content);
  };

  const handleSaveDraft = async () => {
    const content: PostContent = {
      title,
      description,
      images,
      video,
      category,
      platforms: selectedPlatforms,
      customizations: {},
    };
    
    const draftService = DraftService.getInstance();
    const draft = await draftService.saveDraft(content);
    setSavedDraftId(draft.id);
    setShowSaveDialog(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <PlatformSelector
          selectedPlatforms={selectedPlatforms}
          onPlatformToggle={(platform) => {
            setSelectedPlatforms(prev =>
              prev.includes(platform)
                ? prev.filter(p => p !== platform)
                : [...prev, platform]
            );
          }}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter post title"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            rows={4}
            placeholder="Enter post description"
          />
        </div>

        <MediaUpload
          images={images}
          video={video}
          onImageUpload={handleImageUpload}
          onVideoUpload={handleVideoUpload}
          onImageRemove={handleImageRemove}
          onVideoRemove={handleVideoRemove}
        />

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="secondary"
            icon={Save}
            onClick={handleSaveDraft}
          >
            Save as Draft
          </Button>
          <Button
            type="submit"
            disabled={selectedPlatforms.length === 0}
            variant="primary"
          >
            Post to Selected Platforms
          </Button>
        </div>
      </form>

      <SaveDraftDialog
        isOpen={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        onViewDrafts={() => {
          window.location.hash = '#drafts';
          setShowSaveDialog(false);
        }}
        onEditDraft={() => {
          if (savedDraftId) {
            window.location.hash = `#drafts/edit/${savedDraftId}`;
          }
          setShowSaveDialog(false);
        }}
      />
    </>
  );
}