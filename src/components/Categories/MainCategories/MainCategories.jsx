import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function mainCategories() {
  function getMainCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: getMainCategories,
    staleTime: 800000,
    refetchInterval: 80000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    gcTime: 2000,
    select: (data) => {
      return data.data.data;
    },
  });
  if (isLoading) {
    return (
      <>
        <div className="py-8 w-full flex justify-center  mt-[50px]">
          <ClimbingBoxLoader color="green" />
        </div>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <div className="py-8 w-full flex justify-center  mt-[50px]">
          <h3> {error.message}</h3>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container py-[0.5rem] mt-[50px]">
        <div className="headers">
          <h2 className="font-[400] text-[28px] leading-[34px] text-[#5c6c75] pt-[30px]">
            All Categories
          </h2>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 gap-5 py-5">
          {data.map((cat) => (
            <div
              className="relative text-start hover:border  hover:border-[#22db14] hover:shadow-[#919eab33_0px_2px_4px_-1px,_#919eab24_0px_4px_5px_0px,_#919eab1f_0px_1px_10px_0px] bg-white hover:rounded-md p-2 group   overflow-hidden"
              key={cat._id}
            >
              <Link
                to={`/categories/${cat._id}/${cat.name}/subcategories`}
                className="p-[0.5rem]"
              >
                <img
                  className="w-full h-[200px] object-cover"
                  src={cat.image}
                  alt=""
                />
                <h4 className="font-[700] text-[20px] leading-[24px] text-[#5c6c75] text-center py-[1rem]">
                  {cat.name}
                </h4>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
