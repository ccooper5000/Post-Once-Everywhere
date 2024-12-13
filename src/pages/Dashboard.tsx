import React from 'react';
import SocialStats from '../components/SocialStats';
import ContentSuggestions from '../components/ContentSuggestions';

export default function Dashboard() {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome, Pastor Johnson</h1>
      <SocialStats />
      <div className="max-w-4xl mx-auto">
        <ContentSuggestions />
      </div>
    </>
  );
}