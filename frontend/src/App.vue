<script setup>
import MainBtn from "./components/MainBtn.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Header />
  <div class="main-content">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold text-center my-8">Welcome to My App</h1>
      <p class="text-center mb-4">This is a simple Vue.js application.</p>
      <MainBtn />
    </div>
  </div>
  <br /><br /><br /><br />
  <Footer />
</template>

<style scoped></style>
