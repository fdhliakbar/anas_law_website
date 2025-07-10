<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 "
    >
      <font-awesome-icon icon="globe" class="text-gray-600" />
      <span class="text-sm font-medium">{{ currentLanguage.name }}</span>
      <svg
        class="w-4 h-4 text-gray-600"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
    >
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="changeLanguage(lang.code)"
        class="w-full px-4 py-2 text-left hover:bg-gray-100 transition text-sm"
        :class="{ 'bg-gray-100': currentLocale === lang.code }"
      >
        {{ lang.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const isOpen = ref(false)

const languages = [
  { code: 'en', name: 'English' },
  { code: 'id', name: 'Indonesia' }
]

const currentLocale = computed(() => locale.value)
const currentLanguage = computed(() => 
  languages.find(lang => lang.code === currentLocale.value) || languages[0]
)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const changeLanguage = (langCode) => {
  locale.value = langCode
  localStorage.setItem('locale', langCode)
  isOpen.value = false
  
  // Force reactivity update
  window.dispatchEvent(new CustomEvent('language-changed', { detail: langCode }))
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
