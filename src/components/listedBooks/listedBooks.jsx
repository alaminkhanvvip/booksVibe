import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../hooks/useLocalStorage';

export default function ListedBooks() {
  const { wishlistCount } = useWishlist();

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Listed Books</h1>
          <p className="text-lg text-base-content/70">Track your reading progress and explore book statistics</p>
        </div>

        {/* Quick Actions */}
        <div className="card bg-base-100 shadow-xl p-6">
          <h3 className="text-xl font-bold mb-4">🚀 Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link to="/reading-list" className="btn btn-primary">
              Read Books
            </Link>
            <Link to="/wishlist" className="btn btn-outline">
              View Wishlist ({wishlistCount})
            </Link>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn btn-outline"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}