import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../book/BookCard';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from '../common/EmptyState';

export default function Wishlist() {
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      
      if (wishlist.length === 0) {
        setLoading(false);
        return;
      }

      fetch('./booksData.json')
      .then(response => response.json())
      .then(data => {
        const filteredBooks = data.filter(book => wishlist.includes(book.bookId));
        setWishlistBooks(filteredBooks);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      setLoading(false);
    }
  }, []);

  const clearWishlist = () => {
    if (!window.confirm('Are you sure you want to clear your entire wishlist?')) {
      return;
    }
    try {
      localStorage.removeItem('wishlist');
      setWishlistBooks([]);
    } catch (error) {
      console.error('Error clearing wishlist:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 py-8">
        <LoadingSpinner text="Loading your wishlist..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 page-transition">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">My Wishlist</h1>
          <p className="text-lg text-base-content/70">Books you want to read</p>
        </div>

        {wishlistBooks.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <p className="text-lg">
                {wishlistBooks.length} book{wishlistBooks.length !== 1 ? 's' : ''} in your wishlist
              </p>
              <button onClick={clearWishlist} className="btn btn-outline btn-error">
                Clear Wishlist
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistBooks.map(book => (
                <BookCard key={book.bookId} book={book} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState 
            icon="💔"
            title="Your wishlist is empty"
            description="Start adding books you want to read to your wishlist!"
            actionText="Browse Books"
            actionLink="/"
          />
        )}
      </div>
    </div>
  );
}