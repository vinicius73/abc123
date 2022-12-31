import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

import Math from './pages/Math.vue';
import Abc from './pages/Abc.vue';

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
  {
    path: '/abc',
    name: 'abc',
    component: Abc,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
