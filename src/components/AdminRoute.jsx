import React, { useState } from "react";
// react router dom
import { Navigate, Outlet } from "react-router-dom";
// zustand
import useAuthUserStore from "../zustand/useAuthUser";

const AdminRoute = () => {
  const { authUser } = useAuthUserStore();

  return authUser?.isAdmin ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AdminRoute;
