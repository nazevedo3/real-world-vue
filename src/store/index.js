import Vue from "vue";
import Vuex from "vuex";
import PostService from "@/services/PostService.js";
import * as user from "@/store/modules/user.js";
import * as event from "@/store/modules/event.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community",
    ],
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false },
      { id: 3, text: "...", done: true },
    ],
    posts: [],
  },
  mutations: {
    UPDATE_POST(state, updatedPost) {
      let index = state.posts.findIndex((p) => p.id == updatedPost.id);
      Vue.set(state.posts, index, updatedPost);
    },
    ADD_POST(state, newPost) {
      state.posts.push(newPost);
    },
    REMOVE_POST(state, post) {
      state.posts = state.posts.filter((p) => p.id != post.id);
    },
  },
  actions: {
    async removePost({ commit }, post) {
      await PostService.delete(post);
      commit("REMOVE_POST", post);
    },
    async createPost({ commit }, newPost) {
      let response = await PostService.create(newPost);
      commit("ADD_POST", response.data);
      return response.data;
    },
    async updatePost({ commit }, editedPost) {
      let response = await PostService.update(editedPost);
      commit("UPDATE_POST", response.data);
      return response.data;
    },
    async fetchPosts({ commit }) {
      let response = await PostService.getPosts();
      commit("SET_POSTS", response.data);
    },
  },
  modules: {
    user,
    event,
  },
  getters: {
    findPost: (state) => (id) => {
      return state.posts.find((post) => post.id === id);
    },
    catLength: (state) => {
      return state.categories.length;
    },
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done);
    },
    activeTodosCount: (state) => {
      return state.todos.filter((todo) => !todo.done).length;
    },
  },
});
