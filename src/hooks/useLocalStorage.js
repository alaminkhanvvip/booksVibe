import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export function useWishlist() {
  const [wishlist, setWishlist] = useLocalStorage('wishlist', []);

  const addToWishlist = (bookId) => {
    setWishlist(prev => prev.includes(bookId) ? prev : [...prev, bookId]);
  };

  const removeFromWishlist = (bookId) => {
    setWishlist(prev => prev.filter(id => id !== bookId));
  };

  const isInWishlist = (bookId) => {
    return wishlist.includes(bookId);
  };

  const toggleWishlist = (bookId) => {
    if (isInWishlist(bookId)) {
      removeFromWishlist(bookId);
    } else {
      addToWishlist(bookId);
    }
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    wishlistCount: wishlist.length
  };
}