import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const BookCard = React.memo(function BookCard({ book, viewMode = 'grid' }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(() => {
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      return wishlist.includes(book.bookId);
    } catch {
      return false;
    }
  });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">☆</span>);
    }
    
    return stars;
  };

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      
      if (isWishlisted) {
        const newWishlist = wishlist.filter(id => id !== book.bookId);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      } else {
        wishlist.push(book.bookId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
      }
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/20">
        <div className="card-body p-4">
          <div className="flex gap-4">
            <figure className="relative overflow-hidden rounded-lg flex-shrink-0">
              {!imageLoaded && !imageError && (
                <div className="w-16 h-20 bg-base-200 animate-pulse flex items-center justify-center">
                  <span className="loading loading-spinner loading-sm"></span>
                </div>
              )}
              {imageError ? (
                <div className="w-16 h-20 bg-base-200 flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
              ) : (
                <img
                  src={book.image}
                  alt={book.bookName}
                  className={`w-16 h-20 object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              )}
            </figure>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg line-clamp-1">{book.bookName}</h3>
                  <p className="text-sm text-base-content/70">by {book.author}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="badge badge-primary badge-sm">{book.category}</div>
                  <span className="text-xs text-base-content/60">{book.yearOfPublishing}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-sm">{renderStars(book.rating)}</div>
                <span className="text-sm font-semibold">({book.rating})</span>
              </div>
              
              <p className="text-sm text-base-content/80 line-clamp-2 mb-3">
                {book.review?.substring(0, 150) || 'No review available'}...
              </p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-xs text-base-content/60">
                  <span>📄 {book.totalPages} pages</span>
                  <span>🏢 {book.publisher}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleWishlist}
                    className={`btn btn-sm btn-circle ${isWishlisted ? 'btn-error' : 'btn-outline'}`}
                    title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    {isWishlisted ? '💔' : '❤️'}
                  </button>
                  <Link to={`/book/${book.bookId}`} className="btn btn-primary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <figure className="px-4 pt-4">
        {!imageLoaded && !imageError && (
          <div className="h-64 bg-base-200 animate-pulse flex items-center justify-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        )}
        {imageError ? (
          <div className="h-64 bg-base-200 flex items-center justify-center">
            <span className="text-4xl">📚</span>
          </div>
        ) : (
          <img
            src={book.image}
            alt={book.bookName}
            className={`rounded-xl h-64 w-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-bold line-clamp-2">{book.bookName}</h2>
        <p className="text-base-content/70">by {book.author}</p>
        <div className="flex items-center gap-2 mb-2">
          <div className="rating rating-sm">
            {[...Array(5)].map((_, i) => (
              <input
                key={i}
                type="radio"
                name={`rating-${book.bookId}`}
                className="mask mask-star-2 bg-orange-400"
                checked={i < Math.floor(book.rating)}
                readOnly
              />
            ))}
          </div>
          <span className="text-sm font-semibold">({book.rating})</span>
        </div>
        <div className="card-actions justify-end">
          <Link to={`/book/${book.bookId}`}>
            <button className="btn btn-primary">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  )
});

export default BookCard;