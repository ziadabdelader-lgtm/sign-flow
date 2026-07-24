# 🚀 SignFlow Setup Guide

## ✅ What's Already Done

- ✓ Next.js application is installed and running
- ✓ Supabase authentication is configured
- ✓ All integration code is ready
- ✓ Browser-based text-to-speech fallback is active

## 🔑 Step 1: Get Your API Keys

### Required for Full AI Features:

#### 1. **OpenAI API Key** (Required for translation & speech recognition)
   - Go to: https://platform.openai.com/api-keys
   - Create an account or sign in
   - Click "Create new secret key"
   - Copy the key and add it to `.env.local`:
     ```
     OPENAI_API_KEY=sk-proj-...
     ```
   - **Cost**: Pay-as-you-go (GPT-4o-mini ~$0.15/1M tokens, Whisper ~$0.006/min)

#### 2. **ElevenLabs API Key** (Required for high-quality text-to-speech)
   - Go to: https://elevenlabs.io/app/settings/api-keys
   - Create an account or sign in
   - Copy your API key
   - Add it to `.env.local`:
     ```
     ELEVENLABS_API_KEY=...
     ```
   - **Cost**: Free tier includes 10,000 characters/month, paid plans start at $5/month

### Optional (Alternative Providers):

#### 3. **Google Cloud** (Alternative STT/TTS)
   - Setup: https://cloud.google.com/speech-to-text/docs/quickstart-client-libraries
   - Add credentials path to `.env.local`

#### 4. **Azure Speech Services** (Alternative STT/TTS)
   - Setup: https://azure.microsoft.com/en-us/services/cognitive-services/speech-services/
   - Add key and region to `.env.local`

#### 5. **Stripe** (For payment/subscription features)
   - Go to: https://dashboard.stripe.com/apikeys
   - Get your secret key and publishable key
   - Add webhook secret for production

## 📝 Step 2: Update .env.local

1. Open `.env.local` in the project root
2. Add your API keys to the empty values:
   ```bash
   OPENAI_API_KEY=your_key_here
   ELEVENLABS_API_KEY=your_key_here
   ```
3. Save the file
4. Restart the dev server (Ctrl+C, then `npm run dev`)

## 🧪 Step 3: Test the Features

### Test Sign Language to Speech:
1. Navigate to the app
2. Start a conversation
3. Use your webcam to show sign language gestures
4. The AI should recognize and translate to text/speech

### Test Speech to Sign:
1. Click the microphone button
2. Speak into your microphone
3. The avatar should animate with sign language

### Test Text Translation:
1. Type a message in the input field
2. It should translate and display sign language animation

## 🔍 Step 4: Verify Setup

Check the browser console (F12) for any errors:
- ✅ No API key errors = Setup successful
- ❌ "API key missing" = Add the key to `.env.local`
- ❌ "Invalid API key" = Double-check the key value

## 📊 Current Feature Status

| Feature | Status | Requires |
|---------|--------|----------|
| Text-to-Speech (Browser) | ✅ Active | None (built-in) |
| Text-to-Speech (AI) | ⏳ Pending | ElevenLabs API key |
| Speech-to-Text | ⏳ Pending | OpenAI API key |
| Sign Language Recognition | ✅ Active | None (MediaPipe) |
| Translation | ⏳ Pending | OpenAI API key |
| Avatar Animation | ✅ Active | None (Three.js) |
| Authentication | ✅ Active | Supabase (configured) |
| Database | ✅ Active | Supabase (configured) |

## 💡 Tips

1. **Start with OpenAI + ElevenLabs** - These two keys unlock most features
2. **Test incrementally** - Add one key at a time and test
3. **Monitor usage** - Check your API dashboards for usage and costs
4. **Use fallbacks** - The app works with browser TTS if ElevenLabs isn't configured
5. **Environment Variables** - Remember to restart the server after changing `.env.local`

## 🐛 Troubleshooting

### API keys not working?
- Make sure there are no extra spaces in the `.env.local` file
- Restart the dev server completely
- Check the browser console for specific error messages

### Features not activating?
- Clear browser cache (Ctrl+Shift+Delete)
- Check API provider dashboards for account issues
- Verify billing is set up for paid APIs

### Still having issues?
1. Check the `/app/api/*` routes for error logs
2. Review the integration files in `/lib/ai/*`
3. Test API keys directly in their respective platforms

## 📚 Next Steps

1. ✅ Add API keys to `.env.local`
2. ✅ Restart the dev server
3. ✅ Test each feature individually
4. 🎨 Customize voice settings (voice ID, speed, etc.)
5. 🗄️ Set up Supabase database tables if needed
6. 🚀 Deploy to production when ready

## 🌐 Useful Links

- [OpenAI Platform](https://platform.openai.com/)
- [ElevenLabs Dashboard](https://elevenlabs.io/app)
- [Supabase Dashboard](https://app.supabase.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Project Documentation](./README.md)
