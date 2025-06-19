import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "@/components/LoginForm.vue";
import home from "@/components/Home.vue";
import Signalement from "@/components/Signalement.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
    },
    {
      path: "/login",
      name: "login",
      component: LoginForm,
    },
    {
      path: "/signalement/:id",
      name: "Signalement",
      component: Signalement,
      props: true,
    },
  ],
});

export default router;
