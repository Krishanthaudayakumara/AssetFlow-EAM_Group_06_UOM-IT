import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

interface PrivateRouteProps {
  allowedRoles: string[] | "all";
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

    const userRole = decodedToken.role; // Replace 'role' with the actual key in the decoded JWT token that represents the user's role

    if (allowedRoles === "all" || allowedRoles.includes(userRole)) {
      return <Outlet />;
    } else if (userRole === "admin") {
      return <Navigate to="/" />;
    } else if (userRole === "manager" && allowedRoles.includes("manager")) {
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


// const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   try {
//     const decodedToken: any = jwtDecode(token);
//     if (decodedToken.exp * 1000 < Date.now()) {
//       // Token has expired
//       return <Navigate to="/login" />;
//     }

//     const userRole = decodedToken.role;

//     if (allowedRoles === "all" || allowedRoles.includes(userRole)) {
//       return <Outlet />;
//     } else if (
//       userRole === "facManager" &&
//       allowedRoles.includes("facManager")
//     ) {
//       return <Outlet />;
//     } else if (userRole === "ItManager" && allowedRoles.includes("ItManager")) {
//       return <Outlet />;
//     } else if (
//       userRole === "InvManager" &&
//       allowedRoles.includes("InvManager")
//     ) {
//       return <Outlet />;
//     } else {
//       return <Navigate to="/" />;
//     }
//   } catch (error) {
//     console.error("Error decoding JWT token", error);
//     return <Navigate to="/login" />;
//   }
// };

