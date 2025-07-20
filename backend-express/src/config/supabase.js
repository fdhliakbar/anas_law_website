import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client untuk admin operations (menggunakan service role key)
export const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Client untuk operasi non-admin
export const supabaseClient = createClient(
  supabaseUrl, 
  process.env.SUPABASE_ANON_KEY
)

console.log('✅ Supabase configured successfully')