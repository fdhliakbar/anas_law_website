// file: nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  runtimeConfig: {
    // Konfigurasi database - PostgreSQL (untuk backward compatibility)
    databaseUrl: process.env.DATABASE_URL,
    
    // Konfigurasi Supabase
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    
    // Variabel lain
    stackSecretServerKey: process.env.STACK_SECRET_SERVER_KEY,

    public: {
      stackProjectId: process.env.NUXT_PUBLIC_STACK_PROJECT_ID,
      stackPublishableClientKey:
        process.env.NUXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
      // Supabase public config (jika diperlukan di frontend)
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
  },
});
