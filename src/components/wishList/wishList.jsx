import React, { useContext, useEffect, useState } from "react";
import { wishListContext } from "../../Context/WishListContext";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";

export default function Cart() {
  const { getFavProducts, deleteItem, favProducts } =
    useContext(wishListContext);
  let { addToCart } = useContext(cartContext);

  useEffect(() => {
    getFavProducts();
  }, []);
  async function addProductToCart(id) {
    let addSuccess = await addToCart(id);
    if (addSuccess) {
      toast.success("It has been add successfully 🛺", {
        duration: 2000,
        position: "top-right",
      });
    } else {
      toast.error("Error Adding products to your cart");
    }
  }
  async function removeItem(id) {
    let Success = await deleteItem(id);
    if (Success) {
      toast.error("Product removed successfully from your wishlist", {
        duration: 2000,
        position: "top-right",
      });
    } else {
      toast.error("Error removed product from your wishlist Faild");
    }
  }
  return (
    <>
      <div className="container py-[3rem]">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg  py-[3rem] bg-gray-50 my-[3rem] lg:px-[3rem]">
          <table className="w-full text-sm text-left  text-gray-500 h-full">
            <tbody>
              <tr className="bg-gray-50">
                <td className="p-4 flex justify-start items-center gap-[31px]">
                  <h2 className="font-[500] text-[27px] leading-[32px] text-[#212529] lg:mx-0 lg:text-[32px] lg:leading-[38px]">
                    My wish List
                  </h2>
                </td>
              </tr>
              {favProducts && favProducts.length ? (
                favProducts.map((product, index) => (
                  <tr
                    key={product._id}
                    className="border-b bg-gray-50  flex flex-col lg:flex-row lg:justify-between items-center w-full justify-center"
                  >
                    <td className="p-4 py-4 flex  lg:flex-row flex-col  justify-start items-center gap-[31px] lg:w-[80%]">
                      <img
                        src={product.imageCover}
                        className="lg:w-32 max-w-full max-h-full"
                        alt={product.title}
                      />
                      <div className="prod-details max-w-[50%]">
                        <p>{product.title}</p>
                        <p>{product.price} EGP</p>
                        <p
                          onClick={() => removeItem(product._id)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline  cursor-pointer "
                        >
                          <i className="fas fa-trash pr-[9px]"></i>
                          Remove
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 lg:w-[20%]">
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => addProductToCart(product._id)}
                          className="btn inline-flex hover:bg-[#22db14] font-[400] text-[20px] leading-[30px] text-[#212529]"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <h2 className="px-[30px]">My wish list is empty</h2>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
