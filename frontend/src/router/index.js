import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/Homepage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue"; // tambahkan ini
import BookingSchedule from "../views/BookingSchedule.vue";
import chat from "../views/chat.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage }, // tambahkan ini
  { path: "/chat", component: chat },
  { path: "/booking", component: BookingSchedule },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
