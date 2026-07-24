
/*
# Sign Flow — Initial Schema

## Summary
Creates the full Sign Flow multi-user schema supporting:
- User profiles extending Supabase Auth
- Conversations between deaf and hearing users
- Messages with type tracking (text / sign_video / voice)
- Translation logs per message
- Speech synthesis logs (STT + TTS)
- 3D Avatar sessions
- Subscriptions (Stripe-linked)
- Per-user API usage tracking
- Per-user app + AI provider settings

## Tables Created
1. profiles       — Extends auth.users with display_name, role, user_type
2. conversations  — Links two participants + status
3. messages       — Individual chat messages with input type + translations
4. translations   — AI translation records per message
5. speech_logs    — STT / TTS audio records
6. avatar_sessions— Avatar provider sessions per conversation
7. subscriptions  — Billing plan + Stripe IDs
8. api_usage      — Per-service usage + cost tracking
9. settings       — Per-user AI provider + accessibility preferences

## Security
- RLS enabled on ALL tables
- All policies scoped to `authenticated` with auth.uid() ownership checks
- Profiles linked to auth.users with CASCADE delete
- owner columns default to auth.uid()
*/

-- ─── PROFILES ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url   TEXT,
  role         TEXT NOT NULL DEFAULT 'user',
  user_type    TEXT NOT NULL DEFAULT 'both',
  bio          TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_delete_own" ON profiles;
CREATE POLICY "profiles_delete_own" ON profiles FOR DELETE
  TO authenticated USING (auth.uid() = id);

-- ─── CONVERSATIONS ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS conversations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT,
  deaf_user_id    UUID REFERENCES profiles(id) ON DELETE SET NULL,
  hearing_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  owner_id        UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  status          TEXT NOT NULL DEFAULT 'active',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "conversations_select_own" ON conversations;
CREATE POLICY "conversations_select_own" ON conversations FOR SELECT
  TO authenticated USING (auth.uid() = owner_id OR auth.uid() = deaf_user_id OR auth.uid() = hearing_user_id);

DROP POLICY IF EXISTS "conversations_insert_own" ON conversations;
CREATE POLICY "conversations_insert_own" ON conversations FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = owner_id);

DROP POLICY IF EXISTS "conversations_update_own" ON conversations;
CREATE POLICY "conversations_update_own" ON conversations FOR UPDATE
  TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

DROP POLICY IF EXISTS "conversations_delete_own" ON conversations;
CREATE POLICY "conversations_delete_own" ON conversations FOR DELETE
  TO authenticated USING (auth.uid() = owner_id);

-- ─── MESSAGES ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id  UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id        UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  sender_type      TEXT NOT NULL,
  input_type       TEXT NOT NULL DEFAULT 'text',
  raw_content      TEXT,
  translated_text  TEXT,
  audio_url        TEXT,
  video_url        TEXT,
  status           TEXT NOT NULL DEFAULT 'sent',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "messages_select_participants" ON messages;
CREATE POLICY "messages_select_participants" ON messages FOR SELECT
  TO authenticated USING (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = messages.conversation_id
      AND (c.owner_id = auth.uid() OR c.deaf_user_id = auth.uid() OR c.hearing_user_id = auth.uid())
    )
  );

DROP POLICY IF EXISTS "messages_insert_own" ON messages;
CREATE POLICY "messages_insert_own" ON messages FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = sender_id);

DROP POLICY IF EXISTS "messages_update_own" ON messages;
CREATE POLICY "messages_update_own" ON messages FOR UPDATE
  TO authenticated USING (auth.uid() = sender_id) WITH CHECK (auth.uid() = sender_id);

DROP POLICY IF EXISTS "messages_delete_own" ON messages;
CREATE POLICY "messages_delete_own" ON messages FOR DELETE
  TO authenticated USING (auth.uid() = sender_id);

-- ─── TRANSLATIONS ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS translations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id      UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  source_text     TEXT NOT NULL,
  translated_text TEXT NOT NULL,
  provider        TEXT NOT NULL,
  model           TEXT,
  tokens_used     INT DEFAULT 0,
  latency_ms      INT DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "translations_select_own" ON translations;
CREATE POLICY "translations_select_own" ON translations FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "translations_insert_own" ON translations;
CREATE POLICY "translations_insert_own" ON translations FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "translations_update_own" ON translations;
CREATE POLICY "translations_update_own" ON translations FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "translations_delete_own" ON translations;
CREATE POLICY "translations_delete_own" ON translations FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ─── SPEECH LOGS ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS speech_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  message_id  UUID REFERENCES messages(id) ON DELETE SET NULL,
  direction   TEXT NOT NULL,
  provider    TEXT NOT NULL,
  audio_url   TEXT,
  transcript  TEXT,
  duration_ms INT DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE speech_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "speech_logs_select_own" ON speech_logs;
CREATE POLICY "speech_logs_select_own" ON speech_logs FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "speech_logs_insert_own" ON speech_logs;
CREATE POLICY "speech_logs_insert_own" ON speech_logs FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "speech_logs_update_own" ON speech_logs;
CREATE POLICY "speech_logs_update_own" ON speech_logs FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "speech_logs_delete_own" ON speech_logs;
CREATE POLICY "speech_logs_delete_own" ON speech_logs FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ─── AVATAR SESSIONS ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS avatar_sessions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  provider        TEXT NOT NULL DEFAULT 'mediapipe',
  status          TEXT NOT NULL DEFAULT 'idle',
  sign_data       JSONB,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE avatar_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "avatar_sessions_select_own" ON avatar_sessions;
CREATE POLICY "avatar_sessions_select_own" ON avatar_sessions FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "avatar_sessions_insert_own" ON avatar_sessions;
CREATE POLICY "avatar_sessions_insert_own" ON avatar_sessions FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "avatar_sessions_update_own" ON avatar_sessions;
CREATE POLICY "avatar_sessions_update_own" ON avatar_sessions FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "avatar_sessions_delete_own" ON avatar_sessions;
CREATE POLICY "avatar_sessions_delete_own" ON avatar_sessions FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ─── SUBSCRIPTIONS ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscriptions (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  plan                    TEXT NOT NULL DEFAULT 'free',
  status                  TEXT NOT NULL DEFAULT 'active',
  stripe_customer_id      TEXT,
  stripe_subscription_id  TEXT,
  current_period_end      TIMESTAMPTZ,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "subscriptions_select_own" ON subscriptions;
CREATE POLICY "subscriptions_select_own" ON subscriptions FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "subscriptions_insert_own" ON subscriptions;
CREATE POLICY "subscriptions_insert_own" ON subscriptions FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "subscriptions_update_own" ON subscriptions;
CREATE POLICY "subscriptions_update_own" ON subscriptions FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "subscriptions_delete_own" ON subscriptions;
CREATE POLICY "subscriptions_delete_own" ON subscriptions FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ─── API USAGE ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS api_usage (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  service     TEXT NOT NULL,
  provider    TEXT NOT NULL,
  units_used  INT NOT NULL DEFAULT 0,
  cost_usd    NUMERIC(10,6) NOT NULL DEFAULT 0,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "api_usage_select_own" ON api_usage;
CREATE POLICY "api_usage_select_own" ON api_usage FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "api_usage_insert_own" ON api_usage;
CREATE POLICY "api_usage_insert_own" ON api_usage FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "api_usage_update_own" ON api_usage;
CREATE POLICY "api_usage_update_own" ON api_usage FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "api_usage_delete_own" ON api_usage;
CREATE POLICY "api_usage_delete_own" ON api_usage FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ─── SETTINGS ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS settings (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  theme                TEXT NOT NULL DEFAULT 'system',
  stt_provider         TEXT NOT NULL DEFAULT 'whisper',
  tts_provider         TEXT NOT NULL DEFAULT 'elevenlabs',
  translation_provider TEXT NOT NULL DEFAULT 'openai',
  avatar_provider      TEXT NOT NULL DEFAULT 'mediapipe',
  voice_id             TEXT,
  language             TEXT NOT NULL DEFAULT 'en',
  accessibility_mode   BOOLEAN NOT NULL DEFAULT FALSE,
  high_contrast        BOOLEAN NOT NULL DEFAULT FALSE,
  large_text           BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "settings_select_own" ON settings;
CREATE POLICY "settings_select_own" ON settings FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "settings_insert_own" ON settings;
CREATE POLICY "settings_insert_own" ON settings FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "settings_update_own" ON settings;
CREATE POLICY "settings_update_own" ON settings FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "settings_delete_own" ON settings;
CREATE POLICY "settings_delete_own" ON settings FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ─── INDEXES ─────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_conversations_owner ON conversations(owner_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_translations_message ON translations(message_id);
CREATE INDEX IF NOT EXISTS idx_speech_logs_user ON speech_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_user ON api_usage(user_id, recorded_at DESC);
