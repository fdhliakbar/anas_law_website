import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/Homepage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue"; // tambahkan ini
import BookingSchedule from "../views/BookingSchedule.vue";
import chat from "../views/chat.vue";
import PricingPage from "../views/PricingPage.vue";
import FreeChatBotTest from "../views/FreeChatBotTest.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage }, // tambahkan ini
  { path: "/chat", component: chat },
  { path: "/booking", component: BookingSchedule },
  { path: "/pricing", component: PricingPage },
  { path: "/free-ai-test", component: FreeChatBotTest },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: () => import("@/views/admin/Dashboard.vue"),
  },
  {
    path: "/articles",
    name: "PublicArticlesList",
    component: () => import("@/views/PublicArticlesList.vue"),
  },
  {
    path: "/admin/article-management",
    name: "ArticleManagement",
    component: () => import("@/views/admin/ArticleManagement.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
