import React from 'react';
import { Image, MessageCircle, Heart } from 'lucide-react';
import { ServiceHighlightData } from '../../types/service';
import { useServiceHighlightData } from '../../hooks/useServiceHighlightData';

export default function ServiceHighlightDetails() {
  const highlights = useServiceHighlightData();

  return (
    <div className="mt-4 space-y-4">
      <div>
        <h4 className="font-semibold text-lg">{highlights.title}</h4>
        <p className="text-gray-600">{highlights.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {highlights.images.map((image, index) => (
          <div key={index} className="relative group">
            <img 
              src={image} 
              alt={`Service moment ${index + 1}`}
              className="rounded-lg w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg">
              <button className="absolute top-2 right-2 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all">
                <Image size={16} className="text-purple-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-semibold mb-2">Key Messages</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          {highlights.keyPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <MessageCircle size={18} className="text-purple-600" />
            <span className="text-sm">{highlights.engagement.comments} Comments</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart size={18} className="text-purple-600" />
            <span className="text-sm">{highlights.engagement.reactions} Reactions</span>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          <span>{highlights.engagement.attendance} in-person</span>
          <span className="mx-2">•</span>
          <span>{highlights.engagement.online} online</span>
        </div>
      </div>
    </div>
  );
}