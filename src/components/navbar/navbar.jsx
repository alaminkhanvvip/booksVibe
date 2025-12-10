import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <NavLink to="/" className="btn btn-ghost text-xl font-bold">
          📚 BooksVibe
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><NavLink to="/" className="btn btn-ghost">Home</NavLink></li>
          <li><NavLink to="/listed-books" className="btn btn-ghost">Listed Books</NavLink></li>
          <li><NavLink to="/wishlist" className="btn btn-ghost">Wishlist</NavLink></li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex gap-2">
          <NavLink to="/login" className="btn btn-outline btn-sm">
            Sign In
          </NavLink>
          <NavLink to="/signup" className="btn btn-primary btn-sm">
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
}
