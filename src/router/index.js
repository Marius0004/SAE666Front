import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "@/components/LoginForm.vue";
import home from "@/components/Home.vue";
import Signalement from "@/components/Signalement.vue";
import Nous from "@/components/Rive.vue";
import Profil from "@/components/Profil.vue";
import SignalementSection from "@/components/SignalerSection.vue";
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
    {
      path: "/signalements",
      name: "Signalements",
      component: SignalementSection,
    },
    {
      path: "/nous",
      name: "Nous",
      component:Nous
    },
    {
      path: "/profil",
      name: "profil",
      component:Profil
    }
  ],
});

export default router;
