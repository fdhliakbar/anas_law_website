<template>
  <section :style="{ background: '#35478C' }" class="py-16">
    <div class="max-w-6xl mx-auto px-4">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between mb-10"
      >
        <h2 class="text-4xl font-bold text-white mb-6 md:mb-0">
          Strong Advocates, Committed<br />To Your Success
        </h2>
        <button
          class="px-8 py-3 rounded-full font-semibold text-lg"
          :style="{ background: '#F5F8E0', color: '#222' }"
        >
          <RouterLink to="/team" class="text-black">
            Meet Our Team
          </RouterLink>
        </button>
      </div>
      <div class="relative flex items-center justify-center">
        <div
          class="flex gap-8 overflow-hidden w-full"
          style="min-height: 320px"
        >
          <div
            v-for="(member, idx) in visibleMembers"
            :key="member.name"
            class="flex flex-col items-center flex-1 cursor-pointer"
            @click="nextSlide"
          >
            <div
              class="rounded-full border-4 mb-4 flex items-center justify-center transition-all duration-300"
              :style="{
                borderColor: '#F5F8E0',
                width: idx === 1 ? '180px' : '150px',
                height: idx === 1 ? '220px' : '180px',
                boxShadow: idx === 1 ? '0 0 0 6px #F5F8E0' : 'none',
                background: '#fff',
              }"
            >
              <img
                :src="member.image"
                :alt="member.name"
                class="object-cover rounded-full"
                :style="{
                  width: idx === 1 ? '170px' : '140px',
                  height: idx === 1 ? '210px' : '170px',
                  filter: idx === 1 ? 'none' : 'grayscale(30%)',
                  transition: 'all 0.3s',
                }"
              />
            </div>
            <div class="text-center">
              <p class="font-bold text-lg text-white">{{ member.name }}</p>
              <p class="text-[#F5F8E0] text-sm">{{ member.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const team = [
  {
    name: "Chris Rachuba",
    role: "Senior Partner",
    image: "/src/assets/images/2.jpg",
  },
  {
    name: "Kelly Scanlon",
    role: "Legal Analyst",
    image: "/src/assets/images/3.jpg",
  },
  {
    name: "Shirley D. Stone",
    role: "Senior Legal Advisor",
    image: "/src/assets/images/4.jpg",
  },
  {
    name: "Tirto Adhi Wibowo",
    role: "Compliance Specialist",
    image: "/src/assets/images/6.jpg",
  },
  {
    name: "Ahmad Nazarudin",
    role: "Corporate Consultant",
    image: "/src/assets/images/founder.jpg",
  },
  {
    name: "Riko Simajuntak",
    role: "Criminal Law Expert",
    image: "/src/assets/images/cofounder.jpg",
  },
];

const current = ref(0);
const visibleCount = 3;

const getVisible = () => {
  const arr = [];
  for (let i = 0; i < visibleCount; i++) {
    arr.push(team[(current.value + i) % team.length]);
  }
  return arr;
};
const visibleMembers = ref(getVisible());

function nextSlide() {
  current.value = (current.value + 1) % team.length;
  visibleMembers.value = getVisible();
}

let interval = null;
onMounted(() => {
  interval = setInterval(nextSlide, 2000);
});
onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<style scoped>
/* Responsive tweaks */
@media (max-width: 900px) {
  .flex > div {
    min-width: 33%;
  }
}
@media (max-width: 600px) {
  .flex > div {
    min-width: 100%;
  }
}
</style>
