import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="./src/assets/books.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
          alt="Books collection"
        />
        <div>
          <h1 className="text-5xl font-bold">Books to freshen up your bookshelf</h1>
          <p className="py-6">Discover amazing books from our curated collection. Find your next favorite read and track your reading journey.</p>
          <a href="#books-section" className="btn btn-primary">View The Collection</a>
        </div>
      </div>
    </div>
  );
}
