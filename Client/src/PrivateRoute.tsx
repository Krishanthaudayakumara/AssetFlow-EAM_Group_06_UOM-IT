import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      // token has expired
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error("Error decoding JWT token", error);
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
