# OpenRouter AI ChatBot Integration

## 🚀 Overview
Chatbot AI Legal Assistant telah diupgrade untuk menggunakan **OpenRouter API** yang memberikan akses ke multiple AI models termasuk GPT-3.5, GPT-4, Claude, dan Llama.

## 🔧 Changes Made

### 1. Updated AI Configuration (`ai-config.js`)
```javascript
OPENROUTER: {
  token: import.meta.env.VITE_OPENROUTER_API_KEY, // MENGGUNAKAN ENV VARIABLE
  baseUrl: 'https://openrouter.ai/api/v1',
  models: {
    gpt35: 'openai/gpt-3.5-turbo',
    gpt4: 'openai/gpt-4o-mini',
    claude: 'anthropic/claude-3-haiku',
    llama: 'meta-llama/llama-3.1-8b-instruct:free',
    default: 'openai/gpt-3.5-turbo'
  }
}
```

### 2. Updated ChatBot Component (`ChatBot.vue`)

#### Key Features:
- ✅ **Multi-Model Support**: Dropdown untuk memilih AI model
- ✅ **OpenRouter Integration**: API calls menggunakan OpenAI-compatible format
- ✅ **Dynamic Model Switching**: Bisa ganti model real-time
- ✅ **Better Error Handling**: Fallback ke knowledge base
- ✅ **Improved UI**: Model selector di header chat

#### Available Models:
1. **GPT-3.5 Turbo** - Fast & efficient
2. **GPT-4o Mini** - More capable reasoning
3. **Claude 3 Haiku** - Anthropic's fast model
4. **Llama 3.1 Free** - Meta's free model

### 3. API Changes

#### Before (Hugging Face):
```javascript
const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-small', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: JSON.stringify({ inputs: prompt })
})
```

#### After (OpenRouter):
```javascript
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: { 
    'Authorization': `Bearer ${token}`,
    'HTTP-Referer': 'https://anaslaw.com',
    'X-Title': 'Anas Law AI Assistant'
  },
  body: JSON.stringify({
    model: selectedModel,
    messages: [
      { role: "system", content: LEGAL_CONTEXT },
      { role: "user", content: message }
    ]
  })
})
```

## 🎯 Benefits

### 1. **Better AI Quality**
- Access to GPT-3.5/4 instead of DialoGPT
- More coherent and contextual responses
- Better Indonesian language support

### 2. **Flexibility**
- Multiple AI models to choose from
- Can switch models based on needs
- Free and paid model options

### 3. **Reliability**
- OpenRouter provides better uptime
- Automatic failover between models
- Better rate limiting

### 4. **Cost-Effective**
- Pay-per-use pricing
- Free models available (Llama 3.1)
- No monthly subscriptions

## 💰 Pricing (OpenRouter)

| Model | Price per 1K tokens |
|-------|-------------------|
| Llama 3.1 8B (Free) | $0 |
| GPT-3.5 Turbo | ~$0.0015 |
| GPT-4o Mini | ~$0.15 |
| Claude 3 Haiku | ~$0.25 |

## 🔒 Security Features

1. **API Key Protection**: Token disimpan dalam config file
2. **Domain Verification**: HTTP-Referer header untuk validasi
3. **Request Headers**: X-Title untuk identifikasi aplikasi

## 📱 User Experience

### Model Selector
Users can now choose their preferred AI model from dropdown in chat header:
- **GPT-3.5 Turbo**: Balanced performance & cost
- **GPT-4o Mini**: Enhanced reasoning capabilities  
- **Claude 3 Haiku**: Fast Anthropic model
- **Llama 3.1 Free**: Zero-cost option

### Real-time Switching
Model can be changed during conversation without losing chat history.

## 🚀 Getting Started

1. **Install Dependencies** (if not already done):
```bash
npm install
```

2. **Update API Key** (already configured):
The OpenRouter API key is already set in `ai-config.js`

3. **Run Development Server**:
```bash
npm run dev
```

4. **Test ChatBot**:
- Open application
- Click chat bubble
- Select preferred AI model
- Start chatting!

## 🐛 Troubleshooting

### Common Issues:

1. **"AI offline" message**:
   - Check internet connection
   - Verify API key is valid
   - Will fallback to local knowledge base

2. **Model switching not working**:
   - Refresh page
   - Check console for errors

3. **Slow responses**:
   - Some models (GPT-4) are slower
   - Try switching to GPT-3.5 or Llama

## 📊 Monitoring

Check browser console for:
- `✅ OpenRouter AI connection successful!` - API working
- `⚠️ AI offline, using local mode` - Using fallback
- API request/response logs for debugging

## 🔮 Future Enhancements

- [ ] Usage analytics
- [ ] Cost tracking
- [ ] Custom model parameters
- [ ] Voice input/output
- [ ] Chat history persistence
- [ ] Admin panel for model management

---

**Status**: ✅ Ready for Production  
**Last Updated**: June 27, 2025  
**API Version**: OpenRouter v1  
