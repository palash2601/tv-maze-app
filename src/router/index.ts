import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // scrollBehavior(to, from, savedPosition) {
  //   console.log({to, from, savedPosition})
  //   // always scroll to top
  //   if (savedPosition) {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         resolve(savedPosition)
  //       }, 500)
  //     })
  //   } else {
  //     return { top: 0 }
  //   }
  // },
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/showDetails/:id",
      name: "showDetails",
      component: () => import("../views/ShowDetails.vue"),
    },
  ],
});

export default router;
