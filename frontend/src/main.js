import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";

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

// Tambahkan semua icon ke library
library.add(faHeart, faGlobe, faMagnifyingGlass, faBook, faScaleBalanced);

// Buat satu instance app saja
const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);

// Inisialisasi AOS setelah DOM siap
app.mount("#app");
AOS.init();
