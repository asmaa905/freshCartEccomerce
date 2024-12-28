import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Slider from "react-slick";
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";
import "./Details.css";
import { toast } from "react-toastify";
export default function Details() {
  let { id, catName } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsRelated, seProductsRelated] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let settingsProduct = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 2 } },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 2, dots: false },
      },
    ],
  };
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: false,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1, dots: false },
      },
    ],
  };
  let { addToCart } = useContext(cartContext);
  let { addToWishList, favProducts } = useContext(wishListContext);
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

  function getProductDetails(id) {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setLoading(false);
        setProductDetails(data.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }
  function getRelatedProducts(catName) {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let filteredProducts = data.data.filter(
          (p) => p.category.name === catName
        );
        setProducts(data.data);
        seProductsRelated(filteredProducts);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }

  useEffect(() => {
    getProductDetails(id);
    getRelatedProducts(catName);
  }, [id, catName]);
  if (error) {
    return <p>error</p>;
  }
  //this step return excute first one in the page in life cycle hooks
  return (
    <>
      {loading ? (
        <div className="container ">
          <div className="content  flex justify-center items-center flex-col m-auto"></div>
          <i className="fas fa-spin fa-spinner"></i>
        </div>
      ) : (
        <>
          <div className="container py-[0.5rem] ">
            {productDetails && (
              <div className="product-details items-center grid grid-cols-[1fr_2fr] gap-3">
                <div className="overflow-hidden ">
                  <Slider {...settingsProduct} className="my-20 w-full pt-10">
                    {productDetails?.images.map((image) => (
                      <img src={image} alt="" className="object-cover " />
                    ))}
                  </Slider>
                </div>
                <div className="text-start">
                  <h2 className=" my-3 text-[#21313c] text-[24px] leading-[29px] font-[700]">
                    {productDetails?.title}
                  </h2>
                  <p className="text-[#5c6c75] text-[16px] leading-[24px] font-[400]">
                    {productDetails?.description}
                  </p>
                  <h3 className="text-[#0aad0a] text-[16px] leading-[24px] font-[400] pt-[0.1rem]">
                    {productDetails?.category.name}
                  </h3>
                  <div className="flex justify-between items-center py-[20px]">
                    {productDetails.priceAfterDiscount ? (
                      <div className="text-sm">
                        <span className="line-through text-red-500">
                          {productDetails.price} EGP
                        </span>
                        <span className="o-price pl-2">
                          {productDetails.priceAfterDiscount} EGP
                        </span>
                      </div>
                    ) : (
                      <span className=" o-price">
                        {productDetails.price} EGP
                      </span>
                    )}
                    <span className="rate">
                      <i className="text-yellow-300 fa fa-star"></i>
                      {productDetails.ratingsAverage}
                    </span>
                  </div>
                  <div className="flex justify-center items-center gap-[20%]">
                    <button className="btn-add-cart mb-1 w-[75%] ">
                      <i className="fa-solid fa-cart-plus me-1"> </i>
                      {"  "}Add To Cart
                    </button>
                    <p
                      onClick={() => addProductToFavList(productDetails.id)}
                      className={`${
                        favProducts.some(
                          (favProd) => favProd.id === productDetails.id
                        )
                          ? "text-red-500"
                          : ""
                      } px-[6px] py-[2px] rounded-[5px] cursor-pointer text-[28px]`}
                    >
                      <i className="fas fa-heart"></i>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className=" gap-5 p-5 bg-[#f8f9fa]">
            <div className="container py-[0.5rem] ">
              {productsRelated.length > 0 ? (
                <div className="overflow-hidden w-full ">
                  <Slider className="mb-10 mt-3 w-full " {...settings}>
                    {productsRelated.map((p) => (
                      <div
                        className="mx-3  px-5 relative text-start  hover:border   hover:border-[#22db14] hover:shadow-[#919eab33_0px_2px_4px_-1px,_#919eab24_0px_4px_5px_0px,_#919eab1f_0px_1px_10px_0px]  bg-white hover:rounded-md p-2 group   overflow-hidden"
                        key={p.id}
                      >
                        <Link to={`/productDetails/${p.id}/${p.category.name}`}>
                          <img className="" src={p.imageCover} alt="" />
                          <h4 className="text-emerald-600">
                            {p.category.name}
                          </h4>
                          <h3 className="">
                            {p.title.split(" ").slice(0, 2).join(" ")}
                          </h3>
                          <div className="rate-price flex justify-between">
                            {p.priceAfterDiscount ? (
                              <div className="text-[13px]">
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
                            favProducts && favProducts.length
                              ? favProducts.filter(
                                  (favProd) => favProd.id == p.id
                                ).length
                                ? "text-red-500"
                                : ""
                              : ""
                          } absolute top-[20px] right-[15px] hidden group-hover:block border border-[#ccc] px-[6px] py-[2px] rounded-[5px] cursor-pointer`}
                        >
                          <i className="fas fa-heart"></i>
                        </span>
                        <button
                          className="btn-add-cart my-1 mx-auto w-[75%] flex  items-center justify-center group-hover:translate-y-[0%]  translate-y-[200%] "
                          onClick={() => addProductToCart(p.id)}
                        >
                          <i className="fas fa-plus  text-[13px] leading-[24px] font-[400] pr-[5px]"></i>
                          Add
                        </button>
                      </div>
                    ))}
                  </Slider>
                </div>
              ) : (
                <p>No related products found</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
