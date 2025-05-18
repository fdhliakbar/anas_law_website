// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  runtimeConfig: {
      // Private variables, hanya tersedia di server
    DB_HOST: '',
    DB_PORT: '',
    DB_USER: '',
    DB_PASSWORD: '',
    DB_NAME: '',
  }
})
