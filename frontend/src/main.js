import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";

import AOS from "aos";
import "aos/dist/aos.css";
import Splide from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';



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

// Tambahkan semua icon ke library
library.add(faHeart, faGlobe, faMagnifyingGlass, faBook, faScaleBalanced);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);

// Gunakan router
app.use(router);
app.use(Splide);
app.mount("#app");
AOS.init();

