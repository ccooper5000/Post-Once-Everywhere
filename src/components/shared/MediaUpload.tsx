import React from 'react';
import { Image as ImageIcon, Video as VideoIcon, X } from 'lucide-react';
import Button from './Button';

interface MediaFile {
  id: string;
  file: File;
  preview: string;
}

interface MediaUploadProps {
  images: MediaFile[];
  video: MediaFile | null;
  onImageUpload: (files: FileList) => void;
  onVideoUpload: (file: File) => void;
  onImageRemove: (index: number) => void;
  onVideoRemove: () => void;
}

export default function MediaUpload({
  images,
  video,
  onImageUpload,
  onVideoUpload,
  onImageRemove,
  onVideoRemove
}: MediaUploadProps) {
  return (
    <div className="space-y-4">
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {images.map((image, index) => (
            <div key={image.id} className="relative group">
              <img
                src={image.preview}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => onImageRemove(index)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {video && (
        <div>
          <video
            src={video.preview}
            controls
            className="w-full rounded-lg"
          />
          <Button
            variant="danger"
            onClick={onVideoRemove}
            className="mt-2"
          >
            Remove Video
          </Button>
        </div>
      )}

      <div className="flex gap-4">
        <label className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
          <ImageIcon size={20} />
          <span>Add Images</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && onImageUpload(e.target.files)}
            className="hidden"
          />
        </label>
        <label className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
          <VideoIcon size={20} />
          <span>Add Video</span>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => e.target.files?.[0] && onVideoUpload(e.target.files[0])}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}