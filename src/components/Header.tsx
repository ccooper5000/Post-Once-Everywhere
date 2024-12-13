import React from 'react';
import { Church, FileText } from 'lucide-react';
import Button from './shared/Button';

interface HeaderProps {
  currentPage: 'dashboard' | 'drafts';
}

export default function Header({ currentPage }: HeaderProps) {
  return (
    <header className="bg-purple-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Church size={32} />
          <h1 className="text-2xl font-bold">Church Social Connect</h1>
        </div>
        <nav className="flex items-center gap-4">
          <a 
            href="#dashboard" 
            className={`hover:text-purple-200 ${currentPage === 'dashboard' ? 'text-purple-200' : ''}`}
          >
            Dashboard
          </a>
          <a 
            href="#analytics" 
            className="hover:text-purple-200"
          >
            Analytics
          </a>
          <Button
            variant="secondary"
            icon={FileText}
            className={`${
              currentPage === 'drafts' 
                ? 'bg-purple-700 text-white hover:bg-purple-800' 
                : 'bg-white text-purple-900 hover:bg-purple-50'
            }`}
            onClick={() => window.location.hash = '#drafts'}
          >
            Drafts
          </Button>
        </nav>
      </div>
    </header>
  );
}