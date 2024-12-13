import React from 'react';
import { Users, MessageCircle, Share2 } from 'lucide-react';

export default function SocialStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <Users className="text-purple-600" />
          <h3 className="font-semibold">Total Reach</h3>
        </div>
        <p className="text-3xl font-bold text-purple-900">2,547</p>
        <p className="text-sm text-gray-600">+15% from last week</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <MessageCircle className="text-purple-600" />
          <h3 className="font-semibold">Engagement</h3>
        </div>
        <p className="text-3xl font-bold text-purple-900">487</p>
        <p className="text-sm text-gray-600">Comments & Reactions</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <Share2 className="text-purple-600" />
          <h3 className="font-semibold">Shares</h3>
        </div>
        <p className="text-3xl font-bold text-purple-900">156</p>
        <p className="text-sm text-gray-600">Member Shares</p>
      </div>
    </div>
  );
}