<template>
  <Header />
  <HeroSection />
  <ImageSlider />
  <Services />
  <Schedule />
  <About />
  <Testimonials />
  <Blog />
  <Footer />
</template>

<script setup>
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";
import HeroSection from "../components/HeroSection.vue";
import ImageSlider from "../components/ImageSlider.vue";
import Schedule from "@/components/Schedule.vue";
import About from "../components/About.vue";
import Services from "../components/Services.vue";
import Testimonials from "../components/Testimonials.vue";
import Blog from "../components/Blog.vue";
import Footer from "../components/Footer.vue";

const router = useRouter();
const goToLogin = () => {
  router.push("/login");
};
</script>
