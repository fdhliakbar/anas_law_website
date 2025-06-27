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

// Mount the i18n instance first
app.use(i18n);
app.use(i18nWatcher, { i18n });
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

// Global error handler for missing translations
app.config.errorHandler = (err, instance, info) => {
  if (err.message.includes('Not found')) {
    console.warn('Translation missing:', err.message);
  } else {
    console.error('App error:', err, info);
  }
};

app.mount("#app");
