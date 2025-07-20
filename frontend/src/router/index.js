import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/Homepage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue"; // tambahkan ini
import BookingSchedule from "../views/BookingSchedule.vue";
import chat from "../views/chat.vue";
import PricingPage from "../views/PricingPage.vue";
<<<<<<< HEAD
import FreeChatBotTest from "../views/FreeChatBotTest.vue";
import ArticlePage from "../views/ArticlePage.vue";
=======
>>>>>>> 0cd1d6d16123eb354a5b776bd68e96c7b6759af9

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage }, // tambahkan ini
  { path: "/chat", component: chat },
  { path: "/booking", component: BookingSchedule },
  { path: "/pricing", component: PricingPage },
  { path: "/article", component: ArticlePage },
  { path: "/free-ai-test", component: FreeChatBotTest },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: () => import("@/views/admin/Dashboard.vue"),
  },
  { path: "/pricing", component: PricingPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
