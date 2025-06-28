// Test GPT-2 API - model yang pasti tersedia (TANPA HARDCODED API KEYS)
const testGPT2 = async () => {
  const token = process.env.VITE_HUGGING_FACE_TOKEN || 'YOUR_HUGGING_FACE_TOKEN_HERE';
  
  if (token === 'YOUR_HUGGING_FACE_TOKEN_HERE') {
    console.log('❌ Hugging Face Token tidak ditemukan!');
    console.log('💡 Buat file .env dan isi VITE_HUGGING_FACE_TOKEN');
    return false;
  }
  
  const requestBody = {
    inputs: "Q: Apa itu hukum pidana?\nA: Sebagai AI legal assistant Anas Law,",
    parameters: {
      max_new_tokens: 50,
      temperature: 0.8,
      do_sample: true,
      top_p: 0.9,
      repetition_penalty: 1.1,
      return_full_text: false
    }
  };

  try {
    console.log('🤖 Testing GPT-2...');
    const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('📡 Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', errorText);
      return false;
    }
    
    const data = await response.json();
    console.log('📦 Response data:', data);
    
    if (Array.isArray(data) && data[0]?.generated_text) {
      console.log('✅ GPT-2 working! Generated text:', data[0].generated_text);
      return true;
    } else if (data.generated_text) {
      console.log('✅ GPT-2 working! Generated text:', data.generated_text);
      return true;
    } else {
      console.log('⚠️ Unexpected response format');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Network error:', error);
    return false;
  }
};

// Test dengan model alternatif jika GPT-2 gagal
const testDistilGPT2 = async () => {
  const token = process.env.VITE_HUGGING_FACE_TOKEN || 'YOUR_HUGGING_FACE_TOKEN_HERE';
  
  if (token === 'YOUR_HUGGING_FACE_TOKEN_HERE') {
    console.log('❌ Hugging Face Token tidak ditemukan untuk alternative test!');
    return false;
  }
  
  try {
    console.log('\n🔄 Testing DistilGPT-2...');
    const response = await fetch('https://api-inference.huggingface.co/models/distilgpt2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: "Legal advice: ",
        parameters: {
          max_new_tokens: 30,
          temperature: 0.7
        }
      })
    });

    console.log('📡 DistilGPT-2 status:', response.status);
    const data = await response.json();
    console.log('📦 DistilGPT-2 data:', data);
    
    return response.ok;
    
  } catch (error) {
    console.error('❌ DistilGPT-2 error:', error);
    return false;
  }
};

// Run tests
const runAllTests = async () => {
  console.log('🚀 Starting comprehensive API tests...\n');
  
  const gpt2Success = await testGPT2();
  
  if (!gpt2Success) {
    await testDistilGPT2();
  }
  
  console.log('\n✅ All tests completed!');
};

runAllTests();
