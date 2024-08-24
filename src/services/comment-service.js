import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

class CommentService {
  createComment(formData) {
    return axios.post(API_URL + "/server/comment/create", formData, {
      withCredentials: true,
    });
  }

  getPostComments(belongPostID, query) {
    return axios.get(
      API_URL + `/server/comment/getpostcomments/${belongPostID}` + query
    );
  }

  commentClap(data) {
    return axios.patch(API_URL + "/server/comment/commentclicklike", data);
  }
}

export default new CommentService();
