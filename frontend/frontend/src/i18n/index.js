import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import id from './locales/id.json'

// Get initial locale from localStorage or default to 'en'
const getInitialLocale = () => {
  const savedLocale = localStorage.getItem('locale')
  return savedLocale && ['en', 'id'].includes(savedLocale) ? savedLocale : 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    id
  },
  // Enable composition API
  globalInjection: true
})

export default i18n
