import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/navbar.jsx';
import Footer from '../footer/footer.jsx';

export default function Root() {
  return (
    <div className="w-full">
      <Navbar />
      <main className="w-full min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
