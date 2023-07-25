import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from "react-router-dom";
import Product from "../Pages/Product";
import jwt_decode from "jwt-decode";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  if(token) {
    const decodeToken = jwt_decode(token);
    if (decodeToken) {
      return <Outlet />;
    }
  }
  return <Navigate to="/" />;
};

export default PrivateRoute;
