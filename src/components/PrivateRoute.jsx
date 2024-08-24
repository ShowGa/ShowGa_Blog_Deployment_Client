import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// zustand
import useAuthUserStore from "../zustand/useAuthUser";

const PrivateRoute = () => {
  const { authUser } = useAuthUserStore();

  return authUser ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
