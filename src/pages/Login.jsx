import React from "react";
// Images
import { google } from "../assets";
//zustand
import useAuthUserStore from "../zustand/useAuthUser";
// react icons
import { FaUnlockAlt } from "react-icons/fa";
// OAuth
import OAuth from "../components/button/OAuth";

const Login = () => {
  const { authUser, setAuthUser } = useAuthUserStore();

  return (
    <main className="p-login-page_wrapper">
      <div className="p-login-lock pink_orange_bg_LG">
        <FaUnlockAlt />
        <p>Log In</p>
      </div>
      <div className="text-center">
        <p className="p-login_title">
          <span className="red_blue_bg_LG">ShowGa's </span>
          Blog
        </p>
        <p className="p-login_des">Login for leaving a comment in the post !</p>
      </div>

      <OAuth />
    </main>
  );
};

export default Login;
