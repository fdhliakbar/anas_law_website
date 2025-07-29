import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/Homepage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import BookingSchedule from "../views/BookingSchedule.vue";
import BookingForm from "../views/BookingForm.vue";
import PricingPage from "../views/PricingPage.vue";
import FreeChatBotTest from "../views/FreeChatBotTest.vue";
import ArticlePage from "../views/ArticlePage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage }, // tambahkan ini
  { path: "/booking", component: BookingSchedule },
  { path: "/pricing", component: PricingPage },
  { path: "/article", component: ArticlePage },
  { path: "/free-ai-test", component: FreeChatBotTest },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: () => import("../views/admin/Dashboard.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");
      if (!token) {
        next("/login");
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.role === "admin") {
          next();
        } else {
          next("/"); // Redirect non-admin users
        }
      } catch (error) {
        next("/login");
      }
    },
  },
  {
    path: "/admin/article-management",
    name: "ArticleManagement",
    component: () => import("../views/admin/ArticleManagement.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/booking-management",
    name: "BookingManagement",
    component: () => import("../views/admin/BookingManagement.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");
      if (!token) {
        next("/login");
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.role === "admin") {
          next();
        } else {
          next("/"); // Redirect non-admin users
        }
      } catch (error) {
        next("/login");
      }
    },
  },
  {
    path: "/admin/lawyer-management",
    name: "LawyerManagement",
    component: () => import("../views/admin/LawyerManagement.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");
      if (!token) {
        next("/login");
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.role === "admin") {
          next();
        } else {
          next("/"); // Redirect non-admin users
        }
      } catch (error) {
        next("/login");
      }
    },
  },
  {
    path: "/booking/:lawyerId",
    name: "BookingForm",
    component: () => import("../views/BookingForm.vue"),
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");
      if (!token) {
        next(`/login?redirect=${to.fullPath}`);
      } else {
        next();
      }
    },
  },
  {
    path: "/booking-success",
    name: "BookingSuccess",
    component: () => import("../views/BookingSuccess.vue"),
  },
  {
    path: "/my-bookings",
    name: "MyBookings",
    component: () => import("../views/MyBooking.vue"),
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");
      if (!token) {
        next(`/login?redirect=${to.fullPath}`);
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
