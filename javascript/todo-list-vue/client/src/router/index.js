import Vue from 'vue';
import Router from 'vue-router';
import TodoList from '@/components/TodoList';
import Login from '@/components/Login';
import Signup from '@/components/Signup';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/',
      name: 'TodoList',
      component: TodoList,
    },
  ],
});
