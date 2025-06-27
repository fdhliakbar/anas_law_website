// Test DialoGPT API (TANPA HARDCODED API KEYS)
const testDialoGPT = async () => {
  const token = process.env.VITE_HUGGING_FACE_TOKEN || 'YOUR_HUGGING_FACE_TOKEN_HERE';
  
  if (token === 'YOUR_HUGGING_FACE_TOKEN_HERE') {
    console.log('❌ Hugging Face Token tidak ditemukan!');
    console.log('💡 Buat file .env dan isi VITE_HUGGING_FACE_TOKEN');
    return false;
  }
  
  const requestBody = {
    inputs: {
      past_user_inputs: [],
      generated_responses: [],
      text: "Halo, apa itu hukum pidana?"
    },
    parameters: {
      max_length: 100,
      min_length: 10,
      do_sample: true,
      temperature: 0.7,
      top_p: 0.9,
      repetition_penalty: 1.1
    }
  };

  try {
    console.log('🤖 Testing DialoGPT...');
    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-small', {
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
      
      // Try simpler format if error
      console.log('🔄 Trying simpler format...');
      const simpleRequest = {
        inputs: "Halo, apa itu hukum pidana?",
        parameters: {
          max_length: 100,
          temperature: 0.7
        }
      };
      
      const retryResponse = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-small', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(simpleRequest)
      });
      
      console.log('📡 Retry status:', retryResponse.status);
      const retryData = await retryResponse.json();
      console.log('📦 Retry data:', retryData);
      
    } else {
      console.log('✅ DialoGPT working!');
    }
    
  } catch (error) {
    console.error('❌ Network error:', error);
  }
};

testDialoGPT();
