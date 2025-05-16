// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  runtimeConfig: {
    DATABASE_URL: process.env.DATABASE_URL,
    STACK_SECRET_SERVER_KEY: process.env.STACK_SECRET_SERVER_KEY,
    public: {
      STACK_PROJECT_ID: process.env.NUXT_PUBLIC_STACK_PROJECT_ID,
      STACK_PUBLISHABLE_CLIENT_KEY: process.env.NUXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY
    }
  }
})
