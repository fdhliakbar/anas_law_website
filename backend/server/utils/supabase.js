// file: server/utils/supabase.js

import { createClient } from '@supabase/supabase-js'

// Deteksi environment dan ambil konfigurasi Supabase
let supabaseUrl, supabaseKey;

try {
  // Coba gunakan useRuntimeConfig jika tersedia (di dalam Nuxt)
  if (typeof useRuntimeConfig !== 'undefined') {
    const config = useRuntimeConfig();
    supabaseUrl = config.supabaseUrl;
    supabaseKey = config.supabaseAnonKey;
  } else {
    // Fallback ke process.env jika di luar Nuxt
    supabaseUrl = process.env.SUPABASE_URL;
    supabaseKey = process.env.SUPABASE_ANON_KEY;
  }
} catch (error) {
  // Jika useRuntimeConfig tidak tersedia, gunakan process.env
  supabaseUrl = process.env.SUPABASE_URL;
  supabaseKey = process.env.SUPABASE_ANON_KEY;
}

// Membuat client Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);

// Export default untuk backward compatibility
export default supabase;
