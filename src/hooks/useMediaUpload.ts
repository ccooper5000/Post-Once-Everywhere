import { useState, useEffect } from 'react';
import { saveMedia, deleteMedia } from '../services/storage/mediaStorage';

interface MediaFile {
  id: string;
  file: File;
  preview: string;
}

export function useMediaUpload() {
  const [images, setImages] = useState<MediaFile[]>([]);
  const [video, setVideo] = useState<MediaFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (files: FileList) => {
    setIsUploading(true);
    setError(null);
    
    try {
      const newImages = await Promise.all(
        Array.from(files).map(async (file) => {
          const id = await saveMedia(file);
          const preview = URL.createObjectURL(file);
          return { id, file, preview };
        })
      );

      setImages(prev => [...prev, ...newImages]);
    } catch (error) {
      console.error('Failed to process images:', error);
      setError('Failed to process images. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleVideoUpload = async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const id = await saveMedia(file);
      const preview = URL.createObjectURL(file);
      setVideo({ id, file, preview });
    } catch (error) {
      console.error('Failed to process video:', error);
      setError('Failed to process video. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageRemove = async (index: number) => {
    const image = images[index];
    if (image) {
      URL.revokeObjectURL(image.preview);
      await deleteMedia(image.id);
      setImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleVideoRemove = async () => {
    if (video) {
      URL.revokeObjectURL(video.preview);
      await deleteMedia(video.id);
      setVideo(null);
    }
  };

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.preview));
      if (video) URL.revokeObjectURL(video.preview);
    };
  }, []);

  return {
    images,
    video,
    isUploading,
    error,
    handleImageUpload,
    handleVideoUpload,
    handleImageRemove,
    handleVideoRemove
  };
}