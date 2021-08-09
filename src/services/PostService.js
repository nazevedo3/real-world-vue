import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
});

export default {
  getPosts() {
    return apiClient.get("/posts");
  },
  getPost(id) {
    return apiClient.get("posts/" + id);
  },
  update(post) {
    return apiClient.put(`/posts/${post.id}`, post);
  },
  create(post) {
    return apiClient.post("/posts", post);
  },
  delete(post) {
    return apiClient.delete(`/posts/${post.id}`);
  },
};
