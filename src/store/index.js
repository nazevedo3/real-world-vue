import Vue from "vue";
import Vuex from "vuex";

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
    events: [
      { id: 1, title: "...", organizer: "..." },
      { id: 2, title: "...", organizer: "..." },
      { id: 3, title: "...", organizer: "..." },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
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
