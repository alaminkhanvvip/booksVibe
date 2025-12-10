import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/navbar.jsx';
import Footer from '../footer/footer.jsx';

export default function Root() {
  return (
    <>
      <Navbar />
      <main className="container min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
