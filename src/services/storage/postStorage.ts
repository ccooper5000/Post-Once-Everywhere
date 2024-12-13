import { Post } from '../../types/social';
import { getDatabase } from './database';

export async function savePost(post: Post): Promise<void> {
  const db = await getDatabase();
  await db.put('posts', post);
}

export async function getPost(id: string): Promise<Post | undefined> {
  const db = await getDatabase();
  return db.get('posts', id);
}

export async function getAllPosts(): Promise<Post[]> {
  const db = await getDatabase();
  return db.getAll('posts');
}

export async function deletePost(id: string): Promise<void> {
  const db = await getDatabase();
  await db.delete('posts', id);
}