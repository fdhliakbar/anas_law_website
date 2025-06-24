<template>
  <Header />
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="w-full bg-white py-24 px-4">
      <div class="max-w-5xl mx-auto flex flex-col items-center text-center">
        <h1 class="font-bold text-5xl md:text-7xl text-black mb-8 leading-tight">
          Professional Legal<br />
          Consultation Services
        </h1>
        <p class="text-lg md:text-xl text-black mb-12">
          Trusted online legal consultation services for all your legal needs.<br />
          Choose from 100+ experienced attorneys across various legal fields.
        </p>        <div class="flex flex-col md:flex-row gap-4">
          <button
            @click="scrollToLawyers"
            class="border border-black bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold transition hover:bg-gray-800"
          >
            Schedule now
          </button>
          <button
            @click="goToChat"
            class="border border-black text-black px-8 py-4 rounded-lg text-lg font-semibold bg-white hover:bg-black hover:text-white transition"
          >
            Get in touch
          </button>
        </div>
      </div>
    </section>

    <!-- Why Choose Section -->
    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-5xl mx-auto">
        <h2 class="font-bold text-4xl md:text-5xl text-black text-center mb-12">
          Why Choose Legal Consultation at Anas Law?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex items-start gap-4">
            <div class="text-4xl">📱</div>
            <div>
              <h3 class="font-bold text-xl text-black mb-2">One Platform Solution</h3>
              <p class="text-gray-600">
                One platform for all your legal needs, from consultation to legal representation.
              </p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="text-4xl">🏛️</div>
            <div>
              <h3 class="font-bold text-xl text-black mb-2">Expert Legal Services</h3>
              <p class="text-gray-600">
                Get legal consultation from the best attorneys in their field, ready to help you anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>    <!-- Lawyers Section -->
    <section id="lawyers-section" class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <!-- Search -->
        <div class="max-w-2xl mx-auto mb-12">
          <input
            v-model="search"
            type="text"
            placeholder="Search for attorneys, specialties, or legal issues"
            class="w-full border-2 border-gray-300 rounded-lg px-6 py-4 text-lg focus:outline-none focus:border-black transition"
          />
        </div>

        <!-- Lawyers Grid -->
        <h2 class="font-bold text-4xl text-black text-center mb-12">Recommended Attorneys</h2>
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
                <span>{{ lawyer.experience }} years</span>
                <span>{{ lawyer.rating }}% success rate</span>
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
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <h2 class="font-bold text-4xl text-black text-center mb-12">Frequently Asked Questions</h2>
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
          Ready to Get Legal Help?
        </h2>
        <p class="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Don't wait until it's too late. Get professional legal consultation today and protect your rights.
        </p>        <div class="flex flex-col md:flex-row gap-4 justify-center">
          <button
            @click="goToPricing"
            class="border border-white bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold transition hover:bg-gray-100"
          >
            View Pricing
          </button>
          <button
            @click="goToChat"
            class="border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold bg-transparent hover:bg-white hover:text-black transition"
          >
            Chat Now
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
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

const router = useRouter();

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
const faqs = [
  {
    question: "How do I schedule a legal consultation with Anas Law?",
    answer:
      "You can schedule a consultation by contacting us through our official website, WhatsApp, or visiting our office directly. Choose an available consultation slot, and our team will contact you for confirmation and further explanation about the consultation process.",
  },
  {
    question: "Is consultation at Anas Law confidential?",
    answer:
      "Yes, all consultation processes and client data are guaranteed confidential in accordance with attorney professional ethics code. We are committed to maintaining the privacy and security of every client's information.",
  },
  {
    question: "Can I consult without coming to the office?",
    answer:
      "Absolutely. You can conduct consultations online via video call, phone, or chat. This service makes it easier for you to get legal help without having to come to the office, making it more flexible and efficient.",
  },
];

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
