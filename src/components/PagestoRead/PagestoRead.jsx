import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PagestoRead() {
  const [readingList, setReadingList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('./booksData.json')
      .then(response => response.json())
      .then(allBooks => {
        try {
          const savedReadingList = JSON.parse(localStorage.getItem('pagesToRead') || '[]');
          const readingBooks = allBooks.filter(book => savedReadingList.includes(book.bookId));
          setReadingList(readingBooks);
        } catch (error) {
          console.error('Error parsing reading list:', error);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">📖 My Reading List</h1>
        
        {readingList.length === 0 ? (
          <div className="text-center">
            <p className="text-lg mb-4">No books in your reading list yet</p>
            <Link to="/" className="btn btn-primary">Browse Books</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readingList.map((book) => (
              <div key={book.bookId} className="card bg-base-100 shadow-xl">
                <figure className="px-6 pt-6">
                  <img src={book.image} alt={book.bookName} className="rounded-xl h-48 w-full object-cover" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{book.bookName}</h2>
                  <p className="text-sm">by {book.author}</p>
                  <div className="card-actions justify-end">
                    <Link to={`/book/${book.bookId}`} className="btn btn-primary btn-sm">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}