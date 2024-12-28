import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";
import { jwtDecode } from "jwt-decode";

import axios from "axios";
import * as Yup from "yup";
export default function Login() {
  const location = useLocation();
  const [setErrors] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  let { setUserLogin, setUserIdLogin } = useContext(UserContext);

  let navigate = useNavigate();
  /* start login functions */
  // login validation

  let validationLoginSchema = Yup.object().shape({
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{5,}$/,
        "Password must be at least 5 charcters include at least 1 number and at  least 1 charcters  and  mixed of letters, numbers, and special characters"
      )
      .required("Password is required"),
  });
  // send code validation

  let validationsendCodeSchema = Yup.object().shape({
    email: Yup.string().email("email is invalid").required("email is required"),
  });
  // verify code validation
  let validationVerifyCodeSchema = Yup.object().shape({
    resetCode: Yup.string()
      .matches(/^[0-9]{6}$/, "Code is not valid")
      .required("Code is required"),
  });
  // create new password validation

  let validationCreateNewPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    newPassword: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{5,}$/,
        "Password must be at least 5 charcters include at least 1 number and at  least 1 charcters  and  mixed of letters, numbers, and special characters"
      )
      .required("Password is required"),
  });
  // login function

  async function handleLogin(values) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      if (data?.message === "success") {
        localStorage.setItem("userToken", data.token);
        const userDataDecoded = jwtDecode(data.token);
        localStorage.setItem("userId", userDataDecoded.id);
        console.log("userId", localStorage.getItem("userId"));

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
  // send code function

  async function handleSendCodeToMailSubmit(values) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      );
      if (data?.statusMsg === "success") {
        setBtnLoading(false);
        navigate("/auth/verify-code");
      } else {
        throw new Error(data?.message || "Unexpected response from server");
      }
    } catch (error) {}
  }
  // verify code function
  async function handleVerifyCode(values) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      );
      if (data?.status === "Success") {
        setBtnLoading(false);
        navigate("/auth/create-new-password");
      } else {
        throw new Error(data?.message || "Unexpected response from server");
      }
    } catch (error) {}
  }
  // create new password function

  async function handleCreateNewPassword(values) {
    setBtnLoading(true);
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        values
      );
      if (data) {
        localStorage.setItem("userToken", data.token);
        const userDataDecoded = jwtDecode(data.token);
        localStorage.setItem("userId", userDataDecoded.id);
        console.log("userId", localStorage.getItem("userId"));

        setUserIdLogin(localStorage.getItem("userId"));
        setUserLogin(localStorage.getItem("userToken"));

        setBtnLoading(false);
        navigate("/");
      } else {
        throw new Error(data?.message || "Unexpected response from server");
      }
    } catch (error) {}
  }
  //formik
  let loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationLoginSchema,
    onSubmit: handleLogin,
  });
  /* end login functions */
  /* start send code */
  //formik
  let SendCodeToEmailFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationsendCodeSchema,
    onSubmit: handleSendCodeToMailSubmit,
  });
  /* end send code */
  /* start verify code */
  // formik
  let verifyCodeFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validationVerifyCodeSchema,
    onSubmit: handleVerifyCode,
  });
  /* end send code */
  /* start create new password */
  //formik
  let createNewPasswordFormik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validationCreateNewPasswordSchema,
    onSubmit: handleCreateNewPassword,
  });
  /* end create new password */
  return (
    <>
      <div className="container py-[0.5rem] mt-[50px] pt-[40px]">
        <div className="w-full mx-auto bg-[#f6f9f7] px-[5%] rounded-[0.375rem]">
          {location.pathname == "/auth/enter-email" ? (
            <div className="content mx-auto w-[50%]">
              <div className="headers">
                <h2 className="font-[400] text-[28px] leading-[34px] text-[#21313c] pt-[30px]">
                  Forget Password
                </h2>
              </div>
              <form
                className="form-login py-[40px]"
                onSubmit={(e) => {
                  e.preventDefault();
                  SendCodeToEmailFormik.handleSubmit(e);
                }}
              >
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="email"
                    className="text-[1rem] leading-[24px] font-[400] text-[#5c6c75]"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control text-[#21313c] focus:border focus:border-[#85d685] focus:shadow-[0_0_0_0.25rem_#0aad0a40] focus:text-[#21313c] focus:outline-none"
                    placeholder=" "
                    onBlur={SendCodeToEmailFormik.handleBlur}
                    onChange={SendCodeToEmailFormik.handleChange}
                    value={SendCodeToEmailFormik.values.email}
                  />

                  {SendCodeToEmailFormik.errors.email &&
                  SendCodeToEmailFormik.touched.email ? (
                    <div
                      className="my-2 p-4 mb-4 text-sm text-[#58151c] border border-[#f1aeb5] rounded-lg bg-[#f8d7da] "
                      role="alert"
                    >
                      {SendCodeToEmailFormik.errors.email}
                    </div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  disabled={
                    !SendCodeToEmailFormik.isValid ||
                    !SendCodeToEmailFormik.dirty
                      ? true
                      : false
                  }
                  className={`${
                    !SendCodeToEmailFormik.isValid ||
                    !SendCodeToEmailFormik.dirty
                      ? "opacity-[0.65] bg-[#4fa74f] "
                      : "opacity-[1] hover:bg-[#3fa43f] hover:border-[transparent] "
                  }bg-[#4fa74f] text-white  border  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
      `}
                >
                  {btnLoading ? (
                    <span>
                      {" "}
                      <i className="fa fa-spinner text-white"></i> Loading ..
                    </span>
                  ) : (
                    "Reset my Password"
                  )}
                </button>
              </form>
            </div>
          ) : location.pathname == "/auth/verify-code" ? (
            <div className="content mx-auto w-[50%]">
              <div className="headers">
                <h2 className="font-[400] text-[28px] leading-[34px] text-[#21313c] pt-[30px]">
                  Verify Reset Code
                </h2>
              </div>
              <form
                className="form-login py-[40px]"
                onSubmit={(e) => {
                  e.preventDefault();
                  verifyCodeFormik.handleSubmit(e);
                }}
              >
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="resetCode"
                    className="text-[1rem] leading-[24px] font-[400] text-[#5c6c75]"
                  >
                    Reset Code:
                  </label>
                  <input
                    type="text"
                    name="resetCode"
                    id="resetCode"
                    className="form-control text-[#21313c] focus:border focus:border-[#85d685] focus:shadow-[0_0_0_0.25rem_#0aad0a40] focus:text-[#21313c] focus:outline-none"
                    placeholder=" "
                    onBlur={verifyCodeFormik.handleBlur}
                    onChange={verifyCodeFormik.handleChange}
                    value={verifyCodeFormik.values.resetCode}
                  />

                  {verifyCodeFormik.errors.resetCode &&
                  verifyCodeFormik.touched.resetCode ? (
                    <div
                      className="my-2 p-4 mb-4 text-sm text-[#58151c] border border-[#f1aeb5] rounded-lg bg-[#f8d7da] "
                      role="alert"
                    >
                      {verifyCodeFormik.errors.resetCode}
                    </div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  disabled={
                    !verifyCodeFormik.isValid || !verifyCodeFormik.dirty
                      ? true
                      : false
                  }
                  className={`${
                    !verifyCodeFormik.isValid || !verifyCodeFormik.dirty
                      ? "opacity-[0.65] bg-[#4fa74f] "
                      : "opacity-[1] hover:bg-[#3fa43f] hover:border-[transparent] "
                  }bg-[#4fa74f] text-white  border  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
                >
                  {btnLoading ? (
                    <span>
                      {" "}
                      <i className="fa fa-spinner text-white"></i> Loading ..
                    </span>
                  ) : (
                    "Verify Reset Code"
                  )}
                </button>
              </form>
            </div>
          ) : location.pathname == "/auth/create-new-password" ? (
            <div className="content mx-auto w-[50%]">
              <div className="headers">
                <h2 className="font-[400] text-[28px] leading-[34px] text-[#21313c] pt-[30px]">
                  Create New Password
                </h2>
              </div>
              <form
                className="form-login py-[40px]"
                onSubmit={(e) => {
                  e.preventDefault();
                  createNewPasswordFormik.handleSubmit(e);
                }}
              >
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="email"
                    className="text-[1rem] leading-[24px] font-[400] text-[#5c6c75]"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control text-[#21313c] focus:border focus:border-[#85d685] focus:shadow-[0_0_0_0.25rem_#0aad0a40] focus:text-[#21313c] focus:outline-none"
                    placeholder=" "
                    onBlur={createNewPasswordFormik.handleBlur}
                    onChange={createNewPasswordFormik.handleChange}
                    value={createNewPasswordFormik.values.email}
                  />

                  {createNewPasswordFormik.errors.email &&
                  createNewPasswordFormik.touched.email ? (
                    <div
                      className="my-2 p-4 mb-4 text-sm text-[#58151c] border border-[#f1aeb5] rounded-lg bg-[#f8d7da] "
                      role="alert"
                    >
                      {createNewPasswordFormik.errors.email}
                    </div>
                  ) : null}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="newpassword"
                    className="text-[1rem] leading-[24px] font-[400] text-[#5c6c75]"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newpassword"
                    className="form-control text-[#21313c] focus:border focus:border-[#85d685] focus:shadow-[0_0_0_0.25rem_#0aad0a40] focus:text-[#21313c] focus:outline-none"
                    placeholder=" "
                    onBlur={createNewPasswordFormik.handleBlur}
                    onChange={createNewPasswordFormik.handleChange}
                    value={createNewPasswordFormik.values.newPassword}
                  />
                  {createNewPasswordFormik.errors.newPassword &&
                  createNewPasswordFormik.touched.newPassword ? (
                    <div
                      className="my-2 p-4 mb-4 text-sm text-[#58151c] border border-[#f1aeb5] rounded-lg bg-[#f8d7da]"
                      role="alert"
                    >
                      {createNewPasswordFormik.errors.newPassword}
                    </div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  disabled={
                    !createNewPasswordFormik.isValid ||
                    !createNewPasswordFormik.dirty
                      ? true
                      : false
                  }
                  className={`${
                    !createNewPasswordFormik.isValid ||
                    !createNewPasswordFormik.dirty
                      ? "opacity-[0.65] bg-[#4fa74f] "
                      : "opacity-[1] hover:bg-[#3fa43f] hover:border-[transparent] "
                  }bg-[#4fa74f] text-white  border  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
    `}
                >
                  {btnLoading ? (
                    <span>
                      {" "}
                      <i className="fa fa-spinner text-white"></i> Loading ..
                    </span>
                  ) : (
                    "Create New Password"
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="content mx-auto w-[50%]">
              <div className="headers">
                <h2 className="font-[400] text-[28px] leading-[34px] text-[#21313c] pt-[30px]">
                  Login Now
                </h2>
              </div>
              <form
                className="form-verify-code py-[40px]"
                onSubmit={(e) => {
                  e.preventDefault();
                  loginFormik.handleSubmit(e);
                }}
              >
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="email"
                    className="text-[1rem] leading-[24px] font-[400] text-[#5c6c75]"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control text-[#21313c] focus:border focus:border-[#85d685] focus:shadow-[0_0_0_0.25rem_#0aad0a40] focus:text-[#21313c] focus:outline-none"
                    placeholder=" "
                    onBlur={loginFormik.handleBlur}
                    onChange={loginFormik.handleChange}
                    value={loginFormik.values.email}
                  />

                  {loginFormik.errors.email && loginFormik.touched.email ? (
                    <div
                      className="my-2 p-4 mb-4 text-sm text-[#58151c] border border-[#f1aeb5] rounded-lg bg-[#f8d7da] "
                      role="alert"
                    >
                      {loginFormik.errors.email}
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
                    onBlur={loginFormik.handleBlur}
                    onChange={loginFormik.handleChange}
                    value={loginFormik.values.password}
                  />
                  {loginFormik.errors.password &&
                  loginFormik.touched.password ? (
                    <div
                      className="my-2 p-4 mb-4 text-sm text-[#58151c] border border-[#f1aeb5] rounded-lg bg-[#f8d7da] "
                      role="alert"
                    >
                      {loginFormik.errors.password}
                    </div>
                  ) : null}
                </div>
                <p className="text-[14px] font-[400] leading-[21px] text-[#5c6c75] mb-[1rem]">
                  Forgot your password?{" "}
                  <Link
                    className="font-[[500] text-[#0aad0a] hover:text-[#5c6c75]"
                    to="/auth/enter-email"
                  >
                    Reset it here
                  </Link>
                </p>
                <button
                  type="submit"
                  disabled={
                    !loginFormik.isValid || !loginFormik.dirty ? true : false
                  }
                  className={`${
                    !loginFormik.isValid || !loginFormik.dirty
                      ? "opacity-[0.65] bg-[#4fa74f] "
                      : "opacity-[1] hover:bg-[#3fa43f] hover:border-[transparent] "
                  }bg-[#4fa74f] text-white  border  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2.5 text-center 
          `}
                >
                  {btnLoading ? (
                    <span>
                      {" "}
                      <i className="fa fa-spinner text-white"></i> Loading ..
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>
                <p className="px-3 text-[14px] font-[400] leading-[21px] text-[#5c6c75] text-center mt-2">
                  Create new Account?{" "}
                  <Link
                    to="/auth/register"
                    className="font-[500] text-[#0aad0a] hover:text-[#5c6c75]"
                  >
                    Register Now
                  </Link>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
