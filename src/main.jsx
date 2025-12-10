import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/root/root.jsx";
import ErrorPage from "./components/errorPage/errorPage.jsx";
import Home from "./components/home/home.jsx";
import ListedBooks from "./components/listedBooks/listedBooks.jsx";
import BookDetails from "./components/bookDetails/BookDetails.jsx";
import Wishlist from "./components/wishlist/Wishlist.jsx";
import Login from "./components/pages/Login.jsx";
import PagestoRead from "./components/PagestoRead/PagestoRead.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/listed-books",
        element: <ListedBooks />,
      },
      {
        path: "/signup",
        element: <Login />,
      },
      {
        path: "/book/:id",
        element: <BookDetails />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/reading-list",
        element: <PagestoRead />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
