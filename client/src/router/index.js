import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
  },
  {
    path: '/activityCreation',
    name: 'activityCreation',
    component: () => import(/* webpackChunkName: "about" */ '../views/ActivityCreationView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue'),
  },
  {
    path: '/personalInfo',
    name: 'personalInfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/PersonalInfoView.vue'),
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import(/* webpackChunkName: "about" */ '../views/SettingView.vue'),
  },
  {
    path: '/activityList',
    name: 'activityList',
    component: () => import(/* webpackChunkName: "about" */ '../views/ActivityListView.vue'),
  },
  {
    path: '/activityManagement',
    name: 'activityManagement',
    component: () => import(/* webpackChunkName: "about" */ '../views/ActivityManagementView.vue'),
  },
  {
    path: '/notification',
    name: 'notification',
    component: () => import(/* webpackChunkName: "about" */ '../views/NotificationView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
