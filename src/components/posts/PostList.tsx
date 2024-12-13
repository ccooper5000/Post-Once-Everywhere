import React from 'react';
import { Edit2, Trash2, Clock } from 'lucide-react';
import { Post } from '../../types/social';
import Button from '../shared/Button';

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
}

export default function PostList({ posts, onEdit, onDelete }: PostListProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-lg">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.category}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                icon={Edit2}
                onClick={() => onEdit(post)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                icon={Trash2}
                onClick={() => onDelete(post)}
              >
                Delete
              </Button>
            </div>
          </div>
          
          <p className="text-gray-700 mb-3">{post.description}</p>
          
          {post.images && post.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mb-3">
              {post.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-20 object-cover rounded"
                />
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              {post.status === 'scheduled' && post.scheduledFor && (
                <span className="text-purple-600">
                  Scheduled for {new Date(post.scheduledFor).toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {post.platforms.map((platform) => (
                <span
                  key={platform}
                  className="px-2 py-1 bg-gray-100 rounded text-xs capitalize"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}