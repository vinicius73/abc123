import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

import Home from './pages/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
})