import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

class AuthService {
  signUp(formData) {
    return axios.post(API_URL + "/server/auth/signup", formData);
  }

  signIn(formData) {
    return axios.post(API_URL + "/server/auth/login", formData, {
      withCredentials: true,
    });
  }

  signInOAuth(data) {
    return axios.post(API_URL + "/server/auth/loginGoogle", data, {
      withCredentials: true,
    });
  }

  logOut() {
    return axios.get(API_URL + "/server/auth/logout", {
      withCredentials: true,
    });
  }
}

export default new AuthService();
