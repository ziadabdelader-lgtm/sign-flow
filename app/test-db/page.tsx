'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function TestDatabasePage() {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addLog = (message: string, isError = false) => {
    setResults((prev) => [...prev, `${isError ? '❌' : '✅'} ${message}`]);
  };

  const testConnection = async () => {
    setResults([]);
    setLoading(true);

    try {
      addLog('Testing Supabase connection...');
      const supabase = createClient();

      // Test 1: Check auth
      addLog('Step 1: Checking authentication...');
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        addLog(`Auth Error: ${authError.message}`, true);
        setLoading(false);
        return;
      }

      if (!user) {
        addLog('No user logged in', true);
        addLog('Please login first at /login');
        setLoading(false);
        return;
      }

      addLog(`User authenticated: ${user.email}`);

      // Test 2: Check if tables exist
      addLog('Step 2: Checking if conversations table exists...');
      const { data: tables, error: tableError } = await supabase
        .from('conversations')
        .select('id')
        .limit(1);

      if (tableError) {
        if (tableError.message.includes('relation') || tableError.message.includes('does not exist')) {
          addLog('❌ TABLES NOT CREATED!', true);
          addLog('You need to run the SQL script from DATABASE_SETUP.md', true);
          addLog('Go to: https://app.supabase.com/', true);
          addLog('→ SQL Editor → Copy SQL from DATABASE_SETUP.md → Run', true);
        } else {
          addLog(`Table check error: ${tableError.message}`, true);
        }
        setLoading(false);
        return;
      }

      addLog('Conversations table exists!');

      // Test 3: Try to create a conversation
      addLog('Step 3: Testing conversation creation...');
      const { data: newConv, error: createError } = await supabase
        .from('conversations')
        .insert({ title: 'Test Conversation', owner_id: user.id })
        .select()
        .single();

      if (createError) {
        addLog(`Create error: ${createError.message}`, true);
        setLoading(false);
        return;
      }

      addLog(`Conversation created successfully! ID: ${newConv.id}`);

      // Test 4: Try to create a message
      addLog('Step 4: Testing message creation...');
      const { data: newMsg, error: msgError } = await supabase
        .from('messages')
        .insert({
          conversation_id: newConv.id,
          sender_id: user.id,
          sender_type: 'deaf',
          input_type: 'text',
          raw_content: 'Test message',
          translated_text: 'Test message',
        })
        .select()
        .single();

      if (msgError) {
        addLog(`Message error: ${msgError.message}`, true);
        setLoading(false);
        return;
      }

      addLog(`Message created successfully! ID: ${newMsg.id}`);

      // Test 5: Clean up test data
      addLog('Step 5: Cleaning up test data...');
      await supabase.from('conversations').delete().eq('id', newConv.id);
      addLog('Test data cleaned up');

      addLog('');
      addLog('🎉 ALL TESTS PASSED! Your database is working correctly!');
      addLog('You can now use the conversation feature.');

    } catch (err: any) {
      addLog(`Unexpected error: ${err.message || err}`, true);
    }

    setLoading(false);
  };

  return (
    <div className="container max-w-4xl mx-auto p-8">
      <Card className="p-8">
        <h1 className="text-3xl font-bold mb-4">🔧 Database Connection Test</h1>
        <p className="text-muted-foreground mb-6">
          This page will test your Supabase connection and database setup.
        </p>

        <Button
          onClick={testConnection}
          disabled={loading}
          className="mb-6"
          size="lg"
        >
          {loading ? 'Testing...' : 'Run Tests'}
        </Button>

        {results.length > 0 && (
          <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-lg space-y-2 overflow-auto max-h-96">
            {results.map((result, index) => (
              <div key={index}>{result}</div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Common Issues:</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>❌ Tables not created:</strong> Run the SQL from DATABASE_SETUP.md
            </li>
            <li>
              <strong>❌ Not logged in:</strong> Go to <a href="/login" className="text-blue-600 underline">/login</a> first
            </li>
            <li>
              <strong>❌ Wrong credentials:</strong> Check your .env.local file
            </li>
          </ul>
        </div>

        <div className="mt-6 text-sm text-muted-foreground">
          <p>
            <strong>Env Variables:</strong>
          </p>
          <p>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || '❌ Not set'}</p>
          <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not set'}</p>
        </div>
      </Card>
    </div>
  );
}
