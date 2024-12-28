import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {
  const {
    getCartProducts,
    updateCartQuantity,
    deleteItem,
    clearCart,
    setNumOfCartItems,
    setProductsCart,
    setTotalPrice,
    numOfCartItems,
    totalPrice,
    productsCart,
  } = useContext(cartContext);

  const [isLoading, setIsLoading] = useState(true);
  async function clearUserCart() {
    setIsLoading(true);
    let { data } = await clearCart();
    if (data.message === "success") {
      setIsLoading(false);
      toast.error("All Products removed successfully from your Cart", {
        duration: 2000,
        position: "top-right",
      });
      setNumOfCartItems(0);
      setProductsCart([]);
      setTotalPrice(0);
    } else {
      toast.error("Error removed Products from your Cart Faild");
    }
  }
  async function removeItem(id) {
    let Success = await deleteItem(id);
    if (Success) {
      toast.error("Product removed successfully from your Cart", {
        duration: 2000,
        position: "top-right",
      });
    } else {
      toast.error("Error removed product from your Cart Faild");
    }
  }
  useEffect(() => {
    getCartProducts();
  }, []);
  async function updateCart(id, count) {
    await updateCartQuantity(id, count);
  }

  return (
    <>
      <div className="container py-[3rem]">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg  py-[3rem] bg-gray-50 my-[3rem] lg:px-[3rem]">
          {/* <div className=""> */}
          <table className="w-full text-sm text-left  text-gray-500 h-full">
            <tbody>
              <tr className="bg-gray-50 flex flex-col md:flex-row md:justify-between items-center w-full justify-center">
                <td className="p-4 flex justify-start items-center gap-[31px]">
                  <h2 className="font-[500] text-[32px] leading-[38px] text-[#212529]">
                    Cart Shop
                  </h2>
                </td>
                <td className="px-6 py-4 text-right">
                  {productsCart && productsCart.length ? (
                    <Link to="/payment" className="btn-checkout ">
                      Checkout
                    </Link>
                  ) : null}
                </td>
              </tr>
              {productsCart && productsCart.length ? (
                <>
                  <tr className="bg-gray-50 flex flex-col md:flex-row md:justify-between items-center w-full justify-center">
                    <td className="p-4 flex justify-start items-center gap-[31px]">
                      <p className="font-[500] text-[20px] leading-[24px] text-[#212529]">
                        Total Cart Price:
                        <span className="text-[#22db14] px-2">
                          {totalPrice}
                        </span>
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-[500] text-[20px] leading-[24px] text-[#212529]">
                        Total Number of Items:
                        <span className="text-[#22db14] px-2">
                          {numOfCartItems}
                        </span>
                      </p>
                    </td>
                  </tr>
                  {productsCart.map((product, index) => (
                    <tr
                      key={product.product._id}
                      className="border-b bg-gray-50 flex flex-col justify-center  lg:flex-row lg:justify-between items-center w-full"
                    >
                      <td className="p-4 flex  lg:flex-row flex-col  justify-start items-center gap-[31px]">
                        <img
                          src={product.product?.imageCover}
                          className=" lg:w-32 max-w-full max-h-full"
                          alt={product.product.title}
                        />
                        <div className="prod-details lg:max-w-[50%]">
                          <p>{product.product?.title}</p>
                          <p>{product.price} EGP</p>
                          <p
                            onClick={() => removeItem(product.product._id)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline  cursor-pointer "
                          >
                            <i className="fas fa-trash pr-[9px]"></i>
                            Remove
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 flex flex-row   lg-block justify-center">
                        <div className="flex items-center lg:justify-end justify-center">
                          <button
                            className="inline-flex items-center justify-center p-1 me-3 text-[1rem]  h-8 w-8 text-[#22db14] bg-white border border-[#22db14] rounded-[10px] 
                           hover:bg-[#22db14] hover:text-white font-bold"
                            type="button"
                            onClick={() => {
                              updateCart(
                                product.product._id,
                                product.count + 1
                              );
                            }}
                          >
                            <span className="sr-only">Increase quantity</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1"
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>

                          <div>
                            <p
                              id={`product_${index}`}
                              className="  text-[1rem] leading-[24px] text-[#212529] rounded-lg  block py-1 "
                            >
                              {" "}
                              {product.count}
                            </p>
                          </div>
                          <button
                            className="inline-flex items-center justify-center p-1 ms-3 text-[1rem]  h-8 w-8 text-[#22db14] bg-white border border-[#22db14] rounded-[10px] 
                           hover:bg-[#22db14] hover:text-white font-bold"
                            type="button"
                            onClick={() => {
                              updateCart(
                                product.product._id,
                                product.count - 1
                              );
                            }}
                          >
                            <span className="sr-only">Decrease quantity</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="flex justify-center items-center flex-column">
                    <td className="mx-auto" colSpan={2}>
                      <div className="my-10 flex justify-center items-center mx-auto">
                        <button
                          onClick={clearUserCart}
                          className="btn font-[400] text-[20px] leading-[30px] text-[#212529]"
                        >
                          Clear Your Cart
                        </button>
                      </div>
                    </td>
                  </tr>
                </>
              ) : (
                <h2 className="px-[30px]">Cart is Empty</h2>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
