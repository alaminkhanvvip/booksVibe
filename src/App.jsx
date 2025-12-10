import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/navbar.jsx';
import Footer from './components/footer/footer.jsx';

function App() {
  return (
    <div className="w-full">
      <Navbar />
      <main className="min-h-screen w-full justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
