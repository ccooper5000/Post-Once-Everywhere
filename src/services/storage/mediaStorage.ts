import { getDatabase, STORES } from './database';

export async function saveMedia(file: File): Promise<string> {
  try {
    const db = await getDatabase();
    
    // Convert File to ArrayBuffer
    const buffer = await file.arrayBuffer();
    const id = crypto.randomUUID();
    
    const mediaObject = {
      id,
      data: buffer,
      type: file.type,
      name: file.name,
      size: file.size,
      createdAt: new Date().toISOString()
    };
    
    await db.put(STORES.MEDIA, mediaObject);
    console.log('Media saved successfully:', id);
    return id;
  } catch (error) {
    console.error('Failed to save media:', error);
    throw error;
  }
}

export async function getMedia(id: string): Promise<string | null> {
  try {
    const db = await getDatabase();
    const media = await db.get(STORES.MEDIA, id);
    
    if (!media) {
      console.log('Media not found:', id);
      return null;
    }
    
    const blob = new Blob([media.data], { type: media.type });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Failed to get media:', error);
    return null;
  }
}

export async function deleteMedia(id: string): Promise<void> {
  try {
    const db = await getDatabase();
    await db.delete(STORES.MEDIA, id);
    console.log('Media deleted successfully:', id);
  } catch (error) {
    console.error('Failed to delete media:', error);
    throw error;
  }
}