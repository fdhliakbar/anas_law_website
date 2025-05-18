<script setup>
import Header from "./components/Header.vue";
import HeroSection from "./components/HeroSection.vue";
import About from "./components/About.vue";
import Services from "./components/Services.vue";
import OurTeam from "./components/OurTeam.vue";
import Testimonials from "./components/Testimonials.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <router-view></router-view>
</template>


<script>
export default {
  name: "App",
};
</script>

<style scoped></style>
