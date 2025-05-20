<!-- filepath: c:\laragon\www\anas_law_website\frontend\src\components\Testimonials.vue -->
<template>
  <div class="py-5 bg-[#F6F9E1]">
    <div
      class="container flex flex-col items-center justify-center w-full p-6 mx-auto text-center xl:px-0"
    >
      <div class="text-sm font-bold tracking-wider text-indigo-600 uppercase">
        Testimoni
      </div>
      <h2
        class="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl"
      >
        Kata Klien Kami
      </h2>
      <p
        class="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl"
      >
        Testimonials is a great way to increase brand trust and awareness. Use
        this section to highlight your popular customers.
      </p>
    </div>
    <div class="container p-6 mx-auto mb-10 xl:px-0">
      <div class="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <div class="lg:col-span-2 xl:col-auto">
          <div
            class="flex flex-col justify-between w-full h-full px-6 py-6 bg-white shadow-md md:px-14 rounded-2xl md:py-14"
            data-aos="fade-zoom-in"
          >
            <p class="text-2xl leading-normal text-gray-700">
              Share a
              <mark
                class="mx-1 text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4"
                >testimonial</mark
              >
              that hits some of your benefits from one of your popular
              customers.
            </p>
            <div class="flex items-center mt-8 space-x-3">
              <div class="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
                <img
                  alt="Avatar"
                  src="../assets/images/icons/Frieren.jpeg"
                  loading="lazy"
                />
              </div>
              <div>
                <div class="text-lg font-medium text-gray-800">
                  Sarah Steiner
                </div>
                <div class="text-gray-500">VP Sales at Google</div>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <div
            class="flex flex-col justify-between w-full h-full px-6 py-6 bg-white shadow-md md:px-14 rounded-2xl md:py-14"
            data-aos="fade-zoom-in"
          >
            <p class="text-2xl leading-normal text-gray-700">
              Make sure you only pick the
              <mark
                class="mx-1 text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4"
                >right sentence</mark
              >
              to keep it short and simple.
            </p>
            <div class="flex items-center mt-8 space-x-3">
              <div class="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
                <img
                  alt="Avatar"
                  src="../assets/images/icons/Frieren.jpeg"
                  loading="lazy"
                />
              </div>
              <div>
                <div class="text-lg font-medium text-gray-800">
                  Dylan Ambrose
                </div>
                <div class="text-gray-500">Lead marketer at Netflix</div>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <div
            class="flex flex-col justify-between w-full h-full px-6 py-6 bg-white shadow-md md:px-14 rounded-2xl md:py-14"
            data-aos="fade-zoom-in"
          >
            <p class="text-2xl leading-normal text-gray-700">
              This is an
              <mark
                class="mx-1 text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4"
                >awesome</mark
              >
              landing page template I've seen. I would use this for anything.
            </p>
            <div class="flex items-center mt-8 space-x-3">
              <div class="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
                <img
                  alt="Avatar"
                  src="../assets/images/icons/Frieren.jpeg"
                  loading="lazy"
                />
              </div>
              <div>
                <div class="text-lg font-medium text-gray-800">
                  Gabrielle Winn
                </div>
                <div class="text-gray-500">Co-founder of Acme Inc</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  mounted() {
    AOS.init({
      once: false,
      duration: 1000,
      easing: "ease-in-out-back",
    });
  },
};
</script>
<style scoped></style>
