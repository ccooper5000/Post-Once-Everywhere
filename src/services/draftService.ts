import { Post, PostContent } from '../types/social';
import { SimpleStorage } from './storage/simpleStorage';

export class DraftService {
  private static instance: DraftService;
  private storage: SimpleStorage;

  private constructor() {
    this.storage = SimpleStorage.getInstance();
  }

  static getInstance(): DraftService {
    if (!DraftService.instance) {
      DraftService.instance = new DraftService();
    }
    return DraftService.instance;
  }

  async saveDraft(content: PostContent): Promise<Post> {
    return this.storage.saveDraft(content);
  }

  async getDrafts(): Promise<Post[]> {
    return this.storage.getDrafts();
  }

  async getDraftById(id: string): Promise<Post | undefined> {
    return this.storage.getDraftById(id);
  }

  async updateDraft(id: string, content: Partial<PostContent>): Promise<Post> {
    return this.storage.updateDraft(id, content);
  }

  async deleteDraft(id: string): Promise<void> {
    return this.storage.deleteDraft(id);
  }

  async publishDraft(id: string): Promise<Post> {
    const draft = await this.getDraftById(id);
    if (!draft) {
      throw new Error('Draft not found');
    }

    const publishedDraft = {
      ...draft,
      status: 'published' as const,
      updatedAt: new Date().toISOString()
    };

    await this.deleteDraft(id);
    return publishedDraft;
  }
}