import React from 'react';
import Hero from '../hero/hero';
import Books from '../books/Books';

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Books />
    </div>
  );
}
