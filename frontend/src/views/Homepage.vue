<template>
  <Header />
  <HeroSection />
  <Services />
  <About />
  <Testimonials />
  <button @click="goToLogin">Go to Login</button>
  <Footer />
</template>

<script setup>
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";
import HeroSection from "../components/HeroSection.vue";
import About from "../components/About.vue";
import Services from "../components/Services.vue";
import Testimonials from "../components/Testimonials.vue";
import Footer from "../components/Footer.vue";

const router = useRouter();
const goToLogin = () => {
  router.push("/login");
};
</script>
