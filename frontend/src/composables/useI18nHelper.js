import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export function useI18nHelper() {
  const { locale, t } = useI18n()

  // Computed property for reactive locale
  const currentLocale = computed(() => locale.value)

  // Function to change language and ensure persistence
  const changeLanguage = (newLocale) => {
    if (['en', 'id'].includes(newLocale)) {
      locale.value = newLocale
      localStorage.setItem('locale', newLocale)
      
      // Trigger custom event for components that might need it
      window.dispatchEvent(new CustomEvent('language-changed', { 
        detail: { locale: newLocale } 
      }))
    }
  }

  // Function to get translation with fallback
  const translate = (key, fallback = '') => {
    try {
      const translation = t(key)
      return translation !== key ? translation : fallback
    } catch (error) {
      console.warn(`Translation missing for key: ${key}`)
      return fallback || key
    }
  }

  // Watch for locale changes and update localStorage
  watch(locale, (newLocale) => {
    localStorage.setItem('locale', newLocale)
  })

  return {
    locale,
    currentLocale,
    changeLanguage,
    translate,
    t
  }
}
