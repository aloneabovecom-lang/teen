import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DocsPage from './pages/DocsPage';

export default function App() {
  const [page, setPage] = useState<'home' | 'docs'>('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const navigate = (p: 'home' | 'docs') => {
    setPage(p);
  };

  return (
    <div className="min-h-screen bg-[#080808] noise-bg">
      <Navbar activePage={page} onNavigate={navigate} />

      <div className="transition-opacity duration-300">
        {page === 'home' ? (
          <HomePage onNavigate={navigate} />
        ) : (
          <DocsPage />
        )}
      </div>

      <Footer onNavigate={navigate} />
    </div>
  );
}
