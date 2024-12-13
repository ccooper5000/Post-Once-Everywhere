import React, { useState, useEffect } from 'react';
import { List, Grid, Calendar, Search } from 'lucide-react';
import { DraftService } from '../services/draftService';
import { Post } from '../types/social';
import DraftList from './posts/DraftList';
import Button from './shared/Button';
import Modal from './shared/Modal';
import PostEditor from './social/PostEditor';

export default function DraftsView() {
  const [drafts, setDrafts] = useState<Post[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'category' | 'platform'>('date');
  const [selectedDraft, setSelectedDraft] = useState<Post | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const draftService = DraftService.getInstance();

  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = async () => {
    const fetchedDrafts = await draftService.getDrafts();
    setDrafts(fetchedDrafts);
  };

  const handleEdit = (draft: Post) => {
    setSelectedDraft(draft);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (content: PostContent) => {
    if (selectedDraft) {
      await draftService.updateDraft(selectedDraft.id, content);
      setIsEditModalOpen(false);
      setSelectedDraft(null);
      await loadDrafts();
    }
  };

  const filteredDrafts = drafts
    .filter(draft => {
      const matchesSearch = 
        draft.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        draft.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || draft.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'category':
          return (a.category || '').localeCompare(b.category || '');
        case 'platform':
          return (a.platforms[0] || '').localeCompare(b.platforms[0] || '');
        default:
          return 0;
      }
    });

  const categories = ['all', ...new Set(drafts.map(draft => draft.category))];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Drafts</h2>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'list' ? 'primary' : 'secondary'}
            icon={List}
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'secondary'}
            icon={Grid}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search drafts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex gap-4">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'category' | 'platform')}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="date">Sort by Date</option>
            <option value="category">Sort by Category</option>
            <option value="platform">Sort by Platform</option>
          </select>
        </div>
      </div>

      {drafts.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Drafts Yet</h3>
          <p className="text-gray-600">
            Start creating content and save it as a draft to see it here.
          </p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
          <DraftList
            drafts={filteredDrafts}
            onEdit={handleEdit}
            onDelete={async (draft) => {
              if (window.confirm('Are you sure you want to delete this draft?')) {
                await draftService.deleteDraft(draft.id);
                await loadDrafts();
              }
            }}
            onPublish={async (draft) => {
              if (window.confirm('Are you ready to publish this draft?')) {
                await draftService.publishDraft(draft.id);
                await loadDrafts();
              }
            }}
          />
        </div>
      )}

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedDraft(null);
        }}
        title="Edit Draft"
      >
        {selectedDraft && (
          <PostEditor
            category={selectedDraft.category}
            initialContent={selectedDraft}
            onPost={handleUpdate}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedDraft(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}