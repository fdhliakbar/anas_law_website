// Vue I18n Language Watcher Plugin
import { watch } from 'vue'

export default {
  install(app, options) {
    try {
      // Get i18n instance from options first, then fallback to app
      const i18n = options?.i18n || app.config.globalProperties.$i18n
      
      if (i18n && i18n.global && i18n.global.locale) {
        // Watch for locale changes
        watch(
          () => i18n.global.locale.value || i18n.global.locale,
          (newLocale, oldLocale) => {
            // Only proceed if newLocale is valid
            if (newLocale) {
              // Save to localStorage
              localStorage.setItem('locale', newLocale)
              
              // Emit custom event for manual listeners
              window.dispatchEvent(new CustomEvent('i18n-locale-changed', {
                detail: { newLocale, oldLocale }
              }))
              
              // Force reactivity update
              document.documentElement.lang = newLocale
              
              console.log('Locale changed to:', newLocale)
            }
          },
          { immediate: true }
        )
      } else {
        console.warn('i18n instance not found or not properly configured')
      }
    } catch (error) {
      console.warn('i18nWatcher plugin error:', error)
    }
  }
}
