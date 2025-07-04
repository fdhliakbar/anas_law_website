import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/Homepage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue"; // tambahkan ini
import BookingSchedule from "../views/BookingSchedule.vue";
import BookingForm from "../views/BookingForm.vue";
import chat from "../views/chat.vue";
import PricingPage from "../views/PricingPage.vue";
import FreeChatBotTest from "../views/FreeChatBotTest.vue";
import ArticlePage from "../views/ArticlePage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage }, // tambahkan ini
  { path: "/chat", component: chat },
  { path: "/booking", component: BookingSchedule },
  { path: "/booking-form/:id?", component: BookingForm, name: "BookingForm" },
  { path: "/pricing", component: PricingPage },
  { path: "/article", component: ArticlePage },
  { path: "/free-ai-test", component: FreeChatBotTest },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: () => import("@/views/admin/Dashboard.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
