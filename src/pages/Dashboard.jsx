import React, { useState } from "react";
// react icons
import { MdSpaceDashboard } from "react-icons/md";
import { PiArticleNyTimesFill } from "react-icons/pi";
import { FaSignOutAlt } from "react-icons/fa";
// react router dom
import { Outlet, Link, useLocation } from "react-router-dom";
// react toast
import toast from "react-hot-toast";
// zustand
import useAuthUserStore from "../zustand/useAuthUser";
// Auth-service
import AuthService from "../services/auth-service";

const Dashboard = () => {
  const { logoutSetAuthUser } = useAuthUserStore();
  const { pathname } = useLocation();

  const handleLogOut = () => {
    AuthService.logOut()
      .then(() => {
        logoutSetAuthUser();
        toast.success("Log out successfully !");
      })
      .catch((e) => {
        toast.error("Error occurred when trying to log out !");
        console.log(e);
      });
  };

  return (
    <main className="p-dashboard-wrapper">
      <section className="p-dashboard-sidebar_sec">
        <Link
          to={""}
          id="dash"
          className={`p-sidebar-items ${
            pathname === "/dashboard" ? "p-items_active" : ""
          }`}
        >
          <MdSpaceDashboard className="text-2xl" />
          <p>Dash Information</p>
        </Link>

        <Link
          to={"posts"}
          id="posts"
          className={`p-sidebar-items ${
            pathname === "/dashboard/posts" ? "p-items_active" : ""
          }`}
        >
          <PiArticleNyTimesFill className="text-2xl" />
          <p>Posts</p>
        </Link>

        <div onClick={handleLogOut} className="p-sidebar-items">
          <FaSignOutAlt className="text-2xl" />
          <p>Sign Out</p>
        </div>
      </section>

      <Outlet />
    </main>
  );
};

export default Dashboard;
