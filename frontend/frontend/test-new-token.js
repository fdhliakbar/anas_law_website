// Test API menggunakan Environment Variables
// TIDAK ADA HARDCODED API KEYS!

const testAPI = async () => {
  // Gunakan environment variable atau prompt user
  const token = process.env.VITE_HUGGING_FACE_TOKEN || 'YOUR_HUGGING_FACE_TOKEN_HERE';
  
  if (token === 'YOUR_HUGGING_FACE_TOKEN_HERE') {
    console.log('❌ API Token tidak ditemukan!');
    console.log('💡 Buat file .env dan isi VITE_HUGGING_FACE_TOKEN');
    return false;
  }
  
  const requestBody = {
    inputs: "What is criminal law in Indonesia?",
    parameters: {
      max_new_tokens: 100,
      temperature: 0.7,
      do_sample: true,
      top_p: 0.9
    }
  };

  try {
    console.log('🤖 Testing Hugging Face API...');
    const response = await fetch('https://api-inference.huggingface.co/models/google/flan-t5-base', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('📡 Response status:', response.status);
    const data = await response.json();
    console.log('📦 Response data:', data);
    
    if (!response.ok) {
      console.error('❌ API Error:', data);
      return false;
    } else {
      console.log('✅ API working! Response:', data[0]?.generated_text || data.generated_text);
      return true;
    }
  } catch (error) {
    console.error('❌ Network error:', error);
    return false;
  }
};

// Test dengan model alternatif jika yang pertama gagal
const testAlternativeAPI = async () => {
  // Gunakan environment variable atau prompt user
  const token = process.env.VITE_HUGGING_FACE_TOKEN || 'YOUR_HUGGING_FACE_TOKEN_HERE';
  
  if (token === 'YOUR_HUGGING_FACE_TOKEN_HERE') {
    console.log('❌ API Token tidak ditemukan untuk alternative test!');
    return false;
  }
  
  try {
    console.log('\n🔄 Testing alternative model...');
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: "Legal advice for criminal law cases in Indonesia"
      })
    });

    console.log('📡 BART Response status:', response.status);
    const data = await response.json();
    console.log('📦 BART Response data:', data);
    
  } catch (error) {
    console.error('❌ BART error:', error);
  }
};

// Run tests
const runTests = async () => {
  console.log('🚀 Starting API tests...\n');
  
  const primarySuccess = await testAPI();
  
  if (!primarySuccess) {
    await testAlternativeAPI();
  }
  
  console.log('\n✅ Test completed!');
};

runTests();
