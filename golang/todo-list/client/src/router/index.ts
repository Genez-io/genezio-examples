import * as VueRouter from "vue-router";
import TodoList from "../components/TodoList.vue";

const routes = [
  {
    path: "/",
    name: "TodoList",
    component: TodoList,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router;
