<template>
  <Header />
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="w-full bg-white py-24 px-4">
      <div class="max-w-5xl mx-auto flex flex-col items-center text-center">
        <h1 class="font-bold text-5xl md:text-7xl text-black mb-8 leading-tight">
          {{ $t('pricing.title') }}
        </h1>
        <p class="text-lg md:text-xl text-black mb-12">
          {{ $t('pricing.subtitle') }}<br />
          {{ $t('pricing.chooseFrom') }}
        </p>
        <div class="flex flex-col md:flex-row gap-4">
          <button
            @click="goToBooking"
            class="border border-black bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold transition hover:bg-gray-800"
          >
            {{ $t('pricing.scheduleConsultation') }}
          </button>
          <button
            @click="goToChat"
            class="border border-black text-black px-8 py-4 rounded-lg text-lg font-semibold bg-white hover:bg-black hover:text-white transition"
          >
            {{ $t('pricing.getInTouch') }}
          </button>
        </div>
      </div>
    </section>

    <!-- Pricing Categories -->
    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <!-- Category Tabs -->
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="activeCategory = category.id"
            :class="[
              'px-6 py-3 font-semibold rounded-lg transition-all text-lg',
              activeCategory === category.id
                ? 'bg-black text-white border border-black'
                : 'border border-black text-black bg-white hover:bg-black hover:text-white'
            ]"
          >
            {{ category.name }}
          </button>
        </div>

        <!-- Pricing Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="service in filteredServices"
            :key="service.id"
            class="bg-white rounded-xl border border-gray-200 hover:border-black transition-all duration-300 overflow-hidden"
          >
            <div class="p-8">
              <!-- Service Info -->
              <h3 class="text-2xl font-bold text-black mb-3">{{ service.name }}</h3>
              <p class="text-gray-600 mb-6">{{ service.description }}</p>
              
              <!-- Pricing -->
              <div class="mb-6">
                <span class="text-3xl font-bold text-black">{{ service.price }}</span>
                <span class="text-gray-500 ml-1">{{ service.priceUnit }}</span>
              </div>
              
              <!-- Duration -->
              <div class="flex items-center text-gray-600 mb-6">
                <i class="far fa-clock mr-2"></i>
                <span>{{ $t('pricing.estimated') }}: {{ service.duration }}</span>
              </div>
              
              <!-- Features -->
              <ul class="space-y-2 mb-8">
                <li
                  v-for="feature in service.features"
                  :key="feature"
                  class="flex items-center text-gray-700"
                >
                  <i class="fas fa-check text-green-600 mr-3"></i>
                  {{ feature }}
                </li>
              </ul>
              
              <!-- CTA Button -->
              <button
                @click="contactForService(service)"
                class="w-full border border-black bg-black text-white py-3 px-6 rounded-lg text-lg font-semibold transition hover:bg-gray-800"
              >
                {{ $t('pricing.getStarted') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="font-bold text-4xl md:text-5xl text-black mb-8">
          {{ $t('pricing.whyChoose') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div class="text-center">
            <div class="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-comments text-white text-xl"></i>
            </div>
            <h3 class="text-xl font-bold text-black mb-2">{{ $t('pricing.freeConsultation') }}</h3>
            <p class="text-gray-600">
              {{ $t('pricing.freeConsultationDesc') }}
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-credit-card text-white text-xl"></i>
            </div>
            <h3 class="text-xl font-bold text-black mb-2">{{ $t('pricing.flexiblePayment') }}</h3>
            <p class="text-gray-600">
              {{ $t('pricing.flexiblePaymentDesc') }}
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-award text-white text-xl"></i>
            </div>
            <h3 class="text-xl font-bold text-black mb-2">{{ $t('pricing.experiencedTeam') }}</h3>
            <p class="text-gray-600">
              {{ $t('pricing.experiencedTeamDesc') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="py-16 px-4 bg-gray-900 text-white">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="font-bold text-4xl md:text-5xl mb-8">
          {{ $t('pricing.customConsultation') }}
        </h2>
        <p class="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          {{ $t('pricing.customConsultationDesc') }}
        </p>
        <div class="flex flex-col md:flex-row gap-4 justify-center">
          <button
            @click="goToBooking"
            class="border border-white bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold transition hover:bg-gray-100"
          >
            {{ $t('pricing.scheduleConsultation') }}
          </button>
          <button
            @click="goToChat"
            class="border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold bg-transparent hover:bg-white hover:text-black transition"
          >
            {{ $t('pricing.chatNow') }}
          </button>
        </div>
      </div>
    </section>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const { t } = useI18n()

// Active category
const activeCategory = ref('civil')

// Categories
const categories = computed(() => [
  { id: 'civil', name: t('pricing.categories.civilLaw') },
  { id: 'criminal', name: t('pricing.categories.criminalLaw') },
  { id: 'corporate', name: t('pricing.categories.corporateLaw') },
  { id: 'family', name: t('pricing.categories.familyLaw') },
  { id: 'property', name: t('pricing.categories.propertyLaw') }
])

// Services data
const services = ref([
  // Civil Law
  {
    id: 1,
    category: 'civil',
    name: 'Civil Litigation',
    description: 'Comprehensive civil litigation services for breach of contract and tort cases',
    price: '$15,000',
    priceUnit: '- $25,000',
    duration: '3-6 months',
    features: [
      'Complete lawsuit drafting',
      'Court representation',
      'Negotiation with opposing party',
      'Judgment execution'
    ]
  },
  {
    id: 2,
    category: 'civil',
    name: 'Contract Review',
    description: 'Professional review and drafting of business and personal contracts',
    price: '$2,500',
    priceUnit: '- $5,000',
    duration: '1-2 weeks',
    features: [
      'Existing contract review',
      'New contract drafting',
      'Legal opinion',
      'Unlimited revisions'
    ]
  },
  // Add more services as needed
])

// Computed property for filtered services
const filteredServices = computed(() => {
  return services.value.filter(service => service.category === activeCategory.value)
})

// Methods
const contactForService = (service) => {
  alert(`Contacting for service: ${service.name}`)
}

const goToBooking = () => {
  router.push('/booking')
}

const goToChat = () => {
  router.push('/chat')
}
</script>

<style scoped>
/* Custom styles if needed */
.transition-all {
  transition: all 0.3s ease;
}
</style>
