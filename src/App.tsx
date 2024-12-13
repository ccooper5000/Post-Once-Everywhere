import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import DraftsPage from './pages/DraftsPage';
import { SimpleStorage } from './services/storage/simpleStorage';

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'drafts'>('dashboard');

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash === 'drafts' ? 'drafts' : 'dashboard');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Handle initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header currentPage={currentPage} />
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'dashboard' ? <Dashboard /> : <DraftsPage />}
      </main>
    </div>
  );
}

export default App;