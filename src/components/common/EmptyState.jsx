import React from 'react';
import { Link } from 'react-router-dom';

export default function EmptyState({ 
  icon = '📚', 
  title = 'No items found', 
  description = 'Try adjusting your search or filters.',
  actionText = 'Browse Books',
  actionLink = '/',
  showAction = true 
}) {
  return (
    <div className="text-center py-12" role="status" aria-live="polite">
      <div className="text-6xl mb-4" aria-hidden="true">{icon}</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-base-content/70 mb-6 max-w-md mx-auto">
        {description}
      </p>
      {showAction && (
        <Link to={actionLink} className="btn btn-primary">
          {actionText}
        </Link>
      )}
    </div>
  );
}