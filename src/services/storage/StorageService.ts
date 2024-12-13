import { openDB, IDBPDatabase } from 'idb';
import { Post } from '../../types/social';

interface StorageServiceInterface {
  init(): Promise<void>;
  save(storeName: string, data: any): Promise<void>;
  get(storeName: string, id: string): Promise<any>;
  getAll(storeName: string): Promise<any[]>;
  delete(storeName: string, id: string): Promise<void>;
  clear(storeName: string): Promise<void>;
  saveMedia(file: File): Promise<string>;
  getMedia(id: string): Promise<Blob | null>;
}

export class IndexedDBStorage implements StorageServiceInterface {
  private db: IDBPDatabase | null = null;
  private static instance: IndexedDBStorage;
  private initialized: boolean = false;

  private constructor() {}

  static getInstance(): IndexedDBStorage {
    if (!IndexedDBStorage.instance) {
      IndexedDBStorage.instance = new IndexedDBStorage();
    }
    return IndexedDBStorage.instance;
  }

  async init(): Promise<void> {
    if (this.initialized) return;

    this.db = await openDB('churchSocialConnect', 1, {
      upgrade(db) {
        // Create stores if they don't exist
        if (!db.objectStoreNames.contains('drafts')) {
          db.createObjectStore('drafts', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('posts')) {
          db.createObjectStore('posts', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('media')) {
          db.createObjectStore('media', { keyPath: 'id' });
        }
      },
    });

    this.initialized = true;
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.init();
    }
  }

  async save(storeName: string, data: Post): Promise<void> {
    await this.ensureInitialized();
    await this.db!.put(storeName, data);
  }

  async get(storeName: string, id: string): Promise<Post | undefined> {
    await this.ensureInitialized();
    return this.db!.get(storeName, id);
  }

  async getAll(storeName: string): Promise<Post[]> {
    await this.ensureInitialized();
    return this.db!.getAll(storeName);
  }

  async delete(storeName: string, id: string): Promise<void> {
    await this.ensureInitialized();
    await this.db!.delete(storeName, id);
  }

  async clear(storeName: string): Promise<void> {
    await this.ensureInitialized();
    await this.db!.clear(storeName);
  }

  async saveMedia(file: File): Promise<string> {
    await this.ensureInitialized();
    
    // Convert File to ArrayBuffer for storage
    const buffer = await file.arrayBuffer();
    const id = crypto.randomUUID();
    
    await this.db!.put('media', {
      id,
      data: buffer,
      type: file.type,
      name: file.name
    });
    
    return id;
  }

  async getMedia(id: string): Promise<Blob | null> {
    await this.ensureInitialized();
    const media = await this.db!.get('media', id);
    if (!media) return null;
    
    return new Blob([media.data], { type: media.type });
  }
}