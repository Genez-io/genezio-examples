import * as VueRouter from "vue-router";
import TodoList from "../components/TodoList.vue";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";

const routes = [
  {
    path: "/",
    name: "TodoList",
    component: TodoList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router;
