import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import "@splidejs/vue-splide/css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faGlobe,
  faMagnifyingGlass,
  faBook,
  faScaleBalanced,
} from "@fortawesome/free-solid-svg-icons";

import router from "./router";
import i18n from "./i18n";
import i18nWatcher from "./plugins/i18nWatcher";

library.add(faHeart, faGlobe, faMagnifyingGlass, faBook, faScaleBalanced);

AOS.init();

const app = createApp(App);

// Mount plugins in correct order
app.use(i18n);
app.use(router);

// Only use i18nWatcher if it exists and i18n is properly configured
try {
  if (i18n && i18n.global) {
    app.use(i18nWatcher, { i18n });
  }
} catch (error) {
  console.warn("i18nWatcher plugin failed to load:", error);
}

app.component("font-awesome-icon", FontAwesomeIcon);

// Handle redirect from 404 page
router.isReady().then(() => {
  const redirectPath = sessionStorage.getItem("redirectPath");
  if (redirectPath && redirectPath !== "/") {
    sessionStorage.removeItem("redirectPath");
    // Try to navigate to the intended path
    router.push(redirectPath).catch(() => {
      // If route doesn't exist, stay on homepage
      router.push("/");
    });
  }
});

// Global error handler for missing translations
app.config.errorHandler = (err, instance, info) => {
  if (err && err.message && err.message.includes("Not found")) {
    console.warn("Translation missing:", err.message);
  } else {
    console.error("App error:", err, info);
  }
};

app.mount("#app");
