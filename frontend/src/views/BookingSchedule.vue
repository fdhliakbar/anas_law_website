<template>
  <Header />
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="w-full bg-white py-24 px-4">
      <div class="max-w-5xl mx-auto flex flex-col items-center text-center">
        <h1
          class="font-bold text-5xl md:text-7xl text-black mb-8 leading-tight"
        >
          {{ $t("booking.title") }}
        </h1>
        <p class="text-lg md:text-xl text-black mb-12">
          {{ $t("booking.subtitle") }}<br />
          {{ $t("booking.chooseFrom") }}
        </p>
        <div class="flex flex-col md:flex-row gap-4">
          <button
            @click="scrollToLawyers"
            class="border border-black bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold transition hover:bg-gray-800"
          >
            {{ $t("booking.scheduleNow") }}
          </button>
          <button
            class="border border-black text-black px-8 py-4 rounded-lg text-lg font-semibold bg-white hover:bg-black hover:text-white transition"
          >
            <a href="https://wa.me/6281394879411">
              {{ $t("booking.getInTouch") }}
            </a>
          </button>
        </div>
      </div>
    </section>

    <!-- Why Choose Section -->
    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-5xl mx-auto">
        <h2 class="font-bold text-4xl md:text-5xl text-black text-center mb-12">
          {{ $t("booking.whyChoose") }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex items-start gap-4">
            <div class="text-4xl">📱</div>
            <div>
              <h3 class="font-bold text-xl text-black mb-2">
                {{ $t("booking.onePlatform") }}
              </h3>
              <p class="text-gray-600">
                {{ $t("booking.onePlatformDesc") }}
              </p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="text-4xl">🏛️</div>
            <div>
              <h3 class="font-bold text-xl text-black mb-2">
                {{ $t("booking.expertServices") }}
              </h3>
              <p class="text-gray-600">
                {{ $t("booking.expertServicesDesc") }}
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
            @input="handleSearch"
            type="text"
            :placeholder="$t('booking.searchPlaceholder')"
            class="w-full border-2 border-gray-300 rounded-lg px-6 py-4 text-lg focus:outline-none focus:border-black transition"
          />
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"
          ></div>
          <p class="mt-4 text-gray-600">Loading lawyers...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-600 mb-4">{{ error }}</p>
          <button
            @click="loadLawyers"
            class="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Retry
          </button>
        </div>

        <!-- Lawyers Grid -->
        <div v-else>
          <h2 class="font-bold text-4xl text-black text-center mb-12">
            {{ $t("booking.recommendedAttorneys") }}
          </h2>

          <!-- No Results -->
          <div v-if="lawyers.length === 0" class="text-center py-12">
            <p class="text-gray-600 text-lg">
              No lawyers found matching your search.
            </p>
          </div>

          <!-- Lawyers Cards -->
          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <div
              v-for="lawyer in lawyers"
              :key="lawyer.lawyer_id"
              class="bg-white border border-gray-200 rounded-xl p-6 hover:border-black transition-all duration-300"
            >
              <div class="text-center mb-4">
                <img
                  :src="getPhotoUrl(lawyer.photo)"
                  :alt="lawyer.name"
                  class="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-gray-200"
                  @error="handleImageError"
                />
                <h3 class="font-bold text-xl text-black">{{ lawyer.name }}</h3>
                <p class="text-gray-600 mb-2">{{ lawyer.specialty }}</p>
                <div
                  class="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4"
                >
                  <span>{{ lawyer.experience }} {{ $t("booking.years") }}</span>
                  <span
                    >{{ lawyer.rating }}% {{ $t("booking.successRate") }}</span
                  >
                </div>
              </div>
              <div class="text-center">
                <button
                  @click="goToBookingForm(lawyer.lawyer_id)"
                  class="w-full border border-black bg-black text-white py-3 px-6 rounded-lg font-semibold transition hover:bg-gray-800"
                >
                  {{ $t("booking.bookConsultation") }}
                </button>
              </div>
            </div>
          </div>

          <!-- Load More Button -->
          <div v-if="pagination.hasMore" class="text-center mt-12">
            <button
              @click="loadMoreLawyers"
              :disabled="loadingMore"
              class="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
            >
              {{ loadingMore ? "Loading..." : "Load More Lawyers" }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <h2 class="font-bold text-4xl text-black text-center mb-12">
          {{ $t("booking.faq") }}
        </h2>
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
                :class="
                  activeFaq === index
                    ? 'fas fa-chevron-up'
                    : 'fas fa-chevron-down'
                "
                class="text-gray-500"
              ></i>
            </button>
            <div v-if="activeFaq === index" class="mt-4 text-gray-600">
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
          {{ $t("booking.readyToGetHelp") }}
        </h2>
        <p class="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          {{ $t("booking.readyToGetHelpDesc") }}
        </p>
        <div class="flex flex-col md:flex-row gap-4 justify-center">
          <button
            @click="goToPricing"
            class="border border-white bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold transition hover:bg-gray-100"
          >
            {{ $t("booking.viewPricing") }}
          </button>
          <button
            @click="goToChat"
            class="border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold bg-transparent hover:bg-white hover:text-black transition"
          >
            {{ $t("booking.chatNow") }}
          </button>
        </div>
      </div>
    </section>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

const router = useRouter();
const { t, locale } = useI18n();

// Reactive data
const lawyers = ref([]);
const loading = ref(false);
const loadingMore = ref(false);
const error = ref("");
const search = ref("");
const pagination = ref({
  total: 0,
  limit: 12,
  offset: 0,
  hasMore: false,
});

// Active FAQ
const activeFaq = ref<number | null>(null);

// Ensure i18n is properly initialized
const isI18nReady = ref(false);

onMounted(() => {
  // Wait for i18n to be ready
  if (locale.value) {
    isI18nReady.value = true;
  } else {
    setTimeout(() => {
      isI18nReady.value = true;
    }, 100);
  }

  // Load lawyers on mount
  loadLawyers();
});

// Methods
const loadLawyers = async (isLoadMore = false) => {
  if (isLoadMore) {
    loadingMore.value = true;
  } else {
    loading.value = true;
    lawyers.value = [];
    pagination.value.offset = 0;
  }

  error.value = "";

  try {
    const params = new URLSearchParams({
      limit: pagination.value.limit.toString(),
      offset: pagination.value.offset.toString(),
    });

    if (search.value.trim()) {
      params.append("search", search.value.trim());
    }

    const response = await fetch(
      `https://mptibe-production.up.railway.app/api/lawyers/get-lawyers?${params}`
    );
    const data = await response.json();

    if (response.ok) {
      if (isLoadMore) {
        lawyers.value = [...lawyers.value, ...data.lawyers];
      } else {
        lawyers.value = data.lawyers;
      }

      pagination.value = {
        ...data.pagination,
        offset: pagination.value.offset + data.pagination.limit,
      };
    } else {
      error.value = data.message || "Failed to load lawyers";
    }
  } catch (err) {
    console.error("Error loading lawyers:", err);
    error.value = "Network error. Please try again.";
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};

const loadMoreLawyers = (event?: MouseEvent) => {
  loadLawyers(true);
};

const handleSearch = () => {
  // Debounce search
  clearTimeout(searchTimeout);
  const searchTimeout = setTimeout(() => {
    loadLawyers();
  }, 500);
};

const getPhotoUrl = (photo) => {
  if (!photo) return "/src/assets/images/default-lawyer.jpg";

  // Sudah URL absolut (http/https)
  if (photo.startsWith("http")) return photo;

  // Gambar hasil upload backend
  if (photo.startsWith("/uploads/")) {
    // Pastikan URL backend benar (ganti jika deploy)
    return `https://mptibe-production.up.railway.app${photo}`;
  }

  // Gambar dari assets lokal frontend
  if (photo.startsWith("/src/assets/") || photo.startsWith("src/assets/")) {
    return photo.replace(/^\/?src\/assets\//, "/src/assets/");
  }

  // Fallback
  return "/src/assets/images/default-lawyer.jpg";
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = "/src/assets/images/default-lawyer.jpg";
};

const goToBookingForm = (lawyerId: number) => {
  // Check if user is logged in
  const token = localStorage.getItem("token");
  if (!token) {
    router.push(`/login?redirect=/booking/${lawyerId}`);
    return;
  }

  // Go to booking form
  router.push(`/booking/${lawyerId}`);
};

// FAQ data
const faqs = computed(() => {
  if (!isI18nReady.value) return [];

  try {
    return [
      {
        question: t("booking.faqItems.q1"),
        answer: t("booking.faqItems.a1"),
      },
      {
        question: t("booking.faqItems.q2"),
        answer: t("booking.faqItems.a2"),
      },
      {
        question: t("booking.faqItems.q3"),
        answer: t("booking.faqItems.a3"),
      },
    ];
  } catch (error) {
    console.warn("i18n not ready yet:", error);
    return [];
  }
});

const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};

const scrollToLawyers = () => {
  const element = document.querySelector("#lawyers-section");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const goToChat = () => {
  router.push("/chat");
};

const goToPricing = () => {
  router.push("/pricing");
};
</script>

<style scoped>
.transition-all {
  transition: all 0.3s ease;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>