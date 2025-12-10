import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl mb-4">📚</div>
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-lg text-base-content/70 mb-8 max-w-md">
          Oops! The page you're looking for seems to have wandered off into another chapter. 
          Let's get you back to the main story.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary btn-lg">
            🏠 Go Home
          </Link>
          <Link to="/wishlist" className="btn btn-outline btn-lg">
            ❤️ View Wishlist
          </Link>
        </div>
      </div>
    </div>
  )
}
