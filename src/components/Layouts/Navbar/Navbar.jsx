import React, { useContext, useEffect, useState } from "react";
import Logo from "../../../assets/images/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";
import { cartContext } from "../../../Context/CartContext";

export default function Navbar() {
  let { UserLogin, setUserLogin, counter } = useContext(UserContext);
  const [openNav, setOpenNav] = useState(false);
  const { getCartProducts, numOfCartItems } = useContext(cartContext);

  let navigate = useNavigate();
  function toggleMenu() {
    if (openNav == true) setOpenNav(false);
    else {
      setOpenNav(true);
    }
  }
  function logOut() {
    setUserLogin(null);
    localStorage.removeItem("userToken");
    navigate("/auth/login");
  }
  useEffect(() => {
    getCartProducts();
  }, []);
  return (
    <>
      <nav className="bg-[#f6f9f7] text-[#1e1d1dcc] pt-[10px] pb-[5px] fixed w-full z-[9999] top-0">
        <div className="container py-[0.5rem]">
          <div className="content flex justify-between items-center  flex-wrap">
            <div className="logo  md:w-4/12  no-underline	">
              <img src={Logo} alt="logo" />
            </div>
            <div
              className={`${
                openNav == false ? "ml-[auto]" : ""
              } icon-menu-sec cursor-pointer`}
            >
              <button
                style={{
                  borderColor: "rgba(0, 0, 0, 0.15)",
                }}
                onClick={toggleMenu}
                className="flex lg:hidden py-[0.25rem] px-[0.75rem] rounded-[0.375rem] border border-[#fff6]  transition-all  outline-none"
              >
                <i
                  className={`${
                    openNav == true ? "fa-xmark" : "fa-bars"
                  } fa-solid  icon-menu text-[#000000a6] text-[calc(1.275rem+.3vw)]  font-[900]`}
                ></i>
              </button>
            </div>
            <ul
              className={`${
                openNav == true ? "block" : "hidden"
              } menu lg:flex w-full lg:w-8/12 pl-0 lg:pl-[30px]`}
            >
              {UserLogin ? (
                <>
                  <li className="mr-[10px] block py-[5px]">
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li className="mr-[10px] block py-[5px]">
                    <NavLink to="/cart">Cart</NavLink>
                  </li>
                  <li className="mr-[10px] block py-[5px]">
                    <NavLink to="/wishlist">wish list</NavLink>
                  </li>
                  <li className="mr-[10px] block py-[5px]">
                    <NavLink to="/products">Products</NavLink>
                  </li>
                  <li className="mr-[10px] block py-[5px]">
                    <NavLink to="/categories">Categories</NavLink>
                  </li>
                  <li className="mr-[10px] block py-[5px]">
                    <NavLink to="/brands">Brands</NavLink>
                  </li>
                </>
              ) : null}
              {UserLogin ? (
                <li className="socail ml-auto  block text-center lg:text-left pt-[10px]">
                  <NavLink className="relative" to="/cart">
                    <i className="fa-solid fa-cart-shopping text-[25px] text-gray-800"></i>
                    <span className="badge absolute top-[-12px] right-[-16px] w-[20px] h-[20px] rounded-[0.375rem] text-white bg-[#4fa74f] text-center text-[13px]">
                      {numOfCartItems}
                    </span>
                  </NavLink>
                </li>
              ) : null}
              <li
                className={
                  !UserLogin
                    ? "ml-auto login-signout pl-0 md:pl-[16px] md:flex justify-between items-center  pt-[10px]"
                    : "login-signout pl-0 md:pl-[16px] md:flex justify-between items-center pt-[10px]"
                }
              >
                {!UserLogin ? (
                  <>
                    <NavLink
                      className="pl-[10px] text-[16px] leading-[24px] font-[500]"
                      to="auth/login"
                    >
                      SignIn
                    </NavLink>
                    <NavLink
                      className="pl-[10px] text-[16px] leading-[24px] font-[500] "
                      to="auth/register"
                    >
                      SignUp
                    </NavLink>
                  </>
                ) : (
                  <>
                    <span
                      className="pl-[5px] cursor-pointer ml-[45%]  lg:ml-0 "
                      onClick={logOut}
                    >
                      Log Out
                    </span>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
