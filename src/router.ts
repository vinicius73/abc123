import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

import Math from './pages/Math.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/123',
  },
  {
    path: '/123',
    name: 'math',
    component: Math,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
