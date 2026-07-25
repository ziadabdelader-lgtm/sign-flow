# 🚀 Quick Start - Push to GitHub & Deploy

## Everything is Ready! Just Follow These Steps:

### ✅ What's Already Done:
- ✓ All code is committed to git
- ✓ Remote repository is configured
- ✓ Ready to push to GitHub

### 🔐 Step 1: Authenticate with GitHub

You need to login to GitHub from your computer. Choose ONE method:

#### Method A: GitHub CLI (Easiest)

1. **Install GitHub CLI**:
   ```cmd
   winget install GitHub.cli
   ```

2. **Login**:
   ```cmd
   gh auth login
   ```
   - Choose: GitHub.com
   - Choose: HTTPS
   - Choose: Login with a web browser
   - Copy the code and press Enter
   - Login in your browser

3. **Done!** Now run `push-to-github.bat`

#### Method B: Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name it: "Sign Flow Deploy"
4. Check: **repo** (all repo permissions)
5. Click **"Generate token"**
6. **Copy the token** (you won't see it again!)

7. Open Command Prompt and run:
   ```cmd
   cd "d:\Documents\Desktop\sign flow\project"
   git remote set-url origin https://YOUR_TOKEN_HERE@github.com/ziadabdelader-lgtm/sign-flow.git
   git push -u origin main
   ```
   Replace `YOUR_TOKEN_HERE` with your actual token!

### 📤 Step 2: Push to GitHub

**Double-click** `push-to-github.bat` in your project folder

OR run in Command Prompt:
```cmd
cd "d:\Documents\Desktop\sign flow\project"
git push -u origin main
```

### ✅ Step 3: Verify on GitHub

Visit: https://github.com/ziadabdelader-lgtm/sign-flow

You should see all your code!

### 🌐 Step 4: Deploy to Vercel

1. **Go to**: https://vercel.com
2. **Sign in** with GitHub
3. Click **"New Project"**
4. Select **"sign-flow"** repository
5. Click **"Import"**

6. **Add Environment Variables** (click "Environment Variables"):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://lawgekdgufcfcxjqonrh.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
   OPENAI_API_KEY=your_openai_key
   ELEVENLABS_API_KEY=your_elevenlabs_key
   ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
   STT_PROVIDER=whisper
   TTS_PROVIDER=elevenlabs
   TRANSLATION_PROVIDER=openai
   AVATAR_PROVIDER=mediapipe
   RECOGNITION_PROVIDER=mediapipe
   ```

7. Click **"Deploy"**

8. Wait 2-3 minutes... **Your app is live!** 🎉

### 🗄️ Step 5: Configure Supabase for Production

1. Go to: https://app.supabase.com/project/lawgekdgufcfcxjqonrh
2. Click **Authentication** → **URL Configuration**
3. Add your Vercel URL to:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: `https://your-app.vercel.app/**`

### ✅ Done!

Your app is now live and accessible to the world!

## Troubleshooting

### "Permission denied" when pushing?
→ You need to authenticate (see Step 1 above)

### "Repository not found"?
→ Make sure the repository exists: https://github.com/ziadabdelader-lgtm/sign-flow

### Vercel build fails?
→ Check that all environment variables are added correctly

### Database not working in production?
→ Make sure you ran the SQL from DATABASE_SETUP.md in Supabase
→ Check that Vercel URL is whitelisted in Supabase

## Your URLs

After deployment:
- **GitHub**: https://github.com/ziadabdelader-lgtm/sign-flow
- **Vercel**: https://sign-flow.vercel.app (or your custom domain)
- **Supabase**: https://app.supabase.com/project/lawgekdgufcfcxjqonrh

## Need Help?

If you get stuck:
1. Check the error message carefully
2. Google the error message
3. Check Vercel logs (click on deployment → "View Function Logs")
4. Check Supabase logs (Dashboard → Logs)

---

**You've got this!** 💪 The hard part is done, just a few clicks away from going live! 🚀
