import React, { useState, useEffect, useMemo } from 'react';
import BookCard from '../book/BookCard';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from '../common/EmptyState';

export default function Books() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('grid');

    useEffect(() => {
        fetch('./booksData.json')
            .then(response => response.json())
            .then(data => {
                setBooks(data);
                setFilteredBooks(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                setError('Failed to load books. Please try again.');
                setLoading(false);
            });
    }, []);

    const filteredAndSortedBooks = useMemo(() => {
        let filtered = books.filter(book => {
            const matchesSearch = book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        filtered.sort((a, b) => {
            let comparison = 0;
            switch (sortBy) {
                case 'name':
                    comparison = a.bookName.localeCompare(b.bookName);
                    break;
                case 'rating':
                    comparison = b.rating - a.rating;
                    break;
                case 'year':
                    comparison = b.yearOfPublishing - a.yearOfPublishing;
                    break;
                case 'pages':
                    comparison = a.totalPages - b.totalPages;
                    break;
                default:
                    return 0;
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return filtered;
    }, [books, searchTerm, selectedCategory, sortBy, sortOrder]);

    useEffect(() => {
        setFilteredBooks(filteredAndSortedBooks);
    }, [filteredAndSortedBooks]);

    const categories = ['All', ...new Set(books.map(book => book.category))];

    if (loading) {
        return <LoadingSpinner text="Loading books..." />;
    }

    if (error) {
        return (
            <div className="py-12">
                <EmptyState
                    icon="⚠️"
                    title="Error Loading Books"
                    description={error}
                    actionText="Refresh Page"
                    actionLink="/"
                />
            </div>
        );
    }

    return (
        <div id="books-section" className="py-12">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Our Book Collection</h2>
                <p className="text-lg text-base-content/70 mb-8">Discover your next favorite book from our curated collection</p>
                
                {/* Search and Filter Controls */}
                <div className="max-w-4xl mx-auto px-4 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                        <input
                            type="text"
                            placeholder="Search books, authors, or tags..."
                            className="input input-bordered w-full md:w-96"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select 
                            className="select select-bordered w-full md:w-48"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <select 
                            className="select select-bordered w-full md:w-48"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="name">Sort by Name</option>
                            <option value="rating">Sort by Rating</option>
                            <option value="year">Sort by Year</option>
                            <option value="pages">Sort by Pages</option>
                        </select>
                    </div>
                </div>
            </div>

            {filteredBooks.length > 0 ? (
                <>
                    <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto px-4">
                        <p className="text-lg font-semibold">
                            Showing {filteredBooks.length} of {books.length} books
                        </p>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline'}`}
                            >
                                Grid
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'}`}
                            >
                                List
                            </button>
                        </div>
                    </div>
                    <div className={`max-w-7xl mx-auto px-4 ${
                        viewMode === 'grid' 
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                            : 'space-y-4'
                    }`}>
                        {filteredBooks.map(book => (
                            <BookCard book={book} key={book.bookId} viewMode={viewMode} />
                        ))}
                    </div>
                </>
            ) : (
                <EmptyState
                    title="No books found"
                    description="Try adjusting your search or filters to find more books."
                    showAction={false}
                />
            )}
        </div>
    );
}
