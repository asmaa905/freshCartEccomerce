import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ClimbingBoxLoader } from "react-spinners";

import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Payment() {
  const navigate = useNavigate();
  let { cartId } = useContext(cartContext);
  let token = localStorage.getItem("userToken");
  let [cash, setCash] = useState(false);
  const [cashBtnLoading, setCashBtnLoading] = useState(false);
  const [onlineBtnLoading, setOnlineBtnLoading] = useState(false);
  const bearerTokenOfState = "1865|SLWA3q04qyxsCqyLvBC85PkNqIOnv8ue4Si4zNWv";
  function handleCashPayment(apiObj) {
    setCashBtnLoading(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          apiObj,
        },
        {
          headers: { token },
        }
      )
      .then((res) => {
        setCashBtnLoading(false);
        navigate("/allOrders");
      })
      .catch((error) => {
        setCashBtnLoading(false);
      });
  }
  function handleOnlinePayment(apiObj) {
    setOnlineBtnLoading(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          apiObj,
        },
        {
          headers: { token },
          params: {
            url: "http://localhost:5173",
          },
        }
      )
      .then((res) => {
        setOnlineBtnLoading(false);

        window.open(res.data.session.url, "_self");
      })
      .catch((error) => {
        setOnlineBtnLoading(false);
      });
  }
  function handlePayment(values) {
    let apiObj = {
      shippingAddress: values,
    };
    if (cash) {
      handleCashPayment(apiObj);
    } else {
      handleOnlinePayment(apiObj);
    }
  }
  let validationSchema = Yup.object().shape({
    details: Yup.string()
      .min(5, "details at least 5 charcters")
      .required("details is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "phone is not valid")
      .required("phone is required"),
    city: Yup.string()
      .min(3, "city at least 3 charcters")
      .required("city is required"),
  });
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: validationSchema,

    onSubmit: handlePayment,
  });

  function getStates() {
    return axios.get(
      `https://restfulcountries.com/api/v1/countries/Egypt/states`,
      {
        headers: {
          Authorization: `Bearer ${bearerTokenOfState}`, // Add Bearer token
        },
      }
    );
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
    staleTime: 800000,
    select: (data) => {
      return data.data.data.map((state) => ({
        ...state,
        name: state.name.replace(" Governorate", ""), // Remove "Governorate"
      }));
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
      <form
        className="max-w-md mx-auto mt-10 py-[50px]"
        onSubmit={formik.handleSubmit}
      >
        <div className="relative z-0 w-full mb-2  group">
          <label
            htmlFor="details"
            className="text-[1rem] leading-[24px] font-[400] text-[#5c6c75]"
          >
            Details
          </label>
          <textarea
            type="text"
            name="details"
            id="details"
            className="form-control text-[#21313c] focus:border focus:border-[#85d685] focus:shadow-[0_0_0_0.25rem_#0aad0a40] focus:text-[#21313c] focus:outline-none"
            placeholder=" "
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.details}
            style={{
              resize: "none",
            }}
          />
        </div>
        <div className="relative z-0 w-full mb-2  group">
          <label
            htmlFor="phone"
            className="text-[1rem] leading-[24px] font-[400] text-[#5c6c75]"
          >
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="form-control text-[#21313c] focus:border focus:border-[#85d685] focus:shadow-[0_0_0_0.25rem_#0aad0a40] focus:text-[#21313c] focus:outline-none"
            placeholder=" "
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="city"
            className="text-[1rem] leading-[24px] font-[400] text-[#5c6c75]"
          >
            City
          </label>
          <select
            name="city"
            id="city"
            className="form-control text-[#21313c] focus:border focus:border-[#85d685] focus:shadow-[0_0_0_0.25rem_#0aad0a40] focus:text-[#21313c] focus:outline-none"
            placeholder=" "
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.city}
          >
            {data.map((state, index) => (
              <option key={index} value={state.name}>
                {state.name} {/* Cleaned name */}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            onClick={() => {
              setCash(true);
            }}
            disabled={!formik.isValid || !formik.dirty ? true : false}
            style={{
              color: `${!formik.isValid || !formik.dirty ? "#aea7a7" : "#fff"}`,
            }}
            className={`${
              !formik.isValid || !formik.dirty
                ? "opacity-[0.65] bg-[#4fa74f] "
                : "opacity-[1] hover:bg-[#3fa43f] hover:border-[transparent] "
            }bg-[#4fa74f] text-white  border  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
      `}
          >
            {cashBtnLoading ? (
              <span>
                {" "}
                <i className="fa fa-spinner text-white"></i> Loading ..
              </span>
            ) : (
              "Cash Payment"
            )}
          </button>
          <button
            type="submit"
            onClick={() => {
              setCash(false);
            }}
            disabled={!formik.isValid || !formik.dirty ? true : false}
            style={{
              color: `${!formik.isValid || !formik.dirty ? "#aea7a7" : "#fff"}`,
            }}
            className={`${
              !formik.isValid || !formik.dirty
                ? "opacity-[0.65] bg-[#4fa74f] "
                : "opacity-[1] hover:bg-[#3fa43f] hover:border-[transparent] "
            }bg-[#4fa74f] text-white  border  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
      `}
          >
            {onlineBtnLoading ? (
              <span>
                {" "}
                <i className="fa fa-spinner text-white"></i> Loading ..
              </span>
            ) : (
              "Online Payment"
            )}
          </button>
        </div>
      </form>
    </>
  );
  //  بعد ما بدفع الباك اند بيفضى الكارت
}
