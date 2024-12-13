import React, { useState } from 'react';
import ServiceHighlight from './content/ServiceHighlight';
import CommunityOutreach from './content/CommunityOutreach';
import MemberSpotlight from './content/MemberSpotlight';

export default function ContentSuggestions() {
  const [expandedSection, setExpandedSection] = useState<string | null>('service');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Content Suggestions</h2>
        <span className="text-sm text-gray-500">Updated daily</span>
      </div>
      <div className="space-y-6">
        <ServiceHighlight 
          isExpanded={expandedSection === 'service'}
          onToggle={() => toggleSection('service')}
        />
        <CommunityOutreach 
          isExpanded={expandedSection === 'outreach'}
          onToggle={() => toggleSection('outreach')}
        />
        <MemberSpotlight 
          isExpanded={expandedSection === 'spotlight'}
          onToggle={() => toggleSection('spotlight')}
        />
      </div>
    </div>
  );
}