<script setup>
import Header from '../components/Header.vue'
import HeroSection from '../components/HeroSection.vue'
import About from '../components/About.vue'
import Services from '../components/Services.vue'
import OurTeam from '../components/OurTeam.vue'
import Testimonials from '../components/Testimonials.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <Header />
  <HeroSection />
  <ImageSlider />
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
import ImageSlider from "../components/ImageSlider.vue";
import About from "../components/About.vue";
import Services from "../components/Services.vue";
import Testimonials from "../components/Testimonials.vue";
import Footer from "../components/Footer.vue";

const router = useRouter();
const goToLogin = () => {
  router.push("/login");
};
</script>
