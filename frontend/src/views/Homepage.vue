<template>
  <Header />
  <HeroSection />
  <ImageSlider />
  <About />
  <Services />
  <LegalConsultingTrends />
  <Schedule />
  <Testimonials />
  <LegalAdvisorComparison />
  <OurTeamSlider />
  <TaxConsultation/>
  <Blog />
  <Footer />
  
  <!-- �️ Professional Anas Law AI ChatBot -->
  <SimpleChatBot />
</template>

<script setup>
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";
import HeroSection from "../components/HeroSection.vue";
import ImageSlider from "../components/ImageSlider.vue";
import Schedule from "@/components/Schedule.vue";
import About from "../components/About.vue";
import LegalConsultingTrends from "../components/LegalConsultingTrends.vue";
import Services from "../components/Services.vue";
import Testimonials from "../components/Testimonials.vue";
import TaxConsultation from "@/components/TaxConsultation.vue";
import OurTeamSlider from "@/components/OurTeamSlider.vue";
import Blog from "../components/Blog.vue";
import Footer from "../components/Footer.vue";
import LegalAdvisorComparison from "@/components/LegalAdvisorComparison.vue";
import SimpleChatBot from "@/components/SimpleChatBot.vue";

const router = useRouter();
const goToLogin = () => {
  router.push("/login");
};
</script>
