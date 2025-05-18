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
} from "@fortawesome/free-solid-svg-icons"; // Tambahkan faMagnifyingGlass

import router from "./router";
// web component from lottie(gak jadi)
// import "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";

library.add(faHeart, faGlobe, faMagnifyingGlass, faBook, faScaleBalanced); // Tambahkan ke library

AOS.init();

const app = createApp(App);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
