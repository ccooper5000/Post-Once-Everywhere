import React from 'react';
import DraftsView from '../components/DraftsView';

export default function DraftsPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Content Drafts</h1>
        <a 
          href="#dashboard" 
          className="text-purple-600 hover:text-purple-700 flex items-center gap-2"
        >
          ← Back to Dashboard
        </a>
      </div>
      <DraftsView />
    </>
  );
}