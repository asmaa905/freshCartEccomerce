import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ClimbingBoxLoader } from "react-spinners";
import React, { useContext, useState } from "react";

export default function Payment() {
  let userId = localStorage.getItem("userId");

  let token = localStorage.getItem("userToken");
  function getOrders() {
    console.log("id", userId);
    console.log("userId", localStorage.getItem("userId"));

    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
    // {
    //   headers: {
    //     token,
    //   },
    // }
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["allrders"],
    queryFn: getOrders,
    staleTime: 800000,
    select: (data) => {
      console.log("data", data.data);
      return data.data;
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
    <>
      <div className="container py-[3rem] my-[3rem] ">
        <div className="w-full mx-auto bg-[#f0f3f2] px-[5%] rounded-[0.375rem] pb-[50px]">
          <div className="content mx-auto ">
            <div className="headers">
              <h2 className="font-[600] text-[30px] leading-[36px] text-[#21313c] pt-[35px] mb-[1rem] text-center">
                All orders
              </h2>
            </div>
            {data?.map((order) => (
              <div className="flex  lg:flex-row flex-col  justify-between items-start bg-[#f8f9fa] p-5 mb-5 rounded-md">
                <div className="details w-full lg:w-[30%]">
                  <p className="text-[#5c6c75] text-[16px] leading-[24px] font-[700] pt-2">
                    Date:{" "}
                    <span className="text-[#5c6c75] text-[16px] leading-[24px] font-[400] pl-2">
                      {new Date(order.createdAt).toLocaleDateString("en-US")}
                    </span>
                  </p>
                  <p className="text-[#5c6c75] text-[16px] leading-[24px] font-[700] pt-2">
                    Total Price:{" "}
                    <span className="text-[#5c6c75] text-[16px] leading-[24px] font-[400] pl-2">
                      {order.totalOrderPrice}
                    </span>
                  </p>
                  <p className="text-[#5c6c75] text-[16px] leading-[24px] font-[700] pt-2">
                    paymentMethod:{" "}
                    <span className="text-[#5c6c75] text-[16px] leading-[24px] font-[400] pl-2">
                      {order.paymentMethodType}
                    </span>
                  </p>
                  <p className="text-[#5c6c75] text-[16px] leading-[24px] font-[700] pt-2">
                    Delivered:{" "}
                    <span className="text-[#5c6c75] text-[16px] leading-[24px] font-[400] pl-2">
                      {order.isDelivered ? "Yes" : "No"}
                    </span>
                  </p>
                  <p className="text-[#5c6c75] text-[16px] leading-[24px] font-[700] pt-2">
                    Paid:{" "}
                    <span className="text-[#5c6c75] text-[16px] leading-[24px] font-[400] pl-2">
                      {order.isPaid ? "Yes" : "No"}
                    </span>
                  </p>
                </div>
                <div className="products w-full lg:w-[30%]">
                  <h2 className="py-3 text-[#5c6c75] text-[16px] leading-[24px] font-[700]">
                    Products:
                  </h2>

                  {order?.cartItems?.map((product) => (
                    <div className="name-count-image flex flex-row  justify-between lg:items-center items-start py-2">
                      <div className="name-count flex justify-between items-start gap-3">
                        <img
                          className="w-[40px] block"
                          src={product?.product?.imageCover}
                          alt={product?.product?.title}
                        />
                        <p className="name font-[600] text-[#0aad0a] text-[14px] leading-[21px]">
                          {product?.product?.title?.slice(0, 11)}
                        </p>
                      </div>

                      <p className="count text-[#5c6c75] text-[16px] leading-[24px] font-[400]">
                        X<span>{product.count}</span>
                      </p>
                    </div>
                  ))}
                </div>
                <div className="order-id w-full lg:w-[30%]">
                  <p className="py-3 text-[#5c6c75] text-[16px] leading-[24px] font-[700]">
                    Order Id:{" "}
                    <span className="py-3 text-[#5c6c75] text-[16px] leading-[24px] font-200]">
                      {order.id}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
