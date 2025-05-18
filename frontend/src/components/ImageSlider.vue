<template>
  <div class="px-8">
    <Splide
      :options="splideOptions"
      aria-label="Image Slider"
      class="rounded-2xl overflow-hidden"
    >
      <SplideSlide v-for="(img, index) in images" :key="index">
        <div class="px-2">
          <img :src="img" class="w-full h-64 object-cover" />
        </div>
      </SplideSlide>
    </Splide>
  </div>
</template>

<script setup>
import { Splide, SplideSlide } from "@splidejs/vue-splide";

const images = [
  "/src/assets/images/justice.jpg",
  "/src/assets/images/justice.jpg",
  "/src/assets/images/justice.jpg",
  "/src/assets/images/justice.jpg",
  "/src/assets/images/justice.jpg",
];

const splideOptions = {
  type: "loop",
  perPage: 3,
  perMove: 1,
  autoplay: true,
  interval: 3000,
  pauseOnHover: true,
  arrows: true,
  pagination: true,
  breakpoints: {
    768: {
      perPage: 1,
    },
    1024: {
      perPage: 2,
    },
  },
};
</script>
