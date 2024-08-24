import React from "react";
// image
import { google } from "../../assets";
// CSS
import "../components.css";
// firebase
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firebase/firebase";
// import auth-service
import AuthService from "../../services/auth-service";
// react hot toast
import toast from "react-hot-toast";
// zustand
import useAuthUserStore from "../../zustand/useAuthUser";
// react router dom
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const navigate = useNavigate();

  const auth = getAuth(app);
  const { authUser, loginSetAuthUser } = useAuthUserStore();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const data = {
        username: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        avatar: resultsFromGoogle.user.photoURL,
      };
      // send data to server
      AuthService.signInOAuth(data)
        .then((response) => {
          loginSetAuthUser(response.data);
          toast.success("Login Successfully !");
          navigate("/");
        })
        .catch((error) => {
          toast.error("Error occurred when try to login !");
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>
      <div className="login_button">
        <img src={google} />
        <p className="text-black">Login with Google</p>
      </div>
    </button>
  );
};

export default OAuth;
