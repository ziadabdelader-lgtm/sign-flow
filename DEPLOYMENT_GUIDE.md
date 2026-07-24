# 🚀 Deployment Guide - Sign Flow

## Prerequisites Checklist

Before deploying, make sure you have:

- ✅ GitHub account
- ✅ Vercel account (https://vercel.com) - Free tier is perfect
- ✅ Supabase project with tables created
- ✅ All API keys ready (OpenAI, ElevenLabs)

## Step 1: Prepare for Deployment

### 1.1 Create .env.example file

This shows others what environment variables are needed:

```bash
# Copy your .env.local but with empty values
# This file will be committed to GitHub
```

### 1.2 Make sure .gitignore is correct

Your `.gitignore` should include:
```
.env.local
.env
node_modules/
.next/
```

## Step 2: Push to GitHub

### 2.1 Initialize Git (if not already done)

```bash
cd "d:\Documents\Desktop\sign flow\project"
git init
git add .
git commit -m "Initial commit - Sign Flow app"
```

### 2.2 Connect to GitHub

```bash
git remote add origin https://github.com/ziadabdelader-lgtm/sign-flow.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### 3.1 Connect GitHub to Vercel

1. Go to https://vercel.com
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository: `sign-flow`
5. Click **"Import"**

### 3.2 Configure Environment Variables

In Vercel, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://lawgekdgufcfcxjqonrh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key

OPENAI_API_KEY=your_openai_key
ELEVENLABS_API_KEY=your_elevenlabs_key
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM

STT_PROVIDER=whisper
TTS_PROVIDER=elevenlabs
TRANSLATION_PROVIDER=openai
AVATAR_PROVIDER=mediapipe
RECOGNITION_PROVIDER=mediapipe
```

### 3.3 Deploy Settings

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 18.x

### 3.4 Click Deploy!

Vercel will:
1. Clone your repo
2. Install dependencies
3. Build your app
4. Deploy it to a URL like: `sign-flow.vercel.app`

## Step 4: Configure Supabase for Production

### 4.1 Update Supabase URL Whitelist

In Supabase Dashboard:
1. Go to **Authentication** → **URL Configuration**
2. Add your Vercel URL to **Site URL**:
   - `https://sign-flow.vercel.app`
3. Add to **Redirect URLs**:
   - `https://sign-flow.vercel.app/**`

### 4.2 Test Production Database

Make sure you've run the SQL from `DATABASE_SETUP.md` in your Supabase project.

## Step 5: Test Your Live App

1. Visit your Vercel URL
2. Test registration/login
3. Test conversations
4. Test language switching
5. Test all features

## Step 6: Custom Domain (Optional)

### 6.1 In Vercel:
1. Go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS instructions

### 6.2 Update Supabase:
Add your custom domain to Supabase URL Configuration

## Common Deployment Issues

### ❌ Build Fails

**Check:**
- All dependencies in package.json
- No TypeScript errors
- Run `npm run build` locally first

**Fix:**
```bash
npm run typecheck
npm run build
```

### ❌ Environment Variables Not Working

**Check:**
- All variables are added in Vercel
- Variables start with `NEXT_PUBLIC_` for client-side
- Redeploy after adding variables

### ❌ Database Connection Fails

**Check:**
- Supabase URL is correct (no trailing slash)
- Anon key is the JWT token
- RLS policies are set up
- Vercel URL is whitelisted in Supabase

### ❌ API Keys Not Working

**Check:**
- Keys are valid and active
- API provider billing is set up
- No rate limits exceeded

## Monitoring & Maintenance

### Check Logs in Vercel:
- Go to your project
- Click **"Deployments"**
- Click on latest deployment
- View **"Function Logs"**

### Monitor Usage:
- **Vercel**: Check bandwidth and build minutes
- **Supabase**: Monitor database size and queries
- **OpenAI**: Check token usage and costs
- **ElevenLabs**: Monitor character usage

## Update Production App

To update your live app:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically:
- Detect the push
- Build the new version
- Deploy it live

## Rollback

If something breaks:
1. Go to Vercel Dashboard
2. Click **Deployments**
3. Find a previous working deployment
4. Click **"Promote to Production"**

## Security Checklist

Before going live:

- ✅ No API keys in code (only in .env.local)
- ✅ .env.local is in .gitignore
- ✅ RLS policies enabled in Supabase
- ✅ HTTPS enabled (Vercel does this automatically)
- ✅ Supabase URL whitelist configured
- ✅ Rate limiting considered

## Performance Tips

1. **Images**: Use Next.js Image component
2. **Caching**: Vercel Edge Network handles this
3. **Database**: Add indexes in Supabase
4. **API Calls**: Implement caching where possible

## Your Live URLs

After deployment:

- **App**: https://sign-flow.vercel.app
- **GitHub**: https://github.com/ziadabdelader-lgtm/sign-flow
- **Supabase**: https://app.supabase.com/project/lawgekdgufcfcxjqonrh

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs

Good luck with your deployment! 🚀
