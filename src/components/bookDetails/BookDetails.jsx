import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    fetch('/booksData.json')
      .then((response) => response.json())
      .then((data) => {
        const foundBook = data.find((b) => b.bookId === parseInt(id));
        setBook(foundBook);
        setLoading(false);

        try {
          const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
          setIsWishlisted(wishlist.includes(parseInt(id)));
          
          const readingList = JSON.parse(localStorage.getItem('pagesToRead') || '[]');
          setIsReading(readingList.includes(parseInt(id)));
        } catch (error) {
          console.error('Error accessing localStorage:', error);
        }
      })
      .catch((error) => {
        console.error('Error fetching book:', error);
        setLoading(false);
      });
  }, [id]);

  const toggleWishlist = () => {
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const bookId = parseInt(id);

      if (isWishlisted) {
        const newWishlist = wishlist.filter((id) => id !== bookId);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      } else {
        wishlist.push(bookId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
      }
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handleReadNow = () => {
    try {
      const readingList = JSON.parse(localStorage.getItem('pagesToRead') || '[]');
      const bookId = parseInt(id);
      
      if (!readingList.includes(bookId)) {
        readingList.push(bookId);
        localStorage.setItem('pagesToRead', JSON.stringify(readingList));
        setIsReading(true);
      }
    } catch (error) {
      console.error('Error updating reading list:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 py-8">
        <LoadingSpinner text="Loading book details..." />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Book Not Found</h1>
          <Link
            to="/"
            className="btn btn-primary"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 page-transition">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <Link
            to="/"
            className="btn btn-outline"
          >
            ← Back to Books
          </Link>
        </div>

        <div className="card bg-base-100 shadow-2xl max-w-4xl mx-auto">
          <div className="md:flex ">
            <figure className="relative overflow-hidden md:w-1/3 p-6">
              <img
                src={book.image}
                alt={book.bookName}
                className="h-80 w-full object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
              />
            </figure>

            <div className="md:w-2/3 p-6">
              <h1 className="text-4xl font-bold mb-4">{book.bookName}</h1>
              <p className="text-xl text-base-content/70 mb-6">
                by {book.author}
              </p>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag, index) => (
                    <span key={index} className="badge badge-outline">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-base-content/80 leading-relaxed mb-6">
                <span className="font-bold">Review:</span> {book.review}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-primary">📄</span>
                  <span><strong>{book.totalPages}</strong> pages</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">🏢</span>
                  <span>{book.publisher}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">📅</span>
                  <span>{book.yearOfPublishing}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">⭐</span>
                  <span><strong>{book.rating}</strong>/5</span>
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <button
                  onClick={toggleWishlist}
                  className={`btn ${isWishlisted ? 'btn-primary' : 'btn-outline'}`}
                >
                  {isWishlisted
                    ? '💔 Remove from Wishlist'
                    : '❤️ Add to Wishlist'}
                </button>
                <button 
                  onClick={handleReadNow}
                  className={`btn ${isReading ? 'btn-success' : 'btn-outline btn-success'}`}
                  disabled={isReading}
                >
                  📖 {isReading ? 'Added to Reading List' : 'Read Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
