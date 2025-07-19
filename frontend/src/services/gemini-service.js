// Contoh implementasi Gemini API
const getGeminiResponse = async (message) => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Anda adalah customer service profesional dari Anas Law, firma hukum terpercaya di Indonesia. Jawab dengan ramah dan professional.

Pertanyaan: ${message}`
          }]
        }],
        generationConfig: {
          maxOutputTokens: 200,
          temperature: 0.7
        }
      })
    })
    
    if (response.ok) {
      const data = await response.json()
      return data.candidates[0]?.content?.parts[0]?.text || generateSmartResponse(message)
    } else {
      throw new Error('Gemini service unavailable')
    }
  } catch (error) {
    return generateSmartResponse(message)
  }
}
