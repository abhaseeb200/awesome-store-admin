import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  let user = localStorage.getItem("currentUser");
  console.log(user, "User");
  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
    return <Outlet />;
  }
};

export default ProtectRoute;
