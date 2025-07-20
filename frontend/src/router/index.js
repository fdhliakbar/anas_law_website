import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/Homepage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue"; // tambahkan ini
import BookingSchedule from "../views/BookingSchedule.vue";
import BookingForm from "../views/BookingForm.vue";
import PricingPage from "../views/PricingPage.vue";
import FreeChatBotTest from "../views/FreeChatBotTest.vue";
import ArticlePage from "../views/ArticlePage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/booking", component: BookingSchedule },
  { path: "/booking-form/:id?", component: BookingForm, name: "BookingForm" },
  { path: "/pricing", component: PricingPage },
  { path: "/article", component: ArticlePage },
  { path: "/free-ai-test", component: FreeChatBotTest },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: () => import("@/views/admin/Dashboard.vue"),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: "/admin/article-management",
    name: "ArticleManagement",
    component: () => import("@/views/admin/ArticleManagement.vue"),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  
  if (to.meta.requiresAuth) {
    if (!token) {
      // Redirect to home page if not authenticated
      next('/')
      return
    }
    
    if (to.meta.requiresAdmin && user.role !== 'admin') {
      // Redirect to home page if not admin
      next('/')
      return
    }
  }
  
  next()
})

export default router;
