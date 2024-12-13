import { Post } from '../../types/social';
import { getDatabase } from './database';

export async function saveDraft(draft: Post): Promise<void> {
  const db = await getDatabase();
  await db.put('drafts', draft);
}

export async function getDraft(id: string): Promise<Post | undefined> {
  const db = await getDatabase();
  return db.get('drafts', id);
}

export async function getAllDrafts(): Promise<Post[]> {
  const db = await getDatabase();
  return db.getAll('drafts');
}

export async function deleteDraft(id: string): Promise<void> {
  const db = await getDatabase();
  await db.delete('drafts', id);
}