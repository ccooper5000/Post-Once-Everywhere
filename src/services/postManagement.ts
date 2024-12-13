import { Post, PostContent, PostUpdateContent } from '../types/social';

export class PostManagementService {
  private static instance: PostManagementService;
  private posts: Map<string, Post> = new Map();

  private constructor() {}

  static getInstance(): PostManagementService {
    if (!PostManagementService.instance) {
      PostManagementService.instance = new PostManagementService();
    }
    return PostManagementService.instance;
  }

  async getPosts(): Promise<Post[]> {
    return Array.from(this.posts.values());
  }

  async getPostById(id: string): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async createPost(content: PostContent): Promise<Post> {
    const post: Post = {
      ...content,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'published'
    };
    this.posts.set(post.id, post);
    return post;
  }

  async updatePost(content: PostUpdateContent): Promise<Post> {
    const post = this.posts.get(content.id);
    if (!post) {
      throw new Error('Post not found');
    }

    const updatedPost: Post = {
      ...post,
      ...content,
      updatedAt: new Date().toISOString()
    };
    this.posts.set(updatedPost.id, updatedPost);
    return updatedPost;
  }

  async deletePost(id: string): Promise<boolean> {
    return this.posts.delete(id);
  }
}