import { createWebHashHistory, createRouter, RouteRecordRaw } from "vue-router";

const routes = <Array<RouteRecordRaw>>[
  { path: "/", redirect: "/login" },
  { path: "/login", component: () => import("../components/Login.vue") },
  {
    path: "/notebooks",
    component: () => import("../components/NotebookList.vue"),
  },
  {
    path: "/note/:noteId",
    component: () => import("../components/NoteDetail.vue"),
  },
  {
    path: "/trash/:noteId",
    component: () => import("../components/TrashDetail.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
