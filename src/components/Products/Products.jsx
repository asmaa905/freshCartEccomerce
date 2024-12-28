import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useContext } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { useParams, Link, useLocation } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";
import { toast } from "react-toastify";

export default function Products() {
  const { name } = useParams();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useContext(cartContext);
  const { addToWishList, favProducts } = useContext(wishListContext);

  function filterData(data) {
    if (location.pathname.includes("category")) {
      return data.filter((product) => product.category.name === name);
    } else if (location.pathname.includes("brand")) {
      return data.filter((product) => product.brand.name === name);
    } else {
      return data;
    }
  }

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

  async function addProductToFavList(id) {
    let addSuccess = await addToWishList(id);
    if (addSuccess) {
      toast.success("It has been add successfully ❤", {
        duration: 2000,
        position: "top-right",
      });
    } else {
      toast.error("Error Adding products to your cart");
    }
  }

  function getRecent() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getRecent,
    staleTime: 800000,
    select: (data) => {
      return filterData(data.data.data).filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
  });

  if (isLoading) {
    return (
      <div className="py-8 w-full flex justify-center mt-[50px]">
        <ClimbingBoxLoader color="green" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-8 w-full flex justify-center mt-[50px]">
        <h3>{error.message}</h3>
      </div>
    );
  }

  return (
    <div className="container py-[0.5rem] mt-[7rem]">
      {location.pathname.includes("category") ||
      location.pathname.includes("brand") ? (
        <p
          className="prod-count  mt-[25px] ml-auto text-[#5c6c75] text-[16px] leading-[24px] font-[500] "
          style={{ fontFamily: '"Encode Sans Expanded" , sans - serif' }}
        >
          Products found:
          <span className="text-[#22db14] font-bold pl-1 text-[16px]">
            {data?.length}
          </span>
        </p>
      ) : (
        <>
          <div className="search-input w-[75%] mx-auto pb-[50px]">
            <input
              type="text"
              className="form-control text-[#21313c] focus:border focus:border-[#85d685] focus:shadow-[0_0_0_0.25rem_#0aad0a40] focus:text-[#21313c] focus:outline-none"
              style={{
                transition:
                  "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
              }}
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </>
      )}

      <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-5 py-5">
        {data.map((p) => (
          <div
            className="relative text-start hover:border hover:border-[#22db14] hover:shadow-[#919eab33_0px_2px_4px_-1px,_#919eab24_0px_4px_5px_0px,_#919eab1f_0px_1px_10px_0px] bg-white hover:rounded-md p-2 group overflow-hidden"
            key={p.id}
          >
            <Link to={`/productDetails/${p.id}/${p.category.name}`}>
              <img src={p.imageCover} alt="" />
              <h4 className="text-emerald-600">{p.category.name}</h4>
              <h3>{p.title.split(" ").slice(0, 2).join(" ")}</h3>
              <div className="rate-price flex justify-between">
                {p.priceAfterDiscount ? (
                  <div className="text-sm">
                    <span className="line-through text-red-500">
                      {p.price} EGP
                    </span>
                    <span className="o-price pl-2">
                      {p.priceAfterDiscount} EGP
                    </span>
                  </div>
                ) : (
                  <span className="o-price">{p.price} EGP</span>
                )}
                <span className="rate">
                  <i className="text-yellow-300 fa fa-star"></i>
                  {p.ratingsAverage}
                </span>
              </div>
              {p.priceAfterDiscount ? (
                <span className="absolute top-0 rounded-b-md bg-red-500 text-white p-1">
                  Sale
                </span>
              ) : null}
            </Link>
            <span
              onClick={() => addProductToFavList(p.id)}
              className={`${
                favProducts?.some((favProd) => favProd.id === p.id)
                  ? "text-red-500"
                  : ""
              } absolute top-[20px] right-[15px] hidden group-hover:block border border-[#ccc] px-[6px] py-[2px] rounded-[5px] cursor-pointer`}
            >
              <i className="fas fa-heart"></i>
            </span>
            <button
              className="btn-add-cart my-1 mx-auto w-[75%] flex items-center justify-center group-hover:translate-y-[0%] translate-y-[200%]"
              onClick={() => addProductToCart(p.id)}
            >
              <i className="fas fa-plus text-[13px] leading-[24px] font-[400] pr-[5px]"></i>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}