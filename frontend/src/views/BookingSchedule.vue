<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";

const showLoginModal = ref(false);

// Dummy data for lawyers/lawyers
const lawyers = [
  {
    id: 1,
    name: "Anas Nazarudin",
    specialty: "Lawyer",
    experience: 5,
    rating: 97,
    fee: 25000,
    oldFee: 28000,
    photo: "../src/assets/images/founder.jpg",
    available: true,
  },
  {
    id: 2,
    name: "Andi Saputra",
    specialty: "Lawyer",
    experience: 4,
    rating: 94,
    fee: 25000,
    oldFee: 28000,
    photo: "../src/assets/images/cofounder.jpg",
    available: true,
  },
  {
    id: 3,
    name: "Rusdi Saputra",
    specialty: "Lawyer",
    experience: 4,
    rating: 94,
    fee: 25000,
    oldFee: 28000,
    photo: "../src/assets/images/2.jpg",
    available: true,
  },
  {
    id: 4,
    name: "Riko Saputra",
    specialty: "Lawyer",
    experience: 4,
    rating: 94,
    fee: 25000,
    oldFee: 28000,
    photo: "../src/assets/images/4.jpg",
    available: true,
  },
  {
    id: 5,
    name: "Andi Saputra",
    specialty: "Lawyer",
    experience: 4,
    rating: 94,
    fee: 25000,
    oldFee: 28000,
    photo: "../src/assets/images/cofounder.jpg",
    available: true,
  },
  {
    id: 6,
    name: "Andi Saputra",
    specialty: "Lawyer",
    experience: 4,
    rating: 94,
    fee: 25000,
    oldFee: 28000,
    photo: "../src/assets/images/cofounder.jpg",
    available: true,
  },
];

const specializations = [
  { name: "Umum", icon: "🩺" },
  { name: "Demam", icon: "🤒" },
  { name: "Pencernaan", icon: "🦠" },
  { name: "Kehamilan", icon: "🤰" },
  { name: "Anak", icon: "👶" },
];

const search = ref("");
const filteredlawyers = computed(() => {
  if (!search.value) return lawyers;
  return lawyers.filter(
    (d) =>
      d.name.toLowerCase().includes(search.value.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.value.toLowerCase())
  );
});

// Tambahkan FAQ ke dalam script setup
const faqs = [
  {
    question: "Bagaimana cara melakukan konsultasi dengan Anas Law?",
    answer:
      "Anda dapat melakukan konsultasi dengan menghubungi kami melalui website resmi, WhatsApp, atau datang langsung ke kantor kami. Pilih jadwal konsultasi yang tersedia, kemudian tim kami akan menghubungi Anda untuk konfirmasi dan penjelasan lebih lanjut mengenai proses konsultasi.",
  },
  {
    question: "Apakah konsultasi di Anas Law bersifat rahasia?",
    answer:
      "Ya, seluruh proses konsultasi dan data klien dijamin kerahasiaannya sesuai dengan kode etik profesi advokat. Kami berkomitmen menjaga privasi dan keamanan informasi setiap klien.",
  },
  {
    question: "Apakah bisa konsultasi tanpa harus datang ke kantor?",
    answer:
      "Tentu saja. Anda dapat melakukan konsultasi secara online melalui video call, telepon, atau chat. Layanan ini memudahkan Anda untuk mendapatkan bantuan hukum tanpa harus datang ke kantor, sehingga lebih fleksibel dan efisien.",
  },
];

// Import gambar slider
import timeIcon from "../assets/images/icons/time.png";
import scaleIcon from "../assets/images/icons/scale.png";
import groupIcon from "../assets/images/icons/group.png";

const sliderImages = [timeIcon, scaleIcon, groupIcon];

// State untuk slider
const activeSlide = ref(0);
const splideRef = ref<any>(null);

function goToSlide(idx: number) {
  activeSlide.value = idx;
  if (splideRef.value) {
    splideRef.value.go(idx);
  }
}
</script>

<template>
  <Header />
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <div class="p-8 md:pt-30 flex flex-col gap-8">
      <!-- Left: Info & Why Choose -->
      <div
        class="w-full bg-white rounded-lg shadow p-6 flex flex-col justify-between"
      >
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-center mb-2">
            Konsultasi Hukum di Anas Law
          </h1>
          <p class="text-center text-gray-500 mb-6">
            Layanan konsultasi hukum online terpercaya untuk semua kebutuhan
            hukum Anda.
          </p>
          <div class="flex justify-center mb-4">
            <div class="w-40 sm:w-56">
              <Splide
                :options="{
                  perPage: 1,
                  gap: '10px',
                  pagination: false,
                  arrows: false,
                  autoplay: true,
                  interval: 2000,
                  type: 'loop',
                  pauseOnHover: false,
                  pauseOnFocus: false,
                }"
                v-model="activeSlide"
                ref="splideRef"
                @moved="activeSlide = $event"
                class="w-full"
              >
                <SplideSlide v-for="(img, i) in sliderImages" :key="i">
                  <img
                    :src="img"
                    alt="icon"
                    class="w-20 h-20 sm:w-28 sm:h-28 border-white shadow mx-auto object-cover"
                  />
                </SplideSlide>
              </Splide>
            </div>
          </div>
          <!-- Titik navigasi slider -->
          <div class="flex justify-center mb-12">
            <span
              v-for="(img, idx) in sliderImages"
              :key="idx"
              class="h-2 w-2 rounded-full mx-1 inline-block cursor-pointer"
              :class="activeSlide === idx ? 'bg-indigo-500' : 'bg-indigo-200'"
              @click="goToSlide(idx)"
            ></span>
          </div>
          <p class="text-center font-medium mb-4">
            Pilih dari <span class="text-indigo-500">100+</span> pengacara
            berpengalaman di berbagai bidang hukum.
          </p>

          <h2 class="font-bold text-lg mb-2">
            Mengapa Konsultasi Hukum di Anas Law?
          </h2>
          <ul class="space-y-3 text-gray-700">
            <li class="flex items-start gap-2">
              <span class="text-2xl">📱</span>
              <span>
                Satu platform untuk semua kebutuhan hukum Anda, mulai dari
                konsultasi hingga pendampingan hukum.
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-2xl">🏥</span>
              <span>
                Dapatkan layanan konsultasi hukum dari pengacara terbaik di
                bidangnya, siap membantu Anda kapan saja.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Right: Search & Doctor List -->
      <div class="w-full flex flex-col gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex flex-col gap-2">
            <input
              v-model="search"
              type="text"
              placeholder="Cari dokter, spesialis atau gejala"
              class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Rekomendasi Lawyer</h2>
          <div
            class="doctor-list grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-h-96 overflow-y-auto"
          >
            <div
              v-for="doctor in filteredlawyers"
              :key="doctor.id + doctor.name"
              class="flex flex-col md:flex-row items-center md:items-start bg-gray-50 rounded-lg p-4"
            >
              <img
                :src="doctor.photo"
                alt="doctor"
                class="w-20 h-20 rounded-full object-cover mb-2 md:mb-0 md:mr-4 border-2 border-indigo-200"
              />
              <div class="flex-1">
                <div class="font-semibold">{{ doctor.name }}</div>
                <div class="text-sm text-gray-500 mb-2">
                  {{ doctor.specialty }}
                </div>
                <div class="flex items-center gap-2 text-xs text-gray-600 mb-2">
                  <span>{{ doctor.experience }} tahun</span>
                  <span>·</span>
                  <span>{{ doctor.rating }}%</span>
                </div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-black font-bold text-lg"
                    >Rp {{ doctor.fee.toLocaleString() }}</span
                  >
                  <span class="line-through text-gray-400 text-sm"
                    >Rp {{ doctor.oldFee.toLocaleString() }}</span
                  >
                </div>
              </div>
              <router-link
                to="/chat"
                class="bg-indigo-400 text-white px-4 py-2 rounded font-semibold hover:bg-indigo-500 transition mt-2 md:mt-0 md:ml-4 flex items-center justify-center"
              >
                Chat
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- FAQ for Counseling -->

  <h2 class="mb-8 text-2xl font-bold text-gray-800 p-4">
    FAQ Konsultasi di Anas Law
  </h2>
  <div
    v-for="(faq, idx) in faqs"
    :key="idx"
    class="mb-8 p-5 bg-white rounded shadow-sm text-left"
  >
    <h3 class="text-lg font-semibold mb-2 text-gray-900">
      {{ faq.question }}
    </h3>
    <p class="text-gray-700 leading-relaxed">{{ faq.answer }}</p>
  </div>

  <!-- Footer -->
  <Footer />
</template>
