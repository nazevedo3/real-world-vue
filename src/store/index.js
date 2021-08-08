import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";
import PostService from "@/services/PostService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: "abc123", name: "Keeks Azevedo" },
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
    events: [],
    eventsTotal: null,
    event: {},
    posts: [],
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENTS_TOTAL(state, eventCount) {
      state.eventsTotal = eventCount;
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    UPDATE_POST(state, updatedPost) {
      let index = state.posts.findIndex((p) => p.id == updatedPost.id);
      Vue.set(state.posts, index, updatedPost);
    },
  },
  actions: {
    async updatePost({ commit }, editedPost) {
      let response = await PostService.update(editedPost);
      commit("UPDATE_POST", response.data);
      return response.data;
    },
    async fetchPosts({ commit }) {
      let response = await PostService.getPosts();
      commit("SET_POSTS", response.data);
    },
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event);
      });
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then((response) => {
          commit("SET_EVENTS_TOTAL", response.headers["x-total-count"]);
          commit("SET_EVENTS", response.data);
        })
        .catch((error) => {
          console.log("There was an error: " + error.response);
        });
    },
    fetchEvent({ commit, getters }, id) {
      var event = getters.getEventById(id);

      if (event) {
        commit("SET_EVENT", event);
      } else {
        EventService.getEvent(id)
          .then((response) => {
            commit("SET_EVENT", response.data);
          })
          .catch((error) => {
            console.log("There was an error: ", error.response);
          });
      }
    },
  },
  modules: {},
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
    getEventById: (state) => (id) => {
      return state.events.find((event) => event.id === id);
    },
  },
});
