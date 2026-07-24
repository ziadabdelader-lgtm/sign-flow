# 🤟 Sign Flow

**AI-powered real-time sign language translation platform** enabling seamless communication between deaf and hearing users.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ziadabdelader-lgtm/sign-flow)

## ✨ Features

- 🎥 **Real-time Sign Language Recognition** - Camera-based gesture detection
- 🗣️ **Speech-to-Text** - Voice transcription using Whisper AI
- 🔊 **Text-to-Speech** - Natural voice synthesis with ElevenLabs
- 🤖 **3D Avatar Animation** - Visual sign language representation
- 🌐 **Bilingual Support** - Full English and Arabic interface (i18next)
- 💬 **Conversation History** - Save and review past conversations
- 🎨 **Dark/Light Mode** - Accessible theming
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **3D Graphics**: Three.js + React Three Fiber
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **AI Services**: 
  - OpenAI (GPT-4, Whisper)
  - ElevenLabs (TTS)
  - MediaPipe (Gesture Recognition)
- **i18n**: react-i18next
- **State Management**: Zustand
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API key
- ElevenLabs API key

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/ziadabdelader-lgtm/sign-flow.git
cd sign-flow
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env.local` and fill in your API keys:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your keys:
- Supabase URL and Anon Key
- OpenAI API Key
- ElevenLabs API Key

4. **Set up Supabase database**

Run the SQL script from `DATABASE_SETUP.md` in your Supabase SQL Editor to create required tables.

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Documentation

- **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** - Database schema and setup
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Production deployment guide
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - API configuration guide

## 🗂️ Project Structure

```
sign-flow/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Authentication pages
│   ├── (app)/               # Main app pages
│   ├── (marketing)/         # Landing page
│   └── api/                 # API routes
├── components/              # React components
│   ├── auth/               # Authentication components
│   ├── avatar/             # 3D avatar components
│   ├── conversation/       # Chat interface
│   ├── shared/             # Shared components
│   └── ui/                 # UI primitives (shadcn)
├── lib/                    # Utilities and configs
│   ├── i18n.ts            # i18next configuration
│   ├── supabase/          # Supabase client
│   └── ai/                # AI service configs
├── store/                  # Zustand state stores
├── types/                  # TypeScript type definitions
└── public/                 # Static assets
```

## 🌐 API Keys Required

| Service | Purpose | Get Key |
|---------|---------|---------|
| Supabase | Database & Auth | [supabase.com](https://supabase.com) |
| OpenAI | Translation & STT | [platform.openai.com](https://platform.openai.com) |
| ElevenLabs | Text-to-Speech | [elevenlabs.io](https://elevenlabs.io) |

## 🔒 Environment Variables

See `.env.example` for all required environment variables.

**Required:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`
- `ELEVENLABS_API_KEY`

**Optional:**
- `STRIPE_SECRET_KEY` (for payments)
- Provider selection variables (STT_PROVIDER, TTS_PROVIDER, etc.)

## 📱 Usage

### Starting a Conversation

1. Sign up or log in
2. Click "New Conversation"
3. Choose your input method:
   - **You** panel: Sign language (camera) or text
   - **Around People** panel: Voice or text

### Language Switching

Click the 🌐 language button to toggle between English and Arabic. Your preference is saved automatically.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Ziad Abdelader** - [@ziadabdelader-lgtm](https://github.com/ziadabdelader-lgtm)

## 🙏 Acknowledgments

- OpenAI for GPT and Whisper APIs
- ElevenLabs for voice synthesis
- Supabase for backend infrastructure
- Vercel for hosting
- shadcn/ui for UI components
- MediaPipe for gesture recognition

## 📞 Support

For support, email or open an issue on GitHub.

---

Made with ❤️ to break communication barriers
