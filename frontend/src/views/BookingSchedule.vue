<script setup lang="ts">
import { ref, computed } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import ModalLogin from "../components/ModalLogin.vue";
const showLoginModal = ref(false);

// Dummy data for doctors/lawyers
const doctors = [
  {
    id: 1,
    name: "Dr. Jessica Lepianda",
    specialty: "Dokter Umum",
    experience: 11,
    rating: 97,
    fee: 25000,
    oldFee: 28000,
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Albert Lim",
    specialty: "Dokter Umum",
    experience: 9,
    rating: 94,
    fee: 25000,
    oldFee: 28000,
    photo: "https://randomuser.me/api/portraits/men/46.jpg",
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
const filteredDoctors = computed(() => {
  if (!search.value) return doctors;
  return doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.value.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.value.toLowerCase())
  );
});

// Tambahkan FAQ ke dalam script setup
const faqs = [
  {
    question: "Apa saja jenis konsultasi yang tersedia di Anas Law?",
    answer:
      "Anas Law menyediakan berbagai layanan konsultasi hukum, baik secara online maupun offline. Layanan meliputi konsultasi perdata, pidana, bisnis, keluarga, waris, pertanahan, dan bidang hukum lainnya. Setiap konsultasi dilakukan oleh advokat profesional yang berpengalaman di bidangnya.",
  },
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
    question: "Berapa biaya konsultasi di Anas Law?",
    answer:
      "Biaya konsultasi di Anas Law bervariasi tergantung pada jenis kasus, tingkat kesulitan, dan durasi konsultasi. Untuk informasi detail mengenai tarif, silakan hubungi customer service kami agar mendapatkan estimasi biaya yang sesuai kebutuhan Anda.",
  },
  {
    question: "Apakah bisa konsultasi tanpa harus datang ke kantor?",
    answer:
      "Tentu saja. Anda dapat melakukan konsultasi secara online melalui video call, telepon, atau chat. Layanan ini memudahkan Anda untuk mendapatkan bantuan hukum tanpa harus datang ke kantor, sehingga lebih fleksibel dan efisien.",
  },
  {
    question: "Siapa saja yang dapat menggunakan layanan konsultasi Anas Law?",
    answer:
      "Layanan konsultasi hukum Anas Law terbuka untuk individu, perusahaan, organisasi, maupun komunitas yang membutuhkan bantuan atau pendampingan hukum.",
  },
  {
    question:
      "Apakah Anas Law menyediakan layanan pendampingan hukum di pengadilan?",
    answer:
      "Ya, selain konsultasi, Anas Law juga menyediakan layanan pendampingan dan representasi hukum di pengadilan, mulai dari tahap mediasi, persidangan, hingga eksekusi putusan.",
  },
];
</script>

<template>
  <Header />
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <div class="flex p-8 md:pt-30">
      <!-- Left: Info & Why Choose -->
      <div
        class="md:w-1/2 w-full bg-white rounded-lg shadow p-6 flex flex-col justify-between"
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
            <div class="flex -space-x-4">
              <img
                v-for="n in 4"
                :key="n"
                :src="'https://randomuser.me/api/portraits/lego/' + n + '.jpg'"
                class="w-12 h-12 rounded-full border-2 border-white shadow"
              />
              <div
                class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white shadow text-3xl"
              >
                <span>✔️</span>
              </div>
            </div>
          </div>
          <p class="text-center font-medium mb-4">
            Pilih dari <span class="text-pink-600">100+</span> pengacara
            berpengalaman di berbagai bidang hukum.
          </p>
          <div class="flex justify-center mb-12">
            <span
              class="h-2 w-2 bg-pink-500 rounded-full mx-1 inline-block"
            ></span>
            <span
              class="h-2 w-2 bg-pink-200 rounded-full mx-1 inline-block"
            ></span>
            <span
              class="h-2 w-2 bg-pink-200 rounded-full mx-1 inline-block"
            ></span>
          </div>
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
      <div class="md:w-1/2 w-full flex flex-col gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex flex-col gap-2">
            <input
              v-model="search"
              type="text"
              placeholder="Cari dokter, spesialis atau gejala"
              class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Rekomendasi Dokter</h2>
          <div class="flex flex-col md:flex-row gap-4">
            <div
              v-for="doctor in filteredDoctors"
              :key="doctor.id"
              class="flex flex-col md:flex-row items-center md:items-start bg-gray-50 rounded-lg p-4 flex-1"
            >
              <img
                :src="doctor.photo"
                alt="doctor"
                class="w-20 h-20 rounded-full object-cover mb-2 md:mb-0 md:mr-4 border-2 border-pink-200"
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
                  <span class="text-pink-600 font-bold text-lg"
                    >Rp {{ doctor.fee.toLocaleString() }}</span
                  >
                  <span class="line-through text-gray-400 text-sm"
                    >Rp {{ doctor.oldFee.toLocaleString() }}</span
                  >
                </div>
              </div>
              <button
                class="bg-pink-600 text-white px-4 py-2 rounded font-semibold hover:bg-pink-700 transition mt-2 md:mt-0 md:ml-4"
                @click="showLoginModal = true"
              >
                Chat
              </button>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Cari Dokter atau Spesialisasi</h2>
          <div class="flex flex-wrap gap-4 justify-center">
            <div
              v-for="spec in specializations"
              :key="spec.name"
              class="flex flex-col items-center w-20"
            >
              <div
                class="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-3xl mb-2"
              >
                {{ spec.icon }}
              </div>
              <span class="text-sm text-center">{{ spec.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalLogin v-if="showLoginModal" @close="showLoginModal = false" />
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
