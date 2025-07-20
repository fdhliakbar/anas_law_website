// Test Environment Variables
// Jalankan dengan: node test-env.cjs di folder frontend

console.log('🧪 Testing Environment Variables...\n')

// Import fs untuk membaca file .env
import fs from 'fs'
import path from 'path'

// Function to parse .env file
function parseEnvFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const lines = content.split('\n')
    const vars = {}
    
    lines.forEach(line => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        if (key && valueParts.length > 0) {
          vars[key] = valueParts.join('=')
        }
      }
    })
    
    return vars
  } catch (error) {
    return null
  }
}

// Check all .env files
const envFiles = ['.env.local', '.env', '.env.development', '.env.production']

envFiles.forEach(file => {
  const vars = parseEnvFile(file)
  if (vars) {
    console.log(`📄 ${file}:`)
    Object.entries(vars).forEach(([key, value]) => {
      if (key.includes('API_KEY')) {
        console.log(`  ${key}: ${value.substring(0, 20)}...`)
      } else {
        console.log(`  ${key}: ${value}`)
      }
    })
    console.log('')
  } else {
    console.log(`❌ ${file}: Not found or empty\n`)
  }
})

// Test specific API keys
console.log('🔑 API Key Status:')

const envLocal = parseEnvFile('.env.local')
const env = parseEnvFile('.env')

const openrouterKey = envLocal?.VITE_OPENROUTER_API_KEY || env?.VITE_OPENROUTER_API_KEY
const geminiKey = envLocal?.VITE_GEMINI_API_KEY || env?.VITE_GEMINI_API_KEY

console.log(`OpenRouter: ${openrouterKey ? (openrouterKey.startsWith('sk-or-v1-') ? '✅ Valid' : '❌ Invalid format') : '❌ Missing'}`)
console.log(`Gemini: ${geminiKey ? (geminiKey.length > 20 ? '✅ Valid' : '❌ Too short') : '❌ Missing'}`)

console.log('\n🎯 Current Status:')
console.log(`- OpenRouter API: ${openrouterKey ? openrouterKey.substring(0, 25) + '...' : 'NOT SET'}`)
console.log(`- Gemini API: ${geminiKey ? geminiKey.substring(0, 25) + '...' : 'NOT SET'}`)

console.log('\n✅ Environment test completed!')
