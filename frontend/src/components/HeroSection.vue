<!-- filepath: c:\laragon\www\anas_law_website\frontend\src\components\HeroSection.vue -->
<template>
  <section
    class="w-full bg-gray-700 py-9 px-8"
    id="hero"
    style="
      background-image: url('../assets/images/makise_kurisu.png');
      background-size: 100%;
      background-position: center;
    "
  >
    <div
      class="mx-auto flex flex-col items-center lg:flex-row justify-center gap-10 py-40 max-w-[1440px] bg-no-repeat"
    >
      <img
        src="../assets/images/profile.jpg"
        alt="Profile Image"
        class="w-full max-w-xs md:max-w-sm lg:max-w-md rounded-lg shadow-lg"
      />
      <div
        class="w-[660px] flex-col justify-center items-start gap-20 inline-flex"
      >
        <div class="self-stretch flex-col justify-start items-start gap-5 flex">
          <h1 class="self-stretch">
            <span class="text-white text-5xl font-bold font-['Roboto']"
              >Law Office ANAS & Partners :</span
            ><br /><span
              class="text-[#D8A85D] text-5xl font-bold font-['Roboto']"
              >Professional and Reliable Legal Solutions</span
            >
          </h1>
          <p
            class="self-stretch text-white text-xl font-normal font-['Roboto']"
          >
            Is a professional and experienced law office in its field, upholding
            professionalism, professional ethics and loyalty, providing a
            variety of legal services to protect your legal rights and business
            activities wherever you are.
          </p>
        </div>
        <div class="justify-start items-center gap-5 inline-flex">
          <div class="justify-start items-center gap-2.5 flex"></div>
          <button
            class="px-8 py-2.5 bg-[#D8A85D] rounded-[10px] justify-center items-center gap-2.5 flex text-white text-sm font-semibold font-['Roboto']"
          >
            <a href="https://wa.me/+6282179972653" target="_blank"
              >Consult Now</a
            >
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
