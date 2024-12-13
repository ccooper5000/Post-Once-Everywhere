import React, { useState, useEffect } from 'react';
import { Post } from '../../types/social';
import { PostManagementService } from '../../services/postManagement';
import PostList from './PostList';
import Modal from '../shared/Modal';
import PostEditor from '../social/PostEditor';

export default function PostManagement() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const postManagementService = PostManagementService.getInstance();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const fetchedPosts = await postManagementService.getPosts();
    setPosts(fetchedPosts);
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (post: Post) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await postManagementService.deletePost(post.id);
      await loadPosts();
    }
  };

  const handleUpdate = async (content: PostContent) => {
    if (selectedPost) {
      await postManagementService.updatePost({
        id: selectedPost.id,
        ...content
      });
      setIsEditModalOpen(false);
      setSelectedPost(null);
      await loadPosts();
    }
  };

  return (
    <div>
      <PostList
        posts={posts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedPost(null);
        }}
        title="Edit Post"
      >
        {selectedPost && (
          <PostEditor
            category={selectedPost.category}
            initialContent={selectedPost}
            onPost={handleUpdate}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedPost(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}