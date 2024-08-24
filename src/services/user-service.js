import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

class UserService {
  updateUser(userId, formData) {
    return axios.patch(API_URL + `/server/user/update/${userId}`, formData, {
      withCredentials: true,
    });
  }

  deleteUser(userId) {
    return axios.delete(API_URL + `/server/user/delete/${userId}`, {
      withCredentials: true,
    });
  }
}

export default new UserService();
