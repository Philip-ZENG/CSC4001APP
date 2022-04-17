import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'visitorHome',
    component: () => import(/* webpackChunkName: "about" */ '../views/VisitorHomeView.vue'),
  },
  {
    path: '/userHome',
    name: 'userHome',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserHomeView.vue'),
  },
  {
    path: '/adminConsole',
    name: 'adminConsole',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminConsoleView.vue'),
  },
  {
    path: '/userManagement',
    name: 'userManagement',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserManagementView.vue'),
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
    path: '/activityList/user_id=:user_id',
    name: 'activityList',
    component: () => import(/* webpackChunkName: "about" */ '../views/ActivityListView.vue'),
  },
  {
    path: '/activityManagement/user_id=:user_id/activity_id=:activity_id',
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
