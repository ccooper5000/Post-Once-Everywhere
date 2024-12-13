import React from 'react';
import { HandshakeIcon, MessageSquare } from 'lucide-react';

export default function CollaborationHub() {
  const churches = [
    {
      name: "Greater Faith Baptist",
      location: "Downtown",
      image: "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=100&h=100",
      status: "online"
    },
    {
      name: "Mount Zion AME",
      location: "Eastside",
      image: "https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=100&h=100",
      status: "offline"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Collaboration Hub</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          <HandshakeIcon size={20} />
          Connect New
        </button>
      </div>
      
      <div className="space-y-4">
        {churches.map((church, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={church.image} 
                  alt={church.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                  church.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`}></span>
              </div>
              <div>
                <h3 className="font-semibold">{church.name}</h3>
                <p className="text-sm text-gray-600">{church.location}</p>
              </div>
            </div>
            <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-full">
              <MessageSquare size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}