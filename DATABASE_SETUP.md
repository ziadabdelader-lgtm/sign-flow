# 🗄️ Database Setup Guide

## Problem

Messages and conversations aren't showing because the Supabase database tables don't exist yet.

## Solution

You need to create the required tables in your Supabase database.

## Step-by-Step Setup

### 1. Go to Your Supabase Dashboard

Visit: https://app.supabase.com/

### 2. Select Your Project

Click on your project: `lawgekdgufcfcxjqonrh`

### 3. Open SQL Editor

- Click on **SQL Editor** in the left sidebar (or the SQL icon)
- Click **New Query**

### 4. Copy and Paste This SQL

```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  user_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('deaf', 'hearing')),
  input_type TEXT NOT NULL CHECK (input_type IN ('text', 'sign_video', 'voice')),
  raw_content TEXT,
  translated_text TEXT,
  confidence_score FLOAT,
  media_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Conversations policies
CREATE POLICY "Users can view their own conversations"
  ON conversations FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can create conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own conversations"
  ON conversations FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own conversations"
  ON conversations FOR DELETE
  USING (auth.uid() = owner_id);

-- Messages policies
CREATE POLICY "Users can view messages from their conversations"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND conversations.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in their conversations"
  ON messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND conversations.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own messages"
  ON messages FOR UPDATE
  USING (auth.uid() = sender_id);

CREATE POLICY "Users can delete their own messages"
  ON messages FOR DELETE
  USING (auth.uid() = sender_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_conversations_owner ON conversations(owner_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);
```

### 5. Run the SQL

- Click the **Run** button (or press Ctrl+Enter / Cmd+Enter)
- You should see "Success. No rows returned"

### 6. Verify Tables Were Created

- Click on **Table Editor** in the left sidebar
- You should now see three tables:
  - ✅ `profiles`
  - ✅ `conversations`
  - ✅ `messages`

## Test It

1. Go back to your app: http://localhost:3000
2. Login or create an account
3. Click "New Conversation"
4. Try typing a message - it should now appear!
5. Try recording voice or camera - messages should show up

## Troubleshooting

### If messages still don't appear:

1. **Check Browser Console** (F12)
   - Look for any red errors
   - Look for Supabase errors

2. **Check Supabase Logs**
   - Go to Supabase Dashboard
   - Click **Logs** in sidebar
   - Look for any errors

3. **Verify Auth is Working**
   - Make sure you're logged in
   - Check if `userId` is being set

### Common Issues:

**Error: "relation does not exist"**
- The tables weren't created
- Re-run the SQL script above

**Error: "permission denied"**
- RLS policies aren't set up correctly
- Re-run the SQL script above

**Error: "insert or update on table violates foreign key constraint"**
- The user isn't properly authenticated
- Try logging out and logging back in

## What This Sets Up

### Tables:

1. **profiles** - User profile information
2. **conversations** - Conversation threads
3. **messages** - Individual messages in conversations

### Security:

- **Row Level Security (RLS)** enabled
- Users can only see their own data
- Proper authentication required

### Features Enabled:

- ✅ Text messaging
- ✅ Voice transcription storage
- ✅ Sign language video recording
- ✅ Conversation history
- ✅ Message timestamps

## Next Steps

After setting up the database:

1. Test text messages
2. Test voice recording
3. Test camera/sign language
4. Check message history
5. Create multiple conversations

Everything should work now! 🎉
