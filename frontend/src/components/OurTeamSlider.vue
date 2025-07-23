<template>
  <section :style="{ background: '#35478C' }" class="py-16">
    <div class="max-w-6xl mx-auto px-4">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between mb-10"
      >
        <h2 class="text-4xl font-bold text-white mb-6 md:mb-0">
          Strong Advocates, Committed<br />To Your Success
        </h2>
        
      </div>
      <div class="relative flex items-center justify-center">
        <div
          class="flex gap-8 overflow-hidden w-full"
          style="min-height: 330px"
        >
          <div
            v-for="(member, idx) in visibleMembers"
            :key="member.name"
            class="flex flex-col items-center flex-1 cursor-pointer"
            @click="nextSlide"
          >
            <div
              class="rounded-full border-4 mb-4 flex items-center justify-center transition-all duration-300 overflow-hidden"
              :style="{
                borderColor: '#F5F8E0',
                width: idx === 1 ? '190px' : '160px',
                height: idx === 1 ? '230px' : '190px',
                background: '#fff',
                padding: '5px',
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
                  objectFit: 'cover',
                }"
              />
            </div>
            <div class="text-center">
              <p class=" text-lg text-white">{{ member.name }}</p>
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
    name: "Dr.(c) Wahyudi, S.H., M.H. Kes",
    role: "Senior Partner",
    image: "/images/2.jpg",
  },
  {
    name: "Durohim Amnan, S.H., M.H.",
    role: "Partner",
    image: "/images/3.jpg",
  },
  {
    name: "Dewi Indri Lestari, S.H.",
    role: "Partner",
    image: "/images/4.jpg",
  },
  {
    name: "Lalu Hartawan Mandala Putra, S.H., C.me.",
    role: "Partner",
    image: "/images/6.jpg",
  },
  {
    name: "Raspan Afandi, S.H.",
    role: "Associate",
    image: "/images/7.jpg",
  },
  {
    name: "Gilang Wahyudin, S.H",
    role: "Associate",
    image: "/images/8.jpg",
  },
  {
    name: "Muhammad Ainun Najib Surahman, S.H., LLM",
    role: "Founder & Managing Partner",
    image: "/images/founder.jpg",
  },
  {
    name: "Anggi Saputra, S.H., LLM",
    role: "Founder & Managing Partner",
    image: "/images/cofounder.jpg",
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
