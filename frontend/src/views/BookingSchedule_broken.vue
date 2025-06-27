<template>
  <Header />
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="w-full bg-white py-24 px-4">
      <div class="max-w-5xl mx-auto flex flex-col items-center text-center">
        <h1 class="font-bold text-5xl md:text-7xl text-black mb-8 leading-tight">
          {{ $t('booking.title') }}
        </h1>
        <p class="text-lg md:text-xl text-black mb-12">
          {{ $t('booking.subtitle') }}<br />
          {{ $t('booking.chooseFrom') }}
        </p>        <div class="flex flex-col md:flex-row gap-4">
          <button
            @click="scrollToLawyers"
            class="border border-black bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold transition hover:bg-gray-800"
          >
            {{ $t('booking.scheduleNow') }}
          </button>
          <button
            @click="goToChat"
            class="border border-black text-black px-8 py-4 rounded-lg text-lg font-semibold bg-white hover:bg-black hover:text-white transition"
          >
            {{ $t('booking.getInTouch') }}
          </button>
        </div>
      </div>
    </section>

    <!-- Why Choose Section -->
    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-5xl mx-auto">
        <h2 class="font-bold text-4xl md:text-5xl text-black text-center mb-12">
          {{ $t('booking.whyChoose') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex items-start gap-4">
            <div class="text-4xl">📱</div>
            <div>
              <h3 class="font-bold text-xl text-black mb-2">{{ $t('booking.onePlatform') }}</h3>
              <p class="text-gray-600">
                {{ $t('booking.onePlatformDesc') }}
              </p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="text-4xl">🏛️</div>
            <div>
              <h3 class="font-bold text-xl text-black mb-2">{{ $t('booking.expertServices') }}</h3>
              <p class="text-gray-600">
                {{ $t('booking.expertServicesDesc') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lawyers Section -->
    <section id="lawyers-section" class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <!-- Search -->
        <div class="max-w-2xl mx-auto mb-12">
          <input
            v-model="search"
            type="text"
            :placeholder="$t('booking.searchPlaceholder')"
            class="w-full border-2 border-gray-300 rounded-lg px-6 py-4 text-lg focus:outline-none focus:border-black transition"
          />
        </div>

        <!-- Lawyers Grid -->
        <h2 class="font-bold text-4xl text-black text-center mb-12">{{ $t('booking.recommendedAttorneys') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="lawyer in filteredLawyers"
            :key="lawyer.id"
            class="bg-white border border-gray-200 rounded-xl p-6 hover:border-black transition-all duration-300"
          >
            <div class="text-center mb-4">
              <img
                :src="lawyer.photo"
                :alt="lawyer.name"
                class="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-gray-200"
              />
              <h3 class="font-bold text-xl text-black">{{ lawyer.name }}</h3>
              <p class="text-gray-600 mb-2">{{ lawyer.specialty }}</p>
              <div class="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4">
                <span>{{ lawyer.experience }} {{ $t('booking.years') }}</span>
                <span>{{ lawyer.rating }}% {{ $t('booking.successRate') }}</span>
              </div>
            </div>
            
            <div class="text-center">
              <div class="mb-4">
                <span class="text-2xl font-bold text-black">${{ lawyer.fee.toLocaleString() }}</span>
                <span class="text-gray-500 line-through ml-2">${{ lawyer.oldFee.toLocaleString() }}</span>
              </div>
              <button
                class="w-full border border-black bg-black text-white py-3 px-6 rounded-lg font-semibold transition hover:bg-gray-800"
              >
                {{ $t('booking.bookConsultation') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <h2 class="font-bold text-4xl text-black text-center mb-12">{{ $t('booking.faq') }}</h2>
        <div class="space-y-6">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white rounded-lg border border-gray-200 p-6"
          >
            <button
              @click="toggleFaq(index)"
              class="flex justify-between items-center w-full text-left"
            >
              <h3 class="font-bold text-lg text-black">{{ faq.question }}</h3>
              <i
                :class="activeFaq === index ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
                class="text-gray-500"
              ></i>
            </button>
            <div
              v-if="activeFaq === index"
              class="mt-4 text-gray-600"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="py-16 px-4 bg-gray-900 text-white">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="font-bold text-4xl md:text-5xl mb-8">
          {{ $t('booking.readyToGetHelp') }}
        </h2>
        <p class="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          {{ $t('booking.readyToGetHelpDesc') }}
        </p>        <div class="flex flex-col md:flex-row gap-4 justify-center">
          <button
            @click="goToPricing"
            class="border border-white bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold transition hover:bg-gray-100"
          >
            {{ $t('booking.viewPricing') }}
          </button>
          <button
            @click="goToChat"
            class="border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold bg-transparent hover:bg-white hover:text-black transition"
          >
            {{ $t('booking.chatNow') }}
          </button>
        </div>
      </div>
    </section>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

const router = useRouter();
const { t } = useI18n();

// Active FAQ
const activeFaq = ref<number | null>(null);

// Dummy data for lawyers
const lawyers = [
  {
    id: 1,
    name: "Anas Nazarudin",
    specialty: "Criminal Defense Attorney",
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
    specialty: "Corporate Law Attorney",
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
    specialty: "Family Law Attorney",
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
    specialty: "Civil Rights Attorney",
    experience: 4,
    rating: 94,
    fee: 25000,
    oldFee: 28000,
    photo: "../src/assets/images/4.jpg",
    available: true,
  },
  {
    id: 5,
    name: "Ahmad Yusuf",
    specialty: "Property Law Attorney",
    experience: 6,
    rating: 96,
    fee: 28000,
    oldFee: 32000,
    photo: "../src/assets/images/cofounder.jpg",
    available: true,
  },
  {
    id: 6,
    name: "Sari Indah",
    specialty: "Employment Law Attorney",
    experience: 3,
    rating: 92,
    fee: 22000,
    oldFee: 25000,
    photo: "../src/assets/images/cofounder.jpg",
    available: true,
  },
];

const search = ref("");
const filteredLawyers = computed(() => {
  if (!search.value) return lawyers;
  return lawyers.filter(
    (lawyer) =>
      lawyer.name.toLowerCase().indexOf(search.value.toLowerCase()) !== -1 ||
      lawyer.specialty.toLowerCase().indexOf(search.value.toLowerCase()) !== -1
  );
});

// FAQ data
const faqs = computed(() => [
  {
    question: t('booking.faqItems.q1'),
    answer: t('booking.faqItems.a1'),
  },
  {
    question: t('booking.faqItems.q2'),
    answer: t('booking.faqItems.a2'),
  },
  {
    question: t('booking.faqItems.q3'),
    answer: t('booking.faqItems.a3'),
  },
]);

// Methods
const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};

const scrollToLawyers = () => {
  const element = document.querySelector('#lawyers-section');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const goToChat = () => {
  router.push('/chat');
};

const goToPricing = () => {
  router.push('/pricing');
};
</script>

<style scoped>
/* Custom styles if needed */
.transition-all {
  transition: all 0.3s ease;
}
</style>
