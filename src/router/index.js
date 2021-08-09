import Vue from "vue";
import VueRouter from "vue-router";
import EventCreate from "../views/EventCreate.vue";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";
import Blog from "../views/Blog.vue";
import BlogPage from "../views/BlogPage.vue";
import HelloPage from "../views/HelloPage.vue";
import BlogIndex from "@/views/BlogIndex.vue";
import BlogEdit from "@/views/BlogEdit.vue";
import BlogNew from "@/views/BlogNew.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
  },
  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    props: true,
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate,
  },
  {
    path: "/blog",
    name: "blog",
    component: Blog,
    children: [
      {
        path: "new",
        name: "BlogNew",
        component: BlogNew,
      },
      {
        path: "",
        name: "BlogIndex",
        component: BlogIndex,
      },
      {
        path: ":id",
        name: "BlogPage",
        component: BlogPage,
        props: true,
      },
      {
        path: ":id/edit",
        name: "BlogEdit",
        component: BlogEdit,
        props: true,
      },
    ],
  },
  {
    path: "/hello/:name1/:name2",
    name: "hello-page",
    component: HelloPage,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
