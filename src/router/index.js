// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
    // import Home from "@/views/Home.vue";
    // import Signalements from "@/views/Signalements.vue";
    // import Evenements from "@/views/Evenements.vue";
    // import Login from "@/views/Login.vue";

const routes = [
//   { path: "/", name: "Home", component: Home },
//   { path: "/signalements", name: "Signalements", component: Signalements },
//   { path: "/evenements", name: "Evenements", component: Evenements },
//   { path: "/login", name: "Login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
