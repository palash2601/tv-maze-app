import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/showDetails/:id",
      name: "showDetails",
      component: () => import("../views/ShowDetails.vue"),
    },
  ],
});

export default router;
