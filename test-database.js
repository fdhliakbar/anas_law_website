#!/usr/bin/env node

/**
 * Test script untuk memverifikasi konfigurasi database
 * Jalankan: node test-database.js dari root folder
 */

import { config } from 'dotenv'
import database from './backend/server/utils/database.js'

// Load environment variables dari backend folder
config({ path: './backend/.env' })

async function testDatabaseConnection() {
  console.log('🔧 Testing Database Configuration...')
  console.log('=====================================')
  
  try {
    // Test koneksi dan konfigurasi
    console.log('📊 Database Type:', database.isSupabase ? 'Supabase' : 'PostgreSQL')
    
    // Test 1: Get Users Count
    console.log('\n🧪 Test 1: Count Users...')
    const userCount = await database.getUserCount()
    console.log('✅ Users count:', userCount.rows[0].count)
    
    // Test 2: Get Articles Count  
    console.log('\n🧪 Test 2: Count Articles...')
    const articleCount = await database.getArticleCount()
    console.log('✅ Articles count:', articleCount.rows[0].count)
    
    // Test 3: Get Sample Users
    console.log('\n🧪 Test 3: Get Sample Users...')
    const users = await database.getUsers(3, 0)
    console.log('✅ Sample users:', users.rows.length, 'found')
    if (users.rows.length > 0) {
      users.rows.forEach(user => {
        console.log(`   - ${user.name} (${user.email}) [${user.role}]`)
      })
    }
    
    // Test 4: Get Sample Articles
    console.log('\n🧪 Test 4: Get Sample Articles...')
    const articles = await database.getArticles(3, 0)
    console.log('✅ Sample articles:', articles.rows.length, 'found')
    if (articles.rows.length > 0) {
      articles.rows.forEach(article => {
        console.log(`   - ${article.judul}`)
        console.log(`     ${article.deskripsi.substring(0, 50)}...`)
        console.log(`     Gambar: ${article.gambar || 'Tidak ada'}`)
      })
    }
    
    console.log('\n🎉 All tests passed! Database is working correctly.')
    console.log('=====================================')
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message)
    console.error('=====================================')
    console.error('🔍 Troubleshooting:')
    
    if (database.isSupabase) {
      console.error('- Check SUPABASE_URL and SUPABASE_ANON_KEY in .env')
      console.error('- Verify Supabase project is active')
      console.error('- Check RLS policies in Supabase dashboard')
    } else {
      console.error('- Check DATABASE_URL in .env')
      console.error('- Verify PostgreSQL server is running')
      console.error('- Check database credentials')
    }
    
    process.exit(1)
  }
}

// Run tests
testDatabaseConnection()
