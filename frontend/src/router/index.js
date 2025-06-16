import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/Homepage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import PricingPage from "../views/PricingPage.vue";
import AboutPage from "../views/AboutPage.vue";

const routes = [
  { 
    path: "/", 
    name: "Home",
    component: HomePage 
  },
  { 
    path: "/login", 
    name: "Login",
    component: LoginPage 
  },
  { 
    path: "/register", 
    name: "Register",
    component: RegisterPage 
  },
  { 
    path: "/pricing", 
    name: "Pricing",
    component: PricingPage 
  },
  { 
    path: "/about", 
    name: "About",
    component: AboutPage 
  },
  // Redirect untuk handling 404
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Scroll behavior untuk smooth navigation
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// Navigation guard untuk protected routes
router.beforeEach((to, from, next) => {
  // Add any authentication logic here if needed
  next();
});

export default router;
