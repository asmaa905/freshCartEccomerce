import React, { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { UserContext } from "../../../Context/UserContext";
import { jwtDecode } from "jwt-decode";

export default function Register() {
  const [errors, setErrors] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  let { UserLogin, setUserLogin, setUserIdLogin } = useContext(UserContext);
  let navigate = useNavigate();

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "name minlength is 3")
      .max(10, "name maxlength is 10")
      .required("name is required"),
    email: Yup.string().email("email is invalid").required("email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "phone is not valid")
      .required("phone is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{5,}$/,
        "Password must be at least 5 charcters include at least 1 number and at  least 1 charcters  and  mixed of letters, numbers, and special characters"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "repassword is not matched")
      .required("repassword is required"),
  });
  async function handleRegister(values) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );

      if (data?.message === "success") {
        // Use optional chaining
        localStorage.setItem("userToken", data.token);
        const userDataDecoded = jwtDecode(data.token);
        localStorage.setItem("userId", userDataDecoded.id);
        localStorage.setItem("userName", userDataDecoded.name);
        setUserIdLogin(localStorage.getItem("userId"));
        setUserLogin(localStorage.getItem("userToken"));

        setBtnLoading(false);
        navigate("/");
      } else {
        throw new Error(data?.message || "Unexpected response from server");
      }
    } catch (error) {
      setBtnLoading(false);
      setErrors(
        error.response?.data?.message || error.message || "An error occurred"
      );
    }
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    // validate: validation,
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });
  return (
    <>
      <div className="container py-[3rem] my-[3rem] ">
        <div className="w-full mx-auto bg-[#f6f9f7] px-[5%] rounded-[0.375rem] pb-[50px]">
          <div className="content mx-auto w-[50%]">
            <div className="headers">
              <h2 className="font-[400] text-[28px] leading-[34px] text-[#21313c] pt-[35px] mb-[1rem]">
                Register Now
              </h2>
            </div>
            <form className=" pb-50px]" onSubmit={formik.handleSubmit}>
              {errors ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {errors}
                </div>
              ) : null}
              <div className="relative z-0 w-full mb-2 group">
                <label
                  htmlFor="name"
                  className="text-[1rem] leading-[24px] font-[400] text-[#5c6c75]"
                >
                  Name
                </label>

                <input
                  type="name"
                  name="name"
                  id="name"
                  className="form-control text-[#21313c] focus:border focus:border-[#85d685] focus:shadow-[0_0_0_0.25rem_#0aad0a40] focus:text-[#21313c] focus:outline-none"
                  placeholder=" "
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div
                    className="my-2 p-4 mb-4 text-sm text-[#58151c] border border-[#f1aeb5] rounded-lg bg-[#f8d7da] "
                    role="alert"
                  >
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="email"
                  className="text-[1rem] leading-[24px] font-[400] text-[#5c6c75]"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control text-[#21313c] focus:border focus:border-[#85d685] focus:shadow-[0_0_0_0.25rem_#0aad0a40] focus:text-[#21313c] focus:outline-none"
                  placeholder=" "
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />

                {formik.errors.email && formik.touched.email ? (
                  <div
                    className="my-2 p-4 mb-4 text-sm text-[#58151c] border border-[#f1aeb5] rounded-lg bg-[#f8d7da] "
                    role="alert"
                  >
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="phone"
                  className="text-[1rem] leading-[24px] font-[400] text-[#5c6c75]"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="form-control text-[#21313c] focus:border focus:border-[#85d685] focus:shadow-[0_0_0_0.25rem_#0aad0a40] focus:text-[#21313c] focus:outline-none"
                  placeholder=" "
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />

                {formik.errors.phone && formik.touched.phone ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {formik.errors.phone}
                  </div>
                ) : null}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="password"
                  className="text-[1rem] leading-[24px] font-[400] text-[#5c6c75]"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control text-[#21313c] focus:border focus:border-[#85d685] focus:shadow-[0_0_0_0.25rem_#0aad0a40] focus:text-[#21313c] focus:outline-none"
                  placeholder=" "
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div
                    className="my-2 p-4 mb-4 text-sm text-[#58151c] border border-[#f1aeb5] rounded-lg bg-[#f8d7da] "
                    role="alert"
                  >
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="rePassword"
                  className="text-[1rem] leading-[24px] font-[400] text-[#5c6c75]"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="rePassword"
                  id="rePassword"
                  className="form-control text-[#21313c] focus:border focus:border-[#85d685] focus:shadow-[0_0_0_0.25rem_#0aad0a40] focus:text-[#21313c] focus:outline-none"
                  placeholder=" "
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.rePassword}
                />

                {formik.errors.rePassword && formik.touched.rePassword ? (
                  <div
                    className="my-2 p-4 mb-4 text-sm text-[#58151c] border border-[#f1aeb5] rounded-lg bg-[#f8d7da] "
                    role="alert"
                  >
                    {formik.errors.rePassword}
                  </div>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={!formik.isValid || !formik.dirty ? true : false}
                className={`${
                  !formik.isValid || !formik.dirty
                    ? "opacity-[0.65] bg-[#4fa74f] "
                    : "opacity-[1] hover:bg-[#3fa43f] hover:border-[transparent] "
                }bg-[#4fa74f] text-white  border  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
        `}
              >
                {btnLoading ? (
                  <i className="fa fa-spinner text-white"></i>
                ) : (
                  "Register"
                )}
              </button>
              <p className="px-3 text-[14px] font-[400] leading-[21px] text-[#5c6c75] text-center mt-2">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="font-[500] text-[#0aad0a] hover:text-[#5c6c75]"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
