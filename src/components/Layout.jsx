import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between flex-wrap">
            <div className="flex items-center flex-shrink-0 mr-6">
              <Link to="/" className="text-xl font-bold text-primary-600 hover:text-primary-700">
                📊 Google Sheets CRUD
              </Link>
            </div>
            
            <div className="flex gap-4 items-center">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === '/' 
                    ? 'bg-primary-100 text-primary-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/create" 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === '/create' 
                    ? 'bg-primary-100 text-primary-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Create
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>© 2024 Google Sheets CRUD App. Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
