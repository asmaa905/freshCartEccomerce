import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Home from "./components/Home/Home";
import MainCategories from "./components/Categories/MainCategories/MainCategories";
import Layout from "./components/Layouts/Layout/Layout";
import Products from "./components/Products/Products";
import Details from "./components/Details/Details";
import Cart from "./components/Cart/Cart";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Brands from "./components/Brands/Brands";
import UserContextProvider from "./Context/UserContext";
import ProtectedRouting from "./components/ProtectedRouting/ProtectedRouting";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

import CartContextProvider from "./Context/CartContext";
import Payment from "./components/Payment/Payment";
import AllOrders from "./components/AllOrders/AllOrders";
import WishList from "./components/wishList/wishList";
import WishListContextProvider from "./Context/WishListContext";
import NotFound from "./components/NotFound/NotFound";
import SubCategories from "./components/Categories/SubCategories/SubCategories";
let query = new QueryClient();

// Route configuration
const router = createBrowserRouter(
  [
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRouting>
              <Home />
            </ProtectedRouting>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRouting>
              <Products />
            </ProtectedRouting>
          ),
        },
        {
          path: "products/category/:name",
          element: (
            <ProtectedRouting>
              <Products />
            </ProtectedRouting>
          ),
        },
        ,
        {
          path: "products/brand/:name",
          element: (
            <ProtectedRouting>
              <Products />
            </ProtectedRouting>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRouting>
              <Cart />
            </ProtectedRouting>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRouting>
              <WishList />
            </ProtectedRouting>
          ),
        },
        { path: "auth/login", element: <Login /> },
        { path: "auth/enter-email", element: <Login /> },
        { path: "auth/verify-code", element: <Login /> },
        { path: "auth/create-new-password", element: <Login /> },

        { path: "auth/register", element: <Register /> },
        {
          path: "brands",
          element: (
            <ProtectedRouting>
              <Brands />
            </ProtectedRouting>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRouting>
              <MainCategories />
            </ProtectedRouting>
          ),
        },
        {
          path: "/categories/:catId/:catName/subcategories",
          element: (
            <ProtectedRouting>
              <SubCategories />
            </ProtectedRouting>
          ),
        },
        {
          path: "productDetails/:id/:catName",
          element: (
            <ProtectedRouting>
              <Details />
            </ProtectedRouting>
          ),
        },
        {
          path: "payment",
          element: (
            <ProtectedRouting>
              <Payment />
            </ProtectedRouting>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRouting>
              <AllOrders />
            </ProtectedRouting>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

function App() {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <WishListContextProvider>
          <QueryClientProvider client={query}>
            <RouterProvider router={router}></RouterProvider>
            <ToastContainer theme="colored" autoClose="1000" />

            <ReactQueryDevtools />
          </QueryClientProvider>
        </WishListContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
