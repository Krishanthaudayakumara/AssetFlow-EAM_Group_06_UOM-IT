import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

interface PrivateRouteProps {
  allowedRoles: string[] | "all" | "manager" | "facilityManager" | "inventoryManager" | "supportManager" | "agent";
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      // Token has expired
      return <Navigate to="/login" />;
    }

    const userRole = decodedToken.role;

    if (allowedRoles === "all" || allowedRoles.includes(userRole)) {
      return <Outlet />;
    } else if (userRole === "admin" && allowedRoles.includes("admin")) {
      return <Outlet />;
    } else if (userRole === "manager" && allowedRoles.includes("manager")) {
      return <Outlet />;
    } else if (userRole === "facilityManager" && allowedRoles.includes("facilityManager")) {
      return <Outlet />;
    } else if (userRole === "inventoryManager" && allowedRoles.includes("inventoryManager")) {
      return <Outlet />;
    } else if (userRole === "supportManager" && allowedRoles.includes("supportManager")) {
      return <Outlet />;
    } else if (userRole === "agent" && allowedRoles.includes("agent")) {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error("Error decoding JWT token", error);
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
