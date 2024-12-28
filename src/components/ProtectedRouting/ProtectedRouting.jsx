import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRouting(props) {
  if (localStorage.getItem("userToken") !== null) {
    return props.children;
  } else {
    <Navigate to={"/login"}></Navigate>;
  }
  return <></>;
}
