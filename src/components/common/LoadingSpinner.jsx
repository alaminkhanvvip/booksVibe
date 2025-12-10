import React from 'react';

export default function LoadingSpinner({ size = 'lg', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg',
    xl: 'loading-xl'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <span className={`loading loading-spinner ${sizeClasses[size] || sizeClasses.lg} mb-4`}></span>
      <p className="text-base-content/70">{text}</p>
    </div>
  );
}