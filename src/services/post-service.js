import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

class PostService {
  createPost(postContent) {
    return axios.post(API_URL + "/server/post/create", postContent, {
      withCredentials: true,
    });
  }

  deletePost(postID) {
    return axios.delete(API_URL + `/server/post/delete/${postID}`, {
      withCredentials: true,
    });
  }

  getAllPosts(query = "") {
    return axios.get(API_URL + `/server/post/getallposts${query}`);
  }

  getPost(slug) {
    return axios.get(API_URL + `/server/post/getpost/${slug}`);
  }

  getSidebarPost(query) {
    return axios.get(API_URL + `/server/post/getsidebarpost/?${query}`);
  }

  getPostAdmin(postID) {
    return axios.get(API_URL + `/server/post/getpostadmin/${postID}`, {
      withCredentials: true,
    });
  }

  updatePost(slug, postContent) {
    return axios.patch(
      API_URL + `/server/post/updatePost/${slug}`,
      postContent,
      { withCredentials: true }
    );
  }

  postClap(data) {
    return axios.patch(API_URL + "/server/post/postclicklike", data);
  }
}

export default new PostService();
