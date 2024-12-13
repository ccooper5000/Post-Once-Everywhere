import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Send } from 'lucide-react';
import { Post } from '../../types/social';
import Button from '../shared/Button';
import { SimpleStorage } from '../../services/storage/simpleStorage';

interface DraftListProps {
  drafts: Post[];
  onEdit: (draft: Post) => void;
  onDelete: (draft: Post) => void;
  onPublish: (draft: Post) => void;
}

interface DraftImageProps {
  imageId: string;
}

// Separate component for handling image loading
function DraftImage({ imageId }: DraftImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const storage = SimpleStorage.getInstance();

  useEffect(() => {
    const loadImage = async () => {
      try {
        const data = await storage.getMedia(imageId);
        setImageUrl(data);
      } catch (error) {
        console.error('Failed to load image:', error);
      }
    };
    loadImage();
  }, [imageId]);

  if (!imageUrl) return null;

  return (
    <img
      src={imageUrl}
      alt="Draft preview"
      className="w-full h-20 object-cover rounded"
    />
  );
}

export default function DraftList({ drafts, onEdit, onDelete, onPublish }: DraftListProps) {
  if (drafts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No drafts yet. Start creating content and save it as a draft!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {drafts.map((draft) => (
        <div key={draft.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-lg">{draft.title || 'Untitled Draft'}</h3>
              <p className="text-sm text-gray-600">{draft.category}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                icon={Edit2}
                onClick={() => onEdit(draft)}
              >
                Edit
              </Button>
              <Button
                variant="primary"
                icon={Send}
                onClick={() => onPublish(draft)}
              >
                Publish
              </Button>
              <Button
                variant="danger"
                icon={Trash2}
                onClick={() => onDelete(draft)}
              >
                Delete
              </Button>
            </div>
          </div>
          
          <p className="text-gray-700 mb-3">
            {draft.description || 'No description yet'}
          </p>
          
          {draft.images && draft.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mb-3">
              {draft.images.map((imageId) => (
                <DraftImage key={imageId} imageId={imageId} />
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Last edited: {new Date(draft.updatedAt).toLocaleString()}</span>
            <div className="flex gap-2">
              {draft.platforms.map((platform) => (
                <span
                  key={platform}
                  className="px-2 py-1 bg-gray-100 rounded text-xs capitalize"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}