#!/usr/bin/env node

/**
 * Test script untuk memverifikasi konfigurasi database Supabase
 * Jalankan: node test-supabase.js dari root folder
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables dari backend folder
config({ path: './backend/.env' })

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

async function testSupabaseConnection() {
  console.log('🔧 Testing Supabase Database Connection...')
  console.log('==========================================')
  console.log('📍 Supabase URL:', supabaseUrl)
  console.log('🔑 Anon Key:', supabaseKey ? 'Set ✅' : 'Missing ❌')
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env file')
    console.error('Please check SUPABASE_URL and SUPABASE_ANON_KEY')
    process.exit(1)
  }
  
  try {
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Test 1: Count Users
    console.log('\n🧪 Test 1: Count Users...')
    const { count: userCount, error: userError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
    
    if (userError) {
      console.error('❌ Users table error:', userError.message)
      console.log('💡 Hint: Run setup_supabase.sql in Supabase SQL Editor first')
    } else {
      console.log('✅ Users count:', userCount)
    }
    
    // Test 2: Count Articles
    console.log('\n🧪 Test 2: Count Articles...')
    const { count: articleCount, error: articleError } = await supabase
      .from('artikel')
      .select('*', { count: 'exact', head: true })
    
    if (articleError) {
      console.error('❌ Articles table error:', articleError.message)
      console.log('💡 Hint: Run setup_supabase.sql in Supabase SQL Editor first')
    } else {
      console.log('✅ Articles count:', articleCount)
    }
    
    // Test 3: Get Sample Users
    console.log('\n🧪 Test 3: Get Sample Users...')
    const { data: users, error: getUsersError } = await supabase
      .from('users')
      .select('users_id, name, email, role')
      .limit(3)
    
    if (getUsersError) {
      console.error('❌ Get users error:', getUsersError.message)
    } else {
      console.log('✅ Sample users:', users.length, 'found')
      users.forEach(user => {
        console.log(`   - ${user.name} (${user.email}) [${user.role}] - ID: ${user.users_id}`)
      })
    }
    
    // Test 4: Get Sample Articles
    console.log('\n🧪 Test 4: Get Sample Articles...')
    const { data: articles, error: getArticlesError } = await supabase
      .from('artikel')
      .select('artikel_id, judul, link_artikel')
      .limit(3)
    
    if (getArticlesError) {
      console.error('❌ Get articles error:', getArticlesError.message)
    } else {
      console.log('✅ Sample articles:', articles.length, 'found')
      articles.forEach(article => {
        console.log(`   - ${article.judul} (ID: ${article.artikel_id})`)
      })
    }
    
    console.log('\n🎉 Supabase connection test completed!')
    console.log('==========================================')
    
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message)
    console.error('==========================================')
    console.error('🔍 Troubleshooting:')
    console.error('- Check SUPABASE_URL and SUPABASE_ANON_KEY in backend/.env')
    console.error('- Verify Supabase project is active')
    console.error('- Run setup_supabase.sql in Supabase SQL Editor')
    console.error('- Check RLS policies in Supabase dashboard')
    
    process.exit(1)
  }
}

// Run tests
testSupabaseConnection()
