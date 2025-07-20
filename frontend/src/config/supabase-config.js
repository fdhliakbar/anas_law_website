// file: src/config/supabase-config.js

import { createClient } from '@supabase/supabase-js'

// Konfigurasi Supabase untuk frontend
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-ref.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here'

// Membuat client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Export default untuk konsistensi
export default supabase
