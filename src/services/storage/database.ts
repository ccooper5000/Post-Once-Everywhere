import { openDB, IDBPDatabase } from 'idb';

export const DB_NAME = 'churchSocialConnect';
export const DB_VERSION = 1;
export const STORES = {
  DRAFTS: 'drafts',
  POSTS: 'posts',
  MEDIA: 'media'
} as const;

let db: IDBPDatabase | null = null;

export async function initDatabase(): Promise<IDBPDatabase> {
  if (db) return db;

  console.log('Initializing database...');

  try {
    db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(database, oldVersion, newVersion, transaction) {
        console.log('Running database upgrade...');
        
        // Create stores if they don't exist
        if (!database.objectStoreNames.contains(STORES.DRAFTS)) {
          database.createObjectStore(STORES.DRAFTS, { keyPath: 'id' });
        }
        if (!database.objectStoreNames.contains(STORES.POSTS)) {
          database.createObjectStore(STORES.POSTS, { keyPath: 'id' });
        }
        if (!database.objectStoreNames.contains(STORES.MEDIA)) {
          database.createObjectStore(STORES.MEDIA, { keyPath: 'id' });
        }

        console.log('Database upgrade complete');
      },
      blocked() {
        console.warn('Database upgrade blocked');
        db = null;
      },
      blocking() {
        console.warn('Database blocking upgrade');
      },
      terminated() {
        console.error('Database connection terminated');
        db = null;
      }
    });

    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    db = null;
    throw error;
  }
}

export async function getDatabase(): Promise<IDBPDatabase> {
  if (!db) {
    db = await initDatabase();
  }
  return db;
}

// Initialize database when the module loads
initDatabase().catch(console.error);