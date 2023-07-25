import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from "react-router-dom";
import jwt_decode from "jwt-decode";

const PublicRoute = () => {
  const token = localStorage.getItem("token");

  if (token) {
    const decodeToken = jwt_decode(token);
    if (decodeToken) {
      return <Navigate to="/home" />;
    }
  }
  return <Outlet />;
};

export default PublicRoute;
