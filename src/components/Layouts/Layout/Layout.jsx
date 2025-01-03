import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
// Component to dynamically update the document title
function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const routeToTitleMap = {
      "/": "Home",
      "/products": "Products",
      "/cart": "Shopping Cart",
      "/wishlist": "Wish List",
      "/register": "Register",
      "/login": "Login",
      "/enter-email": "Forget Password",
      "/verify-code": "Verify Code",
      "/create-new-password": "Create New Password",
      "/brands": "Brands",
      "/categories": "Categories",
      "/productDetails": "Product Details",
      "/allorders": "All Orders",
      "/subcategories": "subcategories",
    };
    const currentPath =
      location.pathname.split("/")[location.pathname.split("/").length - 1];

    document.title = `Fresh Cart | ${routeToTitleMap[`/${currentPath}`] || ""}`;
  }, [location]);

  return null;
}
function Layout({ children }) {
  return (
    <>
      <TitleUpdater />
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
