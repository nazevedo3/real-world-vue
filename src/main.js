import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import DateFilter from "./filters/date";

Vue.filter("date", DateFilter);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
