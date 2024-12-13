import { Post, PostContent } from '../../types/social';

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export class SimpleStorage {
  private static instance: SimpleStorage;
  private readonly DRAFTS_KEY = 'church_social_drafts';
  private readonly MEDIA_KEY = 'church_social_media';

  private constructor() {
    // Initialize storage if empty
    if (!localStorage.getItem(this.DRAFTS_KEY)) {
      localStorage.setItem(this.DRAFTS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.MEDIA_KEY)) {
      localStorage.setItem(this.MEDIA_KEY, JSON.stringify({}));
    }
  }

  static getInstance(): SimpleStorage {
    if (!SimpleStorage.instance) {
      SimpleStorage.instance = new SimpleStorage();
    }
    return SimpleStorage.instance;
  }

  // Media Storage Methods
  async saveMedia(file: File): Promise<string> {
    try {
      const id = crypto.randomUUID();
      const base64Data = await fileToBase64(file);
      const mediaStore = JSON.parse(localStorage.getItem(this.MEDIA_KEY) || '{}');
      
      mediaStore[id] = {
        data: base64Data,
        type: file.type,
        name: file.name
      };
      
      localStorage.setItem(this.MEDIA_KEY, JSON.stringify(mediaStore));
      return id;
    } catch (error) {
      console.error('Failed to save media:', error);
      throw error;
    }
  }

  async getMedia(id: string): Promise<string | null> {
    try {
      const mediaStore = JSON.parse(localStorage.getItem(this.MEDIA_KEY) || '{}');
      return mediaStore[id]?.data || null;
    } catch (error) {
      console.error('Failed to get media:', error);
      return null;
    }
  }

  // Draft Storage Methods
  async saveDraft(content: PostContent): Promise<Post> {
    const drafts = JSON.parse(localStorage.getItem(this.DRAFTS_KEY) || '[]');
    const newDraft: Post = {
      ...content,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft'
    };
    
    drafts.push(newDraft);
    localStorage.setItem(this.DRAFTS_KEY, JSON.stringify(drafts));
    return newDraft;
  }

  async updateDraft(id: string, content: Partial<PostContent>): Promise<Post> {
    const drafts = JSON.parse(localStorage.getItem(this.DRAFTS_KEY) || '[]');
    const index = drafts.findIndex((draft: Post) => draft.id === id);
    
    if (index === -1) {
      throw new Error('Draft not found');
    }

    drafts[index] = {
      ...drafts[index],
      ...content,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(this.DRAFTS_KEY, JSON.stringify(drafts));
    return drafts[index];
  }

  async getDrafts(): Promise<Post[]> {
    return JSON.parse(localStorage.getItem(this.DRAFTS_KEY) || '[]');
  }

  async getDraftById(id: string): Promise<Post | undefined> {
    const drafts = JSON.parse(localStorage.getItem(this.DRAFTS_KEY) || '[]');
    return drafts.find((draft: Post) => draft.id === id);
  }

  async deleteDraft(id: string): Promise<void> {
    const drafts = JSON.parse(localStorage.getItem(this.DRAFTS_KEY) || '[]');
    const filteredDrafts = drafts.filter((draft: Post) => draft.id !== id);
    localStorage.setItem(this.DRAFTS_KEY, JSON.stringify(filteredDrafts));
  }

  // Clear all data (useful for testing)
  clearAll(): void {
    localStorage.removeItem(this.DRAFTS_KEY);
    localStorage.removeItem(this.MEDIA_KEY);
    this.constructor();
  }
}