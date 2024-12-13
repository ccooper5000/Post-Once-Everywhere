// Add to existing types
export interface Post extends PostContent {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'scheduled';
  scheduledFor?: string;
}

export interface PostUpdateContent extends Partial<PostContent> {
  id: string;
}